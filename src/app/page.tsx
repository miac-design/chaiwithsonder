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
      className="bg-[#fafafc] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Step 1: Create Profile */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 flex flex-col items-center text-center min-h-[320px] h-full justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group">
            {/* Larger Tea bag/profile SVG icon */}
            <div className="mb-6 flex items-center justify-center" style={{height:'72px'}}>
              <svg width="64" height="64" viewBox="0 0 44 44" fill="none"><rect x="6" y="10" width="32" height="24" rx="6" fill="#E0E7FF"/><rect x="12" y="16" width="20" height="12" rx="4" fill="#6366F1"/><circle cx="22" cy="22" r="3" fill="#FDBA74"/><rect x="20" y="26" width="4" height="2" rx="1" fill="#FDBA74"/></svg>
            </div>
            <div>
              <div className="font-bold text-lg md:text-xl mb-2 text-indigo-700 leading-tight whitespace-nowrap">Create your profile & share your flavor</div>
              <div className="text-gray-500 text-base md:text-base leading-normal">Your story, your vibe, your interests.</div>
            </div>
          </div>
          {/* Step 2: Connect */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 flex flex-col items-center text-center min-h-[320px] h-full justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group">
            {/* Larger Chat bubble SVG icon */}
            <div className="mb-6 flex items-center justify-center" style={{height:'72px'}}>
              <svg width="64" height="64" viewBox="0 0 44 44" fill="none"><rect x="6" y="14" width="32" height="16" rx="8" fill="#E0E7FF"/><rect x="12" y="18" width="20" height="8" rx="4" fill="#6366F1"/><rect x="16" y="26" width="12" height="4" rx="2" fill="#FDBA74"/></svg>
            </div>
            <div>
              <div className="font-bold text-lg md:text-xl mb-2 text-indigo-700 leading-tight whitespace-nowrap">Connect with someone</div>
              <div className="text-gray-500 text-base md:text-base leading-normal">Over a relaxed 1-on-1 conversation.</div>
            </div>
          </div>
          {/* Step 3: Grow Together */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 flex flex-col items-center text-center min-h-[320px] h-full justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl group">
            {/* Larger Sprout SVG icon */}
            <div className="mb-6 flex items-center justify-center" style={{height:'72px'}}>
              <svg width="64" height="64" viewBox="0 0 44 44" fill="none"><ellipse cx="22" cy="32" rx="10" ry="3" fill="#E0E7FF"/><path d="M22 32V18" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/><path d="M22 18c-4 0-8 2-8 6 0 2 2 4 4 4" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round"/><path d="M22 18c4 0 8 2 8 6 0 2-2 4-4 4" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round"/><circle cx="22" cy="16" r="2" fill="#6366F1"/></svg>
            </div>
            <div>
              <div className="font-bold text-lg md:text-xl mb-2 text-indigo-700 leading-tight whitespace-nowrap">Grow together</div>
              <div className="text-gray-500 text-base md:text-base leading-normal">Sometimes you listen. Sometimes you share. That's the magic of it.</div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerContainer}
        className="relative min-h-[90vh] flex items-center justify-center h-full overflow-hidden"
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
          <div className="absolute inset-0 bg-black/60 z-0" />
        </div>
        {/* Centered Content on Overlay */}
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto w-full px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight flex flex-col items-center">
            Everyone has something to share.
            <span className="text-base md:text-lg font-medium block mt-2 text-indigo-100 max-w-xl">
              Whether you're starting out or have stories to tell — your words might just brighten someone's day. And theirs might brighten yours.
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 w-full max-w-md mx-auto">
            <Link
              href="/signup?type=share"
              className="flex items-center justify-center gap-2 text-base md:text-lg px-5 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold bg-indigo-600 text-white shadow hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              style={{minWidth:'140px'}}
            >
              {/* Chat bubble SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="inline-block align-middle"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
              <span>Share a Chat</span>
            </Link>
            <Link
              href="/signup?type=sip"
              className="flex items-center justify-center gap-2 text-base md:text-lg px-5 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold border border-indigo-200 text-indigo-100 bg-white/10 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              style={{minWidth:'140px'}}
            >
              {/* Sprout SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="inline-block align-middle"><path d="M12 19V5m0 0C9 5 5 7 5 11c0 2.5 2 4 4 4m3-10c3 0 7 2 7 6 0 2.5-2 4-4 4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="19" r="2" fill="#6366F1"/></svg>
              <span>Sip a Chat</span>
            </Link>
          </div>
          <div className="mt-2 text-xs text-indigo-100 opacity-80">Low-pressure, peer-to-peer, community-first</div>
        </div>
        {/* Scroll Down Icon */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center z-10">
          <span className="animate-bounce">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white w-8 h-8 drop-shadow">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </motion.section>

      <HowItWorksSection />

      {/* About Sonder Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 px-4 sm:py-10 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-indigo-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            {/* Text Column */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-xl mx-auto lg:mx-0 animate-fadeInUp duration-700 delay-200">
              <motion.h2 variants={fadeIn} className="text-4xl font-extrabold text-gray-900 mb-6 text-left">
                Why Chai Chat Matters
              </motion.h2>
              <div className="space-y-4 text-left">
                <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-700 leading-relaxed mb-2">
                  The word <span className="font-bold" style={{ color: '#6C63FF' }}>sonder</span> was created by writer John Koenig in <span className="italic">The Dictionary of Obscure Sorrows</span>. It captures a powerful realization:
                </motion.p>
                <motion.blockquote variants={fadeIn} className="italic text-gray-700 text-sm md:text-base font-medium mb-2 border-l-4 border-[#6C63FF] pl-4">
                  &quot;<span className="font-bold" style={{ color: '#6C63FF' }}>Sonder</span> is the feeling you get when you suddenly realize that every person you see — even strangers — has a life full of thoughts, memories, and experiences, just like you.&quot;
                </motion.blockquote>
                <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-700 leading-relaxed">
                  That's why we created Chaichat — a place where sharing a story is just as powerful as hearing one.<br/>
                  We believe in mutual support, not titles. Anyone can give or receive. It's that simple.
                </motion.p>
              </div>
            </div>
            {/* Image Column */}
            <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0 animate-slideInRight duration-700 delay-200">
              <motion.div
                variants={fadeIn}
                className="relative h-72 sm:h-80 md:h-[420px] w-full max-w-md rounded-3xl overflow-hidden shadow-xl border border-white/10 group"
                whileHover={{ scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Image
                  src="/new-connection-image.jpg"
                  alt="Human connection illustration"
                  fill
                  className="object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-white/10 rounded-3xl pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Donation Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="section-padding bg-neutral-50"
      >
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <motion.h2 variants={fadeIn} className="heading-2">
              Support Accessible Mentoring
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-body">
              Your donation helps keep our platform free and supports mentorship for those who need it most.
            </motion.p>
          </div>
          <motion.div
            variants={fadeIn}
            className="mt-12 max-w-lg mx-auto"
          >
            <div className="glass-card p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Donation Amount
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-xl"
                      placeholder="0.00"
                      min="1"
                      step="1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Link href="/donate" className="btn-primary w-full flex justify-center">
                    Donate Now
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Get Involved Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex justify-center items-center min-h-[60vh] py-16 px-4 bg-gradient-to-br from-white via-indigo-50 to-purple-50"
      >
        <div className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl p-8 bg-white/80">
          <motion.h2 variants={fadeIn} className="heading-2 text-center mb-12">
            Get Involved
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Share a Chat Card */}
            <motion.div
              variants={fadeIn}
              className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.h3 variants={fadeIn} className="heading-3 mb-2 flex items-center gap-2">
                {/* Share a Chat Icon (Envelope with red up arrow) */}
                <span className="inline-block align-middle">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="3" y="8" width="22" height="14" rx="4" fill="#E0E7FF"/>
                    <rect x="6" y="11" width="16" height="8" rx="2" fill="#fff"/>
                    <path d="M14 6v6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 8l2-2 2 2" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Share a Chat
              </motion.h3>
              <motion.p variants={fadeIn} className="text-body mb-4">
                Give a little time. Be a listener. Offer what you've learned.
              </motion.p>
              <Link href="/mentor#application" className="btn-primary">
                Share a Chat
              </Link>
            </motion.div>

            {/* Sip a Chat Card */}
            <motion.div
              variants={fadeIn}
              className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.h3 variants={fadeIn} className="heading-3 mb-2 flex items-center gap-2">
                {/* Sip a Chat Icon (Envelope with blue down arrow, same style as Share a Chat) */}
                <span className="inline-block align-middle">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="3" y="8" width="22" height="14" rx="4" fill="#E0E7FF"/>
                    <rect x="6" y="11" width="16" height="8" rx="2" fill="#fff"/>
                    <path d="M14 16v-6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 14l2 2 2-2" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Sip a Chat
              </motion.h3>
              <motion.p variants={fadeIn} className="text-body mb-4">
                Book a conversation. Get perspective, clarity, or just someone who listens.
              </motion.p>
              <Link href="/mentor" className="btn-secondary">
                Sip a Chat
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
