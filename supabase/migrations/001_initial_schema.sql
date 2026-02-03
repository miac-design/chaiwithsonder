-- ChaiChat Database Schema
-- Powered by the Sonder Engine for Story-Based Mentorship Matching
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- ENUMS
-- ===========================================

CREATE TYPE user_role AS ENUM ('mentee', 'mentor', 'both');
CREATE TYPE growth_stage AS ENUM ('explorer', 'builder', 'transformer', 'guide');
CREATE TYPE communication_style AS ENUM ('analytical', 'emotional', 'practical', 'visionary');
CREATE TYPE connection_status AS ENUM ('pending', 'accepted', 'declined', 'cancelled');
CREATE TYPE session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE session_type AS ENUM ('video', 'audio', 'chat');
CREATE TYPE journal_entry_type AS ENUM ('reflection', 'milestone', 'goal_update', 'insight');

-- ===========================================
-- PROFILES TABLE
-- Core user profiles with story-first design
-- ===========================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  
  -- Story-first fields (The Sonder Engine)
  story TEXT, -- The user's personal narrative
  bio TEXT,   -- Short professional bio
  
  -- Matching dimensions
  interests TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  
  -- Role and growth
  role user_role DEFAULT 'both',
  growth_stage growth_stage DEFAULT 'explorer',
  communication_style communication_style,
  
  -- Availability
  availability_hours INTEGER DEFAULT 2, -- hours per month
  timezone TEXT DEFAULT 'America/Chicago',
  
  -- Social links
  linkedin_url TEXT,
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- STORY ANALYSIS TABLE
-- AI-generated insights from user stories
-- ===========================================

CREATE TABLE story_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Extracted insights
  life_themes TEXT[] DEFAULT '{}',
  growth_stage_detected TEXT,
  communication_style_detected TEXT,
  unspoken_needs TEXT[] DEFAULT '{}',
  potential_blind_spots TEXT[] DEFAULT '{}',
  ideal_mentor_archetype TEXT,
  
  -- Vector embedding for similarity matching (1536 dimensions for OpenAI/Cohere)
  embedding_vector VECTOR(1536),
  
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- CONNECTIONS TABLE
-- Mentor-mentee connection requests
-- ===========================================

CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  status connection_status DEFAULT 'pending',
  message TEXT, -- Personal message with request
  compatibility_score DECIMAL(4,2), -- 0.00 to 1.00
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  
  -- Prevent duplicate requests
  UNIQUE(requester_id, recipient_id)
);

-- ===========================================
-- SESSIONS TABLE
-- Scheduled mentorship conversations
-- ===========================================

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID REFERENCES connections(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES profiles(id) NOT NULL,
  mentee_id UUID REFERENCES profiles(id) NOT NULL,
  
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  
  status session_status DEFAULT 'scheduled',
  session_type session_type DEFAULT 'video',
  meeting_link TEXT,
  
  -- Pre-session prep (Chai Companion outputs)
  prep_notes_mentor TEXT,
  prep_notes_mentee TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- SESSION SUMMARIES TABLE
-- AI-generated session recaps
-- ===========================================

CREATE TABLE session_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  summary_text TEXT NOT NULL,
  key_insights TEXT[] DEFAULT '{}',
  action_items TEXT[] DEFAULT '{}',
  
  follow_up_suggested BOOLEAN DEFAULT FALSE,
  sentiment_score DECIMAL(3,2), -- -1.00 to 1.00
  topics_discussed TEXT[] DEFAULT '{}',
  
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- GROWTH JOURNAL TABLE
-- Continuous narrative of user growth
-- ===========================================

CREATE TABLE growth_journal (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  entry_type journal_entry_type DEFAULT 'reflection',
  content TEXT NOT NULL,
  
  related_session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  
  is_private BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- REVIEWS TABLE
-- Post-session feedback
-- ===========================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) NOT NULL,
  reviewee_id UUID REFERENCES profiles(id) NOT NULL,
  
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  feedback TEXT,
  would_recommend BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One review per person per session
  UNIQUE(session_id, reviewer_id)
);

-- ===========================================
-- RECIPROCITY TRACKER TABLE
-- Balance of giving and receiving
-- ===========================================

CREATE TABLE reciprocity_tracker (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  sessions_as_mentor INTEGER DEFAULT 0,
  sessions_as_mentee INTEGER DEFAULT 0,
  
  last_mentored_at TIMESTAMPTZ,
  last_mentee_at TIMESTAMPTZ,
  
  reciprocity_score DECIMAL(4,2) DEFAULT 1.00, -- 1.0 = balanced
  nudge_sent_at TIMESTAMPTZ -- Last "time to share" nudge
);

