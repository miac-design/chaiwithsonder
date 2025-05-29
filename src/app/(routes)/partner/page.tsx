import { useState } from 'react';

export const dynamic = "force-dynamic";

export default function Partner() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: '',
    availability: '',
    preferences: '',
    commitment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your interest in finding an accountability partner! This is a demo, so no actual submission was processed.');
      setFormData({
        name: '',
        email: '',
        goals: '',
        availability: '',
        preferences: '',
        commitment: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find Your Accountability Partner
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Connect with like-minded individuals who will help you stay on track and achieve your goals.
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto">
          <div className="bg-gray-50 rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                  Your Goals
                </label>
                <textarea
                  name="goals"
                  id="goals"
                  rows={3}
                  required
                  value={formData.goals}
                  onChange={handleChange}
                  placeholder="What are your main goals that you want to achieve with an accountability partner?"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="e.g., Weekday evenings, Weekend mornings"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">
                  Partner Preferences
                </label>
                <textarea
                  name="preferences"
                  id="preferences"
                  rows={3}
                  required
                  value={formData.preferences}
                  onChange={handleChange}
                  placeholder="What kind of accountability partner are you looking for?"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="commitment" className="block text-sm font-medium text-gray-700">
                  Level of Commitment
                </label>
                <input
                  type="text"
                  name="commitment"
                  id="commitment"
                  required
                  value={formData.commitment}
                  onChange={handleChange}
                  placeholder="e.g., Weekly check-ins, Daily updates"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Find My Partner'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Having an Accountability Partner</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Motivated</h3>
                <p className="text-gray-600">
                  Having someone to check in with regularly helps you stay on track and maintain momentum towards your goals.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Progress</h3>
                <p className="text-gray-600">
                  Celebrate wins and learn from challenges together, creating a supportive environment for growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 