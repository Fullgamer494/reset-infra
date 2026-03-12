-- ==========================================
-- UDFS y Triggers
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
  -- 1. Intentar obtener el registro de racha del usuario (activa o rota)
  SELECT id, day_counter, last_log_date, status 
  INTO v_streak_id, v_day_counter, v_last_log_date, v_status
  FROM core.streaks
  WHERE user_id = NEW.user_id
  LIMIT 1;

  -- 2. ESCENARIO: LOG LIMPIO (consumed = FALSE)
  IF NEW.consumed = FALSE THEN
    -- A. Si NO tiene racha o la actual está rota -> CREACIÓN/REINICIO
    IF v_streak_id IS NULL OR v_status = 'broken' THEN
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
        -- Reiniciar racha existente que estaba rota
        UPDATE core.streaks
        SET status = 'active', 
            started_at = NEW.log_date, 
            day_counter = 1, 
            last_log_date = NEW.log_date,
            updated_at = NOW()
        WHERE id = v_streak_id;
      END IF;

      -- Registrar evento de progreso inicial
      INSERT INTO tracking.streak_events (id, streak_id, event_type, event_date, days_achieved)
      VALUES (gen_random_uuid(), v_streak_id, 'progress', NOW(), 1);

    -- B. Si ya tiene racha activa -> ACTUALIZACIÓN NORMAL
    ELSIF v_status = 'active' THEN
      -- Solo actualizar si el log es de una fecha nueva
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
    -- Solo si tenía una racha activa, la rompemos
    IF v_streak_id IS NOT NULL AND v_status = 'active' THEN
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
ON tracking.log_absences (streak_id, (detected_at::date));

CREATE UNIQUE INDEX IF NOT EXISTS single_active_sponsorship_per_addict
ON core.sponsorships (addict_id) WHERE status = 'ACTIVE';

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

-- WF-02 Agregaciónn con marco de ventana: Promedio móvil craving 7 días
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

-- ==========================================
-- AUTH
-- ==========================================
(3, 'Registrar nuevo usuario',
'INSERT INTO auth.users (id, name, email, password_hash, role, created_at, updated_at) VALUES ($1, $2, $3, $4, ''user'', NOW(), NOW());',
'auth.users', 'WRITE_OPERATION'),

(3, 'Buscar usuario por email (login)',
'SELECT id, name, email, password_hash, role, created_at, updated_at FROM auth.users WHERE email = $1 LIMIT 1;',
'auth.users', 'SIMPLE_SELECT'),

(3, 'Buscar usuario por ID (JWT guard / perfil)',
'SELECT id, name, email, password_hash, role, created_at, updated_at FROM auth.users WHERE id = $1 LIMIT 1;',
'auth.users', 'SIMPLE_SELECT'),

-- ==========================================
-- TRACKING — Daily Logs
-- ==========================================
(3, 'Registrar daily log del usuario',
'INSERT INTO tracking.daily_logs (id, user_id, log_date, craving_level_id, emotional_state_id, consumed, triggers, notes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW());',
'tracking.daily_logs', 'WRITE_OPERATION'),

(3, 'Listar historial de logs de un usuario con niveles y emociones',
'SELECT dl.id, dl.user_id, dl.log_date, dl.consumed, dl.triggers, dl.notes, cl.level AS craving_level, cl.label AS craving_label, es.level AS emotional_level, es.label AS emotional_label, dl.created_at FROM tracking.daily_logs dl LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id WHERE dl.user_id = $1 ORDER BY dl.log_date DESC;',
'tracking.daily_logs', 'JOIN'),

(3, 'Obtener último log del usuario autenticado (WF-01)',
'SELECT * FROM tracking.v_user_latest_log WHERE user_id = $1;',
'tracking.v_user_latest_log', 'WINDOW_FUNCTION'),

(3, 'Obtener promedio móvil de craving y emoción 7 días (WF-02)',
'SELECT * FROM tracking.v_user_craving_moving_avg WHERE user_id = $1;',
'tracking.v_user_craving_moving_avg', 'WINDOW_FUNCTION'),

(3, 'Obtener estadísticas consolidadas del usuario via UDF',
'SELECT * FROM core.fn_get_user_stats($1::uuid);',
'core.streaks', 'SUBQUERY'),

