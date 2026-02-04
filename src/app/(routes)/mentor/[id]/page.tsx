'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { startConversation } from '@/lib/chat-service';
import { getCalEmbedUrl } from '@/lib/scheduling-service';

// Mock mentor data - replace with real DB fetch
const mockMentor = {
    id: 'mentor-123',
    full_name: 'Sarah Johnson',
    headline: 'Senior Software Engineer at Google',
    bio: 'I love helping early career engineers navigate the tech industry. Whether you\'re preparing for interviews, thinking about career moves, or just need someone to listen, I\'m here.',
    avatar_url: null,
    expertise: ['Career Growth', 'Tech Interviews', 'Leadership', 'Work-Life Balance'],
    languages: ['English', 'Spanish'],
    location: 'Austin, TX',
    sessions_completed: 47,
    rating: 4.9,
    cal_username: 'sarah-mentor',
    is_available_now: false,
};

export default function MentorProfilePage() {
    const params = useParams();
    const [mentor, setMentor] = useState(mockMentor);
    const [isConnecting, setIsConnecting] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [activeTab, setActiveTab] = useState<'about' | 'book'>('about');

    // In real app, fetch mentor data based on params.id
    useEffect(() => {
        // fetchMentor(params.id);
    }, [params.id]);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            // Replace with real user ID from auth
            await startConversation(mentor.id, 'current-user-id');
            window.location.href = '/dashboard/messages';
        } catch (error) {
            console.error('Failed to start conversation:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/mentor"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Mentors
                    </Link>

                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            {mentor.avatar_url ? (
                                <img
                                    src={mentor.avatar_url}
                                    alt={mentor.full_name}
                                    className="w-32 h-32 rounded-2xl object-cover shadow-xl"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-xl">
                                    <span className="text-white text-4xl font-bold">
                                        {mentor.full_name[0]}
                                    </span>
                                </div>
                            )}
                            {mentor.is_available_now && (
                                <span className="absolute -bottom-2 -right-2 flex h-6 w-6">
                                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative rounded-full h-6 w-6 bg-green-500 border-2 border-white"></span>
                                </span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">{mentor.full_name}</h1>
                                {mentor.is_available_now && (
                                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full">
                                        Live Now
                                    </span>
                                )}
                            </div>
                            <p className="text-xl text-white/80 mb-4">{mentor.headline}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-white/60">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {mentor.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    {mentor.sessions_completed} sessions
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    {mentor.rating}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 min-w-[180px]">
                            <button
                                onClick={() => setActiveTab('book')}
                                className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition shadow-lg shadow-teal-500/30"
                            >
                                Book a Session
                            </button>
                            <button
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition border border-white/20"
                            >
                                {isConnecting ? 'Connecting...' : 'Send Message'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-4 py-3 font-medium transition relative ${activeTab === 'about' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        About
                        {activeTab === 'about' && (
                            <motion.div
                                layoutId="profile-tab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`px-4 py-3 font-medium transition relative ${activeTab === 'book' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Book Session
                        {activeTab === 'book' && (
                            <motion.div
                                layoutId="profile-tab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                            />
                        )}
                    </button>
                </div>

                {activeTab === 'about' ? (
                    <div className="space-y-8">
                        {/* Bio */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
                        </div>

                        {/* Expertise */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
                            <div className="flex gap-3">
                                {mentor.languages.map((lang) => (
                                    <span
                                        key={lang}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule a Session</h2>

                        {mentor.cal_username ? (
                            <div className="rounded-xl overflow-hidden border border-gray-200">
                                <iframe
                                    src={getCalEmbedUrl(mentor.cal_username)}
                                    style={{ width: '100%', height: '600px', border: 'none' }}
                                    title="Book a session"
                                />
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p className="mb-4">Booking not available yet</p>
                                <button
                                    onClick={handleConnect}
                                    className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition"
                                >
                                    Send a Message Instead
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
