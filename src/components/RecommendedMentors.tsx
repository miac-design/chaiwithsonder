'use client';

import { Coffee, Info, Star, Award, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getMatchBadge } from '@/lib/sonder-match-engine';

interface MatchedMentor {
    mentor_id: string;
    name: string;
    title: string;
    photo?: string;
    linkedin?: string;
    story?: string;
    specialties: string[];
    chaisShared: number;
    total_score: number;
    expertise_score: number;
    stage_score: number;
    engagement_score: number;
    style_score: number;
    story_score: number;
    match_reasons: string[];
}

interface IntakeSummary {
    desired_flavor?: string;
    career_stage?: string;
    current_challenge?: string;
    support_style?: string;
    preferred_vibe?: string;
}

interface RecommendedMentorsProps {
    matches: MatchedMentor[];
    intake?: IntakeSummary;
    onBookMentor: (mentorName: string) => void;
    onRetakeQuiz: () => void;
}

// Labels for narrative intro
const CHALLENGE_LABELS: Record<string, string> = {
    'career_pivot': 'navigating a career pivot',
    'skill_building': 'building new skills',
    'confidence': 'working through imposter syndrome',
    'work_life': 'finding better balance',
    'leadership': 'stepping into leadership',
};

const STAGE_LABELS: Record<string, string> = {
    'exploring': 'exploring',
    'early_career': 'early-career',
    'mid_career': 'mid-career',
    'senior': 'senior',
    'executive': 'executive-level',
};

const SUPPORT_LABELS: Record<string, string> = {
    'accountability': 'accountability',
    'experience': 'real-world experience',
    'listener': 'someone who listens',
    'challenger': 'honest challenges',
    'brainstorm': 'brainstorming',
};

function buildNarrativeIntro(intake?: IntakeSummary): string | null {
    if (!intake) return null;

    const parts: string[] = [];

    if (intake.current_challenge && CHALLENGE_LABELS[intake.current_challenge]) {
        const stage = intake.career_stage ? STAGE_LABELS[intake.career_stage] : null;
        if (stage) {
            parts.push(`Based on your journey ${CHALLENGE_LABELS[intake.current_challenge]} as an ${stage} professional`);
        } else {
            parts.push(`Based on your journey ${CHALLENGE_LABELS[intake.current_challenge]}`);
        }
    } else if (intake.career_stage) {
        parts.push(`Based on where you are as an ${STAGE_LABELS[intake.career_stage] || ''} professional`);
    }

    if (intake.support_style && SUPPORT_LABELS[intake.support_style]) {
        parts.push(`looking for ${SUPPORT_LABELS[intake.support_style]}`);
    }

    if (parts.length === 0) return 'Based on your preferences and journey';
    return parts.join(', ') + ', here are mentors who get it.';
}

function MatchBadge({ score }: { score: number }) {
    const badge = getMatchBadge(score);
    if (!badge) return null;

    if (badge === 'great') {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                <Star className="w-3 h-3" />
                Great Match
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
            <Award className="w-3 h-3" />
            Good Match
        </span>
    );
}

function WhyThisMatch({ reasons }: { reasons: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    if (reasons.length === 0) return null;

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="text-gray-400 hover:text-teal-500 transition inline-flex items-center gap-1 text-xs"
                aria-label="Why this match"
            >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Why this match?</span>
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-0 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl z-50 min-w-[220px]"
                >
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex items-start gap-1.5 py-0.5">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0 mt-1" />
                            <span>{reason}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default function RecommendedMentors({ matches, intake, onBookMentor, onRetakeQuiz }: RecommendedMentorsProps) {
    // Only show top 3 with badge-worthy scores
    const topMatches = matches.slice(0, 3).filter(m => getMatchBadge(m.total_score) !== null);

    if (topMatches.length === 0) return null;

    const narrativeIntro = buildNarrativeIntro(intake);

    const specialtyColors: Record<string, string> = {
        'Career': 'bg-teal-100 text-teal-700',
        'Visa': 'bg-amber-100 text-amber-700',
        'AI/ML': 'bg-purple-100 text-purple-700',
        'Academia': 'bg-blue-100 text-blue-700',
        'Tech': 'bg-slate-100 text-slate-700',
        'Resume': 'bg-emerald-100 text-emerald-700',
        'Consulting': 'bg-cyan-100 text-cyan-700',
        'Sales': 'bg-orange-100 text-orange-700',
        'Big Tech': 'bg-indigo-100 text-indigo-700',
        'Finance': 'bg-green-100 text-green-700',
        'Startup': 'bg-rose-100 text-rose-700',
        'Product': 'bg-violet-100 text-violet-700',
        'Leadership': 'bg-yellow-100 text-yellow-700',
        'Marketing': 'bg-pink-100 text-pink-700',
        'Engineering': 'bg-sky-100 text-sky-700',
        'Data': 'bg-fuchsia-100 text-fuchsia-700',
    };

    return (
        <section className="mb-12">
            <div className="bg-gradient-to-r from-teal-50/50 to-white rounded-3xl border border-teal-100/50 p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-teal-500" />
                        Recommended for You
                    </h2>
                    <button
                        onClick={onRetakeQuiz}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium transition flex items-center gap-1.5"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Retake Quiz
                    </button>
                </div>

                {/* Narrative intro */}
                {narrativeIntro && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-gray-500 mb-6 italic"
                    >
                        {narrativeIntro}
                    </motion.p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topMatches.map((mentor, idx) => {
                        const avatarUrl = mentor.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;

                        return (
                            <motion.div
                                key={mentor.mentor_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                            >
                                {/* Header */}
                                <div className="relative bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-transparent p-5 pb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={avatarUrl}
                                                alt={`Photo of ${mentor.name}`}
                                                className="rounded-xl w-16 h-16 object-cover ring-2 ring-teal-200 shadow"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(mentor.name)}`;
                                                }}
                                            />
                                            {mentor.chaisShared > 0 && (
                                                <div className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full px-1.5 py-0.5 shadow border border-teal-100 flex items-center gap-0.5">
                                                    <Coffee className="w-3 h-3 text-teal-600" />
                                                    <span className="text-[10px] font-bold text-teal-700">{mentor.chaisShared}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">{mentor.name}</h3>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mb-2">{mentor.title}</p>
                                            <MatchBadge score={mentor.total_score} />
                                        </div>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div className="px-5 py-2">
                                    <div className="flex flex-wrap gap-1">
                                        {mentor.specialties.slice(0, 3).map(s => (
                                            <span
                                                key={s}
                                                className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${specialtyColors[s] || 'bg-gray-100 text-gray-600'}`}
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Story */}
                                {mentor.story && (
                                    <div className="px-5 pb-2 flex-1">
                                        <div className="border-l-2 border-teal-300/60 pl-2.5">
                                            <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">
                                                &quot;{mentor.story}&quot;
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Action Zone */}
                                <div className="px-5 pb-5 pt-2 mt-auto">
                                    <button
                                        onClick={() => onBookMentor(mentor.name)}
                                        className="w-full py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-medium rounded-xl hover:from-teal-600 hover:to-teal-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Coffee className="w-3.5 h-3.5" />
                                        Grab a Chai
                                    </button>
                                    <div className="mt-2 flex justify-center">
                                        <WhyThisMatch reasons={mentor.match_reasons} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
