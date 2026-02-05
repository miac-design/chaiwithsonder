'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Quick matching style onboarding - like Hinge/Bumble
type OnboardingStep = 'name' | 'role' | 'vibe' | 'topics' | 'style' | 'prompts' | 'complete';

interface QuickPrompt {
    id: string;
    prompt: string;
    answer: string;
}

export default function StartHerePage() {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('name');
    const [formData, setFormData] = useState({
        displayName: '',
        role: '' as 'sip' | 'share' | 'both',
        vibe: [] as string[],
        topics: [] as string[],
        communicationStyle: '' as 'listener' | 'talker' | 'balanced',
        meetingPreference: '' as 'video' | 'audio' | 'chat',
        prompts: [] as QuickPrompt[],
    });

    // Fun "vibe check" options
    const vibeOptions = [
        { id: 'deep', emoji: '🌊', label: 'Deep conversations', desc: 'Philosophy over small talk' },
        { id: 'practical', emoji: '🎯', label: 'Practical advice', desc: 'Actionable next steps' },
        { id: 'motivating', emoji: '🔥', label: 'Motivation boost', desc: 'Energy and encouragement' },
        { id: 'safe', emoji: '🤗', label: 'Safe space', desc: 'Just need to be heard' },
        { id: 'challenge', emoji: '💪', label: 'Tough love', desc: 'Push me to grow' },
        { id: 'creative', emoji: '✨', label: 'Creative sparks', desc: 'Brainstorm and explore' },
    ];

    // Topic cards
    const topicOptions = [
        { id: 'career', emoji: '💼', label: 'Career' },
        { id: 'tech', emoji: '💻', label: 'Tech & AI' },
        { id: 'startup', emoji: '🚀', label: 'Startups' },
        { id: 'leadership', emoji: '👑', label: 'Leadership' },
        { id: 'balance', emoji: '⚖️', label: 'Work-Life Balance' },
        { id: 'creative', emoji: '🎨', label: 'Creative Work' },
        { id: 'money', emoji: '💰', label: 'Finance' },
        { id: 'health', emoji: '🧠', label: 'Mental Health' },
        { id: 'parent', emoji: '👶', label: 'Parenting' },
        { id: 'education', emoji: '📚', label: 'Education' },
        { id: 'social', emoji: '🌍', label: 'Social Impact' },
        { id: 'spiritual', emoji: '🙏', label: 'Spirituality' },
    ];

    // Hinge-style prompts
    const promptOptions = [
        "The best advice I ever got was...",
        "I'm currently trying to figure out...",
        "A skill I wish I had is...",
        "I geek out about...",
        "The hardest lesson I learned was...",
        "I can help someone with...",
        "What I value most in a mentor is...",
        "My superpower is...",
    ];

    const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
    const [promptAnswers, setPromptAnswers] = useState<Record<string, string>>({});

    const steps: OnboardingStep[] = ['name', 'role', 'vibe', 'topics', 'style', 'prompts', 'complete'];
    const currentIndex = steps.indexOf(currentStep);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    const nextStep = () => {
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const toggleVibe = (id: string) => {
        setFormData(prev => ({
            ...prev,
            vibe: prev.vibe.includes(id)
                ? prev.vibe.filter(v => v !== id)
                : prev.vibe.length < 3 ? [...prev.vibe, id] : prev.vibe
        }));
    };

    const toggleTopic = (id: string) => {
        setFormData(prev => ({
            ...prev,
            topics: prev.topics.includes(id)
                ? prev.topics.filter(t => t !== id)
                : prev.topics.length < 5 ? [...prev.topics, id] : prev.topics
        }));
    };

    const togglePrompt = (prompt: string) => {
        if (selectedPrompts.includes(prompt)) {
            setSelectedPrompts(prev => prev.filter(p => p !== prompt));
            const newAnswers = { ...promptAnswers };
            delete newAnswers[prompt];
            setPromptAnswers(newAnswers);
        } else if (selectedPrompts.length < 3) {
            setSelectedPrompts(prev => [...prev, prompt]);
        }
    };

    const handleSubmit = async () => {
        const finalPrompts = selectedPrompts.map(prompt => ({
            id: prompt,
            prompt,
            answer: promptAnswers[prompt] || ''
        }));

        const finalData = { ...formData, prompts: finalPrompts };
        console.log('Submitting quick profile:', finalData);
        // TODO: Submit to Supabase
        nextStep();
    };

    const stepVariants = {
        enter: { opacity: 0, x: 30 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-teal-50">
            {/* Progress bar with Home button */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-lg mx-auto px-4 py-3">
                    <div className="flex items-center gap-4">
                        {/* Always show back/home button */}
                        <Link
                            href="/"
                            className="text-gray-400 hover:text-teal-600 transition-colors flex items-center gap-1"
                            title="Back to Home"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        {currentStep !== 'name' && currentStep !== 'complete' && (
                            <button onClick={prevStep} className="text-gray-400 hover:text-teal-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <span className="text-sm text-gray-400 font-medium">
                            {currentIndex + 1}/{steps.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="pt-20 pb-32 px-4">
                <div className="max-w-lg mx-auto">
                    <AnimatePresence mode="wait">
                        {/* ========================================
                STEP 1: NAME (Super Quick)
                ======================================== */}
                        {currentStep === 'name' && (
                            <motion.div
                                key="name"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="text-center pt-12"
                            >
                                {/* Minimal teal cup icon instead of emoji */}
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82a7 7 0 0 0 5.84-2.56ZM12 3v2m0 14v2m9-9h-2M5 12H3m15.36-5.64l-1.41 1.41M7.05 16.95l-1.41 1.41m12.72 0l-1.41-1.41M7.05 7.05L5.64 5.64" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Let's get you matched
                                </h1>
                                <p className="text-gray-500 mb-8">Takes about 2 minutes</p>

                                <input
                                    type="text"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                                    placeholder="What's your first name?"
                                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-teal-400 transition"
                                    autoFocus
                                />
                            </motion.div>
                        )}

                        {/* ========================================
                STEP 2: ROLE (Visual Cards)
                ======================================== */}
                        {currentStep === 'role' && (
                            <motion.div
                                key="role"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="pt-8"
                            >
                                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    What are you here for, {formData.displayName}?
                                </h1>
                                <p className="text-gray-500 text-center mb-8">You can always change this later</p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, role: 'sip' }))}
                                        className={`w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 ${formData.role === 'sip'
                                            ? 'bg-teal-50 border-2 border-teal-400 shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <span className="text-4xl">☕</span>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Sip a Chat</h3>
                                            <p className="text-sm text-gray-500">Find someone to learn from</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, role: 'share' }))}
                                        className={`w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 ${formData.role === 'share'
                                            ? 'bg-sky-50 border-2 border-sky-400 shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <span className="text-4xl">💬</span>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Share a Chat</h3>
                                            <p className="text-sm text-gray-500">Mentor others with your experience</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, role: 'both' }))}
                                        className={`w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 ${formData.role === 'both'
                                            ? 'bg-gradient-to-r from-teal-50 to-sky-50 border-2 border-teal-400 shadow-md'
                                            : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <span className="text-4xl">✨</span>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Both</h3>
                                            <p className="text-sm text-gray-500">Give & receive — the best way</p>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ========================================
                STEP 3: VIBE CHECK (Multi-select Cards)
                ======================================== */}
                        {currentStep === 'vibe' && (
                            <motion.div
                                key="vibe"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="pt-8"
                            >
                                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    What vibe are you looking for?
                                </h1>
                                <p className="text-gray-500 text-center mb-6">Pick up to 3</p>

                                <div className="grid grid-cols-2 gap-3">
                                    {vibeOptions.map((vibe) => (
                                        <button
                                            key={vibe.id}
                                            onClick={() => toggleVibe(vibe.id)}
                                            className={`p-4 rounded-2xl text-left transition-all ${formData.vibe.includes(vibe.id)
                                                ? 'bg-teal-50 border-2 border-teal-400 shadow-md'
                                                : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-2">{vibe.emoji}</span>
                                            <h3 className="font-semibold text-gray-900 text-sm">{vibe.label}</h3>
                                            <p className="text-xs text-gray-500">{vibe.desc}</p>
                                        </button>
                                    ))}
                                </div>

                                <p className="text-center text-sm text-gray-400 mt-4">
                                    {formData.vibe.length}/3 selected
                                </p>
                            </motion.div>
                        )}

                        {/* ========================================
                STEP 4: TOPICS (Emoji Grid)
                ======================================== */}
                        {currentStep === 'topics' && (
                            <motion.div
                                key="topics"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="pt-8"
                            >
                                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    What do you want to talk about?
                                </h1>
                                <p className="text-gray-500 text-center mb-6">Pick up to 5 topics</p>

                                <div className="grid grid-cols-3 gap-3">
                                    {topicOptions.map((topic) => (
                                        <button
                                            key={topic.id}
                                            onClick={() => toggleTopic(topic.id)}
                                            className={`p-4 rounded-2xl text-center transition-all ${formData.topics.includes(topic.id)
                                                ? 'bg-sky-50 border-2 border-sky-400 shadow-md scale-105'
                                                : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <span className="text-3xl block mb-1">{topic.emoji}</span>
                                            <span className="text-xs font-medium text-gray-700">{topic.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <p className="text-center text-sm text-gray-400 mt-4">
                                    {formData.topics.length}/5 selected
                                </p>
                            </motion.div>
                        )}

                        {/* ========================================
                STEP 5: COMMUNICATION STYLE (This or That)
                ======================================== */}
                        {currentStep === 'style' && (
                            <motion.div
                                key="style"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="pt-8"
                            >
                                <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                    Quick preferences
                                </h1>

                                {/* Talking Style */}
                                <div className="mb-8">
                                    <p className="text-sm text-gray-500 text-center mb-4">In conversations, I'm usually...</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, communicationStyle: 'listener' }))}
                                            className={`flex-1 p-4 rounded-2xl text-center transition-all ${formData.communicationStyle === 'listener'
                                                ? 'bg-teal-50 border-2 border-teal-400'
                                                : 'bg-white border-2 border-gray-100'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1">👂</span>
                                            <span className="text-sm font-medium">A listener</span>
                                        </button>
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, communicationStyle: 'balanced' }))}
                                            className={`flex-1 p-4 rounded-2xl text-center transition-all ${formData.communicationStyle === 'balanced'
                                                ? 'bg-teal-50 border-2 border-teal-400'
                                                : 'bg-white border-2 border-gray-100'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1">⚖️</span>
                                            <span className="text-sm font-medium">Balanced</span>
                                        </button>
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, communicationStyle: 'talker' }))}
                                            className={`flex-1 p-4 rounded-2xl text-center transition-all ${formData.communicationStyle === 'talker'
                                                ? 'bg-teal-50 border-2 border-teal-400'
                                                : 'bg-white border-2 border-gray-100'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1">🗣️</span>
                                            <span className="text-sm font-medium">A talker</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Meeting Preference */}
                                <div>
                                    <p className="text-sm text-gray-500 text-center mb-4">I prefer to meet via...</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, meetingPreference: 'video' }))}
                                            className={`flex-1 p-4 rounded-2xl text-center transition-all ${formData.meetingPreference === 'video'
                                                ? 'bg-sky-50 border-2 border-sky-400'
                                                : 'bg-white border-2 border-gray-100'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1">📹</span>
                                            <span className="text-sm font-medium">Video</span>
                                        </button>
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, meetingPreference: 'audio' }))}
                                            className={`flex-1 p-4 rounded-2xl text-center transition-all ${formData.meetingPreference === 'audio'
                                                ? 'bg-sky-50 border-2 border-sky-400'
                                                : 'bg-white border-2 border-gray-100'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1">📞</span>
                                            <span className="text-sm font-medium">Audio</span>
                                        </button>
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, meetingPreference: 'chat' }))}
                                            className={`flex-1 p-4 rounded-2xl text-center transition-all ${formData.meetingPreference === 'chat'
                                                ? 'bg-sky-50 border-2 border-sky-400'
                                                : 'bg-white border-2 border-gray-100'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1">💬</span>
                                            <span className="text-sm font-medium">Chat</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ========================================
                STEP 6: PROMPTS (Hinge-style)
                ======================================== */}
                        {currentStep === 'prompts' && (
                            <motion.div
                                key="prompts"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="pt-8"
                            >
                                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    Add a little personality
                                </h1>
                                <p className="text-gray-500 text-center mb-6">Pick 1-3 prompts to answer (optional)</p>

                                <div className="space-y-3">
                                    {promptOptions.map((prompt) => (
                                        <div key={prompt}>
                                            <button
                                                onClick={() => togglePrompt(prompt)}
                                                className={`w-full p-4 rounded-2xl text-left transition-all ${selectedPrompts.includes(prompt)
                                                    ? 'bg-teal-50 border-2 border-teal-400'
                                                    : 'bg-white border-2 border-gray-100 hover:border-gray-200'
                                                    }`}
                                            >
                                                <span className="font-medium text-gray-900">{prompt}</span>
                                            </button>

                                            {selectedPrompts.includes(prompt) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={promptAnswers[prompt] || ''}
                                                        onChange={(e) => setPromptAnswers(prev => ({ ...prev, [prompt]: e.target.value }))}
                                                        placeholder="Your answer (keep it short!)"
                                                        maxLength={100}
                                                        className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-teal-400 transition"
                                                    />
                                                    <p className="text-xs text-gray-400 text-right mt-1">
                                                        {(promptAnswers[prompt] || '').length}/100
                                                    </p>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => nextStep()}
                                    className="w-full mt-6 text-center text-gray-400 hover:text-gray-600 text-sm"
                                >
                                    Skip this step →
                                </button>
                            </motion.div>
                        )}

                        {/* ========================================
                STEP 7: COMPLETE
                ======================================== */}
                        {currentStep === 'complete' && (
                            <motion.div
                                key="complete"
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="text-center pt-12"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    className="text-7xl mb-6"
                                >
                                    🎉
                                </motion.div>

                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    You're all set, {formData.displayName}!
                                </h1>
                                <p className="text-gray-500 mb-8">Let's find your first connection</p>

                                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 mb-8">
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" /></svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Finding matches...</h3>
                                            <p className="text-sm text-gray-500">Based on your vibe & interests</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/mentor"
                                    className="block w-full py-4 bg-teal-500 text-white font-semibold rounded-full text-lg hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/30"
                                >
                                    See My Matches
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sticky bottom button */}
            {currentStep !== 'complete' && (
                <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 p-4">
                    <div className="max-w-lg mx-auto">
                        <button
                            onClick={currentStep === 'prompts' ? handleSubmit : nextStep}
                            disabled={
                                (currentStep === 'name' && !formData.displayName.trim()) ||
                                (currentStep === 'role' && !formData.role) ||
                                (currentStep === 'vibe' && formData.vibe.length === 0) ||
                                (currentStep === 'topics' && formData.topics.length === 0) ||
                                (currentStep === 'style' && (!formData.communicationStyle || !formData.meetingPreference))
                            }
                            className="w-full py-4 bg-teal-500 text-white font-semibold rounded-full text-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/30"
                        >
                            {currentStep === 'prompts' ? 'Finish' : 'Continue'}
                        </button>
                    </div>
                </div>
            )}

            {/* Background decorations */}
            <div className="fixed bottom-0 left-0 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
            <div className="fixed top-1/4 right-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
        </div>
    );
}
