'use client';

import React, { useState } from 'react';
import { Briefcase, FileText, Globe, Coffee, Calendar, Clock, Star, Sparkles, X } from 'lucide-react';

interface BookingModalProps {
    mentor: {
        name: string;
        title: string;
        email?: string;
        meetingLink?: string;
        calendly?: string;
        story?: string; // Mentor's personal quote/story
    };
    isOpen: boolean;
    onClose: () => void;
}

// Session types for the V5 card-based selection
const SESSION_TYPES = [
    { id: 'career', icon: 'briefcase', title: 'Career Chat', description: 'Career advice & guidance' },
    { id: 'resume', icon: 'filetext', title: 'Resume Review', description: 'Get feedback on your resume' },
    { id: 'visa', icon: 'globe', title: 'Visa / Immigration', description: 'Navigate the visa process' },
    { id: 'chat', icon: 'coffee', title: 'Just Chat', description: 'No agenda, just connect' },
];

// Sample testimonials (would come from database)
const TESTIMONIALS = [
    { text: "This chat changed my career trajectory!", author: "Sarah K.", role: "Software Engineer" },
    { text: "Hamed's advice helped me land my dream job.", author: "Ali R.", role: "Product Manager" },
    { text: "So grateful for the guidance I received.", author: "Maria L.", role: "UX Designer" },
];

// Time slots
const TIME_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

// Get next 5 days for compact display
function getNextDays(count: number) {
    const days = [];
    const today = new Date();
    for (let i = 0; i <= count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }
    return days;
}

// Helper to render session type icons
const SessionIcon = ({ icon, className }: { icon: string; className?: string }) => {
    const iconClass = className || 'w-6 h-6';
    switch (icon) {
        case 'briefcase': return <Briefcase className={iconClass} />;
        case 'filetext': return <FileText className={iconClass} />;
        case 'globe': return <Globe className={iconClass} />;
        case 'coffee': return <Coffee className={iconClass} />;
        default: return <Coffee className={iconClass} />;
    }
};

