'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    goLive,
    goOffline,
    getMyAvailability,
    QUICK_STATUS_MESSAGES,
    DURATION_PRESETS,
    getTimeRemaining,
} from '@/lib/availability-service';

interface GoLiveToggleProps {
    userId: string;
    onStatusChange?: (isLive: boolean) => void;
}

export default function GoLiveToggle({ userId, onStatusChange }: GoLiveToggleProps) {
    const [isLive, setIsLive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState(60);
    const [selectedMessage, setSelectedMessage] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [timeRemaining, setTimeRemaining] = useState<string>('');
    const [availableUntil, setAvailableUntil] = useState<string | null>(null);

    // Load current status
    useEffect(() => {
        async function loadStatus() {
            const status = await getMyAvailability(userId);
            if (status && status.is_available && status.available_until) {
                const remaining = getTimeRemaining(status.available_until);
                if (remaining.minutes > 0) {
                    setIsLive(true);
                    setAvailableUntil(status.available_until);
                    setTimeRemaining(remaining.display);
                }
            }
            setIsLoading(false);
        }
        loadStatus();
    }, [userId]);

    // Update time remaining every minute
    useEffect(() => {
        if (!isLive || !availableUntil) return;

        const interval = setInterval(() => {
            const remaining = getTimeRemaining(availableUntil);
            if (remaining.minutes <= 0) {
                setIsLive(false);
                setAvailableUntil(null);
                onStatusChange?.(false);
            } else {
                setTimeRemaining(remaining.display);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [isLive, availableUntil, onStatusChange]);

    const handleGoLive = async () => {
        setIsLoading(true);
        const message = customMessage || selectedMessage;
        const success = await goLive(userId, {
            durationMinutes: selectedDuration,
            statusMessage: message || undefined,
        });

        if (success) {
            const until = new Date(Date.now() + selectedDuration * 60 * 1000).toISOString();
            setIsLive(true);
            setAvailableUntil(until);
            setTimeRemaining(getTimeRemaining(until).display);
            setShowOptions(false);
            onStatusChange?.(true);
        }
        setIsLoading(false);
    };

    const handleGoOffline = async () => {
        setIsLoading(true);
        await goOffline(userId);
        setIsLive(false);
        setAvailableUntil(null);
        onStatusChange?.(false);
        setIsLoading(false);
    };

    if (isLoading && !isLive) {
        return (
            <div className="h-12 w-32 bg-gray-100 rounded-full animate-pulse" />
        );
    }

    return (
        <div className="relative">
            {/* Main Toggle Button */}
            <motion.button
                onClick={() => isLive ? handleGoOffline() : setShowOptions(!showOptions)}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${isLive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
            >
                {/* Pulsing dot when live */}
                <span className={`relative flex h-3 w-3 ${isLive ? '' : 'opacity-50'}`}>
                    {isLive && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-white' : 'bg-gray-400'
                        }`} />
                </span>

                <span>{isLive ? 'LIVE' : 'Go Live'}</span>

                {isLive && timeRemaining && (
                    <span className="text-sm text-white/80">• {timeRemaining}</span>
                )}
            </motion.button>

            {/* Options Panel */}
            <AnimatePresence>
                {showOptions && !isLive && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-100">
                            <h4 className="font-semibold text-gray-900">Go Live</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Let people know you're available to chat right now
                            </p>
                        </div>

                        {/* Duration Selection */}
                        <div className="p-4 border-b border-gray-100">
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                How long are you available?
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {DURATION_PRESETS.map((preset) => (
                                    <button
                                        key={preset.value}
                                        onClick={() => setSelectedDuration(preset.value)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedDuration === preset.value
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Status Messages */}
                        <div className="p-4 border-b border-gray-100">
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Status message (optional)
                            </label>
                            <div className="flex gap-2 flex-wrap mb-3">
                                {QUICK_STATUS_MESSAGES.slice(0, 4).map((msg, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedMessage(`${msg.label}: ${msg.text}`);
                                            setCustomMessage('');
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-sm transition ${selectedMessage === `${msg.label}: ${msg.text}`
                                            ? 'bg-teal-100 text-teal-700 border-2 border-teal-500'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                                            }`}
                                    >
                                        {msg.label}: {msg.text.split(',')[0]}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Or write your own..."
                                value={customMessage}
                                onChange={(e) => {
                                    setCustomMessage(e.target.value);
                                    setSelectedMessage('');
                                }}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        {/* Go Live Button */}
                        <div className="p-4">
                            <button
                                onClick={handleGoLive}
                                disabled={isLoading}
                                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                            >
                                {isLoading ? 'Going Live...' : 'Go Live Now'}
                            </button>
                            <button
                                onClick={() => setShowOptions(false)}
                                className="w-full mt-2 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Click outside to close */}
            {showOptions && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowOptions(false)}
                />
            )}
        </div>
    );
}
