import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface AvailableMentor {
    id: string;
    user_id: string;
    full_name: string;
    avatar_url: string;
    headline: string;
    expertise: string[];
    available_since: string;
    available_until: string | null;
    status_message: string | null;
}

export interface AvailabilityStatus {
    user_id: string;
    is_available: boolean;
    available_since: string | null;
    available_until: string | null;
    status_message: string | null;
}

// Set mentor as available NOW
export async function goLive(
    userId: string,
    options?: {
        durationMinutes?: number; // Auto-expire after X minutes (default: 60)
        statusMessage?: string;   // "Driving home, happy to chat!"
    }
): Promise<boolean> {
    const durationMinutes = options?.durationMinutes || 60;
    const availableUntil = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

    // Note: live_availability table needs to be created via migration
    const { error } = await supabase
        .from('live_availability' as any)
        .upsert({
            user_id: userId,
            is_available: true,
            available_since: new Date().toISOString(),
            available_until: availableUntil,
            status_message: options?.statusMessage || null,
            updated_at: new Date().toISOString(),
        } as any, { onConflict: 'user_id' });

    if (error) {
        console.error('Failed to go live:', error);
        return false;
    }
    return true;
}

// Set mentor as unavailable
export async function goOffline(userId: string): Promise<boolean> {
    // Using raw query to avoid type chain issues with new table
    const { error } = await (supabase as any)
        .from('live_availability')
        .update({
            is_available: false,
            available_until: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

    if (error) {
        console.error('Failed to go offline:', error);
        return false;
    }
    return true;
}

// Get current availability status for a user
export async function getMyAvailability(userId: string): Promise<AvailabilityStatus | null> {
    const { data, error } = await supabase
        .from('live_availability' as any)
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Failed to get availability:', error);
    }
    return data as AvailabilityStatus | null;
}

// Get all currently available mentors
export async function getAvailableMentors(): Promise<AvailableMentor[]> {
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('live_availability' as any)
        .select(`
      *,
      profile:profiles!user_id(
        id,
        full_name,
        avatar_url,
        headline,
        matching_preferences(expertise_areas)
      )
    `)
        .eq('is_available', true)
        .gt('available_until', now)
        .order('available_since', { ascending: false });

    if (error) {
        console.error('Failed to get available mentors:', error);
        return [];
    }

    return ((data as any[]) || []).map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        full_name: item.profile?.full_name || 'Anonymous',
        avatar_url: item.profile?.avatar_url || '',
        headline: item.profile?.headline || '',
        expertise: item.profile?.matching_preferences?.expertise_areas || [],
        available_since: item.available_since,
        available_until: item.available_until,
        status_message: item.status_message,
    }));
}

// Subscribe to availability changes (realtime)
export function subscribeToAvailability(
    onUpdate: (mentors: AvailableMentor[]) => void
): RealtimeChannel {
    // Initial fetch
    getAvailableMentors().then(onUpdate);

    return supabase
        .channel('live_availability_changes')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'live_availability',
            },
            async () => {
                // Refetch all available mentors on any change
                const mentors = await getAvailableMentors();
                onUpdate(mentors);
            }
        )
        .subscribe();
}

// Unsubscribe from availability updates
export function unsubscribeFromAvailability(channel: RealtimeChannel): void {
    supabase.removeChannel(channel);
}

// Calculate time remaining for availability
export function getTimeRemaining(availableUntil: string): {
    minutes: number;
    display: string;
} {
    const remaining = new Date(availableUntil).getTime() - Date.now();
    const minutes = Math.max(0, Math.floor(remaining / 60000));

    if (minutes <= 0) return { minutes: 0, display: 'Ending soon' };
    if (minutes < 60) return { minutes, display: `${minutes}m left` };

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return { minutes, display: `${hours}h ${mins}m left` };
}

// Quick status messages for mentors
export const QUICK_STATUS_MESSAGES = [
    { emoji: '🚗', text: 'Driving home, happy to chat!' },
    { emoji: '☕', text: 'Coffee break, got 15 mins' },
    { emoji: '🎧', text: 'Working from home, available for calls' },
    { emoji: '🌙', text: 'Evening wind-down, here to listen' },
    { emoji: '🏃', text: 'Walking, voice chat only' },
    { emoji: '💻', text: 'Between meetings, quick questions welcome' },
];

// Duration presets for going live
export const DURATION_PRESETS = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 },
];
