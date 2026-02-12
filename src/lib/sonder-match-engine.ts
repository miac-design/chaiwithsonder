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
    desired_flavor: string;     // 'career' | 'startup' | 'resume' | 'just_chat'
    career_stage: string;       // 'exploring' | 'early_career' | 'mid_career' | 'senior' | 'executive'
    current_challenge?: string; // 'career_pivot' | 'skill_building' | 'confidence' | 'work_life' | 'leadership'
    support_style?: string;     // 'accountability' | 'experience' | 'listener' | 'challenger' | 'brainstorm'
    preferred_vibe: string;     // 'structured' | 'casual' | 'challenge_me' | 'calm'
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
    'challenge_me': {
        'direct': 1.0,
        'structured': 0.8,
        'analytical': 0.7,
        'casual': 0.3,
        'storyteller': 0.4,
    },
    'calm': {
        'storyteller': 1.0,
        'casual': 0.9,
        'structured': 0.5,
        'direct': 0.2,
        'analytical': 0.6,
    },
    'in_between': {
        'casual': 0.7,
        'storyteller': 0.7,
        'structured': 0.7,
        'direct': 0.7,
        'analytical': 0.7,
    },
};

// Support style compatibility with mentor communication style
const SUPPORT_COMPATIBILITY: Record<string, Record<string, number>> = {
    'accountability': { 'structured': 1.0, 'direct': 0.9, 'analytical': 0.7, 'casual': 0.4, 'storyteller': 0.5 },
    'experience': { 'storyteller': 1.0, 'casual': 0.8, 'structured': 0.7, 'direct': 0.6, 'analytical': 0.6 },
    'listener': { 'casual': 1.0, 'storyteller': 0.9, 'structured': 0.3, 'direct': 0.2, 'analytical': 0.4 },
    'challenger': { 'direct': 1.0, 'structured': 0.8, 'analytical': 0.7, 'casual': 0.3, 'storyteller': 0.4 },
    'brainstorm': { 'casual': 0.9, 'storyteller': 0.8, 'analytical': 0.8, 'structured': 0.6, 'direct': 0.5 },
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

    // Signal weights — redistributed for 6-question quiz
    const expertiseWeight = hasEmbeddings ? 0.25 : 0.30;
    const stageWeight = 0.20;
    const engagementWeight = 0.15;
    const styleWeight = 0.20; // now combines vibe + support style
    const storyWeight = hasEmbeddings ? 0.10 : 0;
    const challengeWeight = 0.10; // new signal from current_challenge

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
        const vibeScore = computeStyleScore(intake.preferred_vibe, mentor.communication_style);
        const supportScore = intake.support_style
            ? computeSupportScore(intake.support_style, mentor.communication_style)
            : vibeScore;
        const styleScore = (vibeScore * 0.5) + (supportScore * 0.5);
        const challengeScore = computeChallengeScore(intake.current_challenge, mentor.specialties);

        let storyScore = 0;
        if (hasEmbeddings && mentor.embedding_vector && mentor.embedding_vector.length > 0 && menteeEmbedding) {
            storyScore = cosineSimilarity(menteeEmbedding, mentor.embedding_vector);
        }

        const totalScore =
            (expertiseScore * expertiseWeight) +
            (stageScore * stageWeight) +
            (engagementScore * engagementWeight) +
            (styleScore * styleWeight) +
            (storyScore * storyWeight) +
            (challengeScore * challengeWeight);

        // Generate narrative match reasons (top 2)
        const reasons = generateMatchReasons(
            expertiseScore, stageScore, engagementScore, styleScore, storyScore, challengeScore,
            intake, mentor
        );

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

    // From current challenge
    switch (intake.current_challenge) {
        case 'career_pivot':
            goals.push('career change', 'transition', 'pivot');
            break;
        case 'skill_building':
            goals.push('skill development', 'technical growth', 'upskilling');
            break;
        case 'confidence':
            goals.push('mentorship', 'guidance', 'support');
            break;
        case 'work_life':
            goals.push('balance', 'wellbeing', 'boundaries');
            break;
        case 'leadership':
            goals.push('leadership', 'management', 'influence');
            break;
    }

    return goals;
}

function computeSupportScore(supportStyle: string, mentorStyle: string | undefined): number {
    if (!mentorStyle) return 0.7;
    const map = SUPPORT_COMPATIBILITY[supportStyle];
    if (!map) return 0.7;
    return map[mentorStyle.toLowerCase()] ?? 0.5;
}

const CHALLENGE_SPECIALTY_MAP: Record<string, string[]> = {
    'career_pivot': ['Career', 'Consulting', 'Product'],
    'skill_building': ['Tech', 'Engineering', 'Data', 'AI/ML'],
    'confidence': [], // universal — no specialty filter
    'work_life': ['Leadership', 'Consulting'],
    'leadership': ['Leadership', 'Big Tech', 'Startup'],
};

function computeChallengeScore(challenge: string | undefined, mentorSpecialties: string[]): number {
    if (!challenge) return 0.5;
    const wanted = CHALLENGE_SPECIALTY_MAP[challenge] || [];
    if (wanted.length === 0) return 0.7; // universal challenges match broadly
    const overlap = wanted.filter(w =>
        mentorSpecialties.some(s => s.toLowerCase().includes(w.toLowerCase()))
    ).length;
    return Math.min(overlap / Math.max(wanted.length, 1) + 0.3, 1.0);
}

const CHALLENGE_LABELS: Record<string, string> = {
    'career_pivot': 'navigating a career pivot',
    'skill_building': 'building new skills',
    'confidence': 'building confidence',
    'work_life': 'finding balance',
    'leadership': 'growing as a leader',
};

const SUPPORT_LABELS: Record<string, string> = {
    'accountability': 'accountability',
    'experience': 'real-world experience',
    'listener': 'empathy and listening',
    'challenger': 'honest feedback',
    'brainstorm': 'brainstorming together',
};

function generateMatchReasons(
    expertise: number,
    stage: number,
    engagement: number,
    style: number,
    story: number,
    challenge: number,
    intake: MatchIntake,
    mentor: MentorProfile,
): string[] {
    const reasons: { score: number; label: string }[] = [];

    // Narrative reasons based on actual quiz answers
    if (expertise >= 0.6) {
        reasons.push({ score: expertise, label: `${mentor.name.split(' ')[0]} has deep expertise in areas you care about` });
    }
    if (stage >= 0.8) {
        reasons.push({ score: stage, label: `Just a step ahead in career stage — ideal for mentoring` });
    }
    if (engagement >= 0.7) {
        reasons.push({ score: engagement, label: `Highly active mentor with ${mentor.chaisShared}+ chais shared` });
    }
    if (style >= 0.7) {
        const supportLabel = intake.support_style ? SUPPORT_LABELS[intake.support_style] : null;
        if (supportLabel) {
            reasons.push({ score: style, label: `Mentors with ${supportLabel} — exactly what you asked for` });
        } else {
            reasons.push({ score: style, label: `Communication style aligns with your vibe` });
        }
    }
    if (challenge >= 0.7 && intake.current_challenge) {
        const challengeLabel = CHALLENGE_LABELS[intake.current_challenge];
        if (challengeLabel) {
            reasons.push({ score: challenge, label: `Has helped others ${challengeLabel}` });
        }
    }
    if (story >= 0.6) {
        reasons.push({ score: story, label: `Similar life journey and background` });
    }

    // Fallback if nothing scored high enough
    if (reasons.length === 0) {
        reasons.push({ score: 0.5, label: `A well-rounded mentor with broad experience` });
    }

    return reasons
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
