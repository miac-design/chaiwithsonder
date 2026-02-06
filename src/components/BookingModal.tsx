'use client';

import React, { useState } from 'react';

interface BookingModalProps {
    mentor: {
        name: string;
        title: string;
        email?: string;
        meetingLink?: string; // Zoom, Google Meet, Teams, or Calendly link
        calendly?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

// Available time slots (would come from mentor's availability in production)
const TIME_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

// Get next 7 days for booking
function getNextDays(count: number) {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }
    return days;
}

export default function BookingModal({ mentor, isOpen, onClose }: BookingModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [topic, setTopic] = useState('');
    const [menteeName, setMenteeName] = useState('');
    const [menteeEmail, setMenteeEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const availableDays = getNextDays(7);

    const handleSubmit = async () => {
        if (!selectedDate || !selectedTime || !menteeName || !menteeEmail) {
            setError('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Format date for API
            const sessionDate = selectedDate.toISOString().split('T')[0];
            // Convert time to 24h format
            const timeParts = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (!timeParts) return;
            let hour = parseInt(timeParts[1]);
            if (timeParts[3].toUpperCase() === 'PM' && hour !== 12) hour += 12;
            if (timeParts[3].toUpperCase() === 'AM' && hour === 12) hour = 0;
            const sessionTime = `${hour.toString().padStart(2, '0')}:${timeParts[2]}`;

            const response = await fetch('/api/booking-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mentorName: mentor.name,
                    mentorEmail: mentor.email || 'mentor@chaichathub.com', // Fallback for demo
                    menteeName,
                    menteeEmail,
                    sessionDate,
                    sessionTime,
                    sessionDuration: 30,
                    topic: topic || 'General Mentorship',
                    meetingLink: mentor.meetingLink || mentor.calendly || undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to book session');
            }

            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                setShowSuccess(false);
                // Reset form
                setSelectedDate(null);
                setSelectedTime(null);
                setTopic('');
                setMenteeName('');
                setMenteeEmail('');
            }, 3000);
        } catch (err) {
            setError('Failed to book session. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-t-2xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold text-white">Book a Session</h2>
                    <p className="text-teal-100 mt-1">with {mentor.name}</p>
                </div>

                {/* Content */}
                {showSuccess ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Session Booked!</h3>
                        <p className="text-gray-600 mt-2">
                            Check your email for confirmation and calendar invite.
                        </p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Your Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Your Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={menteeName}
                                    onChange={(e) => setMenteeName(e.target.value)}
                                    placeholder="Your full name"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={menteeEmail}
                                    onChange={(e) => setMenteeEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                        </div>

                        {/* Select Date */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Select Date *</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {availableDays.map((day) => {
                                    const isSelected = selectedDate?.toDateString() === day.toDateString();
                                    return (
                                        <button
                                            key={day.toISOString()}
                                            onClick={() => setSelectedDate(day)}
                                            className={`p-3 rounded-lg text-center transition ${isSelected
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            <div className="text-xs font-medium">
                                                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </div>
                                            <div className="text-lg font-bold">
                                                {day.getDate()}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Select Time */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Select Time *</h3>
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

                        {/* Topic */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Topic (optional)
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="What would you like to discuss?"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !selectedDate || !selectedTime || !menteeName || !menteeEmail}
                            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            You'll receive a confirmation email with a calendar invite.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
