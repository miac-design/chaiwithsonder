'use client';

import { useState } from 'react';
import { Users, Calendar, Clock, Filter, MapPin, ArrowRight, Sparkles, Coffee, Briefcase, GraduationCap, Globe, Code, Heart, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const motivationFilters = [
  { id: 'all', label: 'All Sessions', icon: Sparkles },
  { id: 'networking', label: 'Networking', icon: Users },
  { id: 'career', label: 'Career Growth', icon: Briefcase },
  { id: 'tech', label: 'Tech & AI', icon: Code },
  { id: 'immigration', label: 'Immigration', icon: Globe },
  { id: 'academic', label: 'Academic', icon: GraduationCap },
  { id: 'wellness', label: 'Wellness', icon: Heart },
  { id: 'leadership', label: 'Leadership', icon: Lightbulb },
];

interface Session {
  id: string;
  title: string;
  description: string;
  host: string;
  hostRole: string;
  date: string;
  time: string;
  duration: string;
  spots: number;
  totalSpots: number;
  category: string;
  tags: string[];
  location: string;
  featured?: boolean;
}

const sessions: Session[] = [
  {
    id: '1',
    title: 'Breaking Into Big Tech',
    description: 'An open conversation about navigating the Big Tech hiring process — from resumes to system design interviews. Bring your questions.',
    host: 'Hamed A.',
    hostRole: 'Gen AI Expert @ Meta',
    date: 'Mar 8, 2026',
    time: '12:00 PM CT',
    duration: '45 min',
    spots: 4,
    totalSpots: 12,
    category: 'career',
    tags: ['Interviews', 'Big Tech', 'Resume'],
    location: 'Virtual',
    featured: true,
  },
  {
    id: '2',
    title: 'AI for Everyone: No-Code Tools Workshop',
    description: 'Hands-on session exploring AI tools you can use today without writing code. Perfect for non-technical professionals.',
    host: 'Mia C.',
    hostRole: 'Founder, ChaiChat',
    date: 'Mar 12, 2026',
    time: '6:00 PM CT',
    duration: '60 min',
    spots: 8,
    totalSpots: 15,
    category: 'tech',
    tags: ['AI', 'No-Code', 'Workshop'],
    location: 'Virtual',
    featured: true,
  },
  {
    id: '3',
    title: 'Immigrant Founders Chai Circle',
    description: 'Share your journey, challenges, and wins as an immigrant founder or aspiring entrepreneur. A safe space for real talk.',
    host: 'Moein R.',
    hostRole: 'Gen AI Expert & Mentor',
    date: 'Mar 15, 2026',
    time: '11:00 AM CT',
    duration: '45 min',
    spots: 6,
    totalSpots: 10,
    category: 'immigration',
    tags: ['Immigration', 'Founders', 'Community'],
    location: 'Virtual',
  },
  {
    id: '4',
    title: 'PhD to Industry: Making the Leap',
    description: 'Thinking of leaving academia? Mentors who made the transition share practical advice on pivoting to industry roles.',
    host: 'Moein R.',
    hostRole: 'Gen AI Expert & Mentor',
    date: 'Mar 20, 2026',
    time: '2:00 PM CT',
    duration: '45 min',
    spots: 5,
    totalSpots: 10,
    category: 'academic',
    tags: ['PhD', 'Career Change', 'Industry'],
    location: 'Virtual',
  },
  {
    id: '5',
    title: 'Networking Without the Awkward',
    description: 'Learn how to build genuine professional connections. No elevator pitches — just real human-to-human strategies.',
    host: 'Mia C.',
    hostRole: 'Founder, ChaiChat',
    date: 'Mar 22, 2026',
    time: '5:30 PM CT',
    duration: '30 min',
    spots: 10,
    totalSpots: 15,
    category: 'networking',
    tags: ['Networking', 'Soft Skills', 'Community'],
    location: 'Virtual',
  },
  {
    id: '6',
    title: 'Burnout & Balance in Tech',
    description: 'An honest group discussion about burnout, setting boundaries, and finding sustainable rhythms in demanding careers.',
    host: 'Hamed A.',
    hostRole: 'Gen AI Expert @ Meta',
    date: 'Mar 25, 2026',
    time: '7:00 PM CT',
    duration: '45 min',
    spots: 7,
    totalSpots: 12,
    category: 'wellness',
    tags: ['Wellness', 'Work-Life', 'Mental Health'],
    location: 'Virtual',
  },
  {
    id: '7',
    title: 'Leading Without a Title',
    description: 'You don\'t need a manager title to lead. Learn how to drive impact, influence decisions, and grow as a leader at any level.',
    host: 'Hamed A.',
    hostRole: 'Gen AI Expert @ Meta',
    date: 'Mar 28, 2026',
    time: '12:30 PM CT',
    duration: '45 min',
    spots: 3,
    totalSpots: 10,
    category: 'leadership',
    tags: ['Leadership', 'Growth', 'Influence'],
    location: 'Virtual',
  },
];

function SessionCard({ session }: { session: Session }) {
  const spotsLeft = session.spots;
  const spotsPercent = ((session.totalSpots - spotsLeft) / session.totalSpots) * 100;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${session.featured ? 'border-teal-200 ring-1 ring-teal-100' : 'border-gray-100'}`}>
      {session.featured && (
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Featured Session
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors leading-snug">
            {session.title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
          {session.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {session.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-500" />
            {session.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-500" />
            {session.time} · {session.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-teal-500" />
            Hosted by {session.host}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-500" />
            {session.location}
          </div>
        </div>

        {/* Spots bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500">{spotsLeft} spots left</span>
            <span className="text-gray-400">{session.totalSpots} total</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${spotsLeft <= 3 ? 'bg-amber-500' : 'bg-teal-500'}`}
              style={{ width: `${spotsPercent}%` }}
            />
          </div>
        </div>

        {/* Host + CTA */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{session.hostRole}</p>
          <button className="px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1.5">
            Join Circle <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChaiCirclePage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSessions = activeFilter === 'all'
    ? sessions
    : sessions.filter(s => s.category === activeFilter);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
            <Users className="w-4 h-4" />
            Group Sessions
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900 sm:text-5xl lg:text-6xl">
            Chai Circle
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join group conversations led by mentors. Learn together, network, and grow — over a virtual cup of chai.
          </p>
          <p className="mt-3 text-sm text-teal-600 font-medium">
            Career talks &bull; Tech workshops &bull; Community building &bull; And more
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span className="font-medium">What are you looking for?</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {motivationFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions in this category yet</h3>
            <p className="text-gray-500 mb-6">Check back soon or explore other topics!</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition"
            >
              View All Sessions
            </button>
          </div>
        )}

        {/* Host CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-amber-50 rounded-2xl border border-teal-100 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Want to host a Chai Circle?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">
            Share your expertise with a group. Lead a workshop, start a discussion, or just create space for people to connect.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Users className="w-5 h-5" />
            Become a Host
          </Link>
        </div>
      </div>
    </div>
  );
}
