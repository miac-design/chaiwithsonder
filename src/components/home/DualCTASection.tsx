'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DualCTASection() {
    return (
        <section className="py-20 sm:py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Mentee path (primary, slightly larger) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/10 hover:bg-white/15 transition-all"
                    >
                        <div className="text-3xl mb-4">🌱</div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Looking for Guidance?
                        </h3>
                        <p className="text-amber-100/70 text-base leading-relaxed mb-8">
                            Browse mentors, book a conversation, and get the perspective you need.
                        </p>
                        <Link
                            href="/mentor"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center min-h-[52px]"
                        >
                            Find a Mentor
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Right: Mentor path (secondary) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.12 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <div className="text-3xl mb-4">🎤</div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Ready to Give Back?
                        </h3>
                        <p className="text-amber-100/60 text-base leading-relaxed mb-8">
                            Share your experience. Be a listener. Make a meaningful difference in someone&apos;s journey.
                        </p>
                        <Link
                            href="/mentor/become"
                            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all w-full sm:w-auto justify-center min-h-[52px]"
                        >
                            Become a Mentor
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
