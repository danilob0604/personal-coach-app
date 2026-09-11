-- ==============================================================================
-- SCHEMA DATABASE SUPABASE PER PERSONAL COACH APP
-- Incolla questo script nel SQL Editor di Supabase e premi "RUN"
-- ==============================================================================

-- Abilita estensione UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELLA ATLETI (CRM & ANAGRAFICA)
CREATE TABLE IF NOT EXISTS public.athletes (
    id TEXT PRIMARY KEY DEFAULT ('ath-' || extract(epoch from now())::bigint),
    name TEXT NOT NULL,
    email TEXT,
    avatar TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    current_workout_plan TEXT,
    weight_kg NUMERIC(5,2),
    body_fat_percent NUMERIC(4,1),
    goals TEXT,
    athletic_level INT DEFAULT 1,
    current_xp INT DEFAULT 0,
    next_level_xp INT DEFAULT 1000,
    joined_date TEXT DEFAULT 'Oggi',
    compliance_rate INT DEFAULT 100,
    last_workout_days_ago INT DEFAULT 0,
    default_rest_seconds INT DEFAULT 90,
    assigned_routine JSONB,
    body_composition_history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELLA SCHEDE MASTER / MODELLI WORKOUT
CREATE TABLE IF NOT EXISTS public.workout_routines (
    id TEXT PRIMARY KEY DEFAULT ('routine-' || extract(epoch from now())::bigint),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    target_gender TEXT DEFAULT 'unisex',
    target_goal TEXT,
    difficulty_level TEXT DEFAULT 'Intermedio',
    estimated_minutes INT DEFAULT 50,
    weekly_frequency INT DEFAULT 3,
    splits JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELLA SESSIONI DI ALLENAMENTO SVOLTE (LOGS & STORICO)
CREATE TABLE IF NOT EXISTS public.workout_logs (
    id TEXT PRIMARY KEY DEFAULT ('log-' || extract(epoch from now())::bigint),
    athlete_id TEXT REFERENCES public.athletes(id) ON DELETE CASCADE,
    athlete_name TEXT,
    routine_id TEXT,
    routine_title TEXT,
    split_index INT DEFAULT 0,
    split_name TEXT,
    total_volume_kg NUMERIC(10,2) DEFAULT 0,
    exercises_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABELLA CONTROLLI BIA / CHECK-IN CORPOREI
CREATE TABLE IF NOT EXISTS public.bia_records (
    id TEXT PRIMARY KEY DEFAULT ('bia-' || extract(epoch from now())::bigint),
    athlete_id TEXT REFERENCES public.athletes(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    weight_kg NUMERIC(5,2) NOT NULL,
    fat_mass_percent NUMERIC(4,1) NOT NULL,
    muscle_mass_kg NUMERIC(5,2) NOT NULL,
    total_body_water_percent NUMERIC(4,1) NOT NULL,
    waist_circumference_cm NUMERIC(5,1),
    source TEXT DEFAULT 'athlete_self_check',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABELLA MESSAGGI CHAT
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY DEFAULT ('msg-' || extract(epoch from now())::bigint),
    athlete_id TEXT REFERENCES public.athletes(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('athlete', 'trainer')),
    sender_name TEXT NOT NULL,
    text TEXT NOT NULL,
    video_attachment JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABELLA FEED ATTIVITA IN TEMPO REALE
CREATE TABLE IF NOT EXISTS public.live_feed (
    id TEXT PRIMARY KEY DEFAULT ('feed-' || extract(epoch from now())::bigint),
    athlete_id TEXT,
    athlete_name TEXT,
    athlete_avatar TEXT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    detail TEXT,
    metric TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ABILITA ROW LEVEL SECURITY (RLS) & REGOLE APERTE PER ANON KEY
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bia_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_feed ENABLE ROW LEVEL SECURITY;

-- Crea policy di lettura/scrittura pubblica anonima (ideale per client-side diretto)
CREATE POLICY "Public read/write access for athletes" ON public.athletes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for workout_routines" ON public.workout_routines FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for workout_logs" ON public.workout_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for bia_records" ON public.bia_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for chat_messages" ON public.chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for live_feed" ON public.live_feed FOR ALL USING (true) WITH CHECK (true);

-- ABILITA SUPABASE REALTIME SULLE TABELLE CRITICHE
ALTER PUBLICATION supabase_realtime ADD TABLE public.workout_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_feed;
ALTER PUBLICATION supabase_realtime ADD TABLE public.athletes;
