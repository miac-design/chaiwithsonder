'use client';

import { useState } from 'react';

export default function FAQSection() {
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
