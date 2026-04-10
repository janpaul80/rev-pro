-- ============================================================
-- Rev Pro — Supabase Migration: Core Tables
-- Version: 001
-- Date: 2026-04-10
-- Description: Creates user_preferences, api_keys, and 
--              plan_tracking tables with RLS policies.
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. USER PREFERENCES
-- Stores per-user settings as flexible JSONB
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{
    "sound_notifications": true,
    "auto_copy": false,
    "default_language": "en",
    "dashboard_view": "grid",
    "theme": "dark"
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_preferences_user_id_unique UNIQUE (user_id)
);

-- Index for fast user lookup
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id 
  ON public.user_preferences(user_id);

-- Auto-update updated_at on modification
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: Users can only read/write their own preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);


-- ============================================================
-- 2. API KEYS
-- Stores generated API keys for programmatic access
-- ============================================================
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_name VARCHAR(100) NOT NULL DEFAULT 'Default Key',
  key_prefix VARCHAR(8) NOT NULL,           -- visible "rev_xxxx" prefix
  key_hash TEXT NOT NULL,                     -- bcrypt hash of the full key
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT api_keys_key_hash_unique UNIQUE (key_hash)
);

-- Index for user lookup and active key filtering
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id 
  ON public.api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_active 
  ON public.api_keys(user_id, is_active) WHERE is_active = true;

-- RLS: Users can only manage their own API keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own api_keys"
  ON public.api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own api_keys"
  ON public.api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own api_keys"
  ON public.api_keys FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own api_keys"
  ON public.api_keys FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================================
-- 3. PLAN TRACKING
-- Tracks user subscription plans (synced with Stripe)
-- ============================================================
CREATE TYPE public.plan_tier AS ENUM ('free', 'basic', 'pro');
CREATE TYPE public.plan_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'expired');

CREATE TABLE IF NOT EXISTS public.plan_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_tier public.plan_tier NOT NULL DEFAULT 'free',
  status public.plan_status NOT NULL DEFAULT 'active',
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT plan_tracking_user_id_unique UNIQUE (user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_plan_tracking_user_id 
  ON public.plan_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_plan_tracking_stripe_sub 
  ON public.plan_tracking(stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_plan_tracking_status 
  ON public.plan_tracking(status);

-- Auto-update updated_at
CREATE TRIGGER trigger_plan_tracking_updated_at
  BEFORE UPDATE ON public.plan_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.plan_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plan"
  ON public.plan_tracking FOR SELECT
  USING (auth.uid() = user_id);

-- Only service_role can insert/update plans (via webhook or admin)
CREATE POLICY "Service role can manage plans"
  ON public.plan_tracking FOR ALL
  USING (auth.role() = 'service_role');


-- ============================================================
-- 4. TRANSCRIPTION HISTORY
-- Stores all transcription results for the user
-- ============================================================
CREATE TABLE IF NOT EXISTS public.transcriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  platform VARCHAR(50),                       -- 'tiktok', 'youtube', 'instagram'
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  transcript TEXT,
  refined TEXT,
  language VARCHAR(10) DEFAULT 'en',
  processing_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transcriptions_user_id 
  ON public.transcriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_transcriptions_status 
  ON public.transcriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_transcriptions_created 
  ON public.transcriptions(user_id, created_at DESC);

CREATE TRIGGER trigger_transcriptions_updated_at
  BEFORE UPDATE ON public.transcriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.transcriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transcriptions"
  ON public.transcriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transcriptions"
  ON public.transcriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transcriptions"
  ON public.transcriptions FOR UPDATE
  USING (auth.uid() = user_id);


-- ============================================================
-- 5. AUTO-PROVISION: Create default records on new user signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create default preferences
  INSERT INTO public.user_preferences (user_id) VALUES (NEW.id);
  -- Create free plan record
  INSERT INTO public.plan_tracking (user_id, plan_tier, status) VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
