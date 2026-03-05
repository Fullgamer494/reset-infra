-- Activar extensión
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Crear schemas de ReSet
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS tracking;
CREATE SCHEMA IF NOT EXISTS emergency;

-- Crear tablas del benchmarking
CREATE TABLE IF NOT EXISTS projects (
  project_id SERIAL PRIMARY KEY,
  project_type VARCHAR(20) NOT NULL CHECK (
    project_type IN ('ECOMMERCE','SOCIAL','FINANCIAL','HEALTHCARE',
                     'IOT','EDUCATION','CONTENT','ENTERPRISE','LOGISTICS','GOVERNMENT')
  ),
  description TEXT,
  db_engine VARCHAR(20) NOT NULL CHECK (
    db_engine IN ('POSTGRESQL','MYSQL','MONGODB','OTHER')
  )
);

CREATE TABLE IF NOT EXISTS queries (
  query_id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(project_id),
  query_description TEXT NOT NULL,
  query_sql TEXT NOT NULL,
  target_table VARCHAR(100),
  query_type VARCHAR(30) CHECK (
    query_type IN ('SIMPLE_SELECT','AGGREGATION','JOIN',
                   'WINDOW_FUNCTION','SUBQUERY','WRITE_OPERATION')
  )
);

CREATE TABLE IF NOT EXISTS executions (
  execution_id BIGSERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(project_id),
  query_id INT REFERENCES queries(query_id),
  index_strategy VARCHAR(20) CHECK (
    index_strategy IN ('NO_INDEX','SINGLE_INDEX','COMPOSITE_INDEX')
  ),
  execution_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  execution_time_ms BIGINT,
  records_examined BIGINT,
  records_returned BIGINT,
  dataset_size_rows BIGINT,
  dataset_size_mb NUMERIC,
  concurrent_sessions INT,
  shared_buffers_hits BIGINT,
  shared_buffers_reads BIGINT
);

-- Ajustar secuencia para que project_id arranque en 3
ALTER SEQUENCE projects_project_id_seq RESTART WITH 3;

-- Registrar proyecto ReSet con project_id = 3
INSERT INTO projects (project_type, description, db_engine)
VALUES (
  'HEALTHCARE',
  'ReSet: Plataforma de monitoreo emocional para prevención de recaídas en adicciones',
  'POSTGRESQL'
);

-- Crear vista de exportación diaria
CREATE OR REPLACE VIEW v_daily_export AS
SELECT
  3                        AS project_id,
  CURRENT_DATE             AS snapshot_date,
  pss.queryid::TEXT        AS queryid,
  pss.dbid,
  pss.userid,
  pss.query,
  pss.calls,
  pss.total_exec_time      AS total_exec_time_ms,
  pss.mean_exec_time       AS mean_exec_time_ms,
  pss.min_exec_time        AS min_exec_time_ms,
  pss.max_exec_time        AS max_exec_time_ms,
  pss.stddev_exec_time     AS stddev_exec_time_ms,
  pss.rows                 AS rows_returned,
  pss.shared_blks_hit,
  pss.shared_blks_read,
  pss.shared_blks_dirtied,
  pss.shared_blks_written,
  pss.temp_blks_read,
  pss.temp_blks_written
FROM pg_stat_statements pss
INNER JOIN queries q 
  -- Normalización agresiva:
  -- 1. Convertir a minúsculas
  -- 2. Eliminar todo el whitespace (espacios, saltos de línea, tabs)
  -- 3. Eliminar comillas simples y dobles
  -- 4. Eliminar parámetros formales ($1, $2...)
  -- 5. Eliminar el casting a ::uuid
  -- 6. Eliminar el punto y coma final
  ON REGEXP_REPLACE(
       REGEXP_REPLACE(
         REGEXP_REPLACE(
           REGEXP_REPLACE(LOWER(pss.query), '\s+|(::uuid)|["'']|;', '', 'g'),
           '\$\d+', '', 'g'
         ),
         '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', '', 'g' -- Quitar UUIDs literales si los hay
       ),
       '\d{4}-\d{2}-\d{2}', '', 'g' -- Quitar fechas literales si las hay
     ) = 
     REGEXP_REPLACE(
       REGEXP_REPLACE(
         REGEXP_REPLACE(
           REGEXP_REPLACE(LOWER(q.query_sql), '\s+|(::uuid)|["'']|;', '', 'g'),
           '\$\d+', '', 'g'
         ),
         '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', '', 'g'
       ),
       '\d{4}-\d{2}-\d{2}', '', 'g'
     )
WHERE pss.calls > 0;