import { supabase } from './supabase';

export interface MatchingPreferences {
    id: string;
    user_id: string;
    expertise_areas: string[];
    learning_goals: string[];
    availability: Record<string, string[]>; // { "monday": ["9:00", "10:00"], ... }
    preferred_session_length: number;
    max_mentees: number;
}

export interface MentorMatch {
    mentor_id: string;
    full_name: string;
    avatar_url: string;
    headline: string;
    expertise: string[];
    match_score: number;
    availability: Record<string, string[]>;
}

// Get or create matching preferences for a user
export async function getMatchingPreferences(userId: string): Promise<MatchingPreferences | null> {
    const { data, error } = await supabase
        .from('matching_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
}

// Update matching preferences
export async function updateMatchingPreferences(
    userId: string,
    preferences: Partial<MatchingPreferences>
): Promise<MatchingPreferences> {
    const { data, error } = await supabase
        .from('matching_preferences')
        .upsert({
            user_id: userId,
            ...preferences,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Find matching mentors based on mentee's learning goals
export async function findMatchingMentors(
    menteeId: string,
    learningGoals: string[],
    limit: number = 10
): Promise<MentorMatch[]> {
    // Get all mentors with their preferences
    const { data: mentors, error } = await supabase
        .from('profiles')
        .select(`
      id,
      full_name,
      avatar_url,
      headline,
      matching_preferences!inner(
        expertise_areas,
        learning_goals,
        availability,
        max_mentees
      )
    `)
        .eq('is_mentor', true)
        .neq('id', menteeId);

    if (error) throw error;
    if (!mentors) return [];

    // Calculate match scores
    const matches: MentorMatch[] = mentors.map((mentor) => {
        const prefs = mentor.matching_preferences as any;
        const expertiseAreas: string[] = prefs?.expertise_areas || [];
        const availability = prefs?.availability || {};

        // Simple scoring: count matching tags
        const matchingTags = learningGoals.filter((goal) =>
            expertiseAreas.some(
                (exp: string) => exp.toLowerCase().includes(goal.toLowerCase()) ||
                    goal.toLowerCase().includes(exp.toLowerCase())
            )
        );

        const matchScore = matchingTags.length / Math.max(learningGoals.length, 1);

        return {
            mentor_id: mentor.id,
            full_name: mentor.full_name || 'Anonymous Mentor',
            avatar_url: mentor.avatar_url || '',
            headline: mentor.headline || '',
            expertise: expertiseAreas,
            match_score: matchScore,
            availability,
        };
    });

    // Sort by match score and return top matches
    return matches
        .sort((a, b) => b.match_score - a.match_score)
        .slice(0, limit);
}

// Quick match quiz questions
export const QUICK_MATCH_QUESTIONS = [
    {
        id: 'career_stage',
        question: 'What stage is your career in?',
        options: [
            { value: 'student', label: 'Student / Learning' },
            { value: 'early', label: 'Early Career (0-3 years)' },
            { value: 'mid', label: 'Mid Career (3-10 years)' },
            { value: 'senior', label: 'Senior / Leadership' },
            { value: 'transition', label: 'Career Transition' },
        ],
    },
    {
        id: 'focus_area',
        question: 'What would you like guidance on?',
        options: [
            { value: 'tech', label: 'Technology & Engineering' },
            { value: 'business', label: 'Business & Strategy' },
            { value: 'design', label: 'Design & Creativity' },
            { value: 'leadership', label: 'Leadership & Management' },
            { value: 'personal', label: 'Personal Growth' },
            { value: 'life', label: 'Life Balance & Wellbeing' },
        ],
    },
    {
        id: 'session_style',
        question: 'What type of mentoring do you prefer?',
        options: [
            { value: 'advice', label: 'Direct Advice & Guidance' },
            { value: 'listening', label: 'Active Listening & Reflection' },
            { value: 'accountability', label: 'Accountability Partner' },
            { value: 'networking', label: 'Network & Connections' },
            { value: 'mixed', label: 'Mix of Everything' },
        ],
    },
];

// Convert quiz answers to learning goals
export function quizAnswersToGoals(answers: Record<string, string>): string[] {
    const goals: string[] = [];

    // Map career stage
    if (answers.career_stage === 'student') goals.push('learning fundamentals', 'career start');
    if (answers.career_stage === 'early') goals.push('skill development', 'career growth');
    if (answers.career_stage === 'mid') goals.push('leadership skills', 'specialization');
    if (answers.career_stage === 'senior') goals.push('executive coaching', 'legacy building');
    if (answers.career_stage === 'transition') goals.push('career change', 'skill transfer');

    // Map focus area
    if (answers.focus_area === 'tech') goals.push('technology', 'engineering', 'coding', 'AI');
    if (answers.focus_area === 'business') goals.push('business strategy', 'entrepreneurship', 'marketing');
    if (answers.focus_area === 'design') goals.push('design thinking', 'creativity', 'UX');
    if (answers.focus_area === 'leadership') goals.push('leadership', 'management', 'team building');
    if (answers.focus_area === 'personal') goals.push('personal development', 'confidence', 'communication');
    if (answers.focus_area === 'life') goals.push('work-life balance', 'wellbeing', 'mindfulness');

    // Map session style
    if (answers.session_style === 'advice') goals.push('direct mentorship');
    if (answers.session_style === 'listening') goals.push('coaching', 'reflection');
    if (answers.session_style === 'accountability') goals.push('accountability', 'goal setting');
    if (answers.session_style === 'networking') goals.push('networking', 'connections');

    return goals;
}
