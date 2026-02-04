'use client';

import { useState } from 'react';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your donation! This is a demo, so no actual payment was processed.');
      setAmount('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Glass pill badge */}
          <div className="glass-pill inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span>Support Meaningful Connections</span>
          </div>

          {/* Serif headline with italic accent */}
          <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl mb-6">
            Fund Mentorship{' '}
            <span className="heading-italic-accent">with Sonder</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Your donation helps keep our platform free and supports mentorship for those who need it most. Every contribution creates a ripple of connection.
          </p>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          {/* Donation Card */}
          <div className="edron-card p-8">
            {/* Preset donation buttons */}
            <div className="flex gap-3 mb-8 justify-center">
              {[10, 25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  className={`px-5 py-3 rounded-xl font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
                    ${amount === String(preset)
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-700 border border-gray-100'
                    }
                  `}
                >
                  ${preset}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-teal-600 text-lg font-semibold">$</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full pl-8 pr-16 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">USD</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-teal btn-pulse w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Donate Now</span>
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-serif text-3xl sm:text-4xl text-center mb-4">
            Why <span className="heading-italic-accent">Your Support</span> Matters
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Every donation directly impacts our community
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="edron-card p-8">
              <div className="edron-step-pill mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Keep Mentorship Free</h3>
              <p className="text-gray-600 leading-relaxed">
                Your contribution ensures that anyone can receive guidance, regardless of their financial situation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="edron-card p-8">
              <div className="edron-step-pill mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grow Our Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Help us reach more people and expand the network of mentors and mentees connecting through Chai Chat.
              </p>
            </div>

            {/* Card 3 */}
            <div className="edron-card p-8">
              <div className="edron-step-pill mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enable Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Support the development of new features that make mentorship more accessible and impactful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-teal-50/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-serif text-2xl sm:text-3xl mb-4">
            Not ready to donate?
          </h2>
          <p className="text-gray-600 mb-6">
            You can still make a difference by becoming a mentor and sharing your experience with others.
          </p>
          <Link href="/mentor#application" className="btn-secondary inline-flex items-center gap-2">
            Become a Mentor
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}