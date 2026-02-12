'use client';

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

      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Us
          </h1>
        </div>

        <MissionSection />
        <ValuesSection />

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re looking to mentor others, find a mentor, or connect with accountability partners, Chai Chat is here to support your journey.
          </p>
        </div>

        <TestimonialsSection />
        <FAQSection />
      </div>
    </div>
  );
}