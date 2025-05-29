import { useState } from 'react';

export const dynamic = "force-dynamic";

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
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
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
          <div className="bg-white/90 border border-white/30 backdrop-blur-lg shadow-2xl rounded-[20px] p-8 max-w-md mx-auto flex flex-col items-center transition-all duration-300">
            {/* Preset donation buttons */}
            <div className="flex gap-3 mb-6 w-full justify-center">
              {[10, 25, 50].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  className={`px-6 py-2 rounded-full font-bold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
                    ${amount === String(preset)
                      ? 'bg-gradient-to-r from-indigo-200 to-indigo-400 text-indigo-800 shadow-md scale-105'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}
                  `}
                  style={{ minWidth: 80 }}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label htmlFor="amount" className="block text-xs font-medium text-gray-500 mb-1 tracking-wide">
                  Donation Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400 text-lg pointer-events-none">$
                  </span>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="pl-8 pr-14 py-3 w-full rounded-xl text-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition shadow-sm bg-white/80 placeholder-gray-400"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                    required
                  />
                  <span className="absolute right-3 text-gray-400 text-base">USD</span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-4 px-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#7f5fff] to-[#5e3bff] shadow-xl transition-all duration-200 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-60"
                  style={{ minHeight: 56 }}
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
                  By supporting Sonder Sessions, you're helping individuals achieve their personal and professional goals through mentorship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 