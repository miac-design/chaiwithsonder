-- Sonder Match: AI-Powered Mentor Matching Tables
-- Migration 005: match_intake + match_results

-- Stores the mentee's matching intake responses
CREATE TABLE IF NOT EXISTS match_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  desired_flavor TEXT NOT NULL,
  career_stage TEXT NOT NULL,
  preferred_vibe TEXT NOT NULL,
  additional_context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Caches computed match results (avoids recomputing on every page load)
CREATE TABLE IF NOT EXISTS match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  total_score FLOAT NOT NULL,
  expertise_score FLOAT,
  stage_score FLOAT,
  engagement_score FLOAT,
  style_score FLOAT,
  story_score FLOAT,
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mentee_id, mentor_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_match_results_mentee ON match_results(mentee_id, total_score DESC);

-- RLS policies
ALTER TABLE match_intake ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own intake
CREATE POLICY "Users can view own intake" ON match_intake
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own intake" ON match_intake
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own intake" ON match_intake
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can read their own match results
CREATE POLICY "Users can view own match results" ON match_results
  FOR SELECT USING (auth.uid() = mentee_id);

-- Allow service role to insert/update match results (API route uses service role)
CREATE POLICY "Service can manage match results" ON match_results
  FOR ALL USING (true);

-- Updated_at trigger for match_intake
CREATE TRIGGER update_match_intake_updated_at
  BEFORE UPDATE ON match_intake
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
