'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Modern SVG icons for badges
const BadgeIcons = {
  sprout: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M7 20a5 5 0 0 1 10 0"/><path d="M12 20V10"/><path d="M9 6.5A3.5 3.5 0 0 1 12 10"/><path d="M12 10a3.5 3.5 0 0 0 3-3.5V2.5"/></svg>
  ),
  handshake: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 20h4l3-3"/><path d="M9 17l-5-5a2.828 2.828 0 0 1 4-4l1 1 1-1a2.828 2.828 0 0 1 4 4l-5 5"/><path d="M14 17l3 3h4"/></svg>
  ),
  trophy: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M17 17a5 5 0 0 0 5-5V5H2v7a5 5 0 0 0 5 5"/><path d="M7 4V2"/><path d="M17 4V2"/></svg>
  ),
  barchart: (
    <svg width="22" height="22" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 3v18h18"/><rect x="7" y="13" width="3" height="5" rx="1"/><rect x="12" y="9" width="3" height="9" rx="1"/><rect x="17" y="5" width="3" height="13" rx="1"/></svg>
  ),
  star: (
    <svg width="22" height="22" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
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
  },
  {
    name: 'Moein Razavi, PhD',
    title: 'Gen AI Expert',
    photo: '/team/moein.jpg',
    calendly: 'https://calendly.com/moein-razavi',
    linkedin: 'https://www.linkedin.com/in/moeinrazavi/',
  },
  {
    name: 'Reza Haghighi, MS',
    title: 'Sr. Platform Engineer',
    photo: '/team/reza.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Parisa Ghane, PhD',
    title: 'Sr. Consultant',
    photo: '/team/parisa.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Alireza Tahsini, MS',
    title: 'Sr. Software Engineer',
    photo: '/team/alireza.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Monica Far',
    title: 'Amazon Sales Leader',
    photo: '/team/monica-far.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Bita Shirazi',
    title: 'Amazon Finance Manager',
    photo: '/team/bita.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Reza Piri',
    title: 'Productbot Founder',
    photo: '/team/rezapiri.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Meysam Gamini',
    title: 'Principal Software Engineer',
    photo: '/team/meysam.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Ali Rezajoo',
    title: 'Senior Product Manager',
    photo: '/team/alirezajoo.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Ramin Jahedi',
    title: 'Black Ops Agency CEO',
    photo: '/team/ramin.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Ramin Komeili',
    title: 'Senior Traffic/Transportation Engineer',
    photo: '/team/ramin-komeili.jpg',
    calendly: '',
    linkedin: '',
  },
  {
    name: 'Amin Rashidi',
    title: 'Lead Data Engineer',
    photo: '/team/amin.jpg',
    calendly: '',
    linkedin: '',
  },
];

function getMentorBadges(mentor: any) {
  return badgeDefinitions.filter((badge) => badge.check(mentor));
}

function MentorCard({ mentor }: { mentor: typeof mentors[0] }) {
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
        {/* Calendly Icon - always active */}
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
        {/* LinkedIn Icon - always active */}
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

export const dynamic = "force-dynamic";

export default function Mentor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    availability: '',
    goals: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your interest in becoming a mentor! This is a demo, so no actual submission was processed.');
      setFormData({
        name: '',
        email: '',
        expertise: '',
        experience: '',
        availability: '',
        goals: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Meet the Mentors
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Share your knowledge and experience with others. Make a difference in someone's life by connecting with a mentor.
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
            className="w-full bg-white border border-gray-300 rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400"
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
                  <MentorCard mentor={mentor} />
                </div>
              ))
            )}
          </div>
        </section>
        {/* Become a Mentor Section */}
        <section id="application" className="mt-24 max-w-xl mx-auto fade-in-up">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why Become a Mentor?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Knowledge</h3>
                <p className="text-gray-600">
                  Help others grow by sharing your expertise and experience. Make a meaningful impact in someone's life.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Your Network</h3>
                <p className="text-gray-600">
                  Connect with like-minded individuals and expand your professional network while making a difference.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., jane@email.com"
                />
              </div>
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise</label>
                <input
                  type="text"
                  name="expertise"
                  id="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., Software Development, Career Growth, Leadership"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., 5+ years"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  name="availability"
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., Weekday evenings, Weekend mornings"
                />
              </div>
              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">What do you hope to achieve as a mentor?</label>
                <textarea
                  name="goals"
                  id="goals"
                  required
                  value={formData.goals}
                  onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[120px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition resize-y"
                  placeholder="Share your goals, e.g., Help others grow, Give back to the community, etc."
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-indigo-600 text-white font-semibold rounded-full py-3 w-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition ease-in-out duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </section>
        {/* Explore Other Mentorship Platforms Section */}
        <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Other Mentorship Platforms</h2>
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-indigo-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-lg font-semibold text-gray-700 whitespace-nowrap">Platform Name</th>
                  <th scope="col" className="px-6 py-4 text-lg font-semibold text-gray-700 whitespace-nowrap">Offerings</th>
                  <th scope="col" className="px-6 py-4 text-lg font-semibold text-gray-700 whitespace-nowrap">Pricing Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-indigo-700 font-medium underline"><a href="https://www.qooper.io/blog/top-10-online-mentoring-platforms?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">Qooper</a></td>
                  <td className="px-6 py-4">Career development mentoring, DEI, leadership development, peer mentoring, onboarding</td>
                  <td className="px-6 py-4">Pricing based on each program; contact for details</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-indigo-700 font-medium underline"><a href="https://www.qooper.io/blog/top-10-online-mentoring-platforms?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">MentorcliQ</a></td>
                  <td className="px-6 py-4">Diversity, equity, and inclusion, enterprise mentoring</td>
                  <td className="px-6 py-4">Pricing based on each program; contact for details</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-indigo-700 font-medium underline"><a href="https://chronus.com/blog/best-mentoring-software?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">Chronus</a></td>
                  <td className="px-6 py-4">Career development, leadership development, reverse mentoring, peer mentoring, knowledge-sharing</td>
                  <td className="px-6 py-4">Core package starts at $14,995/year; enterprise package starts at $24,995/year</td>
                </tr>
                {/* Add more platforms here as needed */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 