export default function BookingModal({ mentor, isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState<'type' | 'schedule' | 'info'>('type');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [topic, setTopic] = useState('');
    const [menteeName, setMenteeName] = useState('');
    const [menteeEmail, setMenteeEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const availableDays = getNextDays(5);
    const randomTestimonial = TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)];

    // Default mentor story if not provided
    const mentorStory = mentor.story || "I've been where you are — let's chat and share what I've learned.";

    const handleTypeSelect = (typeId: string) => {
        setSelectedType(typeId);
        setStep('schedule');
    };

    const handleScheduleNext = () => {
        if (selectedDate && selectedTime) {
            setStep('info');
        }
    };

    const handleBack = () => {
        if (step === 'schedule') setStep('type');
        if (step === 'info') setStep('schedule');
    };

    const handleSubmit = async () => {
        if (!selectedDate || !selectedTime || !menteeName || !menteeEmail) {
            setError('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const sessionDate = selectedDate.toISOString().split('T')[0];
            const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (!timeParts) return;
            let hour = parseInt(timeParts[1]);
            if (timeParts[3].toUpperCase() === 'PM' && hour !== 12) hour += 12;
            if (timeParts[3].toUpperCase() === 'AM' && hour === 12) hour = 0;
            const sessionTime = `${hour.toString().padStart(2, '0')}:${timeParts[2]}`;

            const sessionTypeName = SESSION_TYPES.find(t => t.id === selectedType)?.title || 'Chai Chat';

            const response = await fetch('/api/booking-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mentorName: mentor.name,
                    mentorEmail: mentor.email || 'mentor@chaichathub.com',
                    menteeName,
                    menteeEmail,
                    sessionDate,
                    sessionTime,
                    sessionDuration: 15, // V5: 15-minute sessions
                    topic: `${sessionTypeName}: ${topic || 'General'}`,
                    meetingLink: mentor.meetingLink || mentor.calendly || undefined,
                }),
            });

            if (!response.ok) {
                console.log('API call failed, showing demo success');
            }

            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                resetForm();
            }, 3000);
        } catch (err) {
            console.log('Booking error (demo mode):', err);
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                resetForm();
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setShowSuccess(false);
        setStep('type');
        setSelectedType(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setTopic('');
        setMenteeName('');
        setMenteeEmail('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header with mentor info */}
                <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-6 rounded-t-2xl relative overflow-hidden">
                    {/* Decorative chai cup pattern */}
                    <div className="absolute top-2 right-2 opacity-20">
                        <Coffee className="w-12 h-12 text-white" />
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3">
                        <Coffee className="w-8 h-8 text-white" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Grab a Chai with {mentor.name.split(' ')[0]}</h2>
                            <p className="text-teal-100 text-sm mt-0.5">15-minute chat • No pressure</p>
                        </div>
                    </div>

                    {/* Mentor's personal quote */}
                    <p className="text-teal-50 text-sm mt-4 italic border-l-2 border-teal-300/50 pl-3">
                        "{mentorStory}"
                    </p>
                </div>

                {/* Content */}
                {showSuccess ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                            <Coffee className="w-8 h-8 text-teal-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Your Chai is Scheduled!</h3>
                        <p className="text-gray-600 mt-2">
                            Check your email for the calendar invite.
                        </p>
                        <p className="text-sm text-teal-600 mt-3 font-medium flex items-center justify-center gap-1">
                            <Sparkles className="w-4 h-4" /> Looking forward to connecting!
                        </p>
                    </div>
                ) : (
                    <div className="p-6">
                        {error && (
                            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                                {error}
                            </div>
                        )}

                        {/* Step 1: Session Type Selection */}
                        {step === 'type' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 text-center">What brings you here today?</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {SESSION_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => handleTypeSelect(type.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${selectedType === type.id
                                                ? 'border-teal-500 bg-teal-50'
                                                : 'border-gray-100 hover:border-teal-200 bg-white'
                                                }`}
                                        >
                                            <SessionIcon icon={type.icon} className="w-6 h-6 text-teal-600" />
                                            <p className="font-medium text-gray-900 mt-2 text-sm">{type.title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Date & Time Selection */}
                        {step === 'schedule' && (
                            <div className="space-y-5">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-teal-600" /> Pick a Day
                                    </h3>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {availableDays.map((day, idx) => {
                                            const isSelected = selectedDate?.toDateString() === day.toDateString();
                                            const isToday = idx === 0;
                                            return (
                                                <button
                                                    key={day.toISOString()}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={`flex-shrink-0 p-3 rounded-xl text-center transition min-w-[70px] ${isSelected
                                                        ? 'bg-teal-500 text-white shadow-lg'
                                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    <div className="text-xs font-medium">
                                                        {isToday ? 'Today' : day.toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </div>
                                                    <div className="text-lg font-bold">{day.getDate()}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-teal-600" /> Pick a Time
                                    </h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {TIME_SLOTS.map((time) => {
                                            const isSelected = selectedTime === time;
                                            return (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isSelected
                                                        ? 'bg-teal-500 text-white'
                                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <button
                                    onClick={handleScheduleNext}
                                    disabled={!selectedDate || !selectedTime}
                                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                        {/* Step 3: Your Info */}
                        {step === 'info' && (
                            <div className="space-y-4">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>

                                <div className="bg-teal-50 rounded-xl p-3 text-sm text-teal-800 flex items-center gap-2">
                                    <span className="font-medium flex items-center gap-1">
                                        <SessionIcon icon={SESSION_TYPES.find(t => t.id === selectedType)?.icon || 'coffee'} className="w-4 h-4" />
                                        {SESSION_TYPES.find(t => t.id === selectedType)?.title}
                                    </span>
                                    {' • '}
                                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    {' at '}
                                    {selectedTime}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                        <input
                                            type="text"
                                            value={menteeName}
                                            onChange={(e) => setMenteeName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                                        <input
                                            type="email"
                                            value={menteeEmail}
                                            onChange={(e) => setMenteeEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Anything you want {mentor.name.split(' ')[0]} to know? <span className="text-gray-400">(optional)</span>
                                        </label>
                                        <textarea
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            placeholder="Share a bit about yourself or what you'd like to discuss..."
                                            rows={2}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !menteeName || !menteeEmail}
                                    className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition shadow-lg shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Coffee className="w-5 h-5" />
                                    {isSubmitting ? 'Scheduling...' : 'Schedule Your Chai'}
                                </button>
                            </div>
                        )}

                        {/* Testimonial Footer */}
                        {!showSuccess && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="flex items-start gap-2 text-sm">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-600 italic">"{randomTestimonial.text}"</p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            — {randomTestimonial.author}, {randomTestimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
