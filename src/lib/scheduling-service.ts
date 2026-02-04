/**
 * Scheduling Service - Cal.com Integration
 * 
 * This service provides Cal.com scheduling integration for mentor sessions.
 * 
 * SETUP REQUIRED:
 * 1. Create a Cal.com account at https://cal.com
 * 2. Create an event type for mentoring sessions
 * 3. Get your API key from Cal.com settings
 * 4. Add CALCOM_API_KEY to your .env.local
 * 5. Add CAL_COM_EVENT_SLUG to your .env.local
 */

const CAL_API_BASE = 'https://api.cal.com/v1';
const CAL_API_KEY = process.env.CALCOM_API_KEY || '';
const CAL_EVENT_SLUG = process.env.CAL_COM_EVENT_SLUG || 'mentoring-session';

export interface TimeSlot {
    time: string;
    attendees: number;
}

export interface AvailableSlots {
    date: string;
    slots: TimeSlot[];
}

export interface BookingData {
    eventTypeId: number;
    start: string;
    end: string;
    name: string;
    email: string;
    notes?: string;
    timeZone?: string;
}

export interface Booking {
    id: number;
    uid: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    attendees: { email: string; name: string }[];
    status: 'upcoming' | 'completed' | 'cancelled';
    meetingUrl?: string;
}

// Generate Cal.com embed URL for a mentor
export function getCalEmbedUrl(mentorUsername: string, eventSlug: string = CAL_EVENT_SLUG): string {
    return `https://cal.com/${mentorUsername}/${eventSlug}`;
}

// Generate inline booking widget URL
export function getCalInlineUrl(mentorUsername: string, options?: {
    eventSlug?: string;
    prefillName?: string;
    prefillEmail?: string;
}): string {
    const slug = options?.eventSlug || CAL_EVENT_SLUG;
    const baseUrl = `https://cal.com/${mentorUsername}/${slug}`;

    const params = new URLSearchParams();
    if (options?.prefillName) params.set('name', options.prefillName);
    if (options?.prefillEmail) params.set('email', options.prefillEmail);

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

// Fetch availability for a mentor (requires API key)
export async function getMentorAvailability(
    mentorUsername: string,
    dateFrom: string,
    dateTo: string
): Promise<AvailableSlots[]> {
    if (!CAL_API_KEY) {
        console.warn('Cal.com API key not configured');
        return [];
    }

    try {
        const response = await fetch(
            `${CAL_API_BASE}/availability?username=${mentorUsername}&dateFrom=${dateFrom}&dateTo=${dateTo}&apiKey=${CAL_API_KEY}`,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) throw new Error('Failed to fetch availability');

        const data = await response.json();
        return data.availability || [];
    } catch (error) {
        console.error('Cal.com availability error:', error);
        return [];
    }
}

// Create a booking (requires API key)
export async function createBooking(booking: BookingData): Promise<Booking | null> {
    if (!CAL_API_KEY) {
        console.warn('Cal.com API key not configured');
        return null;
    }

    try {
        const response = await fetch(`${CAL_API_BASE}/bookings?apiKey=${CAL_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...booking,
                timeZone: booking.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            }),
        });

        if (!response.ok) throw new Error('Failed to create booking');

        const data = await response.json();
        return data.booking;
    } catch (error) {
        console.error('Cal.com booking error:', error);
        return null;
    }
}

// Get user's bookings (requires API key)
export async function getUserBookings(email: string): Promise<Booking[]> {
    if (!CAL_API_KEY) {
        console.warn('Cal.com API key not configured');
        return [];
    }

    try {
        const response = await fetch(
            `${CAL_API_BASE}/bookings?apiKey=${CAL_API_KEY}`,
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const data = await response.json();
        // Filter bookings for the user
        return (data.bookings || []).filter((b: Booking) =>
            b.attendees.some(a => a.email === email)
        );
    } catch (error) {
        console.error('Cal.com bookings error:', error);
        return [];
    }
}

// Cancel a booking (requires API key)
export async function cancelBooking(bookingId: number, reason?: string): Promise<boolean> {
    if (!CAL_API_KEY) {
        console.warn('Cal.com API key not configured');
        return false;
    }

    try {
        const response = await fetch(`${CAL_API_BASE}/bookings/${bookingId}?apiKey=${CAL_API_KEY}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cancellationReason: reason }),
        });

        return response.ok;
    } catch (error) {
        console.error('Cal.com cancel error:', error);
        return false;
    }
}

// React component props for Cal.com embed
export function getCalEmbedProps(mentorUsername: string, options?: {
    eventSlug?: string;
    theme?: 'light' | 'dark' | 'auto';
    hideEventTypeDetails?: boolean;
    prefillName?: string;
    prefillEmail?: string;
}): Record<string, any> {
    return {
        calLink: `${mentorUsername}/${options?.eventSlug || CAL_EVENT_SLUG}`,
        style: { height: '100%', width: '100%', minHeight: '500px' },
        config: {
            theme: options?.theme || 'light',
            hideEventTypeDetails: options?.hideEventTypeDetails || false,
            ...(options?.prefillName && { name: options.prefillName }),
            ...(options?.prefillEmail && { email: options.prefillEmail }),
        },
    };
}
