'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Briefcase, Rocket, FileText, MessageCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface MatchIntakeData {
    desired_flavor: string;
    career_stage: string;
    preferred_vibe: string;
    additional_context: string;
}

interface MatchIntakeQuizProps {
    onComplete: (intake: MatchIntakeData) => void;
    onClose?: () => void;
}

const STEPS = [
    {
        id: 'desired_flavor',
        question: 'What are you looking for right now?',
        subtitle: 'Pick the chai that fits your mood',
        options: [
            { value: 'career', label: 'Career Cardamom', desc: 'Career advice, job strategy, growth planning', icon: Briefcase },
            { value: 'startup', label: 'Startup Saffron', desc: 'Entrepreneurship, product, and founder talk', icon: Rocket },
            { value: 'resume', label: 'Resume Ginger', desc: 'Resume reviews, interview prep, job search', icon: FileText },
            { value: 'just_chat', label: 'Just Chat', desc: 'No agenda, just a good conversation', icon: MessageCircle },
        ],
    },
    {
        id: 'career_stage',
        question: 'Where are you in your journey?',
        subtitle: 'This helps us find mentors a step or two ahead',
        options: [
            { value: 'exploring', label: 'Exploring', desc: 'Still figuring out my direction' },
            { value: 'early_career', label: 'Early Career', desc: '0-3 years of professional experience' },
            { value: 'mid_career', label: 'Mid-Career', desc: '3-10 years, looking to level up' },
            { value: 'senior', label: 'Senior', desc: '10+ years, leadership or specialist track' },
            { value: 'executive', label: 'Executive', desc: 'C-suite, VP, or director level' },
        ],
    },
    {
        id: 'preferred_vibe',
        question: "What\u2019s your vibe?",
        subtitle: 'We match you with mentors who communicate your way',
        options: [
            { value: 'casual', label: 'Casual & Friendly', desc: 'Relaxed, conversational, like chatting with a friend' },
            { value: 'structured', label: 'Structured & Goal-Oriented', desc: 'Clear agenda, actionable takeaways' },
            { value: 'in_between', label: 'Somewhere in Between', desc: 'Flexible, depends on the topic' },
        ],
    },
    {
        id: 'additional_context',
        question: 'Tell us a bit about you',
        subtitle: 'Optional — helps us find even better matches',
        isTextInput: true,
    },
];

export default function MatchIntakeQuiz({ onComplete, onClose }: MatchIntakeQuizProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<MatchIntakeData>({
        desired_flavor: '',
        career_stage: '',
        preferred_vibe: '',
        additional_context: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const step = STEPS[currentStep];
    const totalSteps = STEPS.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleSelect = (value: string) => {
        const field = step.id as keyof MatchIntakeData;
        const newAnswers = { ...answers, [field]: value };
        setAnswers(newAnswers);

        // Auto-advance for non-text questions
        if (!step.isTextInput && currentStep < totalSteps - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        }
    };

    const handleTextChange = (value: string) => {
        setAnswers({ ...answers, additional_context: value });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        onComplete(answers);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const canAdvance = step.isTextInput || answers[step.id as keyof MatchIntakeData];

    return (
        <div className="space-y-8">
            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />
            </div>

            <div className="text-center">
                <span className="text-sm text-gray-400 font-medium">
                    Step {currentStep + 1} of {totalSteps}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="text-center">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {step.question}
                        </h3>
                        <p className="text-sm text-gray-500">{step.subtitle}</p>
                    </div>

                    {step.isTextInput ? (
                        <div className="max-w-lg mx-auto space-y-4">
                            <textarea
                                value={answers.additional_context}
                                onChange={(e) => handleTextChange(e.target.value)}
                                placeholder="Share anything you'd like — your background, what you're working on, or what you hope to get from mentorship..."
                                className="w-full h-32 p-4 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:ring-0 outline-none resize-none text-gray-700 placeholder-gray-400 transition-colors"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Finding your matches...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Find My Matches
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 transition"
                            >
                                Skip this step
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-3 max-w-lg mx-auto">
                            {step.options?.map((option) => {
                                const isSelected = answers[step.id as keyof MatchIntakeData] === option.value;
                                const Icon = 'icon' in option ? option.icon : null;

                                return (
                                    <motion.button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-start gap-3 ${isSelected
                                                ? 'border-teal-500 bg-teal-50 shadow-sm'
                                                : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        {Icon && (
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-teal-100' : 'bg-gray-100'
                                                }`}>
                                                <Icon className={`w-5 h-5 ${isSelected ? 'text-teal-600' : 'text-gray-500'}`} />
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-semibold text-gray-900 block">{option.label}</span>
                                            {'desc' in option && (
                                                <span className="text-sm text-gray-500 mt-0.5 block">{option.desc}</span>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep > 0 && (
                <div className="flex justify-between items-center pt-2">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    {!step.isTextInput && canAdvance && currentStep < totalSteps - 1 && (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="flex items-center gap-1.5 text-teal-600 hover:text-teal-700 transition text-sm font-medium"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
