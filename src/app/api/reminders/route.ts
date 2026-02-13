/**
 * API Route: Send Session Reminders
 * Cron job endpoint to process and send scheduled reminders
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendReminderEmail, ReminderType } from '@/lib/reminder-service';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

interface Profile {
    id: string;
    name: string;
    email: string;
}

// Note: Supabase returns arrays for joined data when using select with joins
interface RawSession {
    id: string;
    scheduled_for: string;
    duration_minutes: number;
    topic: string;
    status: string;
    mentor: Profile[] | Profile;
    mentee: Profile[] | Profile;
}

// Helper to extract profile from join result (can be array or object)
function getProfile(data: Profile[] | Profile | null | undefined): Profile | null {
    if (!data) return null;
    if (Array.isArray(data)) {
        return data[0] || null;
    }
    return data;
}

export async function POST(request: NextRequest) {
    try {
        // Verify cron secret (for Vercel Cron)
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            // Allow for testing without secret in development
            if (process.env.NODE_ENV === 'production') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const now = new Date();
        let sentCount = 0;

        // Get upcoming sessions that need reminders
        const { data: rawSessions, error: sessionsError } = await supabase
            .from('mentoring_sessions')
            .select(`
        id,
        scheduled_for,
        duration_minutes,
        topic,
        status,
        mentor:profiles!mentor_id(id, name, email),
        mentee:profiles!mentee_id(id, name, email)
      `)
            .eq('status', 'confirmed')
            .gte('scheduled_for', now.toISOString())
            .lte('scheduled_for', new Date(now.getTime() + 25 * 60 * 60 * 1000).toISOString());

        if (sessionsError) {
            console.error('Error fetching sessions:', sessionsError);
            return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
        }

        const sessions = (rawSessions || []) as RawSession[];

        // Get already sent reminders
        const sessionIds = sessions.map(s => s.id);
        const { data: sentReminders, error: remindersError } = await supabase
            .from('session_reminders')
            .select('session_id, user_id, reminder_type')
            .in('session_id', sessionIds.length > 0 ? sessionIds : ['none'])
            .not('sent_at', 'is', null);

        if (remindersError) {
            console.error('Error fetching sent reminders:', remindersError);
        }

        interface SentReminder {
            session_id: string;
            user_id: string;
            reminder_type: string;
        }

        const sentReminderSet = new Set(
            ((sentReminders || []) as SentReminder[]).map(r =>
                `${r.session_id}-${r.user_id}-${r.reminder_type}`
            )
        );

        // Process each session
        for (const session of sessions) {
            const mentor = getProfile(session.mentor);
            const mentee = getProfile(session.mentee);

            if (!mentor || !mentee) continue;

            const sessionTime = new Date(session.scheduled_for);
            const timeDiff = sessionTime.getTime() - now.getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60);

            // Determine which reminders to send
            const remindersToSend: { type: ReminderType; hours: number }[] = [
                { type: '24h', hours: 24 },
                { type: '1h', hours: 1 },
                { type: '15min', hours: 0.25 },
            ];

            for (const { type, hours } of remindersToSend) {
                // Check if it's time to send this reminder
                if (hoursDiff <= hours && hoursDiff > (hours === 24 ? 1 : hours === 1 ? 0.25 : 0)) {
                    // Send to both mentor and mentee
                    const participants = [
                        { profile: mentor, partner: mentee },
                        { profile: mentee, partner: mentor }
                    ];

                    for (const { profile, partner } of participants) {
                        const key = `${session.id}-${profile.id}-${type}`;

                        if (!sentReminderSet.has(key)) {
                            // Send the reminder
                            const success = await sendReminderEmail({
                                sessionId: session.id,
                                userId: profile.id,
                                userEmail: profile.email,
                                userName: profile.name,
                                partnerName: partner.name,
                                sessionTopic: session.topic || 'Mentoring Session',
                                scheduledFor: sessionTime,
                                reminderType: type,
                                meetingUrl: `https://chaichathub.com/dashboard/video?room=ChaiChat-${session.id}`,
                            });

                            if (success) {
                                // Record the sent reminder
                                await supabase.from('session_reminders').insert({
                                    session_id: session.id,
                                    user_id: profile.id,
                                    reminder_type: type,
                                    scheduled_for: sessionTime.toISOString(),
                                    sent_at: now.toISOString(),
                                });
                                sentCount++;
                            }
                        }
                    }
                }
            }
        }

        // Also process follow-up reminders for completed sessions
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        const { data: rawCompletedSessions } = await supabase
            .from('mentoring_sessions')
            .select(`
        id,
        scheduled_for,
        topic,
        mentor:profiles!mentor_id(id, name, email),
        mentee:profiles!mentee_id(id, name, email)
      `)
            .eq('status', 'completed')
            .gte('scheduled_for', oneHourAgo.toISOString())
            .lte('scheduled_for', now.toISOString());

        const completedSessions = (rawCompletedSessions || []) as RawSession[];

        for (const session of completedSessions) {
            const mentor = getProfile(session.mentor);
            const mentee = getProfile(session.mentee);

            if (!mentor || !mentee) continue;

            const participants = [
                { profile: mentor, partner: mentee },
                { profile: mentee, partner: mentor }
            ];

            for (const { profile, partner } of participants) {
                const key = `${session.id}-${profile.id}-follow_up`;

                if (!sentReminderSet.has(key)) {
                    const success = await sendReminderEmail({
                        sessionId: session.id,
                        userId: profile.id,
                        userEmail: profile.email,
                        userName: profile.name,
                        partnerName: partner.name,
                        sessionTopic: session.topic || 'Mentoring Session',
                        scheduledFor: new Date(session.scheduled_for),
                        reminderType: 'follow_up',
                    });

                    if (success) {
                        await supabase.from('session_reminders').insert({
                            session_id: session.id,
                            user_id: profile.id,
                            reminder_type: 'follow_up',
                            scheduled_for: new Date(session.scheduled_for).toISOString(),
                            sent_at: now.toISOString(),
                        });
                        sentCount++;
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed reminders. Sent ${sentCount} emails.`,
            sentCount,
        });
    } catch (error) {
        console.error('Error processing reminders:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// GET for testing/debugging
export async function GET() {
    return NextResponse.json({
        endpoint: '/api/reminders',
        description: 'Session reminder cron job',
        method: 'POST',
        note: 'Add to vercel.json crons to run automatically',
    });
}
