'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircleUser, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Create Your Profile',
        description: 'Tell us about your experiences, interests, and what you\'re looking for. It takes less than 2 minutes.',
        icon: CircleUser,
    },
    {
        number: '02',
        title: 'Get Matched by Sonder Match AI',
        description: 'Our AI-powered matching finds mentors who truly understand your journey, based on shared experiences, not just keywords.',
        icon: Sparkles,
    },
    {
        number: '03',
        title: 'Start a Conversation',
        description: 'Book a session or jump into a live chat. Listen, share, and grow at your own pace.',
        icon: MessageCircle,
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="how-it-works py-20 sm:py-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Your Journey Starts Here
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Three simple steps to meaningful connection
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="relative text-center"
                            >
                                {/* Step icon circle */}
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mb-6">
                                    <Icon className="w-8 h-8" aria-hidden="true" />
                                </div>

                                {/* Connector line (desktop only) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-amber-300 to-transparent" />
                                )}

                                {/* Step number */}
                                <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">
                                    Step {step.number}
                                </p>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                                    {step.description}
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
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-14"
                >
                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-500 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]"
                    >
                        <Sparkles className="w-5 h-5" aria-hidden="true" />
                        Get Started Free
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
