-- ====================
-- CHAICHAT AUTOMATION SCHEMA
-- Phase 2: Chat, Matching, Sessions
-- ====================

-- Enable realtime for specific tables
-- Run this in Supabase SQL Editor

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mentor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    mentee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ,
    UNIQUE(mentor_id, mentee_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table (for scheduled mentoring sessions)
CREATE TABLE IF NOT EXISTS mentoring_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    mentor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    mentee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
    meeting_url TEXT,
    notes TEXT,
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matching preferences (for smart matching)
CREATE TABLE IF NOT EXISTS matching_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    expertise_areas TEXT[] DEFAULT '{}',
    learning_goals TEXT[] DEFAULT '{}',
    availability JSONB DEFAULT '{}',
    preferred_session_length INTEGER DEFAULT 30,
    max_mentees INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_mentor ON conversations(mentor_id);
CREATE INDEX IF NOT EXISTS idx_conversations_mentee ON conversations(mentee_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled ON mentoring_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_matching_expertise ON matching_preferences USING GIN(expertise_areas);
CREATE INDEX IF NOT EXISTS idx_matching_goals ON matching_preferences USING GIN(learning_goals);

-- Enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matching_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can view their own conversations"
    ON conversations FOR SELECT
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can create conversations"
    ON conversations FOR INSERT
    WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Users can update their own conversations"
    ON conversations FOR UPDATE
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations"
    ON messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM conversations c
            WHERE c.id = messages.conversation_id
            AND (c.mentor_id = auth.uid() OR c.mentee_id = auth.uid())
        )
    );

CREATE POLICY "Users can send messages in their conversations"
    ON messages FOR INSERT
    WITH CHECK (
        auth.uid() = sender_id
        AND EXISTS (
            SELECT 1 FROM conversations c
            WHERE c.id = conversation_id
            AND (c.mentor_id = auth.uid() OR c.mentee_id = auth.uid())
            AND c.status = 'active'
        )
    );

-- RLS Policies for sessions
CREATE POLICY "Users can view their sessions"
    ON mentoring_sessions FOR SELECT
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Mentees can create sessions"
    ON mentoring_sessions FOR INSERT
    WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Participants can update sessions"
    ON mentoring_sessions FOR UPDATE
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

-- RLS Policies for matching preferences
CREATE POLICY "Users can view all matching preferences"
    ON matching_preferences FOR SELECT
    USING (true);

CREATE POLICY "Users can manage their own preferences"
    ON matching_preferences FOR ALL
    USING (auth.uid() = user_id);

-- Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;

-- Function to update conversation last_message_at
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations
    SET last_message_at = NEW.created_at, updated_at = NOW()
    WHERE id = NEW.conversation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating last message time
DROP TRIGGER IF EXISTS on_new_message ON messages;
CREATE TRIGGER on_new_message
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_last_message();
