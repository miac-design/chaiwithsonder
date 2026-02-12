'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900">
            {/* Subtle warm overlay pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.2) 0%, transparent 40%)',
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Text content */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={{ animate: { transition: { staggerChildren: 0.15 } } }}
                        className="text-center lg:text-left"
                    >
                        <motion.h1
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
                        >
                            Find a mentor who actually{' '}
                            <span className="text-amber-300">gets your journey.</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 text-lg sm:text-xl text-amber-100/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            ChaiChat is a free mentoring community where every story matters.
                            Get matched with real people who listen, share, and help you grow.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/mentor"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-teal-500 text-white hover:bg-teal-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-h-[52px]"
                            >
                                Find a Mentor
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/mentor/become"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all min-h-[52px]"
                            >
                                Become a Mentor
                            </Link>
                        </motion.div>

                        {/* Trust line */}
                        <motion.div
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-amber-200/70"
                        >
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Always free
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                500+ community members
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Backed by Austin AI Hub, a 501(c)(3)
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                            <Image
                                src="/new-hero.jpg"
                                alt="Two people having a warm, meaningful conversation over chai"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                        </div>
                        {/* Floating accent */}
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-teal-500/20 blur-xl" />
                        <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-amber-400/20 blur-xl" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white/40"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
