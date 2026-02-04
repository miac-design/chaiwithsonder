'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import GoLiveToggle from '@/components/GoLiveToggle';
import { getMyAvailability, QUICK_STATUS_MESSAGES, type AvailabilityStatus } from '@/lib/availability-service';

// Mock user
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};

// Days of week for scheduling
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

export default function AvailabilityPage() {
    const [liveStatus, setLiveStatus] = useState<AvailabilityStatus | null>(null);
    const [weeklySchedule, setWeeklySchedule] = useState<Record<string, string[]>>({
        Monday: ['10:00 AM', '11:00 AM', '2:00 PM'],
        Tuesday: ['9:00 AM', '3:00 PM'],
        Wednesday: ['10:00 AM', '11:00 AM'],
        Thursday: [],
        Friday: ['1:00 PM', '2:00 PM', '3:00 PM'],
        Saturday: [],
        Sunday: [],
    });

    const toggleTimeSlot = (day: string, time: string) => {
        setWeeklySchedule((prev) => {
            const daySlots = prev[day] || [];
            if (daySlots.includes(time)) {
                return { ...prev, [day]: daySlots.filter((t) => t !== time) };
            } else {
                return { ...prev, [day]: [...daySlots, time].sort() };
            }
        });
    };

    const handleLiveStatusChange = (isLive: boolean) => {
        // Update UI state
        console.log('Live status changed:', isLive);
    };

    return (
        <DashboardLayout user={mockUser}>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
                    <p className="text-gray-600 mt-1">Manage when mentees can book sessions with you</p>
                </div>

                {/* Go Live Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Spontaneous Availability</h2>
                            <p className="text-white/80 max-w-md">
                                Got some free time right now? Go live and let mentees know you're available for a quick chat. Perfect for commutes, coffee breaks, or evening wind-downs.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {QUICK_STATUS_MESSAGES.slice(0, 3).map((msg, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                        {msg.emoji} {msg.text.split(',')[0]}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <GoLiveToggle userId={mockUser.id} onStatusChange={handleLiveStatusChange} />
                        </div>
                    </div>
                </motion.div>

                {/* Weekly Schedule */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Set your regular availability. Mentees can book sessions during these times.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                                        Day
                                    </th>
                                    {TIME_SLOTS.map((time) => (
                                        <th key={time} className="px-2 py-3 text-center text-xs font-medium text-gray-500">
                                            {time.replace(' AM', 'a').replace(' PM', 'p')}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {DAYS.map((day) => (
                                    <tr key={day} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {day}
                                        </td>
                                        {TIME_SLOTS.map((time) => {
                                            const isSelected = weeklySchedule[day]?.includes(time);
                                            return (
                                                <td key={time} className="px-2 py-4 text-center">
                                                    <button
                                                        onClick={() => toggleTimeSlot(day, time)}
                                                        className={`w-8 h-8 rounded-lg transition-all ${isSelected
                                                                ? 'bg-teal-500 text-white shadow-sm'
                                                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {isSelected ? '✓' : ''}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            {Object.values(weeklySchedule).flat().length} time slots selected
                        </p>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition">
                            Save Schedule
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Session Preferences</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Default Session Length
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent">
                                <option value="15">15 minutes</option>
                                <option value="30" selected>30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">1 hour</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Open Sessions
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent">
                                <option value="3">3 sessions</option>
                                <option value="5" selected>5 sessions</option>
                                <option value="10">10 sessions</option>
                                <option value="0">Unlimited</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buffer Between Sessions
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent">
                                <option value="0">No buffer</option>
                                <option value="5">5 minutes</option>
                                <option value="15" selected>15 minutes</option>
                                <option value="30">30 minutes</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Advance Booking Limit
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent">
                                <option value="7">1 week ahead</option>
                                <option value="14" selected>2 weeks ahead</option>
                                <option value="30">1 month ahead</option>
                                <option value="60">2 months ahead</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cal.com Integration Notice */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Connect Cal.com for Advanced Scheduling</h3>
                            <p className="text-blue-700 text-sm mt-1">
                                Sync your calendar, avoid double-bookings, and let mentees see your real-time availability.
                            </p>
                            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                Connect Cal.com
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
