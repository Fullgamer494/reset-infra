INSERT INTO core.craving_levels (id, level, label, description, recommendation) 
VALUES 
    ('00000000-0000-0000-0000-000000000003', 8, 'Alto', 'Fuerte deseo de consumir', 'Busca apoyo de tu padrino o un contacto de emergencia')
ON CONFLICT (level) DO NOTHING;

INSERT INTO core.emotional_states (id, level, label, description, category) 
VALUES 
    ('00000000-0000-0000-0000-000000000004', 3, 'Triste/Sensible', 'Me siento vulnerable hoy', 'Negativa')
ON CONFLICT (level) DO NOTHING;

INSERT INTO auth.users (id, name, email, password_hash, role, created_at, updated_at) VALUES ('00000000-0000-0000-0000-000000000001', 'Test', 'test1@test.com', 'hash', 'ADICTO', NOW(), NOW());

INSERT INTO core.user_addictions (id, user_id, custom_name, classification, is_active, registered_at, created_at) 
VALUES 
    ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Alcohol', 'Sustancia', true, NOW(), NOW());

SELECT id, name, email, password_hash, role, created_at, updated_at FROM auth.users WHERE email = 'test1@test.com' LIMIT 1;
SELECT id, name, email, password_hash, role, created_at, updated_at FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001' LIMIT 1;
INSERT INTO tracking.daily_logs (id, user_id, log_date, craving_level_id, emotional_state_id, consumed, triggers, notes, created_at) VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '2023-01-01', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', false, 'trigger', 'note', NOW());
SELECT dl.id, dl.user_id, dl.log_date, dl.consumed, dl.triggers, dl.notes, cl.level AS craving_level, cl.label AS craving_label, es.level AS emotional_level, es.label AS emotional_label, dl.created_at FROM tracking.daily_logs dl LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id WHERE dl.user_id = '00000000-0000-0000-0000-000000000001' ORDER BY dl.log_date DESC;
SELECT * FROM tracking.v_user_latest_log WHERE user_id = '00000000-0000-0000-0000-000000000001';
SELECT * FROM tracking.v_user_craving_moving_avg WHERE user_id = '00000000-0000-0000-0000-000000000001';
SELECT * FROM core.fn_get_user_stats('00000000-0000-0000-0000-000000000001'::uuid);
SELECT * FROM core.streaks WHERE user_id = '00000000-0000-0000-0000-000000000001' AND status = 'active' LIMIT 1;
INSERT INTO core.streaks (id, user_id, user_addiction_id, status, started_at, day_counter, last_log_date, updated_at) VALUES ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000006', 'active', NOW(), 0, NULL, NOW());
SELECT * FROM tracking.v_user_best_streaks WHERE user_id = '00000000-0000-0000-0000-000000000001';

INSERT INTO emergency.support_contacts (id, user_id, contact_name, relationship, phone, email, priority_order, is_active, created_at, updated_at) VALUES ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Name', 'Rel', '123', 'a@a.com', 1, TRUE, NOW(), NOW());
SELECT id, user_id, contact_name, relationship, phone, email, priority_order, is_active, created_at FROM emergency.support_contacts WHERE user_id = '00000000-0000-0000-0000-000000000001' AND is_active = TRUE ORDER BY priority_order ASC, created_at ASC;
UPDATE emergency.support_contacts SET contact_name = COALESCE('Name2', contact_name), relationship = COALESCE('Rel2', relationship), phone = COALESCE('124', phone), email = COALESCE('b@b.com', email), priority_order = COALESCE(2, priority_order), is_active = COALESCE(TRUE, is_active), updated_at = NOW() WHERE id = '00000000-0000-0000-0000-000000000007';
SELECT * FROM emergency.support_contacts WHERE id = '00000000-0000-0000-0000-000000000007';
SELECT id, user_id, contact_name, email, phone, priority_order FROM emergency.support_contacts WHERE user_id = '00000000-0000-0000-0000-000000000001' AND is_active = TRUE ORDER BY priority_order ASC;
SELECT core.fn_close_sponsorship('00000000-0000-0000-0000-000000000001'::uuid, 'reason') AS success;
SELECT (SELECT COUNT(*) FROM auth.users) AS total_users, (SELECT COUNT(*) FROM tracking.daily_logs) AS total_logs, (SELECT COUNT(*) FROM core.streaks WHERE status = 'active') AS active_streaks, (SELECT COUNT(*) FROM core.streaks WHERE status = 'broken') AS broken_streaks;
SELECT dl.log_date, COUNT(*) AS total_logs, COUNT(DISTINCT dl.user_id) AS unique_users, SUM(CASE WHEN dl.consumed = TRUE THEN 1 ELSE 0 END) AS consumed_count, SUM(CASE WHEN dl.consumed = FALSE THEN 1 ELSE 0 END) AS clean_count FROM tracking.daily_logs dl WHERE dl.log_date BETWEEN '2023-01-01' AND '2023-01-31' GROUP BY dl.log_date ORDER BY dl.log_date ASC;
SELECT s.status, COUNT(*) AS total, ROUND(AVG(s.day_counter), 2) AS avg_days, SUM(CASE WHEN s.day_counter BETWEEN 0 AND 7 THEN 1 ELSE 0 END) AS range_0_7, SUM(CASE WHEN s.day_counter BETWEEN 8 AND 14 THEN 1 ELSE 0 END) AS range_8_14, SUM(CASE WHEN s.day_counter BETWEEN 15 AND 30 THEN 1 ELSE 0 END) AS range_15_30, SUM(CASE WHEN s.day_counter > 30 THEN 1 ELSE 0 END) AS range_31_plus FROM core.streaks s GROUP BY s.status;

INSERT INTO auth.users (id, name, email, password_hash, role, created_at, updated_at) VALUES ('00000000-0000-0000-0000-000000000008', 'Test8', 'test8@test.com', 'hash', 'ADICTO', NOW(), NOW());
INSERT INTO core.user_addictions (id, user_id, custom_name, classification, is_active, registered_at, created_at) VALUES ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000008', 'Alcohol', 'Sustancia', true, NOW(), NOW());
SELECT id, name, email, password_hash, role, created_at, updated_at FROM auth.users WHERE email = 'test8@test.com' LIMIT 1;
SELECT id, name, email, password_hash, role, created_at, updated_at FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000008' LIMIT 1;
INSERT INTO tracking.daily_logs (id, user_id, log_date, craving_level_id, emotional_state_id, consumed, triggers, notes, created_at) VALUES ('00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000008', '2023-01-01', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', false, 'trigger', 'note', NOW());
SELECT dl.id, dl.user_id, dl.log_date, dl.consumed, dl.triggers, dl.notes, cl.level AS craving_level, cl.label AS craving_label, es.level AS emotional_level, es.label AS emotional_label, dl.created_at FROM tracking.daily_logs dl LEFT JOIN core.craving_levels cl ON cl.id = dl.craving_level_id LEFT JOIN core.emotional_states es ON es.id = dl.emotional_state_id WHERE dl.user_id = '00000000-0000-0000-0000-000000000008' ORDER BY dl.log_date DESC;
SELECT * FROM tracking.v_user_latest_log WHERE user_id = '00000000-0000-0000-0000-000000000008';
SELECT * FROM tracking.v_user_craving_moving_avg WHERE user_id = '00000000-0000-0000-0000-000000000008';
SELECT * FROM core.fn_get_user_stats('00000000-0000-0000-0000-000000000008'::uuid);
