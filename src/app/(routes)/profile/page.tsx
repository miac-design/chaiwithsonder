'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        displayName: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setForm({
                displayName: user.user_metadata?.name || user.user_metadata?.full_name || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleSave = async () => {
        setIsSaving(true);
        setError("");
        setSuccess(false);

        const { error: updateError } = await supabase.auth.updateUser({
            data: { name: form.displayName }
        });

        setIsSaving(false);
        if (updateError) {
            setError(updateError.message);
        } else {
            setSuccess(true);
            setIsEditing(false);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Please log in to view your profile</p>
                    <Link href="/login" className="text-teal-500 font-semibold hover:underline">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-12 px-4">
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="text-teal-500 hover:text-teal-600 flex items-center gap-1 mb-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account settings</p>
                </div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
                                {form.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{form.displayName || "User"}</h2>
                                <p className="text-teal-100">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-6">
                        {success && (
                            <div className="bg-teal-50 border border-teal-200 text-teal-700 px-4 py-3 rounded-lg text-sm">
                                Profile updated successfully!
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={form.displayName}
                                    onChange={(e) => setForm(prev => ({ ...prev, displayName: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition text-gray-900"
                                    placeholder="Your name"
                                />
                            ) : (
                                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                                    {form.displayName || <span className="text-gray-400">Not set</span>}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-500">
                                {form.email}
                                <span className="text-xs text-gray-400 ml-2">(cannot be changed)</span>
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-3">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Additional sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
                    <Link
                        href="/forgot-password"
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                        <div>
                            <p className="font-medium text-gray-900">Change Password</p>
                            <p className="text-sm text-gray-500">Update your password</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>

                {/* Preferences Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
                    <Link
                        href="/start-here"
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                        <div>
                            <p className="font-medium text-gray-900">Update Matching Preferences</p>
                            <p className="text-sm text-gray-500">Change your vibe, topics, and communication style</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
