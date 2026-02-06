'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Coffee, Zap, Linkedin } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

// Modern SVG icons for badges
const BadgeIcons = {
  sprout: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M7 20a5 5 0 0 1 10 0" /><path d="M12 20V10" /><path d="M9 6.5A3.5 3.5 0 0 1 12 10" /><path d="M12 10a3.5 3.5 0 0 0 3-3.5V2.5" /></svg>
  ),
  handshake: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 20h4l3-3" /><path d="M9 17l-5-5a2.828 2.828 0 0 1 4-4l1 1 1-1a2.828 2.828 0 0 1 4 4l-5 5" /><path d="M14 17l3 3h4" /></svg>
  ),
  trophy: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8 21h8" /><path d="M12 17v4" /><path d="M17 17a5 5 0 0 0 5-5V5H2v7a5 5 0 0 0 5 5" /><path d="M7 4V2" /><path d="M17 4V2" /></svg>
  ),
  barchart: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 3v18h18" /><rect x="7" y="13" width="3" height="5" rx="1" /><rect x="12" y="9" width="3" height="9" rx="1" /><rect x="17" y="5" width="3" height="13" rx="1" /></svg>
  ),
  star: (
    <svg width="22" height="22" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
};

const badgeDefinitions = [
  {
    name: 'Rising Mentor',
    icon: BadgeIcons.sprout,
    description: 'Completed 5+ mentorship hours',
    check: (mentor: any) => mentor.hours >= 5,
  },
  {
    name: 'Trusted Mentor',
    icon: BadgeIcons.handshake,
    description: 'Completed 15+ mentorship hours',
    check: (mentor: any) => mentor.hours >= 15,
  },
  {
    name: 'Impact Maker',
    icon: BadgeIcons.trophy,
    description: 'Completed 30+ mentorship hours',
    check: (mentor: any) => mentor.hours >= 30,
  },
  {
    name: '10 Sessions Club',
    icon: BadgeIcons.barchart,
    description: 'Completed 10+ mentorship sessions',
    check: (mentor: any) => mentor.sessions >= 10,
  },
  {
    name: 'Highly Rated',
    icon: BadgeIcons.star,
    description: 'Average rating above 4.8',
    check: (mentor: any) => mentor.rating && mentor.rating > 4.8,
  },
];

const mentors = [
  {
    name: 'Hamed Alikhani, PhD',
    title: 'Gen AI Expert',
    photo: '/team/hamed.jpg',
    calendly: 'https://calendly.com/hamed-alikhani',
    linkedin: 'https://www.linkedin.com/in/hamedalikhani/',
    story: "I came to the US in 2014 with $200 and a dream. Happy to share what I've learned.",
    specialties: ['Career', 'Visa', 'AI/ML'],
    chaisShared: 47,
  },
  {
    name: 'Moein Razavi, PhD',
    title: 'Gen AI Expert',
    photo: '/team/moein.jpg',
    calendly: 'https://calendly.com/moein-razavi',
    linkedin: 'https://www.linkedin.com/in/moeinrazavi/',
    story: "Navigated the PhD journey and tech transition — love helping others do the same.",
    specialties: ['Academia', 'AI/ML', 'Career'],
    chaisShared: 32,
  },
  {
    name: 'Reza Haghighi, MS',
    title: 'Sr. Platform Engineer',
    photo: '/team/reza.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/rezahaghighi/',
    story: "Engineering is about solving puzzles — I love sharing those aha moments.",
    specialties: ['Tech', 'Career'],
    chaisShared: 18,
  },
  {
    name: 'Parisa Ghane, PhD',
    title: 'Sr. Consultant',
    photo: '/team/parisa.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/parisaghane/',
    story: "From research to consulting — happy to chat about making that leap.",
    specialties: ['Consulting', 'Career'],
    chaisShared: 21,
  },
  {
    name: 'Alireza Tahsini, MS',
    title: 'Sr. Software Engineer',
    photo: '/team/alireza.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/alirezatahsini/',
    story: "Building great software starts with great conversations.",
    specialties: ['Tech', 'Resume'],
    chaisShared: 15,
  },
  {
    name: 'Monica Far',
    title: 'Amazon Sales Leader',
    photo: '/team/monica-far.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/monicafar/',
    story: "Sales is about connection first — let's chat about breaking into big tech.",
    specialties: ['Sales', 'Big Tech', 'Career'],
    chaisShared: 28,
  },
  {
    name: 'Bita Shirazi',
    title: 'Amazon Finance Manager',
    photo: '/team/bita.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/bitashirazi/',
    story: "Numbers tell stories — I help people write their own financial chapter.",
    specialties: ['Finance', 'Big Tech'],
    chaisShared: 19,
  },
  {
    name: 'Reza Piri',
    title: 'Productbot Founder',
    photo: '/team/rezapiri.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/rezapiri/',
    story: "Started from zero, built a company. Happy to share the founder journey.",
    specialties: ['Startup', 'Product'],
    chaisShared: 24,
  },
  {
    name: 'Meysam Gamini',
    title: 'Principal Software Engineer',
    photo: '/team/meysam.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/meysamgamini/',
    story: "Engineering leadership is a skill you can learn — let me help.",
    specialties: ['Tech', 'Leadership'],
    chaisShared: 31,
  },
  {
    name: 'Ali Rezajoo',
    title: 'Senior Product Manager',
    photo: '/team/alirezajoo.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/alirezajoo/',
    story: "Transitioned from engineering to PM — happy to guide your pivot.",
    specialties: ['Product', 'Career'],
    chaisShared: 22,
  },
  {
    name: 'Ramin Jahedi',
    title: 'Black Ops Agency CEO',
    photo: '/team/ramin.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/raminjahedi/',
    story: "Built an agency from scratch. Let's talk entrepreneurship.",
    specialties: ['Startup', 'Marketing'],
    chaisShared: 16,
  },
  {
    name: 'Ramin Komeili',
    title: 'Senior Traffic/Transportation Engineer',
    photo: '/team/ramin-komeili.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/raminkomeili/',
    story: "Engineering meets urban planning — a unique path worth exploring.",
    specialties: ['Engineering', 'Career'],
    chaisShared: 12,
  },
  {
    name: 'Amin Rashidi',
    title: 'Lead Data Engineer',
    photo: '/team/amin.jpg',
    calendly: '',
    linkedin: 'https://www.linkedin.com/in/aminrashidi/',
    story: "Data engineering is the backbone of AI. Let's talk pipelines.",
    specialties: ['Data', 'Tech'],
    chaisShared: 27,
  },
];

