'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, Heart, Sparkles } from 'lucide-react';

const metrics = [
    { value: '500+', label: 'Community Members', icon: Users },
    { value: '50+', label: 'Mentors', icon: GraduationCap },
    { value: '100%', label: 'Free', icon: Heart },
    { value: 'AI', label: 'Powered Matching', icon: Sparkles },
];

export default function SocialProofBar() {
    return (
        <section className="bg-amber-50/80 border-y border-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {metrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <Icon className="w-6 h-6 text-amber-700/70" aria-hidden="true" />
                                <div className="text-2xl sm:text-3xl font-bold text-amber-900">{metric.value}</div>
                                <div className="text-sm text-amber-700/80 font-medium">{metric.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Testimonial quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-amber-200/60"
                >
                    <blockquote className="text-center max-w-2xl mx-auto">
                        <p className="text-base sm:text-lg text-amber-800 italic leading-relaxed">
                            &ldquo;ChaiChat matched me with someone who truly understood my experience. It changed my perspective.&rdquo;
                        </p>
                        <footer className="mt-3 text-sm text-amber-600 font-medium">
                            &mdash; Sara, Career Changer
                        </footer>
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
}
