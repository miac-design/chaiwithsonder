'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import SessionNotes from '@/components/SessionNotes';
import VideoCall from '@/components/VideoCall';

// Mock user
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};

// Mock session data
const mockSession = {
    id: 'session-123',
    partnerName: 'Sarah Chen',
    partnerAvatar: null,
    partnerBio: 'Senior Product Manager at Tech Company. 10+ years experience in product strategy and team leadership.',
    topic: 'Career transition from marketing to tech',
    scheduledAt: '2026-02-05T15:00:00',
    duration: 30,
    status: 'confirmed',
    meetingUrl: 'https://meet.jit.si/ChaiChat-session-123',
    notes: 'Want to discuss: portfolio building, networking strategies, and interview preparation.',
};

type ViewMode = 'details' | 'video' | 'notes';

export default function SessionDetailPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('details');
    const [showVideoEmbed, setShowVideoEmbed] = useState(false);

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        };
    };

    const { date, time } = formatDateTime(mockSession.scheduledAt);
    const isPast = new Date(mockSession.scheduledAt) <= new Date();

    return (
        <DashboardLayout user={mockUser}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/sessions"
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Session Details</h1>
                        <p className="text-gray-500">{mockSession.topic}</p>
                    </div>
                </div>

                {/* View Mode Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                    {(['details', 'notes', 'video'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-3 font-medium capitalize transition-colors relative ${viewMode === mode
                                    ? 'text-teal-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {mode === 'video' ? 'Video Call' : mode}
                            {viewMode === mode && (
                                <motion.div
                                    layoutId="session-tab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Details View */}
                {viewMode === 'details' && (
                    <div className="space-y-6">
                        {/* Session Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-teal-600 font-bold text-2xl">
                                        {mockSession.partnerName[0]}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900">{mockSession.partnerName}</h2>
                                    <p className="text-gray-500 text-sm mt-1">{mockSession.partnerBio}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${mockSession.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {mockSession.status}
                                </span>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Date</p>
                                    <p className="font-medium text-gray-900">{date}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Time</p>
                                    <p className="font-medium text-gray-900">{time} • {mockSession.duration} min</p>
                                </div>
                            </div>

                            {mockSession.notes && (
                                <>
                                    <hr className="my-6 border-gray-100" />
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Session Notes</p>
                                        <p className="text-gray-700">{mockSession.notes}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {!isPast && mockSession.meetingUrl && (
                                <Link
                                    href={`/dashboard/video?room=ChaiChat-session-123&partner=${encodeURIComponent(mockSession.partnerName)}&topic=${encodeURIComponent(mockSession.topic)}`}
                                    className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Join Video Call
                                </Link>
                            )}
                            <button
                                onClick={() => setViewMode('notes')}
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Session Notes
                            </button>
                        </div>
                    </div>
                )}

                {/* Notes View */}
                {viewMode === 'notes' && (
                    <SessionNotes
                        sessionId={mockSession.id}
                        isMentor={mockUser.isMentor}
                        initialNotes=""
                        initialActionItems={[]}
                        onSave={(notes, items) => {
                            console.log('Saving notes:', notes, items);
                        }}
                    />
                )}

                {/* Video View */}
                {viewMode === 'video' && (
                    <div className="space-y-4">
                        {!showVideoEmbed ? (
                            <div className="bg-gray-900 rounded-2xl p-12 text-center">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Ready to start your call?</h3>
                                <p className="text-gray-400 mb-6">
                                    You&apos;ll be joined into a video call with {mockSession.partnerName}
                                </p>
                                <button
                                    onClick={() => setShowVideoEmbed(true)}
                                    className="px-8 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition"
                                >
                                    Start Video Call
                                </button>
                            </div>
                        ) : (
                            <VideoCall
                                roomId="ChaiChat-session-123"
                                userName={mockUser.name}
                                userEmail={mockUser.email}
                                sessionTopic={mockSession.topic}
                                isEmbedded={true}
                                onClose={() => setShowVideoEmbed(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
