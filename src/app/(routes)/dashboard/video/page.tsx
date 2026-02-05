'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoCall from '@/components/VideoCall';
import Link from 'next/link';

export default function VideoCallPage() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get('room') || '';
    const partnerName = searchParams.get('partner') || 'Your Partner';
    const topic = searchParams.get('topic') || 'Mentoring Session';

    const [isJoined, setIsJoined] = useState(false);
    const [showPreJoin, setShowPreJoin] = useState(true);

    // Demo user
    const userName = 'Demo User';
    const userEmail = 'demo@example.com';

    if (!roomId) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">No Room ID Provided</h1>
                    <p className="text-gray-400 mb-6">A valid room ID is required to join a video call.</p>
                    <Link
                        href="/dashboard/sessions"
                        className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition"
                    >
                        Back to Sessions
                    </Link>
                </div>
            </div>
        );
    }

    if (showPreJoin) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 text-center">
                    {/* Video Preview Placeholder */}
                    <div className="w-full aspect-video bg-gray-700 rounded-xl mb-6 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-teal-500/20 flex items-center justify-center">
                            <span className="text-4xl font-bold text-teal-400">{userName[0]}</span>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-white mb-2">Ready to join?</h1>
                    <p className="text-gray-400 mb-6">{topic} with {partnerName}</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                setShowPreJoin(false);
                                setIsJoined(true);
                            }}
                            className="w-full px-6 py-4 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Join Video Call
                        </button>

                        <Link
                            href="/dashboard/sessions"
                            className="w-full px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition"
                        >
                            Cancel
                        </Link>
                    </div>

                    {/* Device Check */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <p className="text-sm text-gray-500 mb-4">Before joining, make sure:</p>
                        <div className="flex justify-center gap-6">
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Camera
                            </div>
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Microphone
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen">
            <VideoCall
                roomId={roomId}
                userName={userName}
                userEmail={userEmail}
                sessionTopic={`${topic} with ${partnerName}`}
                onClose={() => {
                    window.location.href = '/dashboard/sessions';
                }}
            />
        </div>
    );
}
