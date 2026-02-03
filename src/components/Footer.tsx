import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Chai Chat</h3>
            <p className="text-white/60">Where Sonder Becomes Connection</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/70">
            <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
            <Link href="/mentor" className="hover:text-amber-400 transition-colors">Mentorship</Link>
            <Link href="/community" className="hover:text-amber-400 transition-colors">Community</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
            <Link href="/about#ethics" className="hover:text-amber-400 transition-colors">Ethics & Privacy</Link>
          </div>
        </div>

        <div className="w-full h-px bg-amber-500/30 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>© {new Date().getFullYear()} ChaiChat | Powered by Sonder</p>
          <p className="text-amber-400/80 font-medium">Sonder. Connect. Grow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;