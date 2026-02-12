'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { RealtimeChannel } from '@supabase/supabase-js';
import {
    subscribeToAvailability,
    unsubscribeFromAvailability,
    getTimeRemaining,
    type AvailableMentor,
} from '@/lib/availability-service';
import { startConversation } from '@/lib/chat-service';

interface LiveNowFeedProps {
    currentUserId?: string;
    compact?: boolean;
    maxItems?: number;
}

export default function LiveNowFeed({ currentUserId, compact = false, maxItems = 5 }: LiveNowFeedProps) {
    const [mentors, setMentors] = useState<AvailableMentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [connectingTo, setConnectingTo] = useState<string | null>(null);
    const channelRef = useState<RealtimeChannel | null>(null);

    useEffect(() => {
        const channel = subscribeToAvailability((availableMentors) => {
            setMentors(availableMentors.slice(0, maxItems));
            setIsLoading(false);
        });

        return () => {
            if (channel) {
                unsubscribeFromAvailability(channel);
            }
        };
    }, [maxItems]);

    const handleQuickConnect = async (mentorId: string) => {
        if (!currentUserId) return;

        setConnectingTo(mentorId);
        try {
            await startConversation(mentorId, currentUserId);
            // Redirect to messages or open chat
            window.location.href = '/dashboard/messages';
        } catch (error) {
            console.error('Failed to connect:', error);
        } finally {
            setConnectingTo(null);
        }
    };

    if (isLoading) {
        return (
            <div className={`${compact ? 'p-4' : 'p-6'} bg-white rounded-2xl border border-gray-100`}>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (mentors.length === 0) {
        return (
            <div className={`${compact ? 'p-4' : 'p-6'} bg-white rounded-2xl border border-gray-100`}>
                <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-300" />
                    </span>
                    <h3 className="font-semibold text-gray-700">Live Now</h3>
                </div>
                <div className="text-center py-8 text-gray-500">
                    <p className="mb-2">No mentors are live right now</p>
                    <p className="text-sm text-gray-400">Check back later or browse all mentors</p>
                    <Link
                        href="/mentor"
                        className="inline-block mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                    >
                        Browse Mentors
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`${compact ? 'p-4' : 'p-6'} bg-white rounded-2xl border border-gray-100 shadow-sm`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                    </span>
                    <h3 className="font-semibold text-gray-900">Live Now</h3>
                    <span className="text-sm text-gray-500">({mentors.length})</span>
                </div>
                <Link
                    href="/mentor?filter=live"
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                    See all →
                </Link>
            </div>

            {/* Mentor List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {mentors.map((mentor, idx) => {
                        const timeLeft = getTimeRemaining(mentor.available_until || '');

                        return (
                            <motion.div
                                key={mentor.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                                {/* Avatar with live indicator */}
                                <div className="relative flex-shrink-0">
                                    {mentor.avatar_url ? (
                                        <img
                                            src={mentor.avatar_url}
                                            alt={mentor.full_name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                                            <span className="text-teal-600 font-semibold text-lg">
                                                {mentor.full_name[0]}
                                            </span>
                                        </div>
                                    )}
                                    {/* Green live dot */}
                                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white" />
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-gray-900 truncate">
                                            {mentor.full_name}
                                        </h4>
                                        <span className="text-xs text-gray-400">
                                            {timeLeft.display}
                                        </span>
                                    </div>
                                    {mentor.status_message ? (
                                        <p className="text-sm text-gray-500 truncate">
                                            {mentor.status_message}
                                        </p>
                                    ) : mentor.headline ? (
                                        <p className="text-sm text-gray-500 truncate">
                                            {mentor.headline}
                                        </p>
                                    ) : null}
                                    {mentor.expertise.length > 0 && (
                                        <div className="flex gap-1 mt-1">
                                            {mentor.expertise.slice(0, 2).map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Connect Button */}
                                {currentUserId && currentUserId !== mentor.user_id && (
                                    <button
                                        onClick={() => handleQuickConnect(mentor.user_id)}
                                        disabled={connectingTo === mentor.user_id}
                                        className="flex-shrink-0 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 disabled:opacity-50 transition-all shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100"
                                    >
                                        {connectingTo === mentor.user_id ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                            </span>
                                        ) : (
                                            'Chat'
                                        )}
                                    </button>
                                )}

                                {/* View profile link for non-logged in */}
                                {!currentUserId && (
                                    <Link
                                        href={`/mentor/${mentor.user_id}`}
                                        className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        View
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Footer */}
            {mentors.length >= maxItems && (
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link
                        href="/mentor?filter=live"
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                        View all live mentors →
                    </Link>
                </div>
            )}
        </div>
    );
}
