'use client';

import { motion } from 'framer-motion';

interface AnimatedLogoProps {
    size?: number;
    className?: string;
}

const AnimatedLogo = ({ size = 48, className = '' }: AnimatedLogoProps) => {
    // Large, dramatic speech bubbles rising like steam
    const bubbles = [
        // Left side bubbles
        { delay: 0, duration: 2.2, size: 18, startX: 18, drift: -12, color: '#F5A623', opacity: 0.9 },
        { delay: 0.3, duration: 2.5, size: 14, startX: 22, drift: -8, color: '#14b8a6', opacity: 0.85 },
        { delay: 0.6, duration: 2.0, size: 20, startX: 26, drift: 5, color: '#FFFFFF', opacity: 0.8 },
        // Center bubbles
        { delay: 0.9, duration: 2.8, size: 22, startX: 30, drift: 8, color: '#F5A623', opacity: 0.9 },
        { delay: 1.2, duration: 2.3, size: 16, startX: 34, drift: -5, color: '#14b8a6', opacity: 0.85 },
        // Right side bubbles  
        { delay: 1.5, duration: 2.6, size: 19, startX: 38, drift: 12, color: '#FFFFFF', opacity: 0.75 },
        { delay: 1.8, duration: 2.1, size: 15, startX: 24, drift: -10, color: '#F5A623', opacity: 0.85 },
        { delay: 2.1, duration: 2.4, size: 21, startX: 32, drift: 6, color: '#14b8a6', opacity: 0.9 },
        // Extra bubbles for density
        { delay: 2.4, duration: 2.7, size: 12, startX: 20, drift: -6, color: '#FFFFFF', opacity: 0.7 },
        { delay: 2.7, duration: 2.0, size: 17, startX: 36, drift: 10, color: '#F5A623', opacity: 0.8 },
    ];

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size + 35 }}>
            {/* Main SVG with extended viewBox for visible bubble rise */}
            <svg
                viewBox="0 0 56 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ overflow: 'visible' }}
            >
                {/* Glow filter for bubbles */}
                <defs>
                    <filter id="bubbleGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="cupGradient" x1="10" y1="45" x2="46" y2="80" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="50%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                    <linearGradient id="handleGradient" x1="46" y1="52" x2="54" y2="68" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                    <linearGradient id="rimGradient" x1="14" y1="47" x2="42" y2="47" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#5eead4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* DRAMATIC RISING SPEECH BUBBLES */}
                {bubbles.map((bubble, index) => (
                    <motion.g key={index} filter="url(#bubbleGlow)">
                        {/* Main speech bubble (rounded rectangle with tail) */}
                        <motion.g
                            initial={{
                                y: 45,
                                opacity: 0,
                                scale: 0.2,
                            }}
                            animate={{
                                y: [-10, -35, -60],
                                opacity: [0, bubble.opacity, 0],
                                scale: [0.2, 1.1, 0.6],
                                x: [0, bubble.drift * 0.5, bubble.drift],
                            }}
                            transition={{
                                duration: bubble.duration,
                                repeat: Infinity,
                                delay: bubble.delay,
                                ease: "easeOut",
                            }}
                        >
                            {/* Speech bubble body */}
                            <rect
                                x={bubble.startX - bubble.size / 2}
                                y={0}
                                width={bubble.size}
                                height={bubble.size * 0.75}
                                rx={bubble.size * 0.35}
                                fill={bubble.color}
                            />
                            {/* Speech bubble tail */}
                            <polygon
                                points={`${bubble.startX - 3},${bubble.size * 0.65} ${bubble.startX + 3},${bubble.size * 0.65} ${bubble.startX},${bubble.size * 0.9}`}
                                fill={bubble.color}
                            />
                            {/* Highlight shine */}
                            <ellipse
                                cx={bubble.startX - bubble.size * 0.2}
                                cy={bubble.size * 0.25}
                                rx={bubble.size * 0.15}
                                ry={bubble.size * 0.1}
                                fill="rgba(255, 255, 255, 0.5)"
                            />
                        </motion.g>
                    </motion.g>
                ))}

                {/* Wispy steam lines behind bubbles */}
                <motion.path
                    d="M22 42 Q24 32 22 22 Q20 12 24 2"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                    d="M28 42 Q30 30 28 18 Q26 6 30 -6"
                    stroke="rgba(20, 184, 166, 0.25)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.35, 0],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                />
                <motion.path
                    d="M34 42 Q32 30 34 18 Q36 6 32 -6"
                    stroke="rgba(245, 166, 35, 0.25)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
                />

                {/* Cup body */}
                <motion.path
                    d="M12 49C12 47 14 45 16 45H40C42 45 44 47 44 49V70C44 76 40 82 28 82C16 82 12 76 12 70V49Z"
                    fill="url(#cupGradient)"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Cup handle */}
                <motion.path
                    d="M44 54H48C52 54 56 58 56 64C56 70 52 74 48 74H44"
                    stroke="url(#handleGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />

                {/* Cup rim */}
                <motion.ellipse
                    cx="28"
                    cy="47"
                    rx="14"
                    ry="4"
                    fill="url(#rimGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />

                {/* Rim shine animation */}
                <motion.ellipse
                    cx="28"
                    cy="46"
                    rx="10"
                    ry="2"
                    fill="rgba(255, 255, 255, 0.4)"
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scaleX: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Subtle cup body shine */}
                <motion.ellipse
                    cx="22"
                    cy="60"
                    rx="4"
                    ry="8"
                    fill="rgba(255, 255, 255, 0.15)"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </svg>
        </div>
    );
};

export default AnimatedLogo;
