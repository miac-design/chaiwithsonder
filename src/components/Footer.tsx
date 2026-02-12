import Link from 'next/link';
import Image from 'next/image';

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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:hello@chaichathub.com"
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Email ChaiChat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
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
            <p>Made with 💜 by Mia C. for the community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;