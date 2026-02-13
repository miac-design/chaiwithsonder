'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, UserPlus, ChevronDown, ArrowRight, Quote, Smartphone } from "lucide-react";
import LiveNowFeed from "@/components/LiveNowFeed";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-10">
          <h2 className="heading-serif text-3xl md:text-4xl mb-4">
            Your Journey <span className="heading-italic-accent">Starts Here</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to meaningful connection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <motion.div
            className="edron-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="edron-step-pill mx-auto mb-6">1</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Take a 2-Min Quiz
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Answer a few quick questions about your goals, career stage, and what kind of support you need.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="edron-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="edron-step-pill mx-auto mb-6">2</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Get Matched with 3 Mentors
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our smart matching engine recommends mentors who truly understand your journey and goals.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="edron-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="edron-step-pill mx-auto mb-6">3</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Book a Free 30-Min Chat
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Pick a time, grab a virtual chai, and have a real conversation. No agenda required.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "13+", label: "Mentors", description: "From Big Tech, startups & academia" },
    { number: "350+", label: "Chais Shared", description: "Conversations that made a difference" },
    { number: "100%", label: "Free", description: "No fees, ever. Mentorship for all." },
  ];

  const testimonials = [
    {
      quote: "I came to the US with $200 and a dream. ChaiChat let me pay it forward.",
      name: "Hamed A.",
      role: "Gen AI Expert & Mentor",
    },
    {
      quote: "Navigated the PhD journey and tech transition \u2014 love helping others do the same.",
      name: "Moein R.",
      role: "Gen AI Expert & Mentor",
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50/50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-2">{stat.number}</div>
              <div className="text-lg font-bold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + idx * 0.15 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-8 h-8 text-teal-300 flex-shrink-0 mt-1" />
                <p className="text-gray-600 leading-relaxed italic">{t.quote}</p>
              </div>
              <div className="flex items-center gap-3 ml-11">
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}


export default function Home() {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================
          HERO SECTION (DARK - Allowed)
          ============================ */}
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerContainer}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="w-full h-full object-cover"
            src="/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/new-hero.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-0" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto w-full px-4">
          <motion.p
            className="text-teal-400 font-medium tracking-wide uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Where Sonder Becomes Connection
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everyone has something to share.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Free 30-minute chats with mentors from Big Tech, startups, and academia. No agenda needed.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/mentor"
              className="btn-teal btn-pulse flex items-center justify-center gap-2 text-lg"
            >
              <Search className="w-6 h-6" />
              <span>Find a Mentor</span>
            </Link>
            <Link
              href="/mentor/become"
              className="btn-teal-outline flex items-center justify-center gap-2 text-lg"
            >
              <UserPlus className="w-6 h-6" />
              <span>Become a Mentor</span>
            </Link>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-white/50">Sonder. Connect. Grow.</p>
            <Link
              href="/get-app"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              Get the App — iPhone & Android
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.section>

      {/* Wave divider */}
      <div className="divider-wave" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }} />

      <HowItWorksSection />

      {/* ============================
          SOCIAL PROOF SECTION
          ============================ */}
      <SocialProofSection />

      {/* ============================
          LIVE NOW SECTION
          ============================ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-1">
              <h2 className="heading-serif text-2xl md:text-3xl mb-4">
                Connect <span className="heading-italic-accent">Right Now</span>
              </h2>
              <p className="text-gray-600 mb-6">
                These mentors are available for a conversation right now.
                Jump in and start chatting instantly.
              </p>
              <Link
                href="/mentor?filter=live"
                className="text-teal-600 font-medium hover:text-teal-700 inline-flex items-center gap-2"
              >
                See all live mentors
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-full lg:w-96">
              <LiveNowFeed maxItems={3} />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          WHY CHAI CHAT MATTERS (LIGHT)
          ==================================== */}
      <motion.section
        ref={aboutRef}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text Column */}
            <motion.div
              className="flex-1 max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-serif text-3xl md:text-4xl mb-8">
                Why Chai Chat <span className="heading-italic-accent">Matters</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The word <span className="font-bold text-teal-600">sonder</span> was created by writer John Koenig in <em className="text-gray-800">The Dictionary of Obscure Sorrows</em>. It captures a powerful realization:
              </p>

              <blockquote className="border-l-4 border-teal-500 bg-teal-50/50 px-6 py-4 rounded-r-xl mb-6">
                <p className="text-lg font-semibold text-teal-700 mb-1">Sonder</p>
                <p className="text-gray-600 leading-relaxed italic">
                  The feeling you get when you suddenly realize that every person you see — even strangers — has a life full of thoughts, memories, and experiences, just like you.
                </p>
              </blockquote>

              <p className="text-lg text-gray-700 leading-relaxed">
                That&apos;s why we created ChaiChat — a place where sharing a story is just as powerful as hearing one. We believe in mutual support, not titles. Anyone can give or receive. It&apos;s that simple.
              </p>
            </motion.div>

            {/* Image Column */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-200 via-blue-100 to-teal-200 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative h-80 sm:h-96 w-full max-w-lg rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/new-connection-image.jpg"
                    alt="Human connection illustration"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* =============================
          SUPPORT BANNER (SLIM)
          ============================= */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Help keep mentorship free for everyone</h2>
            <p className="text-teal-100 text-sm">Your donation covers infrastructure and ensures accessibility for all.</p>
          </div>
          <Link
            href="/donate"
            className="px-8 py-3 rounded-full font-semibold bg-white text-teal-700 hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex-shrink-0"
          >
            Support Us
          </Link>
        </div>
      </section>

    </div>
  );
}