-- ==========================================
-- STREAK
-- ==========================================
(3, 'Obtener racha activa del usuario',
'SELECT * FROM core.streaks WHERE user_id = $1 AND status = ''active'' LIMIT 1;',
'core.streaks', 'SIMPLE_SELECT'),

(3, 'Crear racha inicial para un usuario',
'INSERT INTO core.streaks (id, user_id, user_addiction_id, status, day_counter, last_log_date, created_at, updated_at) VALUES ($1, $2, $3, ''active'', 0, NULL, NOW(), NOW());',
'core.streaks', 'WRITE_OPERATION'),

(3, 'Obtener ranking de mejores rachas del usuario (WF-03)',
'SELECT * FROM tracking.v_user_best_streaks WHERE user_id = $1;',
'tracking.v_user_best_streaks', 'WINDOW_FUNCTION'),

(3, 'Detectar ausencias de logs diarios — Cron Job',
'SELECT tracking.fn_detect_absence();',
'tracking.log_absences', 'WRITE_OPERATION'),

(3, 'Actualizar racha al insertar daily log — Trigger/UDF',
'SELECT core.fn_update_streak();',
'core.streaks', 'WRITE_OPERATION'),

-- ==========================================
-- EMERGENCY
-- ==========================================
(3, 'Registrar contacto de emergencia',
'INSERT INTO emergency.support_contacts (id, user_id, name, relationship, phone_number, email, priority_level, is_active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW(), NOW());',
'emergency.support_contacts', 'WRITE_OPERATION'),

(3, 'Listar contactos de emergencia activos de un usuario',
'SELECT id, user_id, name, relationship, phone_number, email, priority_level, is_active, created_at FROM emergency.support_contacts WHERE user_id = $1 AND is_active = TRUE ORDER BY priority_level ASC, created_at ASC;',
'emergency.support_contacts', 'SIMPLE_SELECT'),

(3, 'Actualizar contacto de emergencia',
'UPDATE emergency.support_contacts SET name = COALESCE($2, name), relationship = COALESCE($3, relationship), phone_number = COALESCE($4, phone_number), email = COALESCE($5, email), priority_level = COALESCE($6, priority_level), is_active = COALESCE($7, is_active), updated_at = NOW() WHERE id = $1;',
'emergency.support_contacts', 'WRITE_OPERATION'),

(3, 'Disparar alerta de emergencia — Botón de pánico (UDF)',
'SELECT emergency.fn_trigger_alert($1::uuid) AS alert_id;',
'emergency.emergency_alerts', 'WRITE_OPERATION'),

(3, 'Obtener contactos activos tras alerta para envío de notificaciones',
'SELECT id, user_id, name, email, phone_number, priority_level FROM emergency.support_contacts WHERE user_id = $1 AND is_active = TRUE ORDER BY priority_level ASC;',
'emergency.support_contacts', 'SIMPLE_SELECT'),

-- ==========================================
-- SPONSORSHIP
-- ==========================================
(3, 'Terminar patrocinio activo via UDF',
'SELECT core.fn_close_sponsorship($1::uuid, $2) AS success;',
'core.sponsorships', 'WRITE_OPERATION'),

-- ==========================================
-- ADMIN METRICS
-- ==========================================
(3, 'Totales globales del sistema (overview)',
'SELECT (SELECT COUNT(*) FROM auth.users) AS total_users, (SELECT COUNT(*) FROM tracking.daily_logs) AS total_logs, (SELECT COUNT(*) FROM core.streaks WHERE status = ''active'') AS active_streaks, (SELECT COUNT(*) FROM core.streaks WHERE status = ''broken'') AS broken_streaks;',
'auth.users', 'AGGREGATION'),

(3, 'Frecuencia diaria de logs con consumo y usuarios únicos',
'SELECT dl.log_date, COUNT(*) AS total_logs, COUNT(DISTINCT dl.user_id) AS unique_users, SUM(CASE WHEN dl.consumed = TRUE THEN 1 ELSE 0 END) AS consumed_count, SUM(CASE WHEN dl.consumed = FALSE THEN 1 ELSE 0 END) AS clean_count FROM tracking.daily_logs dl WHERE dl.log_date BETWEEN $1 AND $2 GROUP BY dl.log_date ORDER BY dl.log_date ASC;',
'tracking.daily_logs', 'AGGREGATION'),

