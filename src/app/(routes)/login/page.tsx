"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Demo: Login successful!");
    }, 1200);
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon!");
  };
  const handleOutlookLogin = () => {
    alert("Outlook login coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-12">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-base mb-8 text-center">Log in to continue your journey</p>
        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 w-full mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-indigo-50 transition font-semibold text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {/* Google SVG Icon */}
            <span className="inline-flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z"/>
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 15.6 3 8.3 8.6 6.3 14.7z"/>
                  <path fill="#FBBC05" d="M24 45c6.1 0 11.2-2 14.9-5.4l-6.9-5.7C29.7 35.6 27 36.5 24 36.5c-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45z"/>
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z"/>
                </g>
              </svg>
              <span className="sr-only">Google logo</span>
            </span>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleOutlookLogin}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-indigo-50 transition font-semibold text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {/* Outlook/Microsoft SVG Icon */}
            <span className="inline-flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <rect fill="#F25022" x="1" y="1" width="10" height="10"/>
                  <rect fill="#7FBA00" x="13" y="1" width="10" height="10"/>
                  <rect fill="#00A4EF" x="1" y="13" width="10" height="10"/>
                  <rect fill="#FFB900" x="13" y="13" width="10" height="10"/>
                </g>
              </svg>
              <span className="sr-only">Outlook logo</span>
            </span>
            Continue with Outlook
          </button>
        </div>
        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-white/80 placeholder-gray-400 text-base"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-500 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition bg-white/80 placeholder-gray-400 text-base pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 text-lg focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.568A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.293 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L6 6" /></svg>
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link href="#" className="text-sm text-indigo-600 hover:underline font-medium transition">Forgot your password?</Link>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center -mt-2">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#7f5fff] to-[#5e3bff] shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500 text-base">
          Don't have an account?{' '}
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 