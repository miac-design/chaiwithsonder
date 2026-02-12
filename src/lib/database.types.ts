/**
 * Database Types for Supabase
 * 
 * To generate updated types from your Supabase project, run:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
 */

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    created_at: string;
                    name: string | null;
                    email: string | null;
                    avatar_url: string | null;
                    bio: string | null;
                    is_mentor: boolean;
                    expertise: string[] | null;
                    availability: string | null;
                };
                Insert: {
                    id: string;
                    created_at?: string;
                    name?: string | null;
                    email?: string | null;
                    avatar_url?: string | null;
                    bio?: string | null;
                    is_mentor?: boolean;
                    expertise?: string[] | null;
                    availability?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    name?: string | null;
                    email?: string | null;
                    avatar_url?: string | null;
                    bio?: string | null;
                    is_mentor?: boolean;
                    expertise?: string[] | null;
                    availability?: string | null;
                };
            };
            conversations: {
                Row: {
                    id: string;
                    created_at: string;
                    mentor_id: string;
                    mentee_id: string;
                    status: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    mentor_id: string;
                    mentee_id: string;
                    status?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    mentor_id?: string;
                    mentee_id?: string;
                    status?: string;
                    updated_at?: string;
                };
            };
            messages: {
                Row: {
                    id: string;
                    created_at: string;
                    conversation_id: string;
                    sender_id: string;
                    content: string;
                    read_at: string | null;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    conversation_id: string;
                    sender_id: string;
                    content: string;
                    read_at?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    conversation_id?: string;
                    sender_id?: string;
                    content?: string;
                    read_at?: string | null;
                };
            };
            mentoring_sessions: {
                Row: {
                    id: string;
                    created_at: string;
                    mentor_id: string;
                    mentee_id: string;
                    scheduled_for: string;
                    duration_minutes: number;
                    status: string;
                    topic: string | null;
                    meeting_url: string | null;
                    cal_booking_id: string | null;
                };
                Insert: {
                    id?: string;
                    created_at?: string;
                    mentor_id: string;
                    mentee_id: string;
                    scheduled_for: string;
                    duration_minutes?: number;
                    status?: string;
                    topic?: string | null;
                    meeting_url?: string | null;
                    cal_booking_id?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string;
                    mentor_id?: string;
                    mentee_id?: string;
                    scheduled_for?: string;
                    duration_minutes?: number;
                    status?: string;
                    topic?: string | null;
                    meeting_url?: string | null;
                    cal_booking_id?: string | null;
                };
            };
            live_availability: {
                Row: {
                    id: string;
                    user_id: string;
                    is_available: boolean;
                    available_since: string | null;
                    available_until: string | null;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    is_available?: boolean;
                    available_since?: string | null;
                    available_until?: string | null;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    is_available?: boolean;
                    available_since?: string | null;
                    available_until?: string | null;
                    updated_at?: string;
                };
            };
            session_notes: {
                Row: {
                    id: string;
                    session_id: string;
                    author_id: string;
                    content: string;
                    is_private: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    author_id: string;
                    content?: string;
                    is_private?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    session_id?: string;
                    author_id?: string;
                    content?: string;
                    is_private?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            action_items: {
                Row: {
                    id: string;
                    session_id: string;
                    created_by: string;
                    assigned_to: string | null;
                    content: string;
                    is_completed: boolean;
                    due_date: string | null;
                    created_at: string;
                    completed_at: string | null;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    created_by: string;
                    assigned_to?: string | null;
                    content: string;
                    is_completed?: boolean;
                    due_date?: string | null;
                    created_at?: string;
                    completed_at?: string | null;
                };
                Update: {
                    id?: string;
                    session_id?: string;
                    created_by?: string;
                    assigned_to?: string | null;
                    content?: string;
                    is_completed?: boolean;
                    due_date?: string | null;
                    created_at?: string;
                    completed_at?: string | null;
                };
            };
            session_feedback: {
                Row: {
                    id: string;
                    session_id: string;
                    author_id: string;
                    rating: number;
                    feedback_text: string | null;
                    would_recommend: boolean | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    author_id: string;
                    rating: number;
                    feedback_text?: string | null;
                    would_recommend?: boolean | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    session_id?: string;
                    author_id?: string;
                    rating?: number;
                    feedback_text?: string | null;
                    would_recommend?: boolean | null;
                    created_at?: string;
                };
            };
            session_reminders: {
                Row: {
                    id: string;
                    session_id: string;
                    user_id: string;
                    reminder_type: string;
                    scheduled_for: string;
                    sent_at: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    user_id: string;
                    reminder_type: string;
                    scheduled_for: string;
                    sent_at?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    session_id?: string;
                    user_id?: string;
                    reminder_type?: string;
                    scheduled_for?: string;
                    sent_at?: string | null;
                    created_at?: string;
                };
            };
            mentor_analytics: {
                Row: {
                    id: string;
                    mentor_id: string;
                    total_sessions: number;
                    total_hours: number;
                    total_mentees: number;
                    avg_rating: number | null;
                    completion_rate: number | null;
                    last_session_at: string | null;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    mentor_id: string;
                    total_sessions?: number;
                    total_hours?: number;
                    total_mentees?: number;
                    avg_rating?: number | null;
                    completion_rate?: number | null;
                    last_session_at?: string | null;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    mentor_id?: string;
                    total_sessions?: number;
                    total_hours?: number;
                    total_mentees?: number;
                    avg_rating?: number | null;
                    completion_rate?: number | null;
                    last_session_at?: string | null;
                    updated_at?: string;
                };
            };
            match_intake: {
                Row: {
                    id: string;
                    user_id: string;
                    desired_flavor: string;
                    career_stage: string;
                    preferred_vibe: string;
                    additional_context: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    desired_flavor: string;
                    career_stage: string;
                    preferred_vibe: string;
                    additional_context?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    desired_flavor?: string;
                    career_stage?: string;
                    preferred_vibe?: string;
                    additional_context?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            match_results: {
                Row: {
                    id: string;
                    mentee_id: string;
                    mentor_id: string;
                    total_score: number;
                    expertise_score: number | null;
                    stage_score: number | null;
                    engagement_score: number | null;
                    style_score: number | null;
                    story_score: number | null;
                    computed_at: string;
                };
                Insert: {
                    id?: string;
                    mentee_id: string;
                    mentor_id: string;
                    total_score: number;
                    expertise_score?: number | null;
                    stage_score?: number | null;
                    engagement_score?: number | null;
                    style_score?: number | null;
                    story_score?: number | null;
                    computed_at?: string;
                };
                Update: {
                    id?: string;
                    mentee_id?: string;
                    mentor_id?: string;
                    total_score?: number;
                    expertise_score?: number | null;
                    stage_score?: number | null;
                    engagement_score?: number | null;
                    style_score?: number | null;
                    story_score?: number | null;
                    computed_at?: string;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}
