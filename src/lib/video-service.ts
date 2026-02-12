/**
 * Video Service - Jitsi Meet Integration
 * Handles video room creation and management for mentoring sessions
 */

// Jitsi Meet configuration
const JITSI_DOMAIN = 'meet.jit.si';
const APP_PREFIX = 'ChaiChat';

/**
 * Generate a unique room ID for a session
 */
export function generateRoomId(sessionId: string): string {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${APP_PREFIX}-${sessionId}-${randomSuffix}`;
}

/**
 * Get the full Jitsi meeting URL for a session
 */
export function getJitsiUrl(roomId: string): string {
    return `https://${JITSI_DOMAIN}/${roomId}`;
}

/**
 * Generate embedded Jitsi configuration
 */
export interface JitsiConfig {
    roomName: string;
    domain: string;
    displayName?: string;
    email?: string;
    avatarUrl?: string;
    startWithAudioMuted?: boolean;
    startWithVideoMuted?: boolean;
    subject?: string;
}

export function getJitsiConfig(
    sessionId: string,
    userName?: string,
    userEmail?: string,
    sessionTopic?: string
): JitsiConfig {
    return {
        roomName: generateRoomId(sessionId),
        domain: JITSI_DOMAIN,
        displayName: userName,
        email: userEmail,
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        subject: sessionTopic || 'ChaiChat Mentoring Session',
    };
}

/**
 * Get Jitsi embed URL with configuration
 */
export function getJitsiEmbedUrl(
    roomId: string,
    config?: Partial<JitsiConfig>
): string {
    const params = new URLSearchParams();

    if (config?.displayName) {
        params.set('displayName', config.displayName);
    }
    if (config?.subject) {
        params.set('subject', config.subject);
    }

    const queryString = params.toString();
    const baseUrl = `https://${JITSI_DOMAIN}/${roomId}`;

    return queryString ? `${baseUrl}#${queryString}` : baseUrl;
}

/**
 * Create a new video session for a mentoring session
 */
export async function createVideoSession(
    sessionId: string,
    mentorName: string,
    menteeName: string,
    topic: string
): Promise<{ roomId: string; url: string }> {
    const roomId = generateRoomId(sessionId);
    const url = getJitsiUrl(roomId);

    // In a full implementation, you might want to:
    // 1. Store the room ID in the database
    // 2. Set up moderation settings
    // 3. Configure recording if needed

    return { roomId, url };
}

/**
 * Check if a video session is currently active
 * Note: Jitsi doesn't have a built-in API for this without self-hosting
 */
export function isSessionActive(roomId: string): Promise<boolean> {
    // For self-hosted Jitsi, you could query the SRTP API
    // For meet.jit.si, we just assume it's available
    return Promise.resolve(true);
}
