'use client';

import { useState, useEffect } from 'react';
import { mentors } from '@/data/mentors';
import MentorSearchBar from '@/components/mentor/MentorSearchBar';
import MentorGrid from '@/components/mentor/MentorGrid';
import MentorApplicationForm from '@/components/mentor/MentorApplicationForm';

export default function Mentor() {
  const [search, setSearch] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(mentors);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      const q = search.trim().toLowerCase();
      if (!q) {
        setFilteredMentors(mentors);
        return;
      }
      setFilteredMentors(
        mentors.filter((mentor) =>
          mentor.name.toLowerCase().includes(q) ||
          (mentor.title && mentor.title.toLowerCase().includes(q))
        )
      );
    }, 200);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Start a Chat With…
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Share what you've learned in a relaxed 1-on-1 — no pressure, just people helping people.
          </p>
        </div>

        <MentorSearchBar search={search} onSearchChange={setSearch} />
        <MentorGrid mentors={filteredMentors} />
        <MentorApplicationForm />
      </div>
    </div>
  );
}