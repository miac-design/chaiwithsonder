'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MentorStatsProps {
    stats?: {
        totalSessions: number;
        totalHours: number;
        totalMentees: number;
        avgRating: number | null;
        completionRate: number;
        sessionsThisWeek: number;
        sessionsThisMonth: number;
        hoursThisWeek: number;
        hoursThisMonth: number;
        weeklyGrowth: number;
    };
}

// Mock data for demo
const defaultStats = {
    totalSessions: 47,
    totalHours: 35.5,
    totalMentees: 23,
    avgRating: 4.8,
    completionRate: 94,
    sessionsThisWeek: 5,
    sessionsThisMonth: 18,
    hoursThisWeek: 4.5,
    hoursThisMonth: 15,
    weeklyGrowth: 12,
};

type TimeRange = 'week' | 'month' | 'all';

export default function MentorStats({ stats = defaultStats }: MentorStatsProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('month');

    const getSessionCount = () => {
        switch (timeRange) {
            case 'week': return stats.sessionsThisWeek;
            case 'month': return stats.sessionsThisMonth;
            default: return stats.totalSessions;
        }
    };

    const getHoursCount = () => {
        switch (timeRange) {
            case 'week': return stats.hoursThisWeek;
            case 'month': return stats.hoursThisMonth;
            default: return stats.totalHours;
        }
    };

    const getTimeLabel = () => {
        switch (timeRange) {
            case 'week': return 'This Week';
            case 'month': return 'This Month';
            default: return 'All Time';
        }
    };

    // Generate mock chart data
    const chartData = Array.from({ length: 7 }, (_, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        sessions: Math.floor(Math.random() * 4),
        hours: Math.round(Math.random() * 3 * 10) / 10,
    }));

    const maxSessions = Math.max(...chartData.map(d => d.sessions), 1);

    return (
        <div className="space-y-6">
            {/* Time Range Toggle */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Your Impact</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {(['week', 'month', 'all'] as TimeRange[]).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${timeRange === range
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {range === 'week' ? 'Week' : range === 'month' ? 'Month' : 'All'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Sessions */}
                <motion.div
                    key={`sessions-${timeRange}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Sessions</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{getSessionCount()}</p>
                    {timeRange !== 'all' && stats.weeklyGrowth !== 0 && (
                        <p className={`text-sm mt-1 ${stats.weeklyGrowth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {stats.weeklyGrowth > 0 ? '↑' : '↓'} {Math.abs(stats.weeklyGrowth)}% vs last {timeRange}
                        </p>
                    )}
                </motion.div>

                {/* Hours */}
                <motion.div
                    key={`hours-${timeRange}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Hours</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{getHoursCount()}</p>
                    <p className="text-sm text-gray-400 mt-1">{getTimeLabel()}</p>
                </motion.div>

                {/* Mentees */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Mentees</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalMentees}</p>
                    <p className="text-sm text-gray-400 mt-1">People helped</p>
                </motion.div>

                {/* Rating */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Rating</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        {stats.avgRating ? stats.avgRating.toFixed(1) : '—'}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-4 h-4 ${stats.avgRating && star <= Math.round(stats.avgRating)
                                        ? 'text-amber-400'
                                        : 'text-gray-200'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Weekly Activity</h3>
                    <span className="text-sm text-gray-500">Sessions per day</span>
                </div>

                <div className="flex items-end justify-between h-32 gap-2">
                    {chartData.map((day, i) => (
                        <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(day.sessions / maxSessions) * 100}%` }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className="w-full bg-teal-500 rounded-t-md min-h-[4px]"
                                style={{ minHeight: day.sessions > 0 ? '16px' : '4px' }}
                            />
                            <span className="text-xs text-gray-400">{day.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-semibold text-gray-900">Session Completion Rate</h3>
                        <p className="text-sm text-gray-500">Percentage of scheduled sessions completed</p>
                    </div>
                    <span className="text-2xl font-bold text-teal-600">{Math.round(stats.completionRate)}%</span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.completionRate}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                    />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
}
