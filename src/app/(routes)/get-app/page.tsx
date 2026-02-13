'use client';

import { useEffect, useState } from 'react';
import { Smartphone, Monitor, Share, PlusSquare, MoreVertical, Download, Check, ArrowRight, Coffee } from 'lucide-react';
import Link from 'next/link';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function GetAppPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) setIsInstalled(true);

    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) {
      setPlatform('ios');
    } else if (/Android/.test(ua)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50 min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-6">
            <Smartphone className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get ChaiChat on Your Phone
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Install ChaiChat as an app on your iPhone, Android, or desktop. No App Store needed — it works right from your browser.
          </p>
        </div>

        {isInstalled ? (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center mb-10">
            <Check className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">ChaiChat is installed!</h2>
            <p className="text-gray-600">You can find ChaiChat on your home screen. Enjoy your chai sessions!</p>
          </div>
        ) : (
          <>
            {/* Quick install button for Android/Desktop */}
            {deferredPrompt && (
              <div className="bg-white rounded-2xl border border-teal-200 shadow-lg p-6 mb-10 text-center">
                <h2 className="text-lg font-bold text-gray-900 mb-2">One-tap install available</h2>
                <p className="text-gray-500 text-sm mb-4">Your browser supports instant install</p>
                <button
                  onClick={handleInstall}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  Install ChaiChat Now
                </button>
              </div>
            )}

            {/* Platform-specific instructions */}
            <div className="space-y-6">
              {/* iOS */}
              <div className={`bg-white rounded-2xl border shadow-sm p-6 ${platform === 'ios' ? 'border-teal-200 ring-2 ring-teal-100' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">iPhone & iPad</h3>
                    {platform === 'ios' && <span className="text-xs text-teal-600 font-medium">Your device</span>}
                  </div>
                </div>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Open <strong>chaichathub.com</strong> in <strong>Safari</strong> (required — Chrome won&apos;t work for this)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                    <span className="flex items-center gap-1.5">Tap the <Share className="w-4 h-4 text-blue-500 inline" /> <strong>Share</strong> button at the bottom of Safari</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                    <span className="flex items-center gap-1.5">Scroll down and tap <PlusSquare className="w-4 h-4 text-blue-500 inline" /> <strong>Add to Home Screen</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Tap <strong>Add</strong> — ChaiChat will appear as an app icon on your home screen</span>
                  </li>
                </ol>
              </div>

              {/* Android */}
              <div className={`bg-white rounded-2xl border shadow-sm p-6 ${platform === 'android' ? 'border-teal-200 ring-2 ring-teal-100' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Android</h3>
                    {platform === 'android' && <span className="text-xs text-teal-600 font-medium">Your device</span>}
                  </div>
                </div>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Open <strong>chaichathub.com</strong> in <strong>Chrome</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                    <span className="flex items-center gap-1.5">Tap the <MoreVertical className="w-4 h-4 text-gray-600 inline" /> <strong>menu</strong> (three dots) in the top-right</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Tap <strong>Install</strong> — ChaiChat launches full-screen like a native app</span>
                  </li>
                </ol>
              </div>

              {/* Desktop */}
              <div className={`bg-white rounded-2xl border shadow-sm p-6 ${platform === 'desktop' ? 'border-teal-200 ring-2 ring-teal-100' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Desktop (Chrome, Edge)</h3>
                    {platform === 'desktop' && <span className="text-xs text-teal-600 font-medium">Your device</span>}
                  </div>
                </div>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Visit <strong>chaichathub.com</strong> in Chrome or Edge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                    <span className="flex items-center gap-1.5">Click the <Download className="w-4 h-4 text-gray-600 inline" /> <strong>install icon</strong> in the address bar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Click <strong>Install</strong> — ChaiChat opens as its own window</span>
                  </li>
                </ol>
              </div>
            </div>
          </>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Works Offline', desc: 'Access your profile and sessions anytime' },
            { title: 'No Downloads', desc: 'Installs directly from your browser' },
            { title: 'Always Updated', desc: 'Gets the latest features automatically' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="font-semibold text-gray-900 text-sm mb-1">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Ready to grab a chai?</p>
          <Link
            href="/mentor"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg"
          >
            <Coffee className="w-5 h-5" />
            Find a Mentor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
