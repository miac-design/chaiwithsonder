'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LiveNowFeed from "@/components/LiveNowFeed";

export const dynamic = "force-dynamic";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-grid-pattern"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16">
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
              Tell Your Story
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Share what makes you unique — your experiences, passions, and what you're looking to learn or offer.
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
              Find Your Match
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our smart matching connects you with someone who truly understands your journey.
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
              Grow Together
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sometimes you listen. Sometimes you share. That's the magic of meaningful connection.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}


export default function Home() {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const donateRef = useRef(null);
  const donateInView = useInView(donateRef, { once: true, margin: "-100px" });

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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900 z-0" />
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
            A learning and mentorship community where every story matters.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/mentor#application"
              className="btn-teal btn-pulse flex items-center justify-center gap-2 text-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Become a Mentor</span>
            </Link>
            <Link
              href="/mentor"
              className="flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-full font-semibold border-2 border-teal-400/80 text-teal-400 hover:bg-teal-400 hover:text-slate-900 hover:-translate-y-1 transition-all duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Find a Mentor</span>
            </Link>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Sonder. Connect. Grow.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/50">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Wave divider */}
      <div className="divider-wave" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }} />

      <HowItWorksSection />

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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
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

              <blockquote className="border-l-4 border-teal-500 pl-6 py-4 bg-teal-50/50 rounded-r-xl mb-6">
                &ldquo;<span className="font-bold text-teal-600">Sonder</span> is the feeling you get when you suddenly realize that every person you see — even strangers — has a life full of thoughts, memories, and experiences, just like you.&rdquo;
              </blockquote>

              <p className="text-lg text-gray-700 leading-relaxed">
                That's why we created ChaiChat — a place where sharing a story is just as powerful as hearing one. We believe in mutual support, not titles. Anyone can give or receive. It's that simple.
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
          DONATION SECTION (TEAL GRADIENT)
          ============================= */}
      <motion.section
        ref={donateRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50 to-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="heading-serif text-3xl md:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={donateInView ? { opacity: 1, y: 0 } : {}}
          >
            Support <span className="heading-italic-accent">Accessible</span> Mentoring
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={donateInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Your donation helps keep our platform free and supports mentorship for those who need it most.
          </motion.p>

          <motion.div
            className="edron-card max-w-md mx-auto p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={donateInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Donation Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-teal-600 text-lg font-semibold">$</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full pl-8 pr-16 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                    placeholder="25.00"
                    min="1"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">USD</span>
                  </div>
                </div>
              </div>
              <Link href="/donate" className="btn-teal btn-pulse w-full flex justify-center text-lg py-4">
                Donate Now
              </Link>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* =============================
          GET INVOLVED (LIGHT)
          ============================= */}
      <motion.section
        className="py-24 px-4 bg-grid-pattern"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-serif text-3xl md:text-4xl text-center mb-4">
            Ready to <span className="heading-italic-accent">Get Involved?</span>
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Whether you want to share your experience or find guidance, there's a place for you here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Become a Mentor */}
            <motion.div
              className="edron-card p-8"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Become a Mentor</h3>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Give a little time. Be a listener. Share your experience and make a meaningful difference in someone's journey.
              </p>
              <Link href="/mentor#application" className="btn-teal inline-flex items-center gap-2">
                Start Mentoring
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            {/* Find a Mentor */}
            <motion.div
              className="edron-card p-8"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 8v6M8 11h6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Find a Mentor</h3>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Book a conversation. Get perspective, clarity, or just someone who truly listens and understands.
              </p>
              <Link href="/mentor" className="btn-secondary inline-flex items-center gap-2">
                Browse Mentors
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>


    </div>
  );
}
