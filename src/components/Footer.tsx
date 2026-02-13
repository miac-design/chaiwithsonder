import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo-new.png" alt="ChaiChat Logo" width={36} height={36} className="rounded-lg" />
              <span className="text-xl font-bold text-white">ChaiChat</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed mb-2">
              Where Sonder Becomes Connection
            </p>
            <p className="text-xs text-stone-500">
              A Community Initiative by{' '}
              <a
                href="https://austinai.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/80 hover:text-amber-300 transition-colors"
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
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Follow ChaiChat on LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@chaichathub.com"
                className="text-stone-400 hover:text-white transition-colors"
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
              <Link href="/about" className="text-sm text-stone-400 hover:text-white transition-colors">About</Link>
              <Link href="/mentor" className="text-sm text-stone-400 hover:text-white transition-colors">Find a Mentor</Link>
              <Link href="/mentor/become" className="text-sm text-stone-400 hover:text-white transition-colors">Become a Mentor</Link>
              <Link href="/sonder-swap" className="text-sm text-stone-400 hover:text-white transition-colors">Sonder Swap ✨</Link>
              <Link href="/contact" className="text-sm text-stone-400 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/donate" className="text-sm text-amber-400/90 hover:text-amber-300 transition-colors font-medium">
                Buy Us a Chai ☕
              </Link>
              <Link href="/privacy" className="text-sm text-stone-400 hover:text-white transition-colors">Ethics &amp; Privacy</Link>
              <Link href="/about#faq" className="text-sm text-stone-400 hover:text-white transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Column 4: Austin AI Hub */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Austin AI Hub
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="https://austinai.org/events" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-white transition-colors">Events</a>
              <a href="https://austinai.org" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-white transition-colors">Community</a>
              <a href="https://austinai.org/blog" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-white transition-colors">Blog</a>
              <a href="https://austinai.org/newsletter" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-white transition-colors">Newsletter</a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} ChaiChat | Powered by Sonder</p>
            <p className="flex items-center gap-1">Made with <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" aria-hidden="true" /> by Mia C. for the community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;