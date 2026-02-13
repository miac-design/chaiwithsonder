'use client';

import type { Mentor } from '@/types';

interface MentorCardProps {
    mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
    const avatarUrl = mentor.photo
        ? mentor.photo
        : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-transform hover:-translate-y-1 flex flex-col items-center">
            <img
                src={avatarUrl}
                alt={`Photo of ${mentor.name}`}
                className="rounded-full w-32 h-32 mx-auto object-cover ring-2 ring-indigo-200"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;
                }}
            />
            <div className="text-lg font-semibold mt-4">{mentor.name}</div>
            <div className="text-sm text-gray-500">{mentor.title}</div>
            <div className="inline-flex gap-4 justify-center mt-4 text-xl">
                {/* Calendly Icon */}
                <a
                    href={mentor.calendly || '#'}
                    target={mentor.calendly ? '_blank' : undefined}
                    rel={mentor.calendly ? 'noopener noreferrer' : undefined}
                    aria-label={mentor.calendly ? `Book a session with ${mentor.name}` : 'Calendly not available'}
                    className="text-indigo-500 hover:text-indigo-700 transition"
                    title={mentor.calendly ? 'Book a session' : 'Not available'}
                    tabIndex={0}
                    onClick={e => { if (!mentor.calendly) e.preventDefault(); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a.75.75 0 00.75-.75V6.75A2.25 2.25 0 0018 4.5H6A2.25 2.25 0 003.75 6.75v13.5c0 .414.336.75.75.75z" />
                    </svg>
                </a>
                {/* LinkedIn Icon */}
                <a
                    href={mentor.linkedin || '#'}
                    target={mentor.linkedin ? '_blank' : undefined}
                    rel={mentor.linkedin ? 'noopener noreferrer' : undefined}
                    aria-label={mentor.linkedin ? `View ${mentor.name}'s LinkedIn` : 'LinkedIn not available'}
                    className="text-gray-600 hover:text-blue-700 transition"
                    title={mentor.linkedin ? 'View LinkedIn' : 'Not available'}
                    tabIndex={0}
                    onClick={e => { if (!mentor.linkedin) e.preventDefault(); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
