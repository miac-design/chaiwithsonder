'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

// Mock user
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};

// Mock sessions
const mockSessions = [
    {
        id: '1',
        partnerName: 'Sarah Chen',
        partnerAvatar: null,
        topic: 'Career transition from marketing to tech',
        scheduledAt: '2026-02-04T15:00:00',
        duration: 30,
        status: 'confirmed',
        meetingUrl: 'https://meet.jit.si/chai-session-123',
    },
    {
        id: '2',
        partnerName: 'James Wilson',
        partnerAvatar: null,
        topic: 'Technical interview preparation',
        scheduledAt: '2026-02-05T10:00:00',
        duration: 45,
        status: 'confirmed',
        meetingUrl: 'https://meet.jit.si/chai-session-456',
    },
    {
        id: '3',
        partnerName: 'Maria Garcia',
        partnerAvatar: null,
        topic: 'Leadership and team management',
        scheduledAt: '2026-02-06T14:00:00',
        duration: 30,
        status: 'scheduled',
        meetingUrl: null,
    },
    {
        id: '4',
        partnerName: 'Alex Kumar',
        partnerAvatar: null,
        topic: 'Startup strategy discussion',
        scheduledAt: '2026-01-28T11:00:00',
        duration: 30,
        status: 'completed',
        meetingUrl: null,
    },
];

type TabType = 'upcoming' | 'past';

export default function SessionsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');

    const now = new Date();
    const upcomingSessions = mockSessions.filter(
        (s) => new Date(s.scheduledAt) > now && s.status !== 'completed'
    );
    const pastSessions = mockSessions.filter(
        (s) => new Date(s.scheduledAt) <= now || s.status === 'completed'
    );

    const sessions = activeTab === 'upcoming' ? upcomingSessions : pastSessions;

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let dayStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        if (date.toDateString() === today.toDateString()) dayStr = 'Today';
        else if (date.toDateString() === tomorrow.toDateString()) dayStr = 'Tomorrow';

        const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        return { day: dayStr, time: timeStr };
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            confirmed: 'bg-green-100 text-green-700',
            scheduled: 'bg-blue-100 text-blue-700',
            completed: 'bg-gray-100 text-gray-600',
            cancelled: 'bg-red-100 text-red-700',
        };
        return styles[status] || styles.scheduled;
    };

    return (
        <DashboardLayout user={mockUser}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
                        <p className="text-gray-600 mt-1">Manage your mentoring sessions</p>
                    </div>
                    <Link
                        href="/mentor"
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition shadow-sm"
                    >
                        + Schedule New
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-4 py-3 font-medium transition-colors relative ${activeTab === 'upcoming' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Upcoming
                        {upcomingSessions.length > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full">
                                {upcomingSessions.length}
                            </span>
                        )}
                        {activeTab === 'upcoming' && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-4 py-3 font-medium transition-colors relative ${activeTab === 'past' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Past Sessions
                        {activeTab === 'past' && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                            />
                        )}
                    </button>
                </div>

                {/* Sessions List */}
                <div className="space-y-4">
                    {sessions.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {activeTab === 'upcoming' ? 'No upcoming sessions' : 'No past sessions'}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {activeTab === 'upcoming'
                                    ? 'Schedule a session with a mentor to get started'
                                    : 'Your completed sessions will appear here'}
                            </p>
                            {activeTab === 'upcoming' && (
                                <Link
                                    href="/mentor"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition"
                                >
                                    Find a Mentor
                                </Link>
                            )}
                        </div>
                    ) : (
                        sessions.map((session, idx) => {
                            const { day, time } = formatDateTime(session.scheduledAt);
                            const isPast = new Date(session.scheduledAt) <= now;

                            return (
                                <motion.div
                                    key={session.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            {/* Avatar */}
                                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-teal-600 font-semibold text-lg">
                                                    {session.partnerName[0]}
                                                </span>
                                            </div>

                                            {/* Info */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-semibold text-gray-900">{session.partnerName}</h3>
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(session.status)}`}>
                                                        {session.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">{session.topic}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {day}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {time} • {session.duration} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {!isPast && session.meetingUrl && (
                                                <a
                                                    href={session.meetingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition text-sm"
                                                >
                                                    Join Call
                                                </a>
                                            )}
                                            {!isPast && !session.meetingUrl && (
                                                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition text-sm">
                                                    Add to Calendar
                                                </button>
                                            )}
                                            {isPast && session.status === 'completed' && (
                                                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition text-sm">
                                                    Leave Feedback
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
