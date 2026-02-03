'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to meaningful connection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <motion.div
            className="glass-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
              <span className="text-2xl font-bold text-sky-600">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Create your profile
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Share your story, your vibe, and what you're looking to learn or offer.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="glass-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-600">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Connect with someone
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Over a relaxed 1-on-1 conversation that feels like a coffee chat.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="glass-card p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
              <span className="text-2xl font-bold text-sky-600">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Grow together
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sometimes you listen. Sometimes you share. That's the magic of it.
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
            className="text-amber-400 font-medium tracking-wide uppercase text-sm mb-4"
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
              href="/signup?type=share"
              className="group relative overflow-hidden flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-full font-semibold bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-1 transition-all duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <span>Share a Chat</span>
            </Link>
            <Link
              href="/signup?type=sip"
              className="flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-full font-semibold border-2 border-amber-400/80 text-amber-400 hover:bg-amber-400 hover:text-slate-900 hover:-translate-y-1 transition-all duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5m0 0C9 5 5 7 5 11c0 2.5 2 4 4 4m3-10c3 0 7 2 7 6 0 2.5-2 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="19" r="2" fill="currentColor" />
              </svg>
              <span>Sip a Chat</span>
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

      {/* ====================================
          WHY CHAI CHAT MATTERS (LIGHT BLUE)
          ==================================== */}
      <motion.section
        ref={aboutRef}
        className="py-20 px-4 sm:px-6 lg:px-8 section-blue-soft"
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
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
                Why Chai Chat Matters
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The word <span className="font-bold text-amber-600">sonder</span> was created by writer John Koenig in <em className="text-gray-800">The Dictionary of Obscure Sorrows</em>. It captures a powerful realization:
              </p>

              <blockquote className="quote-block mb-6">
                &ldquo;<span className="font-bold text-amber-600">Sonder</span> is the feeling you get when you suddenly realize that every person you see — even strangers — has a life full of thoughts, memories, and experiences, just like you.&rdquo;
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
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 via-amber-100 to-sky-200 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
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
          DONATION SECTION (WARM)
          ============================= */}
      <motion.section
        ref={donateRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={donateInView ? { opacity: 1, y: 0 } : {}}
          >
            Support Accessible Mentoring
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
            className="glass-card-premium max-w-md mx-auto p-8"
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
                    <span className="text-amber-600 text-lg font-semibold">$</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full pl-8 pr-16 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="25.00"
                    min="1"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">USD</span>
                  </div>
                </div>
              </div>
              <Link href="/donate" className="btn-accent w-full flex justify-center text-lg py-4">
                ☕ Donate Now
              </Link>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* =============================
          GET INVOLVED (LIGHT)
          ============================= */}
      <motion.section
        className="py-24 px-4 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Get Involved
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Share a Chat */}
            <motion.div
              className="glass-card-premium p-8"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Share a Chat</h3>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Give a little time. Be a listener. Offer what you've learned and make a difference.
              </p>
              <Link href="/mentor#application" className="btn-primary inline-flex items-center gap-2">
                Start Sharing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            {/* Sip a Chat */}
            <motion.div
              className="glass-card-premium p-8"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                    <path d="M12 19V5m0 0C9 5 5 7 5 11c0 2.5 2 4 4 4m3-10c3 0 7 2 7 6 0 2.5-2 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="19" r="2" fill="#F59E0B" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Sip a Chat</h3>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Book a conversation. Get perspective, clarity, or just someone who truly listens.
              </p>
              <Link href="/mentor" className="btn-secondary inline-flex items-center gap-2">
                Start Sipping
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