function getMentorBadges(mentor: any) {
  return badgeDefinitions.filter((badge) => badge.check(mentor));
}

function MentorCard({ mentor, onBook }: { mentor: typeof mentors[0]; onBook: (mentor: typeof mentors[0]) => void }) {
  const avatarUrl = mentor.photo
    ? mentor.photo
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;

  // Specialty color mapping for visual variety
  const specialtyColors: Record<string, string> = {
    'Career': 'bg-teal-100 text-teal-700',
    'Visa': 'bg-amber-100 text-amber-700',
    'AI/ML': 'bg-purple-100 text-purple-700',
    'Academia': 'bg-blue-100 text-blue-700',
    'Tech': 'bg-slate-100 text-slate-700',
    'Resume': 'bg-emerald-100 text-emerald-700',
    'Consulting': 'bg-cyan-100 text-cyan-700',
    'Sales': 'bg-orange-100 text-orange-700',
    'Big Tech': 'bg-indigo-100 text-indigo-700',
    'Finance': 'bg-green-100 text-green-700',
    'Startup': 'bg-rose-100 text-rose-700',
    'Product': 'bg-violet-100 text-violet-700',
    'Leadership': 'bg-yellow-100 text-yellow-700',
    'Marketing': 'bg-pink-100 text-pink-700',
    'Engineering': 'bg-sky-100 text-sky-700',
    'Data': 'bg-fuchsia-100 text-fuchsia-700',
  };

  return (
    <div className="group bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-teal-100/60 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Header with larger photo and gradient overlay */}
      <div className="relative bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-transparent p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Larger Photo */}
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={`Photo of ${mentor.name}`}
              className="rounded-2xl w-24 h-24 sm:w-28 sm:h-28 object-cover ring-2 ring-teal-200 shadow-lg group-hover:ring-teal-400 transition-all"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;
              }}
            />
            {/* Chais Shared Badge */}
            {mentor.chaisShared && mentor.chaisShared > 0 && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-2 py-1 shadow-md border border-teal-100 flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-xs font-bold text-teal-700">{mentor.chaisShared}</span>
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-lg font-bold text-gray-900 truncate">{mentor.name}</h3>
            <p className="text-sm text-gray-500 truncate">{mentor.title}</p>

            {/* Specialty Tags */}
            {mentor.specialties && mentor.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {mentor.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${specialtyColors[specialty] || 'bg-gray-100 text-gray-600'}`}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Story/Journey Section - The Sonder Element */}
      <div className="px-6 py-3 flex-1">
        {mentor.story && (
          <div className="border-l-2 border-teal-300/60 pl-3">
            <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-3">
              "{mentor.story}"
            </p>
          </div>
        )}
      </div>

      {/* Action Zone */}
      <div className="px-6 pb-6 pt-2 mt-auto">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onBook(mentor)}
            className="w-full px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-teal-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4" /> Grab a Chai
          </button>

          {/* Chai Now - Coming Soon */}
          <div className="relative">
            <button
              disabled
              className="w-full px-6 py-2 bg-gray-50 text-gray-400 font-medium rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <Zap className="w-4 h-4" /> Chai Now
            </button>
            <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold rounded-full shadow">Soon</span>
          </div>
        </div>

        {/* LinkedIn Link */}
        {mentor.linkedin && (
          <div className="flex justify-center mt-3">
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${mentor.name}'s LinkedIn`}
              className="text-teal-500 hover:text-teal-600 transition inline-flex items-center gap-1.5 text-xs font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Mentor() {
  const [search, setSearch] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

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
            15-minute chats with people who've been there. No formal agenda—just connect.
          </p>
          <p className="mt-3 text-sm text-teal-600 font-medium">
            Career advice • Visa guidance • Resume tips • Or just chat
          </p>
        </div>
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <span className="absolute left-4 top-1/2 transform -translate-y-1 text-gray-400 pointer-events-none">
            {/* Search Icon (Heroicon) */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/85 backdrop-blur-xl border border-white/30 rounded-full px-5 py-3 pl-12 shadow-lg focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400"
            placeholder="Search by name, expertise, or role…"
            aria-label="Search mentors by name, expertise, or role"
          />
        </div>
        {/* Mentor Cards Grid */}
        <section id="meet-the-mentors">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredMentors.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 text-lg py-12 animate-fadeInUp">No mentors found. Try a different search.</div>
            ) : (
              filteredMentors.map((mentor, idx) => (
                <div key={mentor.name} className="animate-fadeInUp" style={{ animationDelay: `${idx * 60}ms` }}>
                  <MentorCard mentor={mentor} onBook={setSelectedMentor} />
                </div>
              ))
            )}
          </div>
        </section>

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