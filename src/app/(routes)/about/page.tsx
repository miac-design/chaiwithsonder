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
      q: 'Is Sonder Sessions free for mentees?',
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
          className={`px-4 py-2 rounded-full font-semibold text-sm transition duration-200 focus:outline-none ${activeTab === 'mentees' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}`}
          onClick={() => setActiveTab('mentees')}
        >
          Mentees
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold text-sm transition duration-200 focus:outline-none ${activeTab === 'mentors' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}`}
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
      quote: 'Sonder Sessions helped me give back and stay grounded. The connections I\'ve made are more than professional — they\'re personal.'
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
          <div key={t.name} className="bg-white p-6 rounded-2xl shadow-md transition hover:shadow-lg flex flex-col items-center text-center animate-fadeInUp" style={{animationDelay: `${i * 80}ms`}}>
            <div className="flex justify-center mb-4">
              <Image
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}`}
                alt={`Avatar of ${t.name}`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover mx-auto ring-1 ring-indigo-100 bg-indigo-50"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shadow';
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
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      {/* Website Makeover Team Section */}
      <section className="mt-12 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF9F3] to-[#F8F6F0]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
          Passionate minds building this platform
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Moein Razavi */}
          <div className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-8">
            <Image src="/team/moein.jpg" alt="Moein Razavi" width={128} height={128} className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-[#FFF9F3] shadow" />
            <div className="text-center">
              <div className="font-semibold text-xl md:text-2xl text-gray-900 tracking-tight mb-1">Moein Razavi, PhD</div>
            </div>
          </div>
          {/* Hamed Alikhani */}
          <div className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-8">
            <Image src="/team/hamed.jpg" alt="Hamed Alikhani" width={128} height={128} className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-[#FFF9F3] shadow" />
            <div className="text-center">
              <div className="font-semibold text-xl md:text-2xl text-gray-900 tracking-tight mb-1">Hamed Alikhani, PhD</div>
            </div>
          </div>
          {/* Mia C */}
          <div className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-8">
            <Image src="/team/mia.jpeg" alt="Mia C" width={128} height={128} className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-[#FFF9F3] shadow" />
            <div className="text-center">
              <div className="font-semibold text-xl md:text-2xl text-gray-900 tracking-tight mb-1">Mia C, PhD</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Us
          </h1>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="bg-neutral-50 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-base leading-relaxed text-gray-600">
                At Sonder Sessions, we believe that everyone deserves access to quality mentorship and support in their personal and professional journey. Our platform connects mentors and mentees, creating meaningful relationships that foster growth and development.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-base leading-relaxed text-gray-600">
                We envision a world where knowledge sharing and personal growth are accessible to all. Through our community-driven platform, we're creating a space where people can find the guidance and support they need to achieve their goals.
              </p>
            </div>
          </div>
        </div>

        {/* Warm, inclusive text block below team */}
        <div className="mt-4 flex justify-center fade-in">
          <div className="relative max-w-xl w-full rounded-2xl p-1 bg-gradient-to-br from-indigo-400/30 via-indigo-200/10 to-purple-300/20 shadow-2xl">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl py-6 px-4 flex flex-col items-center">
              <p className="font-medium text-lg md:text-xl text-gray-800 text-center max-w-md mx-auto leading-relaxed">
                This platform is our way of giving back—building a welcoming community, together.
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
            Whether you're looking to mentor others, find a mentor, or connect with accountability partners, Sonder Sessions is here to support your journey.
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