-- ===========================================
-- INDEXES
-- ===========================================

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_growth_stage ON profiles(growth_stage);
CREATE INDEX idx_profiles_interests ON profiles USING GIN(interests);
CREATE INDEX idx_profiles_skills ON profiles USING GIN(skills);

CREATE INDEX idx_connections_requester ON connections(requester_id);
CREATE INDEX idx_connections_recipient ON connections(recipient_id);
CREATE INDEX idx_connections_status ON connections(status);

CREATE INDEX idx_sessions_connection ON sessions(connection_id);
CREATE INDEX idx_sessions_scheduled ON sessions(scheduled_at);
CREATE INDEX idx_sessions_status ON sessions(status);

CREATE INDEX idx_growth_journal_profile ON growth_journal(profile_id);
CREATE INDEX idx_growth_journal_created ON growth_journal(created_at DESC);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reciprocity_tracker ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view all active profiles, edit only their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Connections: Users can see their own connections
CREATE POLICY "Users can view their connections"
  ON connections FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles WHERE id = requester_id
      UNION
      SELECT user_id FROM profiles WHERE id = recipient_id
    )
  );

CREATE POLICY "Users can create connection requests"
  ON connections FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = requester_id)
  );

-- Sessions: Participants can see their sessions
CREATE POLICY "Session participants can view their sessions"
  ON sessions FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles WHERE id = mentor_id
      UNION
      SELECT user_id FROM profiles WHERE id = mentee_id
    )
  );

-- Growth Journal: Private entries visible only to owner
CREATE POLICY "Users can view their own journal entries"
  ON growth_journal FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id)
  );

CREATE POLICY "Users can create their own journal entries"
  ON growth_journal FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id)
  );

-- ===========================================
-- TRIGGERS
-- ===========================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-create reciprocity tracker on profile creation
CREATE OR REPLACE FUNCTION create_reciprocity_tracker()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO reciprocity_tracker (profile_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_create_reciprocity
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_reciprocity_tracker();

-- ===========================================
-- FUNCTIONS
-- ===========================================

-- Calculate reciprocity score (1.0 = balanced, <1 = receiving more, >1 = giving more)
CREATE OR REPLACE FUNCTION calculate_reciprocity_score(mentor_count INTEGER, mentee_count INTEGER)
RETURNS DECIMAL AS $$
BEGIN
  IF mentee_count = 0 THEN
    RETURN 2.0; -- All giving, no receiving
  END IF;
  RETURN ROUND(CAST(mentor_count AS DECIMAL) / CAST(mentee_count AS DECIMAL), 2);
END;
$$ LANGUAGE plpgsql;

-- Update reciprocity after session completion
CREATE OR REPLACE FUNCTION update_reciprocity_on_session()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Update mentor stats
    UPDATE reciprocity_tracker
    SET 
      sessions_as_mentor = sessions_as_mentor + 1,
      last_mentored_at = NOW(),
      reciprocity_score = calculate_reciprocity_score(sessions_as_mentor + 1, sessions_as_mentee)
    WHERE profile_id = NEW.mentor_id;
    
    -- Update mentee stats
    UPDATE reciprocity_tracker
    SET 
      sessions_as_mentee = sessions_as_mentee + 1,
      last_mentee_at = NOW(),
      reciprocity_score = calculate_reciprocity_score(sessions_as_mentor, sessions_as_mentee + 1)
    WHERE profile_id = NEW.mentee_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sessions_update_reciprocity
  AFTER UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_reciprocity_on_session();

-- ===========================================
-- SEED DATA (Optional - for development)
-- ===========================================

-- Example interests/skills for dropdowns
-- INSERT INTO ... (to be added if needed)

COMMENT ON TABLE profiles IS 'Core user profiles with story-first design for the Sonder Engine';
COMMENT ON TABLE story_analysis IS 'AI-generated insights from user personal narratives';
COMMENT ON TABLE connections IS 'Mentor-mentee connection requests and status';
COMMENT ON TABLE sessions IS 'Scheduled mentorship conversations';
COMMENT ON TABLE session_summaries IS 'AI-generated session recaps and action items';
COMMENT ON TABLE growth_journal IS 'Continuous narrative of user growth journey';
COMMENT ON TABLE reviews IS 'Post-session feedback and ratings';
COMMENT ON TABLE reciprocity_tracker IS 'Balance tracking for giving vs receiving mentorship';
