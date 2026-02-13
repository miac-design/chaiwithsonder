'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import LiveNowFeed from '@/components/LiveNowFeed';

// Mock user for demo
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};

// Mock stats with SVG icons
const statsConfig = [
    {
        label: 'Active Conversations', value: 3, color: 'teal', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        )
    },
    {
        label: 'Sessions This Month', value: 7, color: 'blue', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        label: 'Hours Mentored', value: 12, color: 'purple', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        label: 'People Helped', value: 15, color: 'green', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    },
];

// Mock upcoming sessions
const upcomingSessions = [
    { id: 1, mentee: 'Sarah Chen', time: 'Today, 3:00 PM', topic: 'Career transition advice' },
    { id: 2, mentee: 'James Wilson', time: 'Tomorrow, 10:00 AM', topic: 'Tech interview prep' },
    { id: 3, mentee: 'Maria Garcia', time: 'Feb 6, 2:00 PM', topic: 'Leadership skills' },
];

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('Hello');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning, time for chai');
        else if (hour < 18) setGreeting('Good afternoon, time for chai');
        else setGreeting('Good evening, time for chai');
    }, []);

    return (
        <DashboardLayout user={mockUser}>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    {greeting}, {mockUser.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-600 mt-1">
                    Here's what's happening with your mentorship journey.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statsConfig.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span className={`text-${stat.color}-500`}>{stat.icon}</span>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming Sessions */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Upcoming Chais</h2>
                        <Link href="/dashboard/sessions" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                            View all →
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {upcomingSessions.map((session) => (
                            <div key={session.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold">
                                            {session.mentee[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{session.mentee}</h4>
                                        <p className="text-sm text-gray-500">{session.topic}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{session.time}</p>
                                    <button className="mt-1 text-sm text-teal-600 hover:text-teal-700 font-medium">
                                        Join →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {upcomingSessions.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            <p>No upcoming sessions</p>
                            <Link href="/mentor" className="text-teal-600 text-sm font-medium mt-2 inline-block">
                                Find a mentor to schedule
                            </Link>
                        </div>
                    )}
                </div>

                {/* Live Now Sidebar */}
                <div>
                    <LiveNowFeed currentUserId={mockUser.id} compact maxItems={3} />

                    {/* Quick Actions */}
                    <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/mentor"
                                className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="font-medium">Find a Mentor</span>
                            </Link>
                            <Link
                                href="/dashboard/messages"
                                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="font-medium">Chai Talk</span>
                            </Link>
                            {mockUser.isMentor && (
                                <Link
                                    href="/dashboard/availability"
                                    className="flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition"
                                >
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="font-medium">Go Live</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
