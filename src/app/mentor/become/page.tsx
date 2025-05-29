'use client';

import { useState } from "react";

export const dynamic = "force-dynamic";

export default function BecomeMentor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    availability: '',
    goals: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your interest in becoming a mentor! This is a demo, so no actual submission was processed.');
      setFormData({
        name: '',
        email: '',
        expertise: '',
        experience: '',
        availability: '',
        goals: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Become a Mentor
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Ready to inspire and guide others? Join our community of mentors and help shape the future.
          </p>
        </div>
        <div className="max-w-xl mx-auto fade-in-up">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., jane@email.com"
                />
              </div>
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise</label>
                <input
                  type="text"
                  name="expertise"
                  id="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., Software Development, Career Growth, Leadership"
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., 5+ years"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  name="availability"
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition"
                  placeholder="e.g., Weekday evenings, Weekend mornings"
                />
              </div>
              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">What do you hope to achieve as a mentor?</label>
                <textarea
                  name="goals"
                  id="goals"
                  required
                  value={formData.goals}
                  onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[120px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 border-indigo-300 focus:outline-none transition resize-y"
                  placeholder="Share your goals, e.g., Help others grow, Give back to the community, etc."
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-indigo-600 text-white font-semibold rounded-full py-3 w-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition ease-in-out duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Become a Mentor?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Knowledge</h3>
                <p className="text-gray-600">
                  Help others grow by sharing your expertise and experience. Make a meaningful impact in someone's life.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Your Network</h3>
                <p className="text-gray-600">
                  Connect with like-minded individuals and expand your professional network while making a difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 