'use client';

export default function BecomeMentor() {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Become a Mentor
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Ready to inspire and support others? Join our community of mentors and help shape futures through meaningful conversations.
          </p>
        </div>

        {/* Brevo Embedded Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-600">
              <h2 className="text-xl font-bold text-white text-center">Mentor Application</h2>
              <p className="text-teal-100 text-center text-sm mt-1">Fill out the form below to join our mentor network</p>
            </div>
            <div className="p-4">
              <iframe
                width="100%"
                height="600"
                src="https://1d2588dd.sibforms.com/serve/MUIFAARxOpc08rFZV0XXyIi-tYLecKt87tUrVNuTPPYzDVqEvHhvZKRirq5q2stx06ADJTJq7XWSqYBxUz-e9WZLQvpF5x2OkufKnx3R346tPWm7UdU9mb7b-7UmKq5-CMygF1UEy4UvonHmOVTVUUaaRjkoXpKh6IjMFVEahSgZr_Y1nrShQIs3KVKWKXKEzybTijNOi7gstLm_4Q=="
                frameBorder="0"
                scrolling="auto"
                allowFullScreen
                style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
                title="Become a Mentor Application Form"
              />
            </div>
          </div>
        </div>

        {/* Why Become a Mentor Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Become a Mentor?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make an Impact</h3>
              <p className="text-gray-600 text-sm">
                Share your experience and help others navigate their journey. Your guidance can change lives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Together</h3>
              <p className="text-gray-600 text-sm">
                Mentoring is a two-way street. Learn from fresh perspectives while sharing your wisdom.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Recognition</h3>
              <p className="text-gray-600 text-sm">
                Build your reputation as a community leader with badges and verified credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}