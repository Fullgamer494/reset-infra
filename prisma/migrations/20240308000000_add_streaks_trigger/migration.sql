-- ==========================================
-- UDFS y Triggers para ReSet
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
