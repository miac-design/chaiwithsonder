'use client';
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

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

const bannerFade = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } },
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
      className="bg-[#fafafc] py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Join */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="mb-4 flex items-center justify-center w-12 h-12">
              {/* User Plus Icon (Heroicons/Tabler/Lucide style) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition duration-200 group-hover:scale-105 group-hover:stroke-indigo-600">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </div>
            <div className="font-bold text-lg mb-2">Join</div>
            <div className="text-gray-500 text-base">Create your profile and set your mentorship goals.</div>
          </div>
          {/* Step 2: Match */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="mb-4 flex items-center justify-center w-12 h-12">
              {/* Handshake Icon (Heroicons/Tabler/Lucide style) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition duration-200 group-hover:scale-105 group-hover:stroke-indigo-600">
                <path d="M4 20h4l3-3" />
                <path d="M9 17l-5-5a2.828 2.828 0 0 1 4-4l1 1 1-1a2.828 2.828 0 0 1 4 4l-5 5" />
                <path d="M14 17l3 3h4" />
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" opacity="0" />
              </svg>
            </div>
            <div className="font-bold text-lg mb-2">Match</div>
            <div className="text-gray-500 text-base">Browse mentors, find your match,<br/>and book a session.</div>
          </div>
          {/* Step 3: Grow */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="mb-4 flex items-center justify-center w-12 h-12">
              {/* Trending Up Icon (Heroicons/Tabler/Lucide style) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition duration-200 group-hover:scale-105 group-hover:stroke-indigo-600">
                <polyline points="3 17 9 11 13 15 21 7" />
                <polyline points="14 7 21 7 21 14" />
              </svg>
            </div>
            <div className="font-bold text-lg mb-2">Grow</div>
            <div className="text-gray-500 text-base">Track your progress and share<br/>success stories with the community.</div>
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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Empowering Growth<br />Through <span className="text-indigo-300">Mentorship</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 leading-relaxed drop-shadow">
            Connect. Commit. Grow — Together.
          </p>
          <Link
            href="/mentor#application"
            className="px-8 py-4 rounded-2xl bg-white/80 text-indigo-700 font-semibold text-lg shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-indigo-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            style={{boxShadow:'0 4px 24px rgba(80,80,180,0.10)'}}
          >
            Become a Mentor
          </Link>
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
                Why Sonder Matters
              </motion.h2>
              <div className="space-y-4 text-left">
                <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-700 leading-relaxed mb-2">
                  The word <span className="font-bold" style={{ color: '#6C63FF' }}>sonder</span> was created by writer John Koenig in <span className="italic">The Dictionary of Obscure Sorrows</span>. It captures a powerful realization:
                </motion.p>
                <motion.blockquote variants={fadeIn} className="italic text-gray-700 text-sm md:text-base font-medium mb-2 border-l-4 border-[#6C63FF] pl-4">
                  "<span className="font-bold" style={{ color: '#6C63FF' }}>Sonder</span> is the feeling you get when you suddenly realize that every person you see — even strangers — has a life full of thoughts, memories, and experiences, just like you."
                </motion.blockquote>
                <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-700 leading-relaxed">
                  At Sonder Sessions, we embrace this idea — that everyone's story matters. Through mentorship, we connect individuals whose experiences, dreams, and challenges all deserve to be seen and shared.
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
            {/* Join as Mentor Card */}
            <motion.div
              variants={fadeIn}
              className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.h3 variants={fadeIn} className="heading-3 mb-2">
                Join as Mentor
              </motion.h3>
              <motion.p variants={fadeIn} className="text-body mb-4">
                Share your knowledge and experience to help others grow in their journey.
              </motion.p>
              <Link href="/mentor#application" className="btn-primary">
                Become a Mentor
              </Link>
            </motion.div>

            {/* Join as Mentee Card */}
            <motion.div
              variants={fadeIn}
              className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.h3 variants={fadeIn} className="heading-3 mb-2">
                Join as Mentee
              </motion.h3>
              <motion.p variants={fadeIn} className="text-body mb-4">
                Connect with experienced mentors who can guide you in your journey.
              </motion.p>
              <Link href="/mentor" className="btn-primary">
                Find a Mentor
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
