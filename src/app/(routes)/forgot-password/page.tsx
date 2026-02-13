'use client';

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        setIsSubmitting(true);
        setError("");

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        setIsSubmitting(false);
        if (resetError) {
            setError(resetError.message);
        } else {
            setSuccess(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-12">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Gradient accent bar */}
                <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400" />

                <div className="p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82a7 7 0 0 0 5.84-2.56ZM12 3v2m0 14v2m9-9h-2M5 12H3" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Chai Chat</span>
                        </Link>
                    </div>

                    {!success ? (
                        <>
                            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                Reset your password
                            </h1>
                            <p className="text-gray-500 text-center mb-8">
                                Enter your email and we'll send you a reset link
                            </p>

                            <form onSubmit={handleSubmit} className="w-full space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition text-gray-900 placeholder-gray-400 text-base"
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 rounded-full font-bold text-lg text-white bg-teal-500 hover:bg-teal-400 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-60"
                                >
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-gray-500 text-base">
                                Remember your password?{' '}
                                <Link href="/login" className="text-teal-500 font-semibold hover:underline transition">Log In</Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
                            <p className="text-gray-500 mb-6">
                                We've sent a password reset link to <strong className="text-gray-700">{email}</strong>
                            </p>
                            <Link
                                href="/login"
                                className="inline-block px-6 py-3 rounded-full font-semibold text-teal-600 border-2 border-teal-500 hover:bg-teal-50 transition"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
