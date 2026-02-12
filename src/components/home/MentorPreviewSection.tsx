'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { mentors } from '@/data/mentors';
import type { Mentor } from '@/types';

function MentorPreviewCard({ mentor, index }: { mentor: Mentor; index: number }) {
    const avatarUrl = mentor.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;
    const firstName = mentor.name.split(' ')[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="flex-shrink-0 w-[280px] sm:w-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group"
        >
            {/* Avatar */}
            <div className="relative mb-4">
                <img
                    src={avatarUrl}
                    alt={`Photo of ${mentor.name}`}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-amber-200 group-hover:ring-teal-400 transition-all"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;
                    }}
                />
                {/* Availability dot */}
                <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${mentor.available ? 'bg-green-400' : 'bg-gray-300'}`}
                    title={mentor.available ? 'Available Now' : 'Book a Session'}
                />
            </div>

            {/* Name & Title */}
            <h3 className="font-semibold text-gray-900 text-base">{mentor.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{mentor.title}</p>

            {/* Tags */}
            {mentor.tags && mentor.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {mentor.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Availability text */}
            <p className="text-xs mt-3 font-medium flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${mentor.available ? 'bg-green-400' : 'bg-gray-300'}`} />
                <span className={mentor.available ? 'text-green-600' : 'text-gray-400'}>
                    {mentor.available ? 'Available Now' : 'Book a Session'}
                </span>
            </p>

            {/* CTA */}
            <Link
                href={mentor.calendly || '/mentor'}
                className="mt-4 w-full py-2.5 rounded-lg text-sm font-semibold transition-all text-center bg-teal-50 text-teal-700 hover:bg-teal-500 hover:text-white"
            >
                {mentor.available ? `Chat with ${firstName}` : 'View Profile'}
            </Link>
        </motion.div>
    );
}

export default function MentorPreviewSection() {
    const previewMentors = mentors.slice(0, 6);

    return (
        <section className="py-20 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Meet Our Mentors
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Real people, real experience, ready to talk.
                    </p>
                </motion.div>

                {/* Mentor cards */}
                <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                    {previewMentors.map((mentor, i) => (
                        <MentorPreviewCard key={mentor.name} mentor={mentor} index={i} />
                    ))}
                </div>

                {/* See All link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/mentor"
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-base transition-colors"
                    >
                        See All Mentors
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
