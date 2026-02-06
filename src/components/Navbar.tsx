'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSession, signOut, SessionProvider } from "next-auth/react";
import React from 'react';
import AnimatedLogo from './AnimatedLogo';

// Simplified navigation - direct links only, no redundant dropdowns
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 20);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleGoogleSignUp = () => { alert('Google sign up coming soon!'); };
  const handleMicrosoftSignUp = () => { alert('Outlook/Microsoft sign up coming soon!'); };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSignupSuccess(true);
      setSignupForm({ name: '', email: '', password: '' });
    }, 1500);
  };

  // Main nav links - simplified and clear
  const mainNavLinks = [
    { name: 'Find a Mentor', href: '/mentor' },
    { name: 'Become a Mentor', href: '/mentor/become' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-teal-500/10 shadow-xl'
          : 'bg-gradient-to-b from-slate-900/80 to-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedLogo size={48} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                  Chai Chat
                </span>
                <span className="text-xs text-white/40 hidden sm:block">
                  Where Sonder Becomes Connection
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Clean & Focused */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${pathname === link.href
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-white/80 hover:text-teal-400 hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Start Here - Highlighted */}
              <Link
                href="/start-here"
                className="flex items-center gap-1 px-4 py-2 ml-2 rounded-lg font-medium text-teal-400 hover:bg-teal-500/10 transition-all"
              >
                <span>Start Here</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Action Zone */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Support */}
              <Link
                href="/donate"
                className="flex items-center gap-1.5 text-white/60 hover:text-teal-400 text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Support</span>
              </Link>

              {!session ? (
                <>
                  {/* Login */}
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-semibold text-white/80 hover:text-white border border-white/20 hover:border-teal-500/50 rounded-full transition-all"
                  >
                    Login
                  </Link>

                  {/* Join Free - Teal unified color */}
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="px-6 py-2.5 text-sm font-bold rounded-full bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Join Free
                  </button>
                </>
              ) : (
                /* User menu when logged in */
                <div className="relative flex items-center ml-2" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                    className="flex items-center gap-2 focus:outline-none group"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User avatar'}
                        className="w-9 h-9 rounded-full object-cover border-2 border-teal-500/30"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <span className="text-teal-400 font-semibold">
                          {session.user?.name?.[0] || 'U'}
                        </span>
                      </div>
                    )}
                    <svg className="w-4 h-4 text-white/50 group-hover:text-teal-400 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-teal-500/20 z-50 overflow-hidden">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-white/80 hover:bg-teal-500/10 hover:text-teal-400 transition-colors text-sm font-medium"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-white/80 hover:bg-teal-500/10 hover:text-teal-400 transition-colors text-sm font-medium border-t border-white/5"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); signOut(); }}
                        className="w-full text-left px-4 py-3 text-white/80 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium border-t border-white/10"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  className="w-6 h-0.5 bg-current block"
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block mt-1.5"
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block mt-1.5"
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-20 bg-slate-900/98 backdrop-blur-xl z-40"
          >
            <div className="px-4 py-6 space-y-2">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition ${pathname === link.href
                    ? 'text-teal-400 bg-teal-500/10'
                    : 'text-white/80 hover:text-teal-400 hover:bg-white/5'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/start-here"
                className="flex items-center gap-2 px-4 py-3 text-teal-400 font-semibold hover:bg-teal-500/10 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Start Here</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Mobile CTAs */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { setShowSignupModal(true); setIsMenuOpen(false); }}
                    className="w-full py-3 text-center font-bold rounded-full bg-teal-500 text-white shadow-lg"
                  >
                    Join Free
                  </button>
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="flex-1 py-2.5 text-center font-semibold text-white/80 border border-white/20 rounded-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/donate"
                      className="flex-1 py-2.5 text-center font-semibold text-teal-400 border border-teal-500/30 rounded-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Gradient bar */}
            <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500" />

            <div className="p-6 md:p-8">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => { setShowSignupModal(false); setSignupSuccess(false); }}
              >
                ×
              </button>

              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Join ChaiChat</h2>
              <p className="text-center text-gray-500 mb-6">Start your journey of connection</p>

              {/* Social Sign Up */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleGoogleSignUp}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z" /></svg>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  onClick={handleMicrosoftSignUp}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><rect fill="#F25022" x="1" y="1" width="10" height="10" /><rect fill="#7FBA00" x="13" y="1" width="10" height="10" /><rect fill="#00A4EF" x="1" y="13" width="10" height="10" /><rect fill="#FFB900" x="13" y="13" width="10" height="10" /></svg>
                  <span className="text-sm font-medium">Microsoft</span>
                </button>
              </div>

              <div className="relative text-center text-gray-400 mb-6">
                <span className="relative z-10 bg-white px-3 text-sm">or continue with email</span>
                <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200" />
              </div>

              {!signupSuccess ? (
                <form className="space-y-4" onSubmit={handleSignupSubmit}>
                  <input
                    type="text"
                    name="name"
                    required
                    value={signupForm.name}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="Full name"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder="Email address"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition pr-12"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 font-bold rounded-xl bg-teal-500 hover:bg-teal-400 text-white shadow-lg transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Free Account'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="text-teal-500 text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Welcome to ChaiChat!
                  </div>
                  <p className="text-gray-500 mb-4">Your account is ready. Check your email to get started.</p>
                  <button
                    className="w-full py-3 font-bold rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    onClick={() => { setShowSignupModal(false); setSignupSuccess(false); }}
                  >
                    Continue
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-400 text-center mt-6">
                Already have an account?{' '}
                <a href="/login" className="text-teal-500 hover:underline">Log in</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const WrappedNavbar = () => {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
};

export default WrappedNavbar;