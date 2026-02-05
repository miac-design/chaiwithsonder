'use client';

import { useState } from 'react';
import Image from 'next/image';

export const dynamic = "force-dynamic";

function FAQSection() {
  const [activeTab, setActiveTab] = useState('mentees' as 'mentees' | 'mentors');
  const [openMentee, setOpenMentee] = useState<number | null>(null);
  const [openMentor, setOpenMentor] = useState<number | null>(null);

  const menteeFaqs = [
    {
      q: 'How do I find the right mentor?',
      a: 'Use the mentor directory to explore profiles, topics, and availability that align with your goals.',
    },
    {
      q: 'Is Chai Chat free for mentees?',
      a: 'Yes! Our platform is completely free for mentees seeking guidance and support.',
    },
    {
      q: 'Can I meet with more than one mentor?',
      a: 'Yes, you can schedule sessions with different mentors based on your needs.',
    },
    {
      q: 'What should I bring to my first session?',
      a: 'Bring curiosity and clarity. You can also jot down a few goals or challenges ahead of time.',
    },
    {
      q: 'Can I change mentors later?',
      a: 'Absolutely. You\'re encouraged to find the best match for your journey.',
    },
  ];
  const mentorFaqs = [
    {
      q: 'How do I become a mentor?',
      a: 'Click "Become a Mentor," fill out your profile, and we\'ll review it within 48 hours.',
    },
    {
      q: 'Is there a time commitment?',
      a: 'No fixed time commitment — you set your availability and pace.',
    },
    {
      q: 'Can I choose who I mentor?',
      a: 'Yes. You have full control over which requests you accept.',
    },
    {
      q: 'How do badges work?',
      a: 'Mentors earn badges based on hours, sessions, and community engagement milestones.',
    },
    {
      q: 'Can I pause or stop mentoring?',
      a: 'Yes — update your availability anytime from your dashboard.',
    },
  ];

  const faqs = activeTab === 'mentees' ? menteeFaqs : mentorFaqs;
  const openIdx = activeTab === 'mentees' ? openMentee : openMentor;
  const setOpen = activeTab === 'mentees' ? setOpenMentee : setOpenMentor;

  return (
    <section id="faq" className="max-w-4xl mx-auto mt-24 mb-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="flex justify-center mb-8 gap-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold text-sm transition duration-200 focus:outline-none ${activeTab === 'mentees' ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 border border-teal-200 hover:bg-teal-50'}`}
          onClick={() => setActiveTab('mentees')}
        >
          Mentees
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold text-sm transition duration-200 focus:outline-none ${activeTab === 'mentors' ? 'bg-teal-600 text-white shadow' : 'bg-white text-teal-600 border border-teal-200 hover:bg-teal-50'}`}
          onClick={() => setActiveTab('mentors')}
        >
          Mentors
        </button>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={faq.q} className="bg-white shadow-md rounded-xl p-6">
            <button
              className="w-full flex justify-between items-center text-lg font-semibold text-left focus:outline-none"
              onClick={() => setOpen(openIdx === idx ? null : idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`faq-panel-${activeTab}-${idx}`}
            >
              <span>{faq.q}</span>
              <span className={`ml-2 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div
              id={`faq-panel-${activeTab}-${idx}`}
              className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-40 mt-4' : 'max-h-0'}`}
              style={{}}
            >
              <p className="text-base text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sara',
      title: 'PhD Student',
      initials: 'S',
      quote: 'Having a mentor who understands my academic journey has been transformative. I now feel more confident about my research and career path.'
    },
    {
      name: 'Saleh',
      title: 'Power Systems Engineer',
      initials: 'Sa',
      quote: 'Chai Chat helped me give back and stay grounded. The connections I\'ve made are more than professional — they\'re personal.'
    },
    {
      name: 'Raheleh',
      title: 'Research Scientist',
      initials: 'R',
      quote: 'This platform makes you feel seen. It\'s not just about knowledge sharing — it\'s about humanity and belonging.'
    },
    {
      name: 'Jason',
      title: 'UX Designer',
      initials: 'J',
      quote: 'The one-on-one conversations gave me clarity I couldn\'t find elsewhere. This community truly lives up to its mission.'
    },
  ];
  return (
    <section id="testimonials" className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-0 fade-in-up">
      <h2 className="text-2xl font-bold text-center mb-10">What Members Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={t.name} className="bg-white p-6 rounded-2xl shadow-md transition hover:shadow-lg flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex justify-center mb-4">
              <Image
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}`}
                alt={`Avatar of ${t.name}`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover mx-auto ring-1 ring-teal-100 bg-teal-50"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600 shadow';
                  fallback.innerText = t.initials;
                  if (e.currentTarget.parentNode) {
                    e.currentTarget.parentNode.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div className="font-semibold text-gray-800 mt-4">{t.name}</div>
            <div className="text-sm italic text-gray-500">{t.title}</div>
            <div className="text-base text-gray-700 leading-relaxed mt-3">&quot;{t.quote}&quot;</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Chai Chat
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Where Sonder Becomes Connection
          </p>
        </div>

        {/* Founder's Story Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl shadow-xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Why I Built This</h2>
            </div>

            <div className="space-y-4 text-white/90 text-lg leading-relaxed">
              <p>
                In 2018, I came to the United States searching for opportunity. I didn't know anyone.
                I didn't have connections. But when I started looking for jobs, something incredible happened.
              </p>
              <p>
                <strong className="text-white">Strangers helped me.</strong> People I had never met before took time
                out of their busy lives to review my resume, make introductions, and offer guidance.
                They didn't know me. They didn't owe me anything. They just wanted to help.
              </p>
              <p>
                That experience changed me. I realized there are so many people out there who genuinely
                <em> want</em> to help others — they just don't always have a way to find those who need it.
              </p>
              <p className="text-white font-medium">
                That's why I built Chai Chat. <strong>To connect helpers with those who need help.</strong>
                To create a space where a stranger's kindness can change someone's life, just like it changed mine.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm">— Mia, Founder of Chai Chat</p>
            </div>
          </div>
        </section>

        {/* What is Sonder Section */}
        <section className="mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why "Sonder"?</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <p className="text-2xl font-serif italic text-gray-700 mb-4">
              "Sonder"
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              <em>n.</em> The profound realization that each random passerby is living a life as vivid
              and complex as your own — with their own ambitions, worries, routines, and stories.
            </p>
            <p className="text-gray-700">
              It's my favorite word because it reminds us of an essential truth:
              <strong> we are all the same.</strong> We all struggle, dream, and hope.
              We are all connected — like pieces of one whole.
            </p>
            <p className="text-teal-600 font-medium mt-4">
              When you mentor someone, you're not just sharing knowledge —
              you're acknowledging their humanity. That's Sonder in action.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-teal-500">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-base leading-relaxed text-gray-600">
                To connect people who want to help with those who need guidance — creating meaningful
                mentorship relationships that foster growth, belonging, and mutual support.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-teal-500">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-base leading-relaxed text-gray-600">
                A world where no one has to navigate their journey alone. Where strangers become
                mentors, and a simple conversation over chai can open doors you never knew existed.
              </p>
            </div>
          </div>
        </div>


        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in the power of community and the strength that comes from supporting one another.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                We're committed to fostering an environment where continuous learning and personal development thrive.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make mentorship and support accessible to everyone, regardless of their background or circumstances.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to mentor others, find a mentor, or connect with accountability partners, Chai Chat is here to support your journey.
          </p>
        </div>

        {/* What Members Say Section */}
        <TestimonialsSection />
        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
} 