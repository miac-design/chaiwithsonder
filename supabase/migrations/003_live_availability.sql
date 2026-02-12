-- ====================
-- LIVE AVAILABILITY SCHEMA
-- Phase 2.5: Spontaneous "I'm Available Now" Feature
-- ====================

-- Live availability table (who's available right now)
CREATE TABLE IF NOT EXISTS live_availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    is_available BOOLEAN DEFAULT FALSE,
    available_since TIMESTAMPTZ,
    available_until TIMESTAMPTZ,
    status_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_live_available ON live_availability(is_available) WHERE is_available = true;
CREATE INDEX IF NOT EXISTS idx_live_until ON live_availability(available_until);

-- Enable Row Level Security
ALTER TABLE live_availability ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view availability"
    ON live_availability FOR SELECT
    USING (true);

CREATE POLICY "Users can manage their own availability"
    ON live_availability FOR ALL
    USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE live_availability;

-- Function to auto-expire availability
CREATE OR REPLACE FUNCTION expire_old_availability()
RETURNS void AS $$
BEGIN
    UPDATE live_availability
    SET is_available = FALSE
    WHERE is_available = TRUE
    AND available_until < NOW();
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to clean up expired availability
-- Run this every 5 minutes via Supabase Edge Functions or external cron
-- SELECT expire_old_availability();
