import Link from 'next/link';
import { Linkedin, Mail, Heart, Smartphone } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <AnimatedLogo size={32} />
              <span className="text-xl font-bold text-white">ChaiChat</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              Where Sonder Becomes Connection
            </p>
            <p className="text-xs text-slate-500">
              A Community Initiative by{' '}
              <a
                href="https://austinhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400/80 hover:text-teal-300 transition-colors"
              >
                Austin AI Hub
              </a>
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              <a
                href="https://www.linkedin.com/company/chaichathub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors"
                aria-label="Follow ChaiChat on LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@chaichathub.com"
                className="text-slate-400 hover:text-teal-400 transition-colors"
                aria-label="Email ChaiChat"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">About</Link>
              <Link href="/mentor" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Find a Mentor</Link>
              <Link href="/mentor/become" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Become a Mentor</Link>
              <Link href="/chai-circle" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Chai Circle</Link>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/donate" className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium inline-flex items-center gap-1.5">
                Buy Us a Chai
                <svg viewBox="0 0 56 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-5" aria-hidden="true">
                  <defs>
                    <linearGradient id="footerCupGrad" x1="10" y1="45" x2="46" y2="80" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="50%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                    <linearGradient id="footerHandleGrad" x1="46" y1="52" x2="54" y2="68" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  <path d="M22 42Q24 32 22 22Q20 12 24 2" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M28 42Q30 30 28 18Q26 6 30-6" stroke="rgba(20,184,166,0.3)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M34 42Q32 30 34 18Q36 6 32-6" stroke="rgba(245,166,35,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M12 49C12 47 14 45 16 45H40C42 45 44 47 44 49V70C44 76 40 82 28 82C16 82 12 76 12 70V49Z" fill="url(#footerCupGrad)" />
                  <path d="M44 54H48C52 54 56 58 56 64C56 70 52 74 48 74H44" stroke="url(#footerHandleGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <ellipse cx="28" cy="47" rx="14" ry="4" fill="rgba(20,184,166,0.9)" />
                  <ellipse cx="28" cy="46" rx="10" ry="2" fill="rgba(255,255,255,0.4)" />
                </svg>
              </Link>
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Ethics &amp; Privacy</Link>
              <Link href="/about#faq" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">FAQ</Link>
              <Link href="/get-app" className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                Get the App
              </Link>
            </nav>
          </div>

          {/* Column 4: Austin AI Hub */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Austin AI Hub
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="https://austinhub.com/events" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Events</a>
              <a href="https://austinhub.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Community</a>
              <a href="https://austinhub.com/blog" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Blog</a>
              <a href="https://austinhub.com/newsletter" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-teal-300 transition-colors">Newsletter</a>
            </nav>
          </div>
        </div>

        {/* Edron AI Partner Banner */}
        <div className="mt-10 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-sm text-slate-400 text-center">
            Looking for AI education for your company?{' '}
            <a
              href="https://edronai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
            >
              Edron AI
            </a>
            {' '}is a ChaiChat partner offering tailored AI training and strategy for teams and organizations.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-slate-800/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} ChaiChat | Powered by Sonder</p>
            <p className="flex items-center gap-1">Made with <Heart className="w-3.5 h-3.5 text-teal-400 fill-teal-400" aria-hidden="true" /> by Mia C. for the community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
