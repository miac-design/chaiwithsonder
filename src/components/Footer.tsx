import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-indigo-50 via-white to-purple-100 border-t rounded-t-3xl shadow-xl">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-4 tracking-tight">Chai Chat</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Empowering growth through story-sharing and mutual support — one cup at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/mentor#application" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                  Become a Mentor
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">Connect With Us</h3>
            <div className="flex space-x-6 items-center">
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200" aria-label="LinkedIn">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="8" fill="#EEF2FF" />
                  <path d="M12.5 13.5h2v1.1c.3-.5 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.6v4.1h-2v-3.6c0-.9-.1-2-1.3-2-1.3 0-1.5 1-1.5 2v3.6h-2v-7.6zm-3 0h2v7.6h-2v-7.6zm1-2.2c.7 0 1.2-.6 1.2-1.2 0-.7-.5-1.2-1.2-1.2-.7 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2z" fill="#6366F1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-base tracking-wide">
            © {new Date().getFullYear()} Chai Chat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 