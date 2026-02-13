'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Upload, Download } from 'lucide-react';

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

export default function GetInvolvedSection() {
    return (
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
                    <motion.div variants={fadeIn} className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300">
                        <motion.h3 variants={fadeIn} className="heading-3 mb-2 flex items-center gap-2">
                            <Upload className="w-7 h-7 text-rose-500" />
                            Share a Chat
                        </motion.h3>
                        <motion.p variants={fadeIn} className="text-body mb-4">
                            Give a little time. Be a listener. Offer what you&apos;ve learned.
                        </motion.p>
                        <Link href="/mentor#application" className="btn-primary">
                            Share a Chat
                        </Link>
                    </motion.div>

                    {/* Sip a Chat Card */}
                    <motion.div variants={fadeIn} className="glass-card p-6 hover:shadow-2xl transition-shadow duration-300">
                        <motion.h3 variants={fadeIn} className="heading-3 mb-2 flex items-center gap-2">
                            <Download className="w-7 h-7 text-blue-500" />
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
    );
}
