-- ==========================================
-- UDFS y Triggers
-- ==========================================

-- 1. core.fn_update_streak
CREATE OR REPLACE FUNCTION core.fn_update_streak()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_streak core.streaks%ROWTYPE;
  v_yesterday DATE := NEW.log_date - INTERVAL '1 day';
BEGIN
  -- 1. Obtener racha activa del usuario
  SELECT * INTO v_streak
  FROM core.streaks
  WHERE user_id = NEW.user_id
  AND status = 'active'
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NEW; -- Sin racha activa, no hacer nada
  END IF;

  -- 2a. Consumo registrado -> romper racha
  IF NEW.consumed = TRUE THEN
    UPDATE core.streaks
    SET status = 'broken', updated_at = NOW()
    WHERE id = v_streak.id;

    INSERT INTO tracking.streak_events (streak_id, event_type, event_date, days_achieved)
    VALUES (v_streak.id, 'relapse', NOW(), v_streak.day_counter);

  -- 2b. Sin consumo -> verificar continuidad
  ELSIF v_streak.last_log_date IS NULL OR v_streak.last_log_date = v_yesterday THEN
    UPDATE core.streaks
    SET day_counter = day_counter + 1,
        last_log_date = NEW.log_date,
        updated_at = NOW()
    WHERE id = v_streak.id;

    INSERT INTO tracking.streak_events (streak_id, event_type, event_date, days_achieved)
    VALUES (v_streak.id, 'progress', NOW(), v_streak.day_counter + 1);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_update_streak ON tracking.daily_logs;
CREATE TRIGGER trg_update_streak
AFTER INSERT OR UPDATE ON tracking.daily_logs
FOR EACH ROW EXECUTE FUNCTION core.fn_update_streak();

-- 2. tracking.fn_detect_absence
CREATE OR REPLACE FUNCTION tracking.fn_detect_absence()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  rec RECORD;
  v_hours INT;
BEGIN
  FOR rec IN
    SELECT s.id AS streak_id, s.user_id, s.last_log_date
    FROM core.streaks s
    WHERE s.status = 'active'
    AND (s.last_log_date < CURRENT_DATE - 1 OR s.last_log_date IS NULL)
    AND NOT EXISTS (
      SELECT 1 FROM tracking.log_absences la
      WHERE la.streak_id = s.id AND la.detected_at::date = CURRENT_DATE
    )
  LOOP
    v_hours := EXTRACT(EPOCH FROM (NOW() - rec.last_log_date::timestamp)) / 3600;
    
    INSERT INTO tracking.log_absences
    (user_id, streak_id, last_log_date, detected_at, absence_hours, event_generated)
    VALUES
    (rec.user_id, rec.streak_id, rec.last_log_date, NOW(), v_hours, FALSE);

    IF v_hours >= 48 THEN
      UPDATE core.streaks
      SET status = 'paused', updated_at = NOW()
      WHERE id = rec.streak_id;
    END IF;
  END LOOP;
END;
$$;

-- 3. emergency.fn_trigger_alert
CREATE OR REPLACE FUNCTION emergency.fn_trigger_alert(p_user_id UUID)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_addiction_id UUID;
  v_alert_id UUID;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM emergency.support_contacts
    WHERE user_id = p_user_id AND is_active = TRUE
  ) THEN
    RAISE EXCEPTION 'Usuario % no tiene contactos de emergencia activos.', p_user_id;
  END IF;

  SELECT id INTO v_addiction_id
  FROM core.user_addictions
  WHERE user_id = p_user_id AND is_active = TRUE
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Usuario % no tiene adicción activa registrada.', p_user_id;
  END IF;

  INSERT INTO emergency.emergency_alerts (user_id, user_addiction_id, activated_at)
  VALUES (p_user_id, v_addiction_id, NOW())
  RETURNING id INTO v_alert_id;

  RETURN v_alert_id;
END;
$$;

