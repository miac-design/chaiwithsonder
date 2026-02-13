'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeartStraight, ArrowsLeftRight, UsersThree } from '@phosphor-icons/react';

const swapCards = [
    {
        icon: HeartStraight,
        title: 'A CEO learning AI from a college student',
        description: 'Because fresh eyes see what experience misses.',
        color: 'text-purple-500',
    },
    {
        icon: UsersThree,
        title: 'A new grad getting career advice from a retired exec',
        description: '30 years of wisdom, shared over one conversation.',
        color: 'text-amber-500',
    },
    {
        icon: ArrowsLeftRight,
        title: 'Both. At the same time.',
        description: 'Teach what you know. Learn what you don\'t. That\'s Sonder Swap.',
        color: 'text-emerald-500',
    },
];

export default function SonderSwapTeaser() {
    return (
        <section className="py-20 sm:py-24 bg-gradient-to-br from-amber-50 via-white to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
                        <span>✨</span>
                        <span>New Feature</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Introducing Sonder Swap
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        The feature that makes ChaiChat unlike any mentoring platform in the world.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {swapCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100/60 text-center group"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-50 mb-4">
                                    <Icon size={32} weight="duotone" className={card.color} aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/sonder-swap"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Explore Sonder Swap
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
