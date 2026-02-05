/**
 * Analytics Service - Mentor Analytics & Stats
 * Aggregates and calculates mentor performance metrics
 */

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Types
export interface MentorAnalytics {
    id: string;
    mentor_id: string;
    total_sessions: number;
    total_hours: number;
    total_mentees: number;
    avg_rating: number | null;
    completion_rate: number | null;
    last_session_at: string | null;
    updated_at: string;
}

export interface MentorStats {
    totalSessions: number;
    totalHours: number;
    totalMentees: number;
    avgRating: number | null;
    completionRate: number;
    lastSessionAt: Date | null;
    sessionsThisWeek: number;
    sessionsThisMonth: number;
    hoursThisWeek: number;
    hoursThisMonth: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
}

export interface SessionTrend {
    date: string;
    sessions: number;
    hours: number;
}

export interface RatingDistribution {
    rating: number;
    count: number;
    percentage: number;
}

// Get mentor analytics from database
export async function getMentorAnalytics(mentorId: string): Promise<MentorAnalytics | null> {
    const { data, error } = await supabase
        .from('mentor_analytics')
        .select('*')
        .eq('mentor_id', mentorId)
        .single();

    if (error) {
        console.error('Error fetching mentor analytics:', error);
        return null;
    }

    return data as MentorAnalytics;
}

// Calculate comprehensive mentor stats
export async function getMentorStats(mentorId: string): Promise<MentorStats> {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Get all sessions for this mentor
    const { data: sessions, error } = await supabase
        .from('mentoring_sessions')
        .select('*')
        .eq('mentor_id', mentorId);

    if (error || !sessions) {
        console.error('Error fetching sessions:', error);
        return getEmptyStats();
    }

    // Calculate stats
    const completedSessions = sessions.filter((s: any) => s.status === 'completed');
    const totalHours = completedSessions.reduce((sum: number, s: any) => sum + (s.duration_minutes || 30) / 60, 0);
    const uniqueMentees = new Set(sessions.map((s: any) => s.mentee_id)).size;

    // This week's sessions
    const sessionsThisWeek = completedSessions.filter(
        (s: any) => new Date(s.scheduled_for) >= startOfWeek
    ).length;

    // This month's sessions
    const sessionsThisMonth = completedSessions.filter(
        (s: any) => new Date(s.scheduled_for) >= startOfMonth
    ).length;

    // Last week's sessions (for growth calculation)
    const sessionsLastWeek = completedSessions.filter(
        (s: any) => {
            const date = new Date(s.scheduled_for);
            return date >= startOfLastWeek && date < startOfWeek;
        }
    ).length;

    // Hours this week/month
    const hoursThisWeek = completedSessions
        .filter((s: any) => new Date(s.scheduled_for) >= startOfWeek)
        .reduce((sum: number, s: any) => sum + (s.duration_minutes || 30) / 60, 0);

    const hoursThisMonth = completedSessions
        .filter((s: any) => new Date(s.scheduled_for) >= startOfMonth)
        .reduce((sum: number, s: any) => sum + (s.duration_minutes || 30) / 60, 0);

    // Growth calculations
    const weeklyGrowth = sessionsLastWeek > 0
        ? ((sessionsThisWeek - sessionsLastWeek) / sessionsLastWeek) * 100
        : sessionsThisWeek > 0 ? 100 : 0;

    // Get last session
    const lastSession = completedSessions.sort(
        (a: any, b: any) => new Date(b.scheduled_for).getTime() - new Date(a.scheduled_for).getTime()
    )[0];

    return {
        totalSessions: completedSessions.length,
        totalHours: Math.round(totalHours * 10) / 10,
        totalMentees: uniqueMentees,
        avgRating: null, // Would need to join with feedback table
        completionRate: sessions.length > 0 ? (completedSessions.length / sessions.length) * 100 : 0,
        lastSessionAt: lastSession ? new Date(lastSession.scheduled_for) : null,
        sessionsThisWeek,
        sessionsThisMonth,
        hoursThisWeek: Math.round(hoursThisWeek * 10) / 10,
        hoursThisMonth: Math.round(hoursThisMonth * 10) / 10,
        weeklyGrowth: Math.round(weeklyGrowth),
        monthlyGrowth: 0, // Would need historical data
    };
}

// Get session trends for charts
export async function getSessionTrends(
    mentorId: string,
    days: number = 30
): Promise<SessionTrend[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: sessions, error } = await supabase
        .from('mentoring_sessions')
        .select('scheduled_for, duration_minutes, status')
        .eq('mentor_id', mentorId)
        .eq('status', 'completed')
        .gte('scheduled_for', startDate.toISOString())
        .order('scheduled_for', { ascending: true });

    if (error || !sessions) {
        return [];
    }

    // Group by date
    const trendMap = new Map<string, { sessions: number; hours: number }>();

    sessions.forEach((session: any) => {
        const date = new Date(session.scheduled_for).toISOString().split('T')[0];
        const hours = (session.duration_minutes || 30) / 60;

        if (trendMap.has(date)) {
            const existing = trendMap.get(date)!;
            trendMap.set(date, {
                sessions: existing.sessions + 1,
                hours: existing.hours + hours,
            });
        } else {
            trendMap.set(date, { sessions: 1, hours });
        }
    });

    return Array.from(trendMap.entries()).map(([date, data]) => ({
        date,
        sessions: data.sessions,
        hours: Math.round(data.hours * 10) / 10,
    }));
}

// Get rating distribution
export async function getRatingDistribution(mentorId: string): Promise<RatingDistribution[]> {
    const { data: feedback, error } = await supabase
        .from('session_feedback')
        .select('rating, session:mentoring_sessions!inner(mentor_id)')
        .eq('session.mentor_id', mentorId);

    if (error || !feedback || feedback.length === 0) {
        return [1, 2, 3, 4, 5].map((rating) => ({ rating, count: 0, percentage: 0 }));
    }

    const distribution = [1, 2, 3, 4, 5].map((rating) => {
        const count = feedback.filter((f: any) => f.rating === rating).length;
        return {
            rating,
            count,
            percentage: Math.round((count / feedback.length) * 100),
        };
    });

    return distribution;
}

// Helper for empty stats
function getEmptyStats(): MentorStats {
    return {
        totalSessions: 0,
        totalHours: 0,
        totalMentees: 0,
        avgRating: null,
        completionRate: 0,
        lastSessionAt: null,
        sessionsThisWeek: 0,
        sessionsThisMonth: 0,
        hoursThisWeek: 0,
        hoursThisMonth: 0,
        weeklyGrowth: 0,
        monthlyGrowth: 0,
    };
}

// Get top metrics for a quick dashboard view
export function formatMetricDelta(current: number, previous: number): string {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const delta = ((current - previous) / previous) * 100;
    const sign = delta >= 0 ? '+' : '';
    return `${sign}${Math.round(delta)}%`;
}
