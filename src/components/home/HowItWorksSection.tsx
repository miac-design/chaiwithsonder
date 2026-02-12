'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircleUser, Sparkles, ArrowRight } from 'lucide-react';

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
        description: 'Our AI-powered matching finds mentors who truly understand your journey — based on shared experiences, not just keywords.',
        icon: Sparkles,
    },
    {
        number: '03',
        title: 'Start a Conversation',
        description: 'Book a session or jump into a live chat. Listen, share, and grow — at your own pace.',
        icon: (props: React.SVGAttributes<SVGSVGElement>) => (
            <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        ),
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
