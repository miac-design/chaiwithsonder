'use client';

import { motion } from 'framer-motion';

export default function SonderSection() {
    return (
        <section className="py-20 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 p-10 sm:p-14 flex items-center justify-center min-h-[320px]">
                            {/* Abstract human connection illustration using CSS */}
                            <div className="relative w-full max-w-xs mx-auto">
                                {/* Two overlapping circles representing connection */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-amber-300/60 to-amber-400/40 blur-sm" />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-teal-300/60 to-teal-400/40 blur-sm" />
                                {/* Center glow - the connection point */}
                                <div className="relative flex items-center justify-center h-40">
                                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
                                        <span className="text-3xl">☕</span>
                                    </div>
                                </div>
                                <p className="text-center text-amber-800/60 text-sm font-medium mt-4 italic">
                                    Where two stories meet
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            Built on Sonder
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Sonder is the realization that every person around you has a life as vivid
                            and complex as your own. At ChaiChat, we believe mentorship isn&apos;t about
                            titles or expertise. It&apos;s about shared humanity. Sometimes you listen.
                            Sometimes you share. That&apos;s the magic.
                        </p>

                        {/* Pull quote */}
                        <blockquote className="border-l-4 border-amber-400 pl-6 py-2">
                            <p className="text-base text-gray-500 italic leading-relaxed">
                                <span className="font-semibold text-amber-700">son·der</span>{' '}
                                <span className="text-gray-400">/ˈsändər/</span>{' '}
                                <span className="text-gray-400 text-sm">n.</span>{' '}
                                the realization that each random passerby is living a life as vivid and
                                complex as your own.
                            </p>
                        </blockquote>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
