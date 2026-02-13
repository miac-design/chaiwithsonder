'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FAQSection, TestimonialsSection, MissionSection, ValuesSection } from '@/components/about';

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I find the right mentor?", acceptedAnswer: { "@type": "Answer", text: "Use the mentor directory to explore profiles, topics, and availability that align with your goals." } },
    { "@type": "Question", name: "Is Chai Chat free for mentees?", acceptedAnswer: { "@type": "Answer", text: "Yes! Our platform is completely free for mentees seeking guidance and support." } },
    { "@type": "Question", name: "Can I meet with more than one mentor?", acceptedAnswer: { "@type": "Answer", text: "Yes, you can schedule sessions with different mentors based on your needs." } },
    { "@type": "Question", name: "How do I become a mentor?", acceptedAnswer: { "@type": "Answer", text: "Click 'Become a Mentor,' fill out your profile, and we'll review it within 48 hours." } },
    { "@type": "Question", name: "Is there a time commitment?", acceptedAnswer: { "@type": "Answer", text: "No fixed time commitment — you set your availability and pace." } },
  ],
};

export default function About() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-medium rounded-full mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Where Sonder Becomes <span className="italic text-teal-600">Connection</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A community-driven mentoring platform built on the belief that everyone has a story worth sharing and wisdom worth receiving.
            </p>
          </motion.div>
        </div>
      </section>

      <MissionSection />
      <ValuesSection />

      <div className="mt-20 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you&apos;re looking to mentor others, find a mentor, or connect with accountability partners, Chai Chat is here to support your journey.
        </p>
      </div>

      <TestimonialsSection />
      <FAQSection />

      {/* CTA */}
      <section className="py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to <span className="italic text-teal-600">Get Started?</span>
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Whether you want to share your experience or find guidance, there&apos;s a place for you here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/mentor" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-all">
            Find a Mentor
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link href="/mentor/become" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-600 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all">
            Become a Mentor
          </Link>
        </div>
      </section>
    </div>
  );
}