(3, 'Engagement del foro por día (posts, comentarios, reacciones, usuarios únicos)',
'SELECT DATE(p.created_at) AS day, COUNT(DISTINCT p._id) AS posts, COUNT(DISTINCT c._id) AS comments, COUNT(DISTINCT r._id) AS reactions, COUNT(DISTINCT p.author_id) AS unique_users FROM posts p LEFT JOIN comments c ON c.post_id = p._id LEFT JOIN reactions r ON r.target_id = p._id WHERE p.created_at BETWEEN $1 AND $2 GROUP BY DATE(p.created_at) ORDER BY day ASC;',
'posts', 'AGGREGATION'),

(3, 'Correlación foro vs no-foro: avg logs, craving, emoción, racha, tasa de recaída',
'SELECT uses_forum, ROUND(AVG(log_count), 2) AS avg_logs, ROUND(AVG(avg_craving), 2) AS avg_craving, ROUND(AVG(avg_emotion), 2) AS avg_emotion, ROUND(AVG(day_counter), 2) AS avg_streak_days, ROUND(AVG(relapse_rate), 4) AS avg_relapse_rate FROM (SELECT u.id, EXISTS(SELECT 1 FROM posts p WHERE p.author_id = u.id::text) AS uses_forum, COUNT(dl.id) AS log_count, AVG(cl.level) AS avg_craving, AVG(es.level) AS avg_emotion, COALESCE(s.day_counter, 0) AS day_counter, COALESCE((SELECT COUNT(*) FROM tracking.streak_events se WHERE se.streak_id = s.id AND se.event_type = ''relapse''), 0)::NUMERIC / NULLIF(s.day_counter, 0) AS relapse_rate FROM auth.users u LEFT JOIN tracking.daily_logs dl ON dl.user_id = u.id AND dl.log_date BETWEEN $1 AND $2 LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id LEFT JOIN core.streaks s ON s.user_id = u.id AND s.status = ''active'' GROUP BY u.id, s.id, s.day_counter) sub GROUP BY uses_forum;',
'auth.users', 'SUBQUERY'),

(3, 'Métricas de logs segmentadas por tipo de adicción',
'SELECT ua.classification, ua.custom_name AS addiction_name, COUNT(dl.id) AS total_logs, ROUND(AVG(cl.level), 2) AS avg_craving, ROUND(AVG(es.level), 2) AS avg_emotion, SUM(CASE WHEN dl.consumed = TRUE THEN 1 ELSE 0 END) AS relapses FROM core.user_addictions ua LEFT JOIN core.streaks s ON s.user_addiction_id = ua.id LEFT JOIN tracking.daily_logs dl ON dl.user_id = ua.user_id AND dl.log_date BETWEEN $1 AND $2 LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id GROUP BY ua.classification, ua.custom_name ORDER BY ua.classification, total_logs DESC;',
'core.user_addictions', 'AGGREGATION'),

(3, 'Evolución temporal de promedios de craving y emoción por semana',
'SELECT DATE_TRUNC(''week'', dl.log_date) AS week, ROUND(AVG(cl.level), 2) AS avg_craving, ROUND(AVG(es.level), 2) AS avg_emotion, COUNT(*) AS total_logs FROM tracking.daily_logs dl LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id WHERE dl.log_date BETWEEN $1 AND $2 GROUP BY DATE_TRUNC(''week'', dl.log_date) ORDER BY week ASC;',
'tracking.daily_logs', 'AGGREGATION'),

(3, 'Resumen de rachas: activas, rotas, promedio días, tasa de recaída',
'SELECT s.status, COUNT(*) AS total, ROUND(AVG(s.day_counter), 2) AS avg_days, SUM(CASE WHEN s.day_counter BETWEEN 0 AND 7 THEN 1 ELSE 0 END) AS range_0_7, SUM(CASE WHEN s.day_counter BETWEEN 8 AND 14 THEN 1 ELSE 0 END) AS range_8_14, SUM(CASE WHEN s.day_counter BETWEEN 15 AND 30 THEN 1 ELSE 0 END) AS range_15_30, SUM(CASE WHEN s.day_counter > 30 THEN 1 ELSE 0 END) AS range_31_plus FROM core.streaks s GROUP BY s.status;',
'core.streaks', 'AGGREGATION'),

(3, 'Reportes del foro agrupados por razón, estado y tipo de target',
'SELECT reason, status, target_type, COUNT(*) AS total FROM reports WHERE created_at BETWEEN $1 AND $2 GROUP BY reason, status, target_type ORDER BY total DESC;',
'reports', 'AGGREGATION');