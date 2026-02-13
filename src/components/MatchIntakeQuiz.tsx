'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Coffee, Briefcase, Rocket, FileText, MessageCircle,
    ChevronLeft, ChevronRight, Sparkles, GraduationCap,
    TrendingUp, Building2, Crown, Compass,
    ArrowRightLeft, Wrench, ShieldQuestion, Scale, UserPlus,
    Handshake, Ear, Target, Lightbulb,
    ListChecks, Smile, Flame, Heart,
    PenLine
} from 'lucide-react';

export interface MatchIntakeData {
    desired_flavor: string;
    career_stage: string;
    current_challenge: string;
    support_style: string;
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
        question: 'Pick your chai',
        subtitle: 'What kind of conversation are you looking for?',
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
            { value: 'exploring', label: 'Exploring', desc: 'Still figuring out my direction', icon: Compass },
            { value: 'early_career', label: 'Early Career', desc: '0–3 years of professional experience', icon: GraduationCap },
            { value: 'mid_career', label: 'Mid-Career', desc: '3–10 years, looking to level up', icon: TrendingUp },
            { value: 'senior', label: 'Senior', desc: '10+ years, leadership or specialist track', icon: Building2 },
            { value: 'executive', label: 'Executive', desc: 'C-suite, VP, or director level', icon: Crown },
        ],
    },
    {
        id: 'current_challenge',
        question: 'What are you navigating right now?',
        subtitle: 'Pick the one that resonates most',
        options: [
            { value: 'career_pivot', label: 'Career Pivot', desc: 'Changing industries, roles, or direction', icon: ArrowRightLeft },
            { value: 'skill_building', label: 'Skill Building', desc: 'Growing technical or professional skills', icon: Wrench },
            { value: 'confidence', label: 'Confidence & Imposter Syndrome', desc: 'Feeling like I don\'t belong or am not ready', icon: ShieldQuestion },
            { value: 'work_life', label: 'Work-Life Balance', desc: 'Managing burnout, priorities, or boundaries', icon: Scale },
            { value: 'leadership', label: 'Leadership Growth', desc: 'Stepping into management or expanding influence', icon: UserPlus },
        ],
    },
    {
        id: 'support_style',
        question: 'What kind of support helps you most?',
        subtitle: 'How you like to be helped matters',
        options: [
            { value: 'accountability', label: 'Accountability Partner', desc: 'Someone to keep me on track and check in', icon: Handshake },
            { value: 'experience', label: 'Voice of Experience', desc: 'Someone who\'s been there and can share lessons', icon: Coffee },
            { value: 'listener', label: 'Just Someone Who Listens', desc: 'I need to talk it out, not be told what to do', icon: Ear },
            { value: 'challenger', label: 'Honest Challenger', desc: 'Push me, ask hard questions, don\'t sugarcoat', icon: Target },
            { value: 'brainstorm', label: 'Brainstorm Partner', desc: 'Think through ideas and possibilities together', icon: Lightbulb },
        ],
    },
    {
        id: 'preferred_vibe',
        question: 'What energy do you want from your mentor?',
        subtitle: 'We\'ll match you with someone who communicates your way',
        options: [
            { value: 'structured', label: 'Structured & Goal-Oriented', desc: 'Clear agenda, actionable takeaways', icon: ListChecks },
            { value: 'casual', label: 'Warm & Casual', desc: 'Relaxed, conversational, like chatting with a friend', icon: Smile },
            { value: 'challenge_me', label: 'Push Me Hard', desc: 'Direct, high-expectations, growth-focused', icon: Flame },
            { value: 'calm', label: 'Calm & Patient', desc: 'Gentle, empathetic, no pressure', icon: Heart },
        ],
    },
    {
        id: 'additional_context',
        question: 'One thing you want your mentor to know',
        subtitle: 'Optional, but it helps us find a deeper match',
        isTextInput: true,
    },
];

export default function MatchIntakeQuiz({ onComplete, onClose }: MatchIntakeQuizProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<MatchIntakeData>({
        desired_flavor: '',
        career_stage: '',
        current_challenge: '',
        support_style: '',
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
                            <div className="relative">
                                <PenLine className="absolute top-4 left-4 w-5 h-5 text-gray-300" />
                                <textarea
                                    value={answers.additional_context}
                                    onChange={(e) => handleTextChange(e.target.value)}
                                    maxLength={200}
                                    placeholder="e.g. I'm an international student trying to break into tech, feeling stuck and unsure where to start..."
                                    className="w-full h-32 p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-teal-400 focus:ring-0 outline-none resize-none text-gray-700 placeholder-gray-400 transition-colors"
                                />
                                <span className="absolute bottom-3 right-3 text-xs text-gray-300">
                                    {answers.additional_context.length}/200
                                </span>
                            </div>
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
