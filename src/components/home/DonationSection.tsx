'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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

export default function DonationSection() {
    return (
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
                <motion.div variants={fadeIn} className="mt-12 max-w-lg mx-auto">
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
    );
}
