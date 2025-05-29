'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Mentorship', dropdown: true },
    { name: 'What Members Say', href: '/about#testimonials' },
    { name: 'FAQ', href: '/about#faq' },
    { name: 'Contact', href: '/contact' },
  ];
  const mentorshipLinks = [
    { name: 'Become a Mentor', href: '/mentor#application' },
    { name: 'Meet the Mentors', href: '/mentor' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  // Social sign up handlers (placeholder)
  const handleGoogleSignUp = () => {
    alert('Google sign up coming soon!');
  };
  const handleMicrosoftSignUp = () => {
    alert('Outlook/Microsoft sign up coming soon!');
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSignupSuccess(true);
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
    }, 1500);
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-neutral-50 shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo Section */}
            <div className="flex items-center gap-x-3 flex-shrink-0">
              <Link href="/" className="flex items-center gap-x-3">
                <Image
                  src="/logo-new.png"
                  alt="Sonder Sessions Logo"
                  width={36}
                  height={36}
                  className="h-9 w-auto object-contain"
                  priority
                />
                <span className={`text-2xl font-bold align-middle ${
                  isScrolled || !isHomePage ? 'text-indigo-600' : 'text-white'
                }`}>
                  Sonder Sessions
                </span>
              </Link>
            </div>
            {/* Desktop menu */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <nav className="flex items-center gap-6 relative">
                {navItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key="mentorship-dropdown" className="relative group">
                        <button
                          className="text-gray-700 font-medium px-2 py-1 rounded-md transition-colors duration-200 hover:text-indigo-600 hover:underline underline-offset-4 flex items-center gap-1 focus:outline-none"
                          tabIndex={0}
                        >
                          Mentorship
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div className="absolute top-full left-0 mt-2 hidden group-hover:block group-focus-within:block z-50 min-w-[180px]">
                          <div className="bg-white shadow-md rounded-md px-4 py-2 space-y-2 z-50">
                            {mentorshipLinks.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="block text-gray-700 font-medium hover:text-indigo-600 transition duration-200 px-1 py-1 rounded"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    const isActive = item.href && (pathname === item.href || (item.href.includes('#') && pathname + window.location.hash === item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-gray-700 font-medium px-2 py-1 rounded-md transition-colors duration-200 hover:text-indigo-600 hover:underline underline-offset-4 ${
                          isActive ? 'font-semibold text-indigo-600' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  }
                })}
              </nav>
              <div className="flex items-center space-x-2 ml-6">
                <Link
                  href="/donate"
                  className="rounded-full px-4 py-1 text-sm bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-700 transition duration-200"
                >
                  Support Us
                </Link>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-1 text-sm bg-white border border-indigo-300 text-indigo-600 font-semibold shadow-sm hover:bg-indigo-50 transition-colors duration-200 align-middle"
                >
                  Login
                </Link>
                <button
                  type="button"
                  onClick={() => setShowSignupModal(true)}
                  className="rounded-full px-4 py-1 text-sm bg-indigo-500 text-white font-bold shadow-md hover:bg-indigo-600 transition duration-200 ml-2"
                >
                  Sign Up
                </button>
                {/* NextAuth Login/Logout */}
                {session ? (
                  <div className="relative flex items-center space-x-2 ml-2" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                      className="flex items-center space-x-2 focus:outline-none group"
                      aria-haspopup="true"
                      aria-expanded={userMenuOpen}
                    >
                      {session.user?.image && (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User avatar'}
                          className="w-8 h-8 rounded-full object-cover border border-gray-300 shadow"
                        />
                      )}
                      {session.user?.name && (
                        <span className="text-gray-700 font-medium text-sm truncate max-w-[120px] group-hover:text-indigo-700">{session.user.name}</span>
                      )}
                      <svg className="w-4 h-4 text-gray-400 ml-1 group-hover:text-indigo-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg ring-1 ring-black/10 z-50 animate-fadeInUp">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-t-xl transition-colors text-sm font-medium"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Profile
                        </a>
                        <button
                          onClick={() => { setUserMenuOpen(false); signOut(); }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-b-xl transition-colors text-sm font-medium"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-indigo-600'
                    : 'text-white hover:text-indigo-200'
                } focus:outline-none`}
              >
                <span className="sr-only">Open main menu</span>
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
                >
                  <motion.span
                    className="w-6 h-0.5 bg-current block"
                    variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 2 } }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-current block mt-1.5"
                    variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-current block mt-1.5"
                    variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -2 } }}
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-16 inset-x-0 bg-neutral-50 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, i) => {
                if (item.dropdown) {
                  return (
                    <div key="mentorship-dropdown-mobile" className="relative">
                      <button
                        className="w-full text-left text-gray-700 font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:text-indigo-600 hover:underline underline-offset-4 flex items-center gap-1 focus:outline-none"
                        tabIndex={0}
                        onClick={e => {
                          e.preventDefault();
                          const el = e.currentTarget.nextElementSibling;
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        Mentorship
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <div className="hidden mt-1 min-w-[180px]">
                        <div className="bg-white shadow-md rounded-md px-4 py-2 space-y-2 z-50">
                          {mentorshipLinks.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="block text-gray-700 font-medium hover:text-indigo-600 transition duration-200 px-1 py-1 rounded"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <motion.div key={item.name} custom={i} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                }
              })}
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href="/donate"
                  className="rounded-full px-4 py-1 text-sm bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-700 transition duration-200 text-center"
                >
                  Support Us
                </Link>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-1 text-sm bg-white border border-indigo-300 text-indigo-600 font-semibold shadow-sm hover:bg-indigo-50 transition-colors duration-200 text-center"
                >
                  Login
                </Link>
                <Link
                  href="#signup"
                  className="rounded-full px-4 py-1 text-sm bg-indigo-500 text-white font-bold shadow-md hover:bg-indigo-600 transition duration-200 text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-fadeInUp">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => { setShowSignupModal(false); setSignupSuccess(false); }}
              aria-label="Close signup modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign Up</h2>
            <p className="text-center text-gray-500 mb-4">Create your account to start your mentorship journey</p>
            {/* Social Sign Up Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:shadow-md transition"
              >
                {/* Google Icon */}
                <svg className="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 15.6 3 8.3 8.6 6.3 14.7z"/><path fill="#FBBC05" d="M24 45c6.1 0 11.2-2 14.9-5.4l-6.9-5.7C29.7 35.6 27 36.5 24 36.5c-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C8.3 39.4 15.6 45 24 45c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.3-4z"/></g></svg>
                <span className="font-medium">Sign up with Google</span>
              </button>
              <button
                type="button"
                onClick={handleMicrosoftSignUp}
                className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:shadow-md transition"
              >
                {/* Microsoft Icon */}
                <svg className="w-6 h-6" viewBox="0 0 24 24"><g><rect fill="#F25022" x="1" y="1" width="10" height="10"/><rect fill="#7FBA00" x="13" y="1" width="10" height="10"/><rect fill="#00A4EF" x="1" y="13" width="10" height="10"/><rect fill="#FFB900" x="13" y="13" width="10" height="10"/></g></svg>
                <span className="font-medium">Sign up with Outlook</span>
              </button>
            </div>
            {/* Divider */}
            <div className="relative text-center text-gray-400 my-4">
              <span className="relative z-10 bg-white px-3">or</span>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200 -z-1"></div>
            </div>
            {/* Manual Sign Up Form */}
            {!signupSuccess ? (
              <form className="bg-white p-6 rounded-xl shadow-lg space-y-4" onSubmit={handleSignupSubmit}>
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="signup-name"
                    required
                    value={signupForm.name}
                    onChange={handleSignupChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="signup-email"
                    required
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="signup-password"
                      required
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-lg focus:outline-none"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.568A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.293 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L6 6" /></svg>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      id="signup-confirm-password"
                      required
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-lg focus:outline-none"
                      onClick={() => setShowConfirm((v) => !v)}
                      tabIndex={-1}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.568A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.293 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L6 6" /></svg>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 text-white py-2 rounded-full w-full font-semibold hover:bg-indigo-700 shadow-md hover:shadow-lg transition ease-in-out duration-200"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-600 text-lg font-semibold mb-2">Account created successfully!</div>
                <div className="text-gray-600 text-sm mb-4">You can now log in to your account.</div>
                <button
                  className="bg-indigo-600 text-white py-2 rounded-full w-full font-semibold hover:bg-indigo-700 shadow-md hover:shadow-lg transition ease-in-out duration-200"
                  onClick={() => setShowSignupModal(false)}
                >
                  Close
                </button>
              </div>
            )}
            <div className="text-sm text-gray-500 text-center mt-4">
              Already have an account?{' '}
              <a href="#login" className="underline text-indigo-600">Login</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function NavbarWithSessionProvider(props) {
  return (
    <SessionProvider>
      <Navbar {...props} />
    </SessionProvider>
  );
} 