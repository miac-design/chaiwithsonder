'use client';

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsSubmitting(true);
    const { error } = await signUp(form.email, form.password, form.name);
    setIsSubmitting(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleSignUp = async () => {
    await signInWithGoogle();
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

        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Join ChaiChat</h1>
          <p className="text-gray-500 text-base mb-6 text-center">Start your mentorship journey</p>

          {/* Social Sign Up Buttons */}
          <div className="flex flex-col gap-3 w-full mb-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-teal-300 transition font-semibold text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <svg width="24" height="24" viewBox="0 0 48 48" className="w-6 h-6">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z" />
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 15.6 3 8.3 8.6 6.3 14.7z" />
                <path fill="#FBBC05" d="M24 45c6.1 0 11.2-2 14.9-5.4l-6.9-5.7C29.7 35.6 27 36.5 24 36.5c-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45z" />
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z" />
              </svg>
              Sign up with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-teal-300 transition font-semibold text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              onClick={() => alert('Microsoft sign up coming soon!')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
                <rect fill="#F25022" x="1" y="1" width="10" height="10" />
                <rect fill="#7FBA00" x="13" y="1" width="10" height="10" />
                <rect fill="#00A4EF" x="1" y="13" width="10" height="10" />
                <rect fill="#FFB900" x="13" y="13" width="10" height="10" />
              </svg>
              Sign up with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Manual Sign Up Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition text-gray-900 placeholder-gray-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition text-gray-900 placeholder-gray-400"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition text-gray-900 placeholder-gray-400 pr-12"
                  placeholder="Password (min 6 characters)"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition text-gray-900 placeholder-gray-400"
                placeholder="Confirm password"
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
              className="w-full py-3 rounded-full font-bold text-lg text-white bg-teal-500 hover:bg-teal-400 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-60"
            >
              {isSubmitting ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          <div className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-500 font-semibold hover:underline">Login</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}