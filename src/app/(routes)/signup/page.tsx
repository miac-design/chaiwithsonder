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
      router.push('/start-here');
    }
  };

  const handleGoogleSignUp = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-chai-dark via-chai-navy to-chai-dark px-4 py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chai-sky/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chai-amber/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-chai-navy/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
      >
        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-chai-sky via-chai-amber to-chai-sky" />

        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-extrabold text-white mb-2 text-center">Join ChaiChat</h1>
          <p className="text-white/60 text-base mb-6 text-center">Start your mentorship journey</p>

          {/* Social Sign Up Buttons */}
          <div className="flex flex-col gap-3 w-full mb-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 hover:border-chai-sky/50 transition font-semibold text-white text-base focus:outline-none focus:ring-2 focus:ring-chai-sky/50"
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
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 hover:border-chai-sky/50 transition font-semibold text-white text-base focus:outline-none focus:ring-2 focus:ring-chai-sky/50"
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
            <div className="flex-1 h-px bg-white/20" />
            <span className="mx-3 text-white/40 text-sm font-medium">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Manual Sign Up Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-white/60 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-chai-sky focus:ring-2 focus:ring-chai-sky/30 transition text-white placeholder-white/40"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-chai-sky focus:ring-2 focus:ring-chai-sky/30 transition text-white placeholder-white/40"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-white/60 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-chai-sky focus:ring-2 focus:ring-chai-sky/30 transition text-white placeholder-white/40 pr-12"
                  placeholder="Password (min 6 characters)"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-chai-amber"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "👁" : "👁‍🗨"}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-white/60 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-chai-sky focus:ring-2 focus:ring-chai-sky/30 transition text-white placeholder-white/40"
                placeholder="Confirm password"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2 px-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full font-bold text-lg text-white bg-gradient-to-r from-chai-sky to-chai-blue shadow-lg shadow-chai-sky/30 hover:shadow-xl hover:shadow-chai-sky/40 hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-60"
            >
              {isSubmitting ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          <div className="text-center text-white/50 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-chai-amber font-semibold hover:underline">Login</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}