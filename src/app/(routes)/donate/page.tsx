'use client';

import { useState } from 'react';

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically integrate with a payment processor
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your donation! This is a demo, so no actual payment was processed.');
      setAmount('');
    }, 1500);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Support Our Mission
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Help us make mentorship accessible for all. Your donation supports our community and enables us to continue providing valuable mentoring opportunities.
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto">
          <div className="bg-gray-50 rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Donate Now'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Donate?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Our Community</h3>
                <p className="text-gray-600">
                  Your donation helps us maintain and improve our platform, ensuring that mentorship remains accessible to everyone.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enable Growth</h3>
                <p className="text-gray-600">
                  By supporting ChaiWithSonder, you're helping individuals achieve their personal and professional goals through mentorship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 