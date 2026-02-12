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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const mailtoSubject = encodeURIComponent(`[ChaiChat] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // Open email client
    window.location.href = `mailto:team@austinhub.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl mb-4">
            Get in <span className="heading-italic-accent">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Card */}
        <div className="edron-card p-8 md:p-10 max-w-xl mx-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Client Opened!</h2>
              <p className="text-gray-600 mb-6">
                Complete sending your message in your email app.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-secondary"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-sm text-gray-500 mb-6 text-center">
                We usually respond within 1-2 business days.
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 placeholder-gray-400 focus:outline-none bg-gray-50"
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
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 placeholder-gray-400 focus:outline-none bg-gray-50"
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
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 placeholder-gray-400 focus:outline-none bg-gray-50"
                  placeholder="How can we help?"
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
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 placeholder-gray-400 focus:outline-none resize-none bg-gray-50"
                  placeholder="Type your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-teal w-full flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {isSubmitting ? 'Opening Email...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Direct Email Option */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Or email us directly at:</p>
          <a
            href="mailto:team@austinhub.com"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-lg transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            team@austinhub.com
          </a>
        </div>
      </div>
    </div>
  );
}