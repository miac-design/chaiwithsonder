'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSession, signOut, SessionProvider } from "next-auth/react";
import React from 'react';
import AnimatedLogo from './AnimatedLogo';

// Navigation structure with dropdowns
type DropdownItem = { name: string; href: string; description?: string };
type NavItem = { name: string; href?: string; dropdown?: DropdownItem[] };

const exploreLinks: DropdownItem[] = [
  { name: 'Topics', href: '/explore/topics', description: 'Browse all topics' },
  { name: 'Trending', href: '/explore/trending', description: 'Popular this week' },
  { name: 'Popular Chats', href: '/explore/popular', description: 'Most-loved conversations' },
  { name: 'New This Week', href: '/explore/new', description: 'Fresh perspectives' },
  { name: 'Search', href: '/search', description: 'Find anything' },
];

const learnLinks: DropdownItem[] = [
  { name: 'Learning Paths', href: '/learn/paths', description: 'Guided journeys' },
  { name: 'AI Basics', href: '/learn/ai-basics', description: 'Start with AI' },
  { name: 'Resources', href: '/learn/resources', description: 'Articles & guides' },
  { name: 'Certificates', href: '/learn/certificates', description: 'Coming soon' },
];

const mentorshipLinks: DropdownItem[] = [
  { name: 'Find a Mentor', href: '/mentor', description: 'Connect with guides' },
  { name: 'Become a Mentor', href: '/mentor#application', description: 'Share your wisdom' },
  { name: 'How It Works', href: '/mentor/how-it-works', description: 'The process' },
  { name: 'Success Stories', href: '/mentor/stories', description: 'Impact in action' },
];

const communityLinks: DropdownItem[] = [
  { name: 'Events', href: '/community/events', description: 'Upcoming gatherings' },
  { name: 'Members', href: '/community/members', description: 'Meet the community' },
  { name: 'Discussions', href: '/community/discussions', description: 'Join conversations' },
  { name: 'Community Stories', href: '/community/stories', description: 'Shared experiences' },
];

const aboutLinks: DropdownItem[] = [
  { name: 'Our Story', href: '/about', description: 'Why we exist' },
  { name: 'Impact', href: '/about#impact', description: 'Our difference' },
  { name: 'Team', href: '/about#team', description: 'The people' },
  { name: 'Ethics & Privacy', href: '/about#ethics', description: 'Our values' },
  { name: 'Partners', href: '/partner', description: 'Work with us' },
];

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Explore', dropdown: exploreLinks },
  { name: 'Learn', dropdown: learnLinks },
  { name: 'Mentorship', dropdown: mentorshipLinks },
  { name: 'Community', dropdown: communityLinks },
  { name: 'About', dropdown: aboutLinks },
];

