'use client';

import { useState, useEffect } from 'react';
import { mentors } from '@/data/mentors';
import MentorSearchBar from '@/components/mentor/MentorSearchBar';
import MentorGrid from '@/components/mentor/MentorGrid';
import MentorApplicationForm from '@/components/mentor/MentorApplicationForm';

interface MatchedMentorResponse {
  mentor_id: string;
  name: string;
  title: string;
  photo?: string;
  linkedin?: string;
  story?: string;
  specialties: string[];
  chaisShared: number;
  total_score: number;
  expertise_score: number;
  stage_score: number;
  engagement_score: number;
  style_score: number;
  story_score: number;
  match_reasons: string[];
}

export default function Mentor() {
  const [search, setSearch] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchedMentorResponse[] | null>(null);
  const [intakeData, setIntakeData] = useState<MatchIntakeData | null>(null);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

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
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl flex items-center justify-center gap-3">
            <Coffee className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600" /> Grab a Chai With…
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            15-minute chats with people who&apos;ve been there. No formal agenda—just connect.
          </p>
          <p className="mt-3 text-sm text-teal-600 font-medium">
            Career advice • Visa guidance • Resume tips • Or just chat
          </p>
        </div>

        <MentorSearchBar search={search} onSearchChange={setSearch} />
        <MentorGrid mentors={filteredMentors} />
        <MentorApplicationForm />
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <BookingModal
          mentor={selectedMentor}
          isOpen={!!selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  );
}