/**
 * Sonder Match Engine — 3-Tier Intelligent Mentor Matching
 * 
 * Tier 1: Hard Filters (eliminate bad matches)
 * Tier 2: Compatibility Score (rank remaining mentors — 0.0 to 1.0)
 * Tier 3: Tiebreakers (order equally-scored mentors)
 */

// ==========================================
// Types
// ==========================================

export interface MatchIntake {
    desired_flavor: string;   // 'career' | 'startup' | 'resume' | 'just_chat'
    career_stage: string;     // 'exploring' | 'early_career' | 'mid_career' | 'senior' | 'executive'
    preferred_vibe: string;   // 'casual' | 'structured' | 'in_between'
    additional_context?: string;
}

export interface MentorProfile {
    id: string;
    name: string;
    title: string;
    photo?: string;
    linkedin?: string;
    story?: string;
    specialties: string[];
    chaisShared: number;
    growth_stage?: string;
    communication_style?: string;
    role?: string;
    // From matching_preferences
    expertise_areas?: string[];
    max_mentees?: number;
    current_mentee_count?: number;
    // From mentor_analytics
    avg_rating?: number | null;
    completion_rate?: number | null;
    total_sessions?: number;
    last_session_at?: string | null;
    // From story_analysis
    embedding_vector?: number[] | null;
    // Availability
    availability?: Record<string, string[]>;
}

export interface MatchResult {
    mentor: MentorProfile;
    total_score: number;
    expertise_score: number;
    stage_score: number;
    engagement_score: number;
    style_score: number;
    story_score: number;
    match_reasons: string[];
}

// ==========================================
// Constants
// ==========================================

const STAGE_ORDER: Record<string, number> = {
    'exploring': 1,
    'early_career': 2,
    'mid_career': 3,
    'senior': 4,
    'executive': 5,
};

const FLAVOR_SPECIALTY_MAP: Record<string, string[]> = {
    'career': ['Career', 'Leadership', 'Big Tech', 'Consulting'],
    'startup': ['Startup', 'Product', 'Marketing', 'Sales'],
    'resume': ['Resume', 'Career', 'Tech'],
    'just_chat': [], // bypasses filter
};

const STYLE_COMPATIBILITY: Record<string, Record<string, number>> = {
    'casual': {
        'casual': 1.0,
        'storyteller': 1.0,
        'structured': 0.3,
        'direct': 0.5,
        'analytical': 0.4,
    },
    'structured': {
        'structured': 1.0,
        'direct': 1.0,
        'analytical': 1.0,
        'casual': 0.3,
        'storyteller': 0.5,
    },
    'in_between': {
        'casual': 0.7,
        'storyteller': 0.7,
        'structured': 0.7,
        'direct': 0.7,
        'analytical': 0.7,
    },
};

// ==========================================
// Tier 1: Hard Filters
// ==========================================

function passesHardFilters(mentor: MentorProfile, intake: MatchIntake): boolean {
    // Filter 1: Active mentor check
    if (mentor.role && mentor.role !== 'mentor') return false;

    // Filter 2: Capacity check
    if (mentor.max_mentees !== undefined && mentor.current_mentee_count !== undefined) {
        if (mentor.current_mentee_count >= mentor.max_mentees) return false;
    }

    // Filter 3: Flavor alignment (bypass for "Just Chat")
    if (intake.desired_flavor !== 'just_chat') {
        const requiredSpecialties = FLAVOR_SPECIALTY_MAP[intake.desired_flavor] || [];
        if (requiredSpecialties.length > 0) {
            const hasMatch = mentor.specialties.some(s =>
                requiredSpecialties.some(rs => s.toLowerCase().includes(rs.toLowerCase()))
            );
            if (!hasMatch) return false;
        }
    }

    return true;
}

// ==========================================
// Tier 2: Compatibility Scoring
// ==========================================

function computeExpertiseScore(mentorSpecialties: string[], menteeGoals: string[]): number {
    if (menteeGoals.length === 0) return 0.5; // neutral if no goals specified

    const matchCount = menteeGoals.filter(goal =>
        mentorSpecialties.some(spec =>
            spec.toLowerCase().includes(goal.toLowerCase()) ||
            goal.toLowerCase().includes(spec.toLowerCase())
        )
    ).length;

    return matchCount / Math.max(menteeGoals.length, 1);
}

function computeStageScore(mentorStage: string | undefined, menteeStage: string): number {
    if (!mentorStage) return 0.5; // neutral if unknown

    const mentorNum = STAGE_ORDER[mentorStage] ?? 3;
    const menteeNum = STAGE_ORDER[menteeStage] ?? 2;
    const gap = Math.abs(mentorNum - menteeNum);

    if (gap === 1 || gap === 2) return 1.0;  // ideal gap
    if (gap === 0) return 0.5;                // peer
    if (gap === 3) return 0.6;                // stretch
    return 0.3;                                // too far
}

function computeEngagementScore(mentor: MentorProfile): number {
    // For mentors with no data, default to 0.5
    const hasData = mentor.avg_rating !== null && mentor.avg_rating !== undefined;

    if (!hasData && mentor.chaisShared === 0) return 0.5;

    const ratingScore = (mentor.avg_rating ?? 3.5) / 5.0;
    const experienceScore = Math.min(mentor.chaisShared / 10, 1.0);
    const completionScore = mentor.completion_rate ?? 0.8;

    return (ratingScore * 0.5) + (experienceScore * 0.3) + (completionScore * 0.2);
}

