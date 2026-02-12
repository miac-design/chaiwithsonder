'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUICK_MATCH_QUESTIONS, quizAnswersToGoals, findMatchingMentors, type MentorMatch } from '@/lib/matching-service';
import Link from 'next/link';

export default function QuickMatchQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [matches, setMatches] = useState<MentorMatch[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = QUICK_MATCH_QUESTIONS[currentStep];
    const totalSteps = QUICK_MATCH_QUESTIONS.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleAnswer = async (value: string) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (currentStep < totalSteps - 1) {
            // Move to next question
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        } else {
            // All questions answered, find matches
            setIsLoading(true);
            try {
                const goals = quizAnswersToGoals(newAnswers);
                const results = await findMatchingMentors('', goals, 5);
                setMatches(results);
                setShowResults(true);
            } catch (error) {
                console.error('Matching error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setAnswers({});
        setMatches([]);
        setShowResults(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 animate-pulse">Finding your perfect mentors...</p>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Matches</h3>
                    <p className="text-gray-600">Based on your preferences, here are mentors who can help</p>
                </div>

                {matches.length > 0 ? (
                    <div className="grid gap-4">
                        {matches.map((mentor, idx) => (
                            <motion.div
                                key={mentor.mentor_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="edron-card p-6"
                            >
                                <div className="flex items-start gap-4">
                                    {mentor.avatar_url ? (
                                        <img
                                            src={mentor.avatar_url}
                                            alt={mentor.full_name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
                                            <span className="text-teal-600 text-xl font-semibold">
                                                {mentor.full_name[0]}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-900">{mentor.full_name}</h4>
                                            <span className="text-sm text-teal-600 font-medium">
                                                {Math.round(mentor.match_score * 100)}% match
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1">{mentor.headline}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {mentor.expertise.slice(0, 3).map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <Link
                                        href={`/mentor/${mentor.mentor_id}`}
                                        className="flex-1 py-2 text-center text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                                    >
                                        View Profile
                                    </Link>
                                    <Link
                                        href={`/mentor/${mentor.mentor_id}/book`}
                                        className="flex-1 py-2 text-center bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
                                    >
                                        Connect
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No mentors found matching your criteria yet.</p>
                        <p className="text-sm text-gray-400">We're growing our mentor community. Check back soon!</p>
                    </div>
                )}

                <div className="flex gap-3 justify-center pt-4">
                    <button
                        onClick={resetQuiz}
                        className="px-6 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                        Start Over
                    </button>
                    <Link
                        href="/mentor"
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Browse All Mentors
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Progress bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="text-center">
                <span className="text-sm text-gray-500">
                    Question {currentStep + 1} of {totalSteps}
                </span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                        {currentQuestion.question}
                    </h3>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((option) => (
                            <motion.button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${answers[currentQuestion.id] === option.value
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                                    }`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <span className="font-medium text-gray-900">{option.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {currentStep > 0 && (
                <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            )}
        </div>
    );
}
