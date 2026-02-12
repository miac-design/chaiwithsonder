'use client';

import { useState } from 'react';
import type { MentorFormData } from '@/types';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function MentorApplicationForm() {
    const [formData, setFormData] = useState<MentorFormData>({
        name: '',
        email: '',
        expertise: '',
        experience: '',
        availability: '',
        goals: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof MentorFormData, string>>>({});

    const validate = (): boolean => {
        const errors: Partial<Record<keyof MentorFormData, string>> = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address';
        if (!formData.expertise.trim()) errors.expertise = 'Please share your areas of experience';
        if (!formData.experience.trim()) errors.experience = 'Please share your years of experience';
        if (!formData.goals.trim()) errors.goals = 'Please share your goals';
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/mentors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            setStatus('success');
            setFormData({ name: '', email: '', expertise: '', experience: '', availability: '', goals: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error on change
        if (fieldErrors[name as keyof MentorFormData]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    if (status === 'success') {
        return (
            <section id="application" className="mt-24 max-w-xl mx-auto fade-in-up">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for wanting to share a chat. We&apos;ll review your application and get back to you within 2-3 business days.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Submit another application
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="application" className="mt-24 max-w-xl mx-auto fade-in-up">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why Share a Chat?</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Story</h3>
                        <p className="text-gray-600">
                            Give a little time, be a listener, or offer what you&apos;ve learned. Make a meaningful impact in someone&apos;s life.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Together</h3>
                        <p className="text-gray-600">
                            Connect with others and grow together through story-sharing and support.
                        </p>
                    </div>
                </div>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                            <p className="text-red-800 font-medium">Submission failed</p>
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <FormField label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} error={fieldErrors.name} placeholder="e.g., Jane Doe" required />
                    <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={fieldErrors.email} placeholder="e.g., jane@email.com" required />
                    <FormField label="Areas of Experience" name="expertise" type="text" value={formData.expertise} onChange={handleChange} error={fieldErrors.expertise} placeholder="e.g., Software Development, Career Growth, Leadership" required />
                    <FormField label="Years of Experience" name="experience" type="text" value={formData.experience} onChange={handleChange} error={fieldErrors.experience} placeholder="e.g., 5+ years" required />
                    <FormField label="Availability" name="availability" type="text" value={formData.availability} onChange={handleChange} error={fieldErrors.availability} placeholder="e.g., Weekday evenings, Weekend mornings" />
                    <div>
                        <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                            What do you hope to achieve by sharing a chat? <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            name="goals"
                            id="goals"
                            required
                            value={formData.goals}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 min-h-[120px] rounded-lg border ${fieldErrors.goals ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400 border-indigo-300'} focus:ring-2 focus:outline-none transition resize-y`}
                            placeholder="Share your goals, e.g., Help others grow, Give back to the community, etc."
                        />
                        {fieldErrors.goals && <p className="mt-1 text-sm text-red-500">{fieldErrors.goals}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className={`bg-indigo-600 text-white font-semibold rounded-full py-3 w-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition ease-in-out duration-200 flex items-center justify-center gap-2 ${status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {status === 'submitting' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

// Reusable form field component
function FormField({
    label, name, type, value, onChange, error, placeholder, required,
}: {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-indigo-400 border-indigo-300'} focus:ring-2 focus:outline-none transition`}
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
