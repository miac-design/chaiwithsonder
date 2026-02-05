-- ====================
-- SESSION NOTES SCHEMA
-- Phase 3: Session Notes & Feedback System
-- ====================

-- Session notes table (mentor notes during/after sessions)
CREATE TABLE IF NOT EXISTS session_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES mentoring_sessions(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL DEFAULT '',
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Action items table (tasks from sessions)
CREATE TABLE IF NOT EXISTS action_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES mentoring_sessions(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Session feedback table
CREATE TABLE IF NOT EXISTS session_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES mentoring_sessions(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_text TEXT,
    would_recommend BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, author_id)
);

-- Smart reminders table
CREATE TABLE IF NOT EXISTS session_reminders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES mentoring_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reminder_type TEXT NOT NULL CHECK (reminder_type IN ('24h', '1h', '15min', 'follow_up')),
    scheduled_for TIMESTAMPTZ NOT NULL,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentor analytics summary (materialized for performance)
CREATE TABLE IF NOT EXISTS mentor_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mentor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    total_sessions INTEGER DEFAULT 0,
    total_hours NUMERIC(10,2) DEFAULT 0,
    total_mentees INTEGER DEFAULT 0,
    avg_rating NUMERIC(3,2),
    completion_rate NUMERIC(5,2),
    last_session_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_session_notes_session ON session_notes(session_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_author ON session_notes(author_id);
CREATE INDEX IF NOT EXISTS idx_action_items_session ON action_items(session_id);
CREATE INDEX IF NOT EXISTS idx_action_items_assigned ON action_items(assigned_to);
CREATE INDEX IF NOT EXISTS idx_session_feedback_session ON session_feedback(session_id);
CREATE INDEX IF NOT EXISTS idx_session_reminders_scheduled ON session_reminders(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_session_reminders_user ON session_reminders(user_id);

-- Enable RLS
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for session_notes
CREATE POLICY "Users can view notes for their sessions" ON session_notes
    FOR SELECT USING (
        author_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM mentoring_sessions ms
            WHERE ms.id = session_id
            AND (ms.mentor_id = auth.uid() OR ms.mentee_id = auth.uid())
            AND NOT is_private
        )
    );

CREATE POLICY "Authors can create notes" ON session_notes
    FOR INSERT WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their notes" ON session_notes
    FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their notes" ON session_notes
    FOR DELETE USING (author_id = auth.uid());

-- RLS Policies for action_items
CREATE POLICY "Session participants can view action items" ON action_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM mentoring_sessions ms
            WHERE ms.id = session_id
            AND (ms.mentor_id = auth.uid() OR ms.mentee_id = auth.uid())
        )
    );

CREATE POLICY "Session participants can create action items" ON action_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM mentoring_sessions ms
            WHERE ms.id = session_id
            AND (ms.mentor_id = auth.uid() OR ms.mentee_id = auth.uid())
        )
    );

CREATE POLICY "Assigned users and creators can update action items" ON action_items
    FOR UPDATE USING (
        created_by = auth.uid() OR assigned_to = auth.uid()
    );

-- RLS Policies for session_feedback
CREATE POLICY "Session participants can view feedback" ON session_feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM mentoring_sessions ms
            WHERE ms.id = session_id
            AND (ms.mentor_id = auth.uid() OR ms.mentee_id = auth.uid())
        )
    );

CREATE POLICY "Users can create their own feedback" ON session_feedback
    FOR INSERT WITH CHECK (author_id = auth.uid());

-- RLS Policies for session_reminders
CREATE POLICY "Users can view their reminders" ON session_reminders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create reminders" ON session_reminders
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for mentor_analytics
CREATE POLICY "Mentors can view their analytics" ON mentor_analytics
    FOR SELECT USING (mentor_id = auth.uid());

CREATE POLICY "Public can view mentor analytics" ON mentor_analytics
    FOR SELECT USING (true);

-- Function to update mentor analytics
CREATE OR REPLACE FUNCTION update_mentor_analytics(p_mentor_id UUID)
RETURNS VOID AS $$
BEGIN
    INSERT INTO mentor_analytics (mentor_id, total_sessions, total_hours, total_mentees, avg_rating, completion_rate, last_session_at, updated_at)
    SELECT 
        p_mentor_id,
        COUNT(ms.id),
        COALESCE(SUM(ms.duration_minutes) / 60.0, 0),
        COUNT(DISTINCT ms.mentee_id),
        AVG(sf.rating),
        (COUNT(CASE WHEN ms.status = 'completed' THEN 1 END)::NUMERIC / NULLIF(COUNT(ms.id), 0)) * 100,
        MAX(ms.scheduled_for),
        NOW()
    FROM mentoring_sessions ms
    LEFT JOIN session_feedback sf ON ms.id = sf.session_id
    WHERE ms.mentor_id = p_mentor_id
    ON CONFLICT (mentor_id) DO UPDATE SET
        total_sessions = EXCLUDED.total_sessions,
        total_hours = EXCLUDED.total_hours,
        total_mentees = EXCLUDED.total_mentees,
        avg_rating = EXCLUDED.avg_rating,
        completion_rate = EXCLUDED.completion_rate,
        last_session_at = EXCLUDED.last_session_at,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