// Dropdown component
const NavDropdown = ({ name, items, isOpen, onToggle }: {
  name: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-white/80 font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:text-chai-amber hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-chai-amber/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {name}
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-64 z-50"
          >
            <div className="bg-chai-navy/95 backdrop-blur-2xl border border-chai-sky/20 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Gradient accent at top */}
              <div className="h-1 bg-gradient-to-r from-chai-sky via-chai-amber to-chai-sky" />
              <div className="p-2">
                {items.map((item, idx) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex flex-col px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group/item"
                  >
                    <span className="text-white font-medium group-hover/item:text-chai-amber transition-colors">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="text-white/50 text-sm mt-0.5">
                        {item.description}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 20);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  const navbarVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

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
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
    }, 1500);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage
            ? 'bg-chai-navy/95 backdrop-blur-2xl border-b border-chai-sky/10 shadow-xl shadow-black/30'
            : 'bg-gradient-to-b from-chai-dark/80 to-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-x-3 flex-shrink-0">
              <Link href="/" className="flex items-center gap-x-3 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative"
                >
                  <AnimatedLogo size={52} />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span
                    className="font-[--font-space-grotesk] text-2xl font-bold tracking-tight text-white group-hover:text-chai-sky transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    Chai Chat
                  </motion.span>
                  <span className="text-xs text-white/40 hidden sm:block">
                    Where Sonder Becomes Connection
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <NavDropdown
                      key={item.name}
                      name={item.name}
                      items={item.dropdown}
                      isOpen={openDropdown === item.name}
                      onToggle={() => toggleDropdown(item.name)}
                    />
                  );
                }
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href || '/'}
                    className={`text-white/80 font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:text-chai-amber hover:bg-white/5 ${isActive ? 'text-chai-sky bg-white/5' : ''
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Start Here - First-time user guide */}
              <Link
                href="/start"
                className="flex items-center gap-1 text-chai-amber font-medium px-3 py-2 rounded-lg hover:bg-chai-amber/10 transition-all duration-200 ml-2"
              >
                <span>Start Here</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Action Zone (Right side) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Support - Tertiary */}
              <Link
                href="/donate"
                className="flex items-center gap-1.5 text-white/60 hover:text-chai-amber text-sm font-medium transition-all duration-200"
              >
                <span className="text-lg">❤️</span>
                <span>Support</span>
              </Link>

              {/* Login - Secondary */}
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-semibold text-white/80 hover:text-white border border-white/20 hover:border-chai-sky/50 rounded-full transition-all duration-200 hover:bg-white/5"
              >
                Login
              </Link>

              {/* Join Free - Primary CTA */}
              <button
                onClick={() => setShowSignupModal(true)}
                className="group relative overflow-hidden px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-chai-sky to-chai-blue text-white shadow-lg shadow-chai-sky/30 hover:shadow-xl hover:shadow-chai-sky/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="relative z-10">Join Free</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>

              {/* User menu when logged in */}
              {session && (
                <div className="relative flex items-center ml-2" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                    className="flex items-center gap-2 focus:outline-none group"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    {session.user?.image && (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User avatar'}
                        className="w-9 h-9 rounded-full object-cover border-2 border-chai-sky/30 shadow"
                      />
                    )}
                    <svg className="w-4 h-4 text-white/50 group-hover:text-chai-amber transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-chai-navy/95 backdrop-blur-xl rounded-xl shadow-lg border border-chai-sky/20 z-50 overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-chai-sky to-chai-amber" />
                      <a
                        href="/dashboard"
                        className="block px-4 py-3 text-white/80 hover:bg-white/10 hover:text-chai-amber transition-colors text-sm font-medium"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Dashboard
                      </a>
                      <a
                        href="/profile"
                        className="block px-4 py-3 text-white/80 hover:bg-white/10 hover:text-chai-amber transition-colors text-sm font-medium"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </a>
                      <button
                        onClick={() => { setUserMenuOpen(false); signOut(); }}
                        className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 hover:text-red-400 transition-colors text-sm font-medium border-t border-white/10"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-chai-amber/50"
                aria-label="Toggle menu"
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
        </div>

        {/* Microcopy bar - visible on scroll */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden lg:block bg-gradient-to-r from-chai-navy via-chai-blue/30 to-chai-navy border-t border-white/5"
            >
              <div className="max-w-7xl mx-auto px-4 py-1.5 text-center">
                <span className="text-white/50 text-xs">
                  ☕ A learning & mentorship community powered by AI and people
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden fixed inset-0 top-20 bg-chai-dark/98 backdrop-blur-xl z-40 overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2">
              {/* Mobile nav items */}
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="border-b border-white/10 pb-2 mb-2">
                      <div className="text-white/50 text-xs uppercase tracking-wider px-4 py-2">
                        {item.name}
                      </div>
                      {item.dropdown.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="block px-4 py-3 text-white/80 hover:text-chai-amber hover:bg-white/5 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '/'}
                      className={`block px-4 py-3 text-white font-medium hover:text-chai-amber hover:bg-white/5 rounded-lg transition-colors ${pathname === item.href ? 'text-chai-sky bg-white/5' : ''
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Start Here */}
              <Link
                href="/start"
                className="flex items-center gap-2 px-4 py-3 text-chai-amber font-semibold hover:bg-chai-amber/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Start Here</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Mobile CTAs - sticky at bottom */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-chai-dark via-chai-dark to-transparent">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { setShowSignupModal(true); setIsMenuOpen(false); }}
                    className="w-full py-3 text-center font-bold rounded-full bg-gradient-to-r from-chai-sky to-chai-blue text-white shadow-lg"
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
                      className="flex-1 py-2.5 text-center font-semibold text-chai-amber border border-chai-amber/30 rounded-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ❤️ Support
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative max-w-md w-full mx-4 bg-chai-navy/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-chai-sky/20 overflow-hidden"
          >
            {/* Gradient bar */}
            <div className="h-1 bg-gradient-to-r from-chai-sky via-chai-amber to-chai-sky" />

            <div className="p-6 md:p-8">
              <button
                className="absolute top-4 right-4 text-white/40 hover:text-white text-2xl font-bold focus:outline-none"
                onClick={() => { setShowSignupModal(false); setSignupSuccess(false); }}
                aria-label="Close"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold text-center text-white mb-2">Join ChaiChat</h2>
              <p className="text-center text-white/60 mb-6">Start your journey of learning and connection</p>

              {/* Social Sign Up */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleGoogleSignUp}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z" /></svg>
                  <span className="text-sm font-medium">Google</span>
                </button>
                <button
                  onClick={handleMicrosoftSignUp}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 transition"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><rect fill="#F25022" x="1" y="1" width="10" height="10" /><rect fill="#7FBA00" x="13" y="1" width="10" height="10" /><rect fill="#00A4EF" x="1" y="13" width="10" height="10" /><rect fill="#FFB900" x="13" y="13" width="10" height="10" /></svg>
                  <span className="text-sm font-medium">Microsoft</span>
                </button>
              </div>

              <div className="relative text-center text-white/40 mb-6">
                <span className="relative z-10 bg-chai-navy px-3 text-sm">or continue with email</span>
                <div className="absolute left-0 top-1/2 w-full h-px bg-white/10" />
              </div>

              {!signupSuccess ? (
                <form className="space-y-4" onSubmit={handleSignupSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={signupForm.name}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-chai-sky focus:border-transparent transition"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-chai-sky focus:border-transparent transition"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-chai-sky focus:border-transparent transition pr-12"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? '👁' : '👁‍🗨'}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 font-bold rounded-xl bg-gradient-to-r from-chai-sky to-chai-blue text-white shadow-lg hover:shadow-xl transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Free Account'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="text-chai-amber text-lg font-semibold mb-2">🎉 Welcome to ChaiChat!</div>
                  <p className="text-white/60 mb-4">Your account has been created. Check your email to get started.</p>
                  <button
                    className="w-full py-3 font-bold rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                    onClick={() => { setShowSignupModal(false); setSignupSuccess(false); }}
                  >
                    Continue
                  </button>
                </div>
              )}

              <p className="text-sm text-white/40 text-center mt-6">
                Already have an account?{' '}
                <a href="/login" className="text-chai-amber hover:underline">Log in</a>
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