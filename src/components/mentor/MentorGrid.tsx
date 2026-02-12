'use client';

import type { Mentor } from '@/types';
import MentorCard from './MentorCard';

interface MentorGridProps {
    mentors: Mentor[];
}

export default function MentorGrid({ mentors }: MentorGridProps) {
    return (
        <section id="meet-the-mentors">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {mentors.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 text-lg py-12 animate-fadeInUp">
                        No mentors found. Try a different search.
                    </div>
                ) : (
                    mentors.map((mentor, idx) => (
                        <div key={mentor.name} className="animate-fadeInUp" style={{ animationDelay: `${idx * 60}ms` }}>
                            <MentorCard mentor={mentor} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
