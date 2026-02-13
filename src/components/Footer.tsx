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
              <Link href="/donate" className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">
                Buy Us a Chai ☕
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
