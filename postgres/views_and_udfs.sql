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
    RAISE EXCEPTION 'Usuario no tiene adicciónn activa registrada.', p_user_id;
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
ON tracking.log_absences (streak_id, (detected_at::date));

-- ==========================================
-- WINDOW FUNCTIONS (VIEWS)
-- ==========================================

-- WF-01 Ranking: Obtener el ÃƒÂºltimo log de cada usuario
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

-- WF-02 AgregaciÃƒÂ³n con marco de ventana: Promedio mÃƒÂ³vil craving 7 dÃƒÂ­as
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

-- =========================================================================
-- Script SQL para poblar catálogos obligatorios de ReSet API
-- Ejecutar este script en la base de datos PostgreSQL de ReSet
-- =========================================================================

-- Insertar Niveles de Craving (1-10)
INSERT INTO core.craving_levels (id, level, description, recommendation, label) VALUES
(gen_random_uuid(), 1, 'Sin Ansiedad', 'Mantén lo que estás haciendo, felicidades.', 'Nivel 1'),
(gen_random_uuid(), 2, 'Leve - Pensamiento Fugaz', 'Distráete con una actividad ligera.', 'Nivel 2'),
(gen_random_uuid(), 3, 'Leve - Ligeramente molesto', 'Bebe agua, haz una pausa de 5 minutos.', 'Nivel 3'),
(gen_random_uuid(), 4, 'Moderado - Incómodo', 'Contacta a un amigo o da un pequeño paseo.', 'Nivel 4'),
(gen_random_uuid(), 5, 'Moderado - Constante', 'Revisa tus razones para mantenerte sobrio. Medita.', 'Nivel 5'),
(gen_random_uuid(), 6, 'Moderado Alto - Distractivo', 'Busca apoyo en la comunidad o lee un post del foro.', 'Nivel 6'),
(gen_random_uuid(), 7, 'Alto - Fuerte deseo', 'Llama a un contacto de emergencia de prioridad media.', 'Nivel 7'),
(gen_random_uuid(), 8, 'Alto - Muy difícil de ignorar', 'Llama a tu padrino o terapeuta inmediatamente.', 'Nivel 8'),
(gen_random_uuid(), 9, 'Severo - Al límite', 'Activa el Botón de Pánico. No te quedes solo.', 'Nivel 9'),
(gen_random_uuid(), 10, 'Severo - Urgencia Inminente', 'Emergencia. Llama a tu red de apoyo principal o al 911 si hay riesgo vital.', 'Nivel 10')
ON CONFLICT (level) DO NOTHING;

-- Insertar Estados Emocionales (1-10)
INSERT INTO core.emotional_states (id, level, label, category, description) VALUES
(gen_random_uuid(), 1, 'Deprimido / Muy Triste', 'Negativa', 'Estado 1'),
(gen_random_uuid(), 2, 'Enojado / Frustrado', 'Negativa', 'Estado 2'),
(gen_random_uuid(), 3, 'Ansioso / Preocupado', 'Negativa', 'Estado 3'),
(gen_random_uuid(), 4, 'Estresado / Abrumado', 'Negativa', 'Estado 4'),
(gen_random_uuid(), 5, 'Apatía / Indiferente', 'Neutral', 'Estado 5'),
(gen_random_uuid(), 6, 'Aburrido', 'Neutral', 'Estado 6'),
(gen_random_uuid(), 7, 'Tranquilo / Relajado', 'Positiva', 'Estado 7'),
(gen_random_uuid(), 8, 'Contento / Satisfecho', 'Positiva', 'Estado 8'),
(gen_random_uuid(), 9, 'Alegre / Motivado', 'Positiva', 'Estado 9'),
(gen_random_uuid(), 10, 'Eufórico / Muy Feliz', 'Positiva', 'Estado 10')
ON CONFLICT (level) DO NOTHING;

-- =========================================================================
-- Insertar Consultas Comunes en tabla queries para Benchmarking
-- =========================================================================

INSERT INTO queries (project_id, query_description, query_sql, target_table, query_type) VALUES
(3, 'Registrar un nuevo daily log de estado emocional', 'INSERT INTO tracking.daily_logs (user_id, log_date, craving_level_id, emotional_state_id, consumed) VALUES ($1, $2, $3, $4, $5);', 'tracking.daily_logs', 'WRITE_OPERATION'),
(3, 'Obtener racha activa de un usuario', 'SELECT * FROM core.streaks WHERE user_id = $1 AND status = ''active'' LIMIT 1;', 'core.streaks', 'SIMPLE_SELECT'),
(3, 'Consultar contactos de emergencia activos', 'SELECT * FROM emergency.support_contacts WHERE user_id = $1 AND is_active = true;', 'emergency.support_contacts', 'SIMPLE_SELECT'),
(3, 'Listar historial de logs integrando niveles y emociones', 'SELECT dl.*, cl.label, es.label FROM tracking.daily_logs dl JOIN core.craving_levels cl ON dl.craving_level_id = cl.id JOIN core.emotional_states es ON dl.emotional_state_id = es.id WHERE dl.user_id = $1 ORDER BY dl.log_date DESC;', 'tracking.daily_logs', 'JOIN'),
(3, 'Obtener recuento de reincidencias agrupadas por estado', 'SELECT status, COUNT(*) FROM core.streaks GROUP BY status;', 'core.streaks', 'AGGREGATION'),
(3, 'Consultar el último log de todos los usuarios (WF-01)', 'SELECT * FROM tracking.v_user_latest_log;', 'tracking.v_user_latest_log', 'WINDOW_FUNCTION'),
(3, 'Consultar promedio móvil de craving de 7 días (WF-02)', 'SELECT * FROM tracking.v_user_craving_moving_avg WHERE user_id = $1;', 'tracking.v_user_craving_moving_avg', 'WINDOW_FUNCTION'),
(3, 'Consultar ranking de mejores rachas por usuario (WF-03)', 'SELECT * FROM tracking.v_user_best_streaks WHERE user_id = $1;', 'tracking.v_user_best_streaks', 'WINDOW_FUNCTION'),
(3, 'Actualizar racha del usuario al insertar/actualizar log (Trigger/UDF)', 'SELECT core.fn_update_streak();', 'core.streaks', 'WRITE_OPERATION'),
(3, 'Detectar ausencias de logs diarios (UDF Cron/Job)', 'SELECT tracking.fn_detect_absence();', 'tracking.log_absences', 'WRITE_OPERATION'),
(3, 'Disparar alerta de emergencia en botón de pánico (UDF)', 'SELECT emergency.fn_trigger_alert($1);', 'emergency.emergency_alerts', 'WRITE_OPERATION'),
(3, 'Obtener estadísticas consolidadas del usuario (UDF con subqueries)', 'SELECT * FROM core.fn_get_user_stats($1);', 'core.streaks', 'SUBQUERY'),
(3, 'Terminar o cerrar un patrocinio (UDF)', 'SELECT core.fn_close_sponsorship($1, $2);', 'core.sponsorships', 'WRITE_OPERATION'),
(3, 'Exportar datos estadísticos de rendimiento (View)', 'SELECT * FROM v_daily_export;', 'v_daily_export', 'SIMPLE_SELECT');
