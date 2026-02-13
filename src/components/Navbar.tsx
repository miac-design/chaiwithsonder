'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Menu, X, Smartphone } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const navLinks = [
  { name: 'Find a Mentor', href: '/mentor' },
  { name: 'Become a Mentor', href: '/mentor/become' },
  { name: 'Chai Circle', href: '/chai-circle' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navBg = isScrolled || !isHomePage
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent';

  const textColor = isScrolled || !isHomePage
    ? 'text-gray-800'
    : 'text-white';

  const logoColor = isScrolled || !isHomePage
    ? 'text-teal-700'
    : 'text-white';

  const mainNavLinks = [
    { name: 'Find a Mentor', href: '/mentor' },
    { name: 'Become a Mentor', href: '/mentor/become' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        ref={menuRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo + Tagline */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <AnimatedLogo size={36} />
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-tight transition-colors ${logoColor}`}>
                  ChaiChat
                </span>
                <span className={`text-[11px] font-medium tracking-wide transition-colors hidden sm:block ${isScrolled || !isHomePage ? 'text-teal-600/70' : 'text-white/70'}`}>
                  Where Sonder Becomes Connection
                </span>
              </div>
            </Link>

            {/* Center: Nav Links (desktop) */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                      ${isActive
                        ? (isScrolled || !isHomePage ? 'text-teal-700 bg-teal-50' : 'text-white bg-white/15')
                        : `${textColor} hover:${isScrolled || !isHomePage ? 'bg-gray-100' : 'bg-white/10'}`
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right: Auth buttons (desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${textColor} hover:bg-gray-100/10`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
              >
                Join Free
              </Link>
            </div>

            {/* Mobile: Hamburger + Join Free */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="/signup"
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all shadow-md"
              >
                Join Free
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${textColor}`}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-lg"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors
                        ${isActive ? 'text-teal-700 bg-teal-50' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-3 border-t border-gray-100 space-y-1">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/get-app"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-teal-600 hover:bg-teal-50"
                  >
                    <Smartphone className="w-4 h-4" />
                    Get the App
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}