function computeStyleScore(menteeVibe: string, mentorStyle: string | undefined): number {
    if (!mentorStyle) return 0.7; // neutral if mentor style unknown

    const vibeMap = STYLE_COMPATIBILITY[menteeVibe];
    if (!vibeMap) return 0.7;

    return vibeMap[mentorStyle.toLowerCase()] ?? 0.5;
}

function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
}

// ==========================================
// Main Engine
// ==========================================

/**
 * Run the 3-tier Sonder Match engine against a set of mentors.
 * Returns ranked match results.
 */
export function computeMatchScores(
    mentors: MentorProfile[],
    intake: MatchIntake,
    menteeEmbedding?: number[] | null,
): MatchResult[] {
    // Tier 1: Hard Filters
    const eligible = mentors.filter(m => passesHardFilters(m, intake));

    // Determine if story similarity is available for ANY mentor
    const hasEmbeddings = menteeEmbedding && menteeEmbedding.length > 0 &&
        eligible.some(m => m.embedding_vector && m.embedding_vector.length > 0);

    // Signal weights
    const expertiseWeight = hasEmbeddings ? 0.30 : 0.40; // absorb 10% if no embeddings
    const stageWeight = 0.25;
    const engagementWeight = 0.20;
    const styleWeight = 0.15;
    const storyWeight = hasEmbeddings ? 0.10 : 0;

    // Derive mentee learning goals from flavor + context
    const menteeGoals = deriveLearningGoals(intake);

    // Tier 2: Compatibility Scoring
    const results: MatchResult[] = eligible.map(mentor => {
        const expertiseScore = computeExpertiseScore(
            [...mentor.specialties, ...(mentor.expertise_areas || [])],
            menteeGoals
        );
        const stageScore = computeStageScore(mentor.growth_stage, intake.career_stage);
        const engagementScore = computeEngagementScore(mentor);
        const styleScore = computeStyleScore(intake.preferred_vibe, mentor.communication_style);

        let storyScore = 0;
        if (hasEmbeddings && mentor.embedding_vector && mentor.embedding_vector.length > 0 && menteeEmbedding) {
            storyScore = cosineSimilarity(menteeEmbedding, mentor.embedding_vector);
        }

        const totalScore =
            (expertiseScore * expertiseWeight) +
            (stageScore * stageWeight) +
            (engagementScore * engagementWeight) +
            (styleScore * styleWeight) +
            (storyScore * storyWeight);

        // Generate match reasons (top 2)
        const reasons = generateMatchReasons(expertiseScore, stageScore, engagementScore, styleScore, storyScore);

        return {
            mentor,
            total_score: Math.round(totalScore * 100) / 100,
            expertise_score: Math.round(expertiseScore * 100) / 100,
            stage_score: Math.round(stageScore * 100) / 100,
            engagement_score: Math.round(engagementScore * 100) / 100,
            style_score: Math.round(styleScore * 100) / 100,
            story_score: Math.round(storyScore * 100) / 100,
            match_reasons: reasons,
        };
    });

    // Tier 3: Sort by total_score DESC, then tiebreakers
    results.sort((a, b) => {
        if (b.total_score !== a.total_score) return b.total_score - a.total_score;

        // Tiebreaker 1: Fewer current mentees = higher
        const aLoad = a.mentor.current_mentee_count ?? 0;
        const bLoad = b.mentor.current_mentee_count ?? 0;
        if (aLoad !== bLoad) return aLoad - bLoad;

        // Tiebreaker 2: Recently active = higher
        const aRecent = a.mentor.last_session_at ? new Date(a.mentor.last_session_at).getTime() : 0;
        const bRecent = b.mentor.last_session_at ? new Date(b.mentor.last_session_at).getTime() : 0;
        return bRecent - aRecent;
    });

    return results;
}

// ==========================================
// Helpers
// ==========================================

function deriveLearningGoals(intake: MatchIntake): string[] {
    const goals: string[] = [];

    // From flavor
    switch (intake.desired_flavor) {
        case 'career':
            goals.push('career', 'leadership', 'big tech', 'consulting', 'career growth');
            break;
        case 'startup':
            goals.push('startup', 'product', 'marketing', 'entrepreneurship', 'founder');
            break;
        case 'resume':
            goals.push('resume', 'career', 'tech', 'job search', 'interview');
            break;
        case 'just_chat':
            goals.push('general', 'networking', 'mentorship');
            break;
    }

    // From career stage
    switch (intake.career_stage) {
        case 'exploring':
            goals.push('learning', 'career start');
            break;
        case 'early_career':
            goals.push('skill development', 'career growth');
            break;
        case 'mid_career':
            goals.push('leadership', 'specialization');
            break;
        case 'senior':
            goals.push('executive coaching', 'leadership');
            break;
        case 'executive':
            goals.push('strategy', 'legacy building');
            break;
    }

    return goals;
}

function generateMatchReasons(
    expertise: number,
    stage: number,
    engagement: number,
    style: number,
    story: number,
): string[] {
    const scored = [
        { score: expertise, label: 'Strong expertise overlap' },
        { score: stage, label: 'Similar career stage' },
        { score: engagement, label: 'Highly engaged mentor' },
        { score: style, label: 'Great communication fit' },
        { score: story, label: 'Similar life journey' },
    ];

    return scored
        .filter(s => s.score >= 0.6)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map(s => s.label);
}

/**
 * Get the match badge level based on total score.
 */
export function getMatchBadge(score: number): 'great' | 'good' | null {
    if (score >= 0.8) return 'great';
    if (score >= 0.6) return 'good';
    return null;
}
