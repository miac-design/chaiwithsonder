'use client';

import { useEffect, useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    // Detect iOS
    const ua = navigator.userAgent;
    const isiOS = /iPhone|iPad|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isiOS);

    if (isiOS) {
      // Show iOS tip after 5 seconds
      const timer = setTimeout(() => setShowBanner(true), 5000);
      return () => clearTimeout(timer);
    }

    // Android/desktop: listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSTip(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSTip(false);
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-in slide-in-from-bottom-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
        {showIOSTip ? (
          <div className="flex items-start gap-3">
            <Smartphone className="w-8 h-8 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Install ChaiChat on iPhone</p>
              <p className="text-xs text-gray-500 mt-1">
                Tap the <span className="font-semibold">Share</span> button in Safari, then tap <span className="font-semibold">&quot;Add to Home Screen&quot;</span>
              </p>
            </div>
            <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">Get the ChaiChat App</p>
              <p className="text-xs text-gray-500 truncate">Install for quick access on your phone</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition"
              >
                Install
              </button>
              <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
