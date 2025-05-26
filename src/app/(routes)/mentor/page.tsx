'use client';

import { useState } from 'react';
import Image from 'next/image';

const mentors = [
  {
    name: 'Moein Razavi, PhD',
    photo: '/team/moein.jpg',
    bio: 'AI researcher and mentor passionate about empowering newcomers in tech and academia.',
    linkedin: 'https://www.linkedin.com/in/moeinrazavi/',
    calendly: 'https://calendly.com/moein-razavi',
  },
  {
    name: 'Hamed Alikhani, PhD',
    photo: '/team/hamed.jpg',
    bio: 'Machine learning scientist with a love for teaching and helping others grow.',
    linkedin: 'https://www.linkedin.com/in/hamedalikhani/',
    calendly: 'https://calendly.com/hamed-alikhani',
  },
  {
    name: 'Mia C, PhD',
    photo: '/team/mia.jpeg',
    bio: 'Community builder and mentor dedicated to supporting immigrants and lifelong learners.',
    linkedin: 'https://www.linkedin.com/in/miac/',
    calendly: 'https://calendly.com/mia-c',
  },
];

export default function Mentor() {
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
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
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
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Become a Mentor
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Share your knowledge and experience with others. Make a difference in someone's life by becoming a mentor.
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
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                  Areas of Expertise
                </label>
                <input
                  type="text"
                  name="expertise"
                  id="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="e.g., Software Development, Career Growth, Leadership"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
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
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                  What do you hope to achieve as a mentor?
                </label>
                <textarea
                  name="goals"
                  id="goals"
                  rows={4}
                  required
                  value={formData.goals}
                  onChange={handleChange}
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