/**
 * ChaiChat Database Types
 * Generated for Supabase integration
 * Based on the Sonder Engine mentorship matching strategy
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    user_id: string;
                    display_name: string;
                    avatar_url: string | null;
                    story: string | null;
                    bio: string | null;
                    interests: string[];
                    skills: string[];
                    goals: string[];
                    role: 'mentee' | 'mentor' | 'both';
                    growth_stage: 'explorer' | 'builder' | 'transformer' | 'guide';
                    communication_style: 'analytical' | 'emotional' | 'practical' | 'visionary' | null;
                    availability_hours: number;
                    timezone: string;
                    linkedin_url: string | null;
                    is_verified: boolean;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    display_name: string;
                    avatar_url?: string | null;
                    story?: string | null;
                    bio?: string | null;
                    interests?: string[];
                    skills?: string[];
                    goals?: string[];
                    role?: 'mentee' | 'mentor' | 'both';
                    growth_stage?: 'explorer' | 'builder' | 'transformer' | 'guide';
                    communication_style?: 'analytical' | 'emotional' | 'practical' | 'visionary' | null;
                    availability_hours?: number;
                    timezone?: string;
                    linkedin_url?: string | null;
                    is_verified?: boolean;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    display_name?: string;
                    avatar_url?: string | null;
                    story?: string | null;
                    bio?: string | null;
                    interests?: string[];
                    skills?: string[];
                    goals?: string[];
                    role?: 'mentee' | 'mentor' | 'both';
                    growth_stage?: 'explorer' | 'builder' | 'transformer' | 'guide';
                    communication_style?: 'analytical' | 'emotional' | 'practical' | 'visionary' | null;
                    availability_hours?: number;
                    timezone?: string;
                    linkedin_url?: string | null;
                    is_verified?: boolean;
                    is_active?: boolean;
                    updated_at?: string;
                };
            };

            story_analysis: {
                Row: {
                    id: string;
                    profile_id: string;
                    life_themes: string[];
                    growth_stage_detected: string;
                    communication_style_detected: string;
                    unspoken_needs: string[];
                    potential_blind_spots: string[];
                    ideal_mentor_archetype: string | null;
                    embedding_vector: number[] | null;
                    analyzed_at: string;
                };
                Insert: {
                    id?: string;
                    profile_id: string;
                    life_themes?: string[];
                    growth_stage_detected?: string;
                    communication_style_detected?: string;
                    unspoken_needs?: string[];
                    potential_blind_spots?: string[];
                    ideal_mentor_archetype?: string | null;
                    embedding_vector?: number[] | null;
                    analyzed_at?: string;
                };
                Update: {
                    life_themes?: string[];
                    growth_stage_detected?: string;
                    communication_style_detected?: string;
                    unspoken_needs?: string[];
                    potential_blind_spots?: string[];
                    ideal_mentor_archetype?: string | null;
                    embedding_vector?: number[] | null;
                    analyzed_at?: string;
                };
            };

            connections: {
                Row: {
                    id: string;
                    requester_id: string;
                    recipient_id: string;
                    status: 'pending' | 'accepted' | 'declined' | 'cancelled';
                    message: string | null;
                    compatibility_score: number | null;
                    created_at: string;
                    responded_at: string | null;
                };
                Insert: {
                    id?: string;
                    requester_id: string;
                    recipient_id: string;
                    status?: 'pending' | 'accepted' | 'declined' | 'cancelled';
                    message?: string | null;
                    compatibility_score?: number | null;
                    created_at?: string;
                    responded_at?: string | null;
                };
                Update: {
                    status?: 'pending' | 'accepted' | 'declined' | 'cancelled';
                    responded_at?: string | null;
                };
            };

            sessions: {
                Row: {
                    id: string;
                    connection_id: string;
                    mentor_id: string;
                    mentee_id: string;
                    scheduled_at: string;
                    duration_minutes: number;
                    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
                    meeting_link: string | null;
                    session_type: 'video' | 'audio' | 'chat';
                    prep_notes_mentor: string | null;
                    prep_notes_mentee: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    connection_id: string;
                    mentor_id: string;
                    mentee_id: string;
                    scheduled_at: string;
                    duration_minutes?: number;
                    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
                    meeting_link?: string | null;
                    session_type?: 'video' | 'audio' | 'chat';
                    prep_notes_mentor?: string | null;
                    prep_notes_mentee?: string | null;
                    created_at?: string;
                };
                Update: {
                    scheduled_at?: string;
                    duration_minutes?: number;
                    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
                    meeting_link?: string | null;
                    prep_notes_mentor?: string | null;
                    prep_notes_mentee?: string | null;
                };
            };

            session_summaries: {
                Row: {
                    id: string;
                    session_id: string;
                    summary_text: string;
                    key_insights: string[];
                    action_items: string[];
                    follow_up_suggested: boolean;
                    sentiment_score: number | null;
                    topics_discussed: string[];
                    generated_at: string;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    summary_text: string;
                    key_insights?: string[];
                    action_items?: string[];
                    follow_up_suggested?: boolean;
                    sentiment_score?: number | null;
                    topics_discussed?: string[];
                    generated_at?: string;
                };
                Update: {
                    summary_text?: string;
                    key_insights?: string[];
                    action_items?: string[];
                    follow_up_suggested?: boolean;
                    sentiment_score?: number | null;
                    topics_discussed?: string[];
                };
            };

            growth_journal: {
                Row: {
                    id: string;
                    profile_id: string;
                    entry_type: 'reflection' | 'milestone' | 'goal_update' | 'insight';
                    content: string;
                    related_session_id: string | null;
                    tags: string[];
                    is_private: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    profile_id: string;
                    entry_type?: 'reflection' | 'milestone' | 'goal_update' | 'insight';
                    content: string;
                    related_session_id?: string | null;
                    tags?: string[];
                    is_private?: boolean;
                    created_at?: string;
                };
                Update: {
                    entry_type?: 'reflection' | 'milestone' | 'goal_update' | 'insight';
                    content?: string;
                    tags?: string[];
                    is_private?: boolean;
                };
            };

            reviews: {
                Row: {
                    id: string;
                    session_id: string;
                    reviewer_id: string;
                    reviewee_id: string;
                    rating: number;
                    feedback: string | null;
                    would_recommend: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    session_id: string;
                    reviewer_id: string;
                    reviewee_id: string;
                    rating: number;
                    feedback?: string | null;
                    would_recommend?: boolean;
                    created_at?: string;
                };
                Update: {
                    rating?: number;
                    feedback?: string | null;
                    would_recommend?: boolean;
                };
            };

            reciprocity_tracker: {
                Row: {
                    id: string;
                    profile_id: string;
                    sessions_as_mentor: number;
                    sessions_as_mentee: number;
                    last_mentored_at: string | null;
                    last_mentee_at: string | null;
                    reciprocity_score: number;
                    nudge_sent_at: string | null;
                };
                Insert: {
                    id?: string;
                    profile_id: string;
                    sessions_as_mentor?: number;
                    sessions_as_mentee?: number;
                    last_mentored_at?: string | null;
                    last_mentee_at?: string | null;
                    reciprocity_score?: number;
                    nudge_sent_at?: string | null;
                };
                Update: {
                    sessions_as_mentor?: number;
                    sessions_as_mentee?: number;
                    last_mentored_at?: string | null;
                    last_mentee_at?: string | null;
                    reciprocity_score?: number;
                    nudge_sent_at?: string | null;
                };
            };
        };
        Views: {};
        Functions: {};
        Enums: {
            user_role: 'mentee' | 'mentor' | 'both';
            growth_stage: 'explorer' | 'builder' | 'transformer' | 'guide';
            communication_style: 'analytical' | 'emotional' | 'practical' | 'visionary';
            connection_status: 'pending' | 'accepted' | 'declined' | 'cancelled';
            session_status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
        };
    };
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type StoryAnalysis = Database['public']['Tables']['story_analysis']['Row'];
export type Connection = Database['public']['Tables']['connections']['Row'];
export type Session = Database['public']['Tables']['sessions']['Row'];
export type SessionSummary = Database['public']['Tables']['session_summaries']['Row'];
export type GrowthJournalEntry = Database['public']['Tables']['growth_journal']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReciprocityTracker = Database['public']['Tables']['reciprocity_tracker']['Row'];
