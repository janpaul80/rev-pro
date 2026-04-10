# Supabase Database Migrations

## Overview

This directory contains SQL migration scripts for the Rev Pro platform. These migrations create the core database tables needed for user management, subscription tracking, and transcription history.

## Tables Created

| Table | Purpose |
|-------|---------|
| `user_preferences` | Stores per-user settings (JSONB) |
| `api_keys` | Generated API keys for programmatic access |
| `plan_tracking` | Subscription plan status (synced with Stripe) |
| `transcriptions` | All transcription results and history |

## Prerequisites

- **Supabase Project**: Active project at [supabase.com](https://supabase.com)
- **Required Role**: `postgres` (superuser) or `service_role` for migration execution
- **Extensions**: `uuid-ossp` and `pgcrypto` (enabled automatically by the migration)

## Running Migrations

### Option 1: Supabase Dashboard (Recommended for Dev/Staging)

1. Go to your Supabase Dashboard → **SQL Editor**
2. Open `001_core_tables.sql`
3. Copy the full contents and paste into the SQL editor
4. Click **Run** to execute

### Option 2: Supabase CLI

```bash
# Install CLI if not already installed
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref ukabwhnbtivnnvjetlcv

# Run migration
supabase db push
```

### Option 3: psql Direct Connection

```bash
psql "postgresql://postgres:[PASSWORD]@db.ukabwhnbtivnnvjetlcv.supabase.co:5432/postgres" \
  -f supabase/migrations/001_core_tables.sql
```

## Row Level Security (RLS)

All tables have RLS enabled:

- **user_preferences**: Users can CRUD their own row only
- **api_keys**: Users can CRUD their own keys only
- **plan_tracking**: Users can SELECT only; INSERT/UPDATE restricted to `service_role` (webhook or admin)
- **transcriptions**: Users can SELECT/INSERT/UPDATE their own rows

## Auto-Provisioning

A database trigger (`on_auth_user_created`) automatically creates default records when a new user signs up:
- Default preferences (sound on, dark theme, English)
- Free plan assignment

## Environment-Specific Notes

| Environment | Migration Method | Notes |
|-------------|-----------------|-------|
| **Development** | SQL Editor or CLI | Run freely, reset with `supabase db reset` |
| **Staging** | CLI with `supabase db push` | Review migration diff before applying |
| **Production** | CLI or psql with review | Always backup first, apply during maintenance window |

## Rollback

To undo this migration (destructive — drops all data):

```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.transcriptions;
DROP TABLE IF EXISTS public.plan_tracking;
DROP TABLE IF EXISTS public.api_keys;
DROP TABLE IF EXISTS public.user_preferences;
DROP TYPE IF EXISTS public.plan_status;
DROP TYPE IF EXISTS public.plan_tier;
DROP FUNCTION IF EXISTS public.update_updated_at_column();
```
