'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Become a Mentor', href: '/mentor' },
    { name: 'Meet the Mentors', href: '/mentor#meet-the-mentors' },
    { name: 'Donate', href: '/donate' },
    { name: 'Contact', href: '/contact' },
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

  return (
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
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/Logo.png"
                alt="Sonder Sessions Logo"
                width={36}
                height={36}
                className="mr-2 filter grayscale"
                priority
              />
              <span className={`text-2xl font-bold ${
                isScrolled || !isHomePage ? 'text-indigo-600' : 'text-white'
              }`}>
                Sonder Sessions
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-indigo-600'
                    : 'text-white hover:text-indigo-200'
                } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
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
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 2 },
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block mt-1.5"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block mt-1.5"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -2 },
                  }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

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
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={menuItemVariants}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 