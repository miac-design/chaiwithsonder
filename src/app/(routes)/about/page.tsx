'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Sprout, Globe, ExternalLink } from 'lucide-react';

function FAQSection() {
  const [activeTab, setActiveTab] = useState('mentees' as 'mentees' | 'mentors');
  const [openMentee, setOpenMentee] = useState<number | null>(null);
  const [openMentor, setOpenMentor] = useState<number | null>(null);

  const menteeFaqs = [
    { q: 'How do I find the right mentor?', a: 'Use the mentor directory to explore profiles, topics, and availability that align with your goals.' },
    { q: 'Is Chai Chat free for mentees?', a: 'Yes! Our platform is completely free for mentees seeking guidance and support.' },
    { q: 'Can I meet with more than one mentor?', a: 'Yes, you can schedule sessions with different mentors based on your needs.' },
    { q: 'What should I bring to my first session?', a: 'Bring curiosity and clarity. You can also jot down a few goals or challenges ahead of time.' },
    { q: 'Can I change mentors later?', a: 'Absolutely. You\'re encouraged to find the best match for your journey.' },
  ];
  const mentorFaqs = [
    { q: 'How do I become a mentor?', a: 'Click "Become a Mentor," fill out your profile, and we\'ll review it within 48 hours.' },
    { q: 'Is there a time commitment?', a: 'No fixed time commitment — you set your availability and pace.' },
    { q: 'Can I choose who I mentor?', a: 'Yes. You have full control over which requests you accept.' },
    { q: 'How do badges work?', a: 'Mentors earn badges based on hours, sessions, and community engagement milestones.' },
    { q: 'Can I pause or stop mentoring?', a: 'Yes — update your availability anytime from your dashboard.' },
  ];

  const faqs = activeTab === 'mentees' ? menteeFaqs : mentorFaqs;
  const openIdx = activeTab === 'mentees' ? openMentee : openMentor;
  const setOpen = activeTab === 'mentees' ? setOpenMentee : setOpenMentor;

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-serif text-3xl text-center mb-8">
          Frequently Asked <span className="heading-italic-accent">Questions</span>
        </h2>
        <div className="flex justify-center mb-8 gap-3">
          <button
            className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${activeTab === 'mentees'
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'}`}
            onClick={() => setActiveTab('mentees')}
          >
            For Mentees
          </button>
          <button
            className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${activeTab === 'mentors'
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'}`}
            onClick={() => setActiveTab('mentors')}
          >
            For Mentors
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={faq.q} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none hover:bg-gray-50/50 transition-colors"
                onClick={() => setOpen(openIdx === idx ? null : idx)}
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-teal-500 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Sara', title: 'PhD Student', quote: 'Having a mentor who understands my academic journey has been transformative.' },
    { name: 'Saleh', title: 'Power Systems Engineer', quote: 'Chai Chat helped me give back. The connections are more than professional — they\'re personal.' },
    { name: 'Raheleh', title: 'Research Scientist', quote: 'This platform makes you feel seen. It\'s about humanity and belonging.' },
    { name: 'Jason', title: 'UX Designer', quote: 'The one-on-one conversations gave me clarity I couldn\'t find elsewhere.' },
  ];

  return (
    <section className="py-16">
      <h2 className="heading-serif text-3xl text-center mb-10">
        What Members <span className="heading-italic-accent">Say</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.title}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed italic">&quot;{t.quote}&quot;</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-white to-blue-50/50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-medium rounded-full mb-6">
              Our Story
            </span>
            <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Where Sonder Becomes <span className="heading-italic-accent">Connection</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A community-driven mentoring platform built on the belief that everyone has a story worth sharing and wisdom worth receiving.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Founder's Story - Compact Card */}
        <section className="py-8">
          <motion.div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Why I Built This</h2>
              </div>

              <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                <p>
                  In 2018, I came to the US searching for opportunity — no connections, no network. But strangers helped me. <strong className="text-gray-900">People I never met reviewed my resume, made introductions, and offered guidance.</strong>
                </p>
                <p>
                  That experience changed me. I realized many people <em>want</em> to help others — they just need a way to find those who need it. <strong className="text-gray-800">That's why I built Chai Chat.</strong>
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-semibold">M</div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Mia</p>
                  <p className="text-xs text-gray-500">Founder of Chai Chat</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Austin AI Hub Connection */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-teal-50/80 to-white rounded-2xl border border-teal-100 p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  ChaiChat Hub is a community initiative of{' '}
                  <a
                    href="https://austinaihub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center gap-1 transition-colors"
                  >
                    Austin AI Hub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  , Austin's nonprofit dedicated to making AI accessible to everyone. Through workshops, events, and mentorship, we're building a community where technology serves humanity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Sonder - Elegant Quote */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-serif text-3xl mb-8">
              Why Chai Chat <span className="heading-italic-accent">Matters</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              The word <strong className="text-teal-600">sonder</strong> was created by writer John Koenig in <em>The Dictionary of Obscure Sorrows</em>.
            </p>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 via-teal-50 to-blue-50 rounded-3xl blur-xl opacity-60" />
              <blockquote className="relative bg-white border-l-4 border-teal-500 px-8 py-6 rounded-r-2xl shadow-lg text-left">
                <p className="text-xl font-semibold text-teal-700 mb-2">Sonder</p>
                <p className="text-gray-700 leading-relaxed italic">
                  n. The realization that each passerby has a life as vivid and complex as your own — filled with thoughts, memories, and experiences, just like you.
                </p>
              </blockquote>
            </div>

            <p className="text-gray-600 mt-8 leading-relaxed">
              When you mentor someone, you're not just sharing knowledge — you're acknowledging their humanity. That's Sonder in action.
            </p>
          </div>
        </section>

        {/* Mission & Vision - Side by Side */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To connect people who want to help with those who need guidance — creating meaningful mentorship relationships that foster growth, belonging, and mutual support.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where no one has to navigate their journey alone. Where strangers become mentors, and a simple conversation over chai can open doors you never knew existed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values - 3 Column */}
        <section className="py-12">
          <h2 className="heading-serif text-3xl text-center mb-10">
            Our <span className="heading-italic-accent">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Users className="w-8 h-8 text-teal-600" />, title: 'Community', desc: 'We believe in the power of community and the strength that comes from supporting one another.' },
              { icon: <Sprout className="w-8 h-8 text-teal-600" />, title: 'Growth', desc: 'We foster an environment where continuous learning and personal development thrive.' },
              { icon: <Globe className="w-8 h-8 text-teal-600" />, title: 'Accessibility', desc: 'We make mentorship accessible to everyone, regardless of background or circumstances.' },
            ].map((v) => (
              <motion.div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* CTA */}
        <section className="py-16 text-center">
          <h2 className="heading-serif text-3xl mb-4">
            Ready to <span className="heading-italic-accent">Get Started?</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Whether you want to share your experience or find guidance, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentor" className="btn-teal inline-flex items-center justify-center gap-2">
              Find a Mentor
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/mentor/become" className="btn-secondary inline-flex items-center justify-center gap-2">
              Become a Mentor
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}