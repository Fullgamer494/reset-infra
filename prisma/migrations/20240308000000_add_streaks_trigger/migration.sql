-- ==========================================
-- UDFS y Triggers para ReSet
-- ==========================================

-- 1. core.fn_update_streak
CREATE OR REPLACE FUNCTION core.fn_update_streak()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_streak_id UUID;
  v_addiction_id UUID;
  v_day_counter INT;
  v_last_log_date DATE;
  v_status VARCHAR(20);
BEGIN
  -- 1. Intentar obtener el registro de racha del usuario
  SELECT id, day_counter, last_log_date, status 
  INTO v_streak_id, v_day_counter, v_last_log_date, v_status
  FROM core.streaks
  WHERE user_id = NEW.user_id
  LIMIT 1;

  -- 2. ESCENARIO: LOG LIMPIO (consumed = FALSE)
  IF NEW.consumed = FALSE THEN
    -- A. Si NO tiene racha o está en un estado que permite reinicio/resunción
    -- (incluimos 'paused' para que se reactive al volver a loggear)
    IF v_streak_id IS NULL OR v_status IN ('broken', 'paused') THEN
      -- Buscar adicción activa obligatoria
      SELECT id INTO v_addiction_id
      FROM core.user_addictions
      WHERE user_id = NEW.user_id AND is_active = TRUE
      LIMIT 1;

      IF NOT FOUND THEN RETURN NEW; END IF;

      IF v_streak_id IS NULL THEN
        -- Crear racha desde cero
        INSERT INTO core.streaks (id, user_id, user_addiction_id, status, started_at, day_counter, last_log_date, updated_at)
        VALUES (gen_random_uuid(), NEW.user_id, v_addiction_id, 'active', NEW.log_date, 1, NEW.log_date, NOW())
        RETURNING id INTO v_streak_id;
      ELSE
        -- Reiniciar o Reactivar racha existente
        UPDATE core.streaks
        SET status = 'active', 
            day_counter = CASE WHEN v_status = 'broken' THEN 1 ELSE v_day_counter + 1 END,
            last_log_date = NEW.log_date,
            updated_at = NOW()
        WHERE id = v_streak_id;
      END IF;

      -- Registrar evento de progreso en la "bitácora"
      INSERT INTO tracking.streak_events (id, streak_id, event_type, event_date, days_achieved)
      VALUES (gen_random_uuid(), v_streak_id, 'progress', NOW(), 
             CASE WHEN v_status = 'broken' OR v_status IS NULL THEN 1 ELSE v_day_counter + 1 END);

    -- B. Si ya tiene racha activa -> ACTUALIZACIÓN NORMAL
    ELSIF v_status = 'active' THEN
      -- Solo actualizar si el log es de una fecha nueva (evitar duplicados en el mismo día)
      IF v_last_log_date IS NULL OR v_last_log_date < NEW.log_date THEN
        UPDATE core.streaks
        SET day_counter = day_counter + 1,
            last_log_date = NEW.log_date,
            updated_at = NOW()
        WHERE id = v_streak_id;

        INSERT INTO tracking.streak_events (id, streak_id, event_type, event_date, days_achieved)
        VALUES (gen_random_uuid(), v_streak_id, 'progress', NOW(), v_day_counter + 1);
      END IF;
    END IF;

  -- 3. ESCENARIO: RECAÍDA (consumed = TRUE)
  ELSE
    -- Rompemos racha si estaba activa o pausada
    IF v_streak_id IS NOT NULL AND v_status IN ('active', 'paused') THEN
      UPDATE core.streaks
      SET status = 'broken', updated_at = NOW()
      WHERE id = v_streak_id;

      INSERT INTO tracking.streak_events (id, streak_id, event_type, event_date, days_achieved)
      VALUES (gen_random_uuid(), v_streak_id, 'relapse', NOW(), v_day_counter);
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_update_streak ON tracking.daily_logs;
CREATE TRIGGER trg_update_streak
AFTER INSERT OR UPDATE ON tracking.daily_logs
FOR EACH ROW EXECUTE FUNCTION core.fn_update_streak();
