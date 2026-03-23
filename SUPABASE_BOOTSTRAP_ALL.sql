-- One-click bootstrap for fresh environments.
-- This script is intended for psql/Supabase CLI execution.
-- It runs all migrations and optional UAT seed in strict order.
--
-- Usage examples:
--   psql "$SUPABASE_DB_URL" -f SUPABASE_BOOTSTRAP_ALL.sql
--   supabase db push --db-url "$SUPABASE_DB_URL"   (if mapped in a migrations flow)

\echo 'Applying SUPABASE_MIGRATION_001.sql'
\i SUPABASE_MIGRATION_001.sql

\echo 'Applying SUPABASE_MIGRATION_002.sql'
\i SUPABASE_MIGRATION_002.sql

\echo 'Applying SUPABASE_MIGRATION_003.sql'
\i SUPABASE_MIGRATION_003.sql

\echo 'Applying SUPABASE_SEED_DEMO.sql'
\i SUPABASE_SEED_DEMO.sql

\echo 'Bootstrap complete.'
