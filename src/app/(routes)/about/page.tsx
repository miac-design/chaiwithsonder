'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Sprout, Globe, ExternalLink, Heart, Zap, Eye, ChevronDown, ArrowRight, Linkedin } from 'lucide-react';
import { menteeFaqs, mentorFaqs } from '@/data/faq-data';

function FAQSection() {
  const [activeTab, setActiveTab] = useState('mentees' as 'mentees' | 'mentors');
  const [openMentee, setOpenMentee] = useState<number | null>(null);
  const [openMentor, setOpenMentor] = useState<number | null>(null);

  const faqs = activeTab === 'mentees' ? menteeFaqs : mentorFaqs;
  const openIdx = activeTab === 'mentees' ? openMentee : openMentor;
  const setOpen = activeTab === 'mentees' ? setOpenMentee : setOpenMentor;

  return (
    <section id="faq" className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-serif text-3xl text-center mb-3">
          Frequently Asked <span className="heading-italic-accent">Questions</span>
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Everything you need to know about ChaiChat mentorship
        </p>
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
                <ChevronDown className={`w-5 h-5 text-teal-500 flex-shrink-0 ml-3 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-60' : 'max-h-0'}`}>
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
    { name: 'Saleh', title: 'Power Systems Engineer', quote: 'Chai Chat helped me give back. The connections are more than professional, they\'re personal.' },
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
        {/* Founder's Story */}
        <section className="py-8">
          <motion.div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-5 mb-5">
                {/* Mia's photo */}
                <div className="flex-shrink-0">
                  <img
                    src="/team/mia.jpeg"
                    alt="Mia, Founder of ChaiChat"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-md ring-2 ring-teal-100"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-teal-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Why I Built This</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    Mia C., Founder of ChaiChat
                    <span className="inline-flex items-center gap-2 ml-2">
                      <a
                        href="https://themiac.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 transition-colors"
                        aria-label="Mia's website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/miacheraghian/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 transition-colors"
                        aria-label="Mia's LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-gray-600 text-base leading-relaxed">
                <p>
                  In 2018, I came to the US as a PhD student with no connections, no network, no idea how things worked here. After graduation, when I was looking for a job, something unexpected happened: <strong className="text-gray-900">complete strangers stepped up to help me.</strong>
                </p>
                <p>
                  People I had never met reviewed my resume, made introductions, practiced mock interviews with me, and offered guidance when I felt completely lost. They didn&apos;t have to, but they did. That generosity changed my life.
                </p>
                <p>
                  I realized that many people <em>want</em> to help others, they just need a way to find those who need it. <strong className="text-gray-800">That&apos;s why I built ChaiChat.</strong> It&apos;s my way of paying it forward, creating a space where a simple 30-minute conversation over chai can open doors you never knew existed.
                </p>
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
                    href="https://austinhub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 font-semibold hover:text-teal-700 inline-flex items-center gap-1 transition-colors"
                  >
                    Austin AI Hub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  , Austin&apos;s nonprofit dedicated to making AI accessible to everyone. Through workshops, events, and mentorship, we&apos;re building a community where technology serves humanity.
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
              ChaiChat with Sonder is built on a simple but powerful idea: every person you meet is living a life as rich and complex as your own.
            </p>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 via-teal-50 to-blue-50 rounded-3xl blur-xl opacity-60" />
              <blockquote className="relative bg-white border-l-4 border-teal-500 px-8 py-6 rounded-r-2xl shadow-lg text-left">
                <p className="text-xl font-semibold text-teal-700 mb-2">Sonder</p>
                <p className="text-gray-700 leading-relaxed italic">
                  n. The realization that each passerby has a life as vivid and complex as your own, filled with thoughts, memories, and experiences, just like you.
                </p>
              </blockquote>
            </div>

            <p className="text-gray-600 mt-8 leading-relaxed">
              That&apos;s the heart of ChaiChat: a conversation over chai that says &quot;I see you, your story matters, and you don&apos;t have to figure it out alone.&quot;
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
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To connect people who want to help with those who need guidance, creating meaningful mentorship relationships that foster growth, belonging, and mutual support.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-teal-600" />
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
            Whether you want to share your experience or find guidance, there&apos;s a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentor" className="btn-teal inline-flex items-center justify-center gap-2">
              Find a Mentor
              <ArrowRight className="w-4 h-4" />
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
