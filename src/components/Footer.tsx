import Link from 'next/link';
import { Calendar, Users, BookOpen, Linkedin, Instagram, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-teal-700 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Chai Chat</h3>
            <p className="text-white/60">Where Sonder Becomes Connection</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/70">
            <Link href="/about" className="hover:text-teal-400 transition-colors">About</Link>
            <Link href="/mentor" className="hover:text-teal-400 transition-colors">Find a Mentor</Link>
            <Link href="/mentor/become" className="hover:text-teal-400 transition-colors">Become a Mentor</Link>
            <Link href="/donate" className="hover:text-teal-400 transition-colors">Support Us</Link>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
            <Link href="/about#ethics" className="hover:text-teal-400 transition-colors">Ethics & Privacy</Link>
          </div>
        </div>

        <div className="w-full h-px bg-teal-500/30 my-8" />

        {/* Austin AI Hub Cross-Links */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <span>A Community Initiative by</span>
            <a
              href="https://austinaihub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              Austin AI Hub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="https://austinaihub.com/#events"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400/80 hover:text-teal-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Events
            </a>
            <a
              href="https://austinaihub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400/80 hover:text-teal-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-4 h-4" />
              Community
            </a>
            <a
              href="https://austinaihub.com/#blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400/80 hover:text-teal-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Blog
            </a>
          </div>

          {/* Austin AI Hub Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/austinaihub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Austin AI Hub on LinkedIn"
              className="text-white/50 hover:text-teal-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/austinaihub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Austin AI Hub on Instagram"
              className="text-white/50 hover:text-teal-400 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="w-full h-px bg-teal-500/30 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} ChaiChat | Powered by Sonder</p>
          <p className="text-teal-400/80 font-medium">Sonder. Connect. Grow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;