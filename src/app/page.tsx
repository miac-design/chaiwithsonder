'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={staggerContainer}
        className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  variants={fadeIn}
                  className="heading-1"
                >
                  <span className="block">Empowering Growth Through</span>
                  <span className="block text-indigo-600">Mentorship</span>
                </motion.h1>
                <motion.p
                  variants={fadeIn}
                  className="mt-3 text-body sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0"
                >
                  Connect. Commit. Grow — Together.
                </motion.p>
                <motion.div
                  variants={fadeIn}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start space-x-4"
                >
                  <Link href="/mentor" className="btn-primary">
                    Become a Mentor
                  </Link>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <Image
              src="/hero-image.jpg"
              alt="Mentorship illustration"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* About Sonder Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="section-padding gradient-bg"
      >
        <div className="max-w-7xl mx-auto container-padding">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <motion.h2 variants={fadeIn} className="heading-2">
                Why We Exist
              </motion.h2>
              <div className="mt-6 space-y-6">
                <motion.p variants={fadeIn} className="text-body italic">
                  Sonder is the feeling you get when you suddenly realize that everyone around you has a life as full and complicated as yours — with their own thoughts, problems, and dreams
                </motion.p>
                <motion.p variants={fadeIn} className="text-body">
                  We believe in the power of recognizing one another's stories — and building connections through mentorship and accountability.
                </motion.p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <motion.div
                variants={fadeIn}
                className="relative h-64 sm:h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src="/connection-image.jpg"
                  alt="Human connection illustration"
                  fill
                  className="object-cover"
                />
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
        className="section-padding gradient-bg"
      >
        <div className="max-w-7xl mx-auto container-padding">
          <motion.h2 variants={fadeIn} className="heading-2 text-center mb-12">
            Get Involved
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
              <Link href="/mentor" className="btn-primary">
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
