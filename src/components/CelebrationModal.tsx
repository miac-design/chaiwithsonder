'use client';

import React, { useEffect, useState } from 'react';

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'first_session' | 'milestone' | 'achievement';
    title: string;
    message: string;
    badgeName?: string;
    mentorName?: string;
    menteeName?: string;
}

// Confetti particle component
const Confetti = () => {
    const colors = ['#14b8a6', '#0d9488', '#f59e0b', '#ec4899', '#8b5cf6'];
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute animate-confetti"
                    style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
        </div>
    );
};

// Trophy SVG icon
const TrophyIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M17 4H7l1 8c.35 2.38 2.11 4 4 4s3.65-1.62 4-4l1-8z" />
        <path d="M5 4h2" />
        <path d="M17 4h2" />
        <path d="M5 4a2 2 0 0 0 0 4h2" />
        <path d="M19 4a2 2 0 0 1 0 4h-2" />
    </svg>
);

// Star SVG icon
const StarIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// Heart SVG icon
const HeartIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="#ec4899" stroke="#ec4899" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

export default function CelebrationModal({
    isOpen,
    onClose,
    type,
    title,
    message,
    badgeName,
    mentorName,
    menteeName,
}: CelebrationModalProps) {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'first_session':
                return <HeartIcon />;
            case 'milestone':
                return <TrophyIcon />;
            case 'achievement':
                return <StarIcon />;
            default:
                return <StarIcon />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Confetti */}
            {showConfetti && <Confetti />}

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-bounce-in">
                {/* Gradient header */}
                <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 p-8 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        {getIcon()}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{message}</p>

                    {badgeName && (
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-3 rounded-full border border-amber-200 mb-6">
                            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold text-amber-700">{badgeName}</span>
                        </div>
                    )}

                    {mentorName && menteeName && (
                        <p className="text-sm text-gray-500 mb-4">
                            Session between <strong>{mentorName}</strong> and <strong>{menteeName}</strong>
                        </p>
                    )}

                    {/* Share button */}
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition shadow-lg shadow-teal-500/30"
                        >
                            Awesome!
                        </button>
                        <button
                            onClick={() => {
                                // TODO: Implement share functionality
                                navigator.clipboard.writeText(`I just had an amazing mentorship session on Chai Chat!`);
                            }}
                            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition"
                        >
                            Share
                        </button>
                    </div>
                </div>

                <style jsx>{`
          @keyframes bounce-in {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-bounce-in {
            animation: bounce-in 0.5s ease-out forwards;
          }
        `}</style>
            </div>
        </div>
    );
}
