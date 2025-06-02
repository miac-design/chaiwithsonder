'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! This is a demo, so no actual message was sent.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto animate-fadeInUp">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-10 max-w-xl mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Send Us a Message</h2>
              <p className="text-sm text-gray-500 mb-8 text-center">We usually respond within 1-2 business days.</p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 placeholder-gray-400 focus:outline-none"
                    placeholder="Your name"
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
                    className="block w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 placeholder-gray-400 focus:outline-none"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 placeholder-gray-400 focus:outline-none"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 placeholder-gray-400 focus:outline-none resize-none"
                    placeholder="Type your message..."
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-200 text-base ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Other Ways to Reach Us</h2>
            <div className="flex justify-center gap-6 flex-wrap md:flex-nowrap w-full animate-fadeInUp">
              {/* Email Card */}
              <div className="w-full md:w-[280px] min-h-[250px] flex flex-col justify-between items-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
                <div className="flex flex-col items-center flex-1 w-full justify-between">
                  <div className="bg-indigo-100 text-indigo-600 text-3xl p-3 rounded-full flex items-center justify-center mb-4">
                    {/* Mail Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25ZM3.75 6.75l8.25 6.75 8.25-6.75" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-sm text-gray-500 text-center mb-2">Reach us anytime via email.</p>
                  <p className="text-sm text-gray-800 font-medium text-center select-all hover:text-indigo-600 transition-colors">support@chaichathub.com</p>
                </div>
              </div>
              {/* LinkedIn Card */}
              <div className="w-full md:w-[280px] min-h-[250px] flex flex-col justify-between items-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
                <div className="flex flex-col items-center flex-1 w-full justify-between">
                  <div className="bg-indigo-100 text-indigo-600 text-3xl p-3 rounded-full flex items-center justify-center mb-4">
                    {/* LinkedIn Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor"><path d="M27 3H5C3.3 3 2 4.3 2 6v20c0 1.7 1.3 3 3 3h22c1.7 0 3-1.3 3-3V6c0-1.7-1.3-3-3-3zM12 25H8V13h4v12zm-2-13.4c-1.3 0-2.1-.9-2.1-2 0-1.1.8-2 2.1-2s2.1.9 2.1 2c0 1.1-.8 2-2.1 2zm15 13.4h-4v-6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.5-.1.8v6.4h-4V13h4v1.6c.5-.8 1.3-1.9 3.2-1.9 2.3 0 4 1.5 4 4.7v7.6z"/></svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">LinkedIn</h3>
                  <p className="text-sm text-gray-500 text-center mb-2">Connect with us on LinkedIn</p>
                  <p className="text-sm text-gray-800 font-medium text-center">@chai.chat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 