-- 4. core.fn_get_user_stats
CREATE OR REPLACE FUNCTION core.fn_get_user_stats(p_user_id UUID)
RETURNS TABLE(
  day_counter INT,
  avg_craving NUMERIC(4,2),
  avg_emotion NUMERIC(4,2),
  streak_status VARCHAR(20),
  total_relapses INT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(s.day_counter, 0)::INT,
    (SELECT ROUND(AVG(cl.level), 2)
     FROM tracking.daily_logs dl
     JOIN core.craving_levels cl ON cl.id = dl.craving_level_id
     WHERE dl.user_id = p_user_id AND dl.consumed = FALSE
     AND dl.log_date >= CURRENT_DATE - 30)::NUMERIC(4,2),
    (SELECT ROUND(AVG(es.level), 2)
     FROM tracking.daily_logs dl
     JOIN core.emotional_states es ON es.id = dl.emotional_state_id
     WHERE dl.user_id = p_user_id
     AND dl.log_date >= CURRENT_DATE - 30)::NUMERIC(4,2),
    COALESCE(s.status, 'none')::VARCHAR(20),
    (SELECT COUNT(*)::INT
     FROM tracking.streak_events se
     WHERE se.streak_id = s.id AND se.event_type = 'relapse')
  FROM core.streaks s
  WHERE s.user_id = p_user_id
  LIMIT 1;
END;
$$;

-- 5. core.fn_close_sponsorship
CREATE OR REPLACE FUNCTION core.fn_close_sponsorship(
  p_sponsor_id UUID,
  p_reason TEXT DEFAULT 'Terminación voluntaria'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_found BOOLEAN := FALSE;
BEGIN
  UPDATE core.sponsorships
  SET is_active = FALSE, ended_at = NOW(), termination_reason = p_reason
  WHERE sponsor_id = p_sponsor_id AND is_active = TRUE;
  
  GET DIAGNOSTICS v_found = ROW_COUNT;
  RETURN v_found > 0;
END;
$$;

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date
ON tracking.daily_logs (user_id, log_date DESC);

CREATE INDEX IF NOT EXISTS idx_streak_events_streak_type
ON tracking.streak_events (streak_id, event_type);

CREATE INDEX IF NOT EXISTS idx_streaks_user_status
ON core.streaks (user_id, status);

CREATE INDEX IF NOT EXISTS idx_log_absences_streak_date
ON tracking.log_absences (streak_id, detected_at::date);

-- ==========================================
-- WINDOW FUNCTIONS (VIEWS)
-- ==========================================

-- WF-01 Ranking: Obtener el último log de cada usuario
CREATE OR REPLACE VIEW tracking.v_user_latest_log AS
WITH ranked_logs AS (
  SELECT
    dl.user_id,
    dl.log_date,
    dl.consumed,
    cl.level AS craving_level,
    cl.label AS craving_label,
    es.level AS emotional_level,
    es.label AS emotional_label,
    dl.triggers,
    dl.notes,
    ROW_NUMBER() OVER (
      PARTITION BY dl.user_id
      ORDER BY dl.log_date DESC
    ) AS rn
  FROM tracking.daily_logs dl
  LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id
  LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id
)
SELECT * FROM ranked_logs WHERE rn = 1;

-- WF-02 Agregación con marco de ventana: Promedio móvil craving 7 días
CREATE OR REPLACE VIEW tracking.v_user_craving_moving_avg AS
SELECT
  dl.user_id,
  dl.log_date,
  cl.level AS daily_craving,
  ROUND(
    AVG(cl.level) OVER (
      PARTITION BY dl.user_id
      ORDER BY dl.log_date
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2
  ) AS rolling_avg_craving_7d,
  ROUND(
    AVG(es.level) OVER (
      PARTITION BY dl.user_id
      ORDER BY dl.log_date
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2
  ) AS rolling_avg_emotion_7d
FROM tracking.daily_logs dl
LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id
LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id;

-- WF-03 Ranking: Mejores rachas del usuario
CREATE OR REPLACE VIEW tracking.v_user_best_streaks AS
SELECT
  s.user_id,
  ua.custom_name AS addiction_name,
  se.days_achieved,
  se.event_date AS completed_at,
  se.event_type,
  RANK() OVER (
    PARTITION BY s.user_id
    ORDER BY se.days_achieved DESC
  ) AS streak_rank,
  ROUND(
    se.days_achieved::NUMERIC / NULLIF(
      MAX(se.days_achieved) OVER (PARTITION BY s.user_id), 0
    ) * 100, 1
  ) AS pct_of_best
FROM tracking.streak_events se
JOIN core.streaks s ON s.id = se.streak_id
JOIN core.user_addictions ua ON ua.id = s.user_addiction_id;

