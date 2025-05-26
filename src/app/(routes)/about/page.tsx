export default function About() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            We're building a community where growth and learning happen through meaningful connections.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                At ChaiWithSonder, we believe that everyone deserves access to quality mentorship and support in their personal and professional journey. Our platform connects mentors and mentees, creating meaningful relationships that foster growth and development.
              </p>
            </div>

            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision a world where knowledge sharing and personal growth are accessible to all. Through our community-driven platform, we're creating a space where people can find the guidance and support they need to achieve their goals.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in the power of community and the strength that comes from supporting one another.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                We're committed to fostering an environment where continuous learning and personal development thrive.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make mentorship and support accessible to everyone, regardless of their background or circumstances.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to mentor others, find a mentor, or connect with accountability partners, ChaiWithSonder is here to support your journey.
          </p>
        </div>
      </div>

      {/* Website Makeover Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF9F3] to-[#F8F6F0]">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 tracking-tight">Website Makeover Team</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Moein Razavi */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-8">
            <img src="/team/moein.jpg" alt="Moein Razavi" className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-[#FFF9F3] shadow" />
            <div className="text-center">
              <div className="font-serif font-bold text-lg md:text-xl tracking-wide mb-1">Moein Razavi, PhD</div>
            </div>
          </div>
          {/* Hamed Alikhani */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-8">
            <img src="/team/hamed.jpg" alt="Hamed Alikhani" className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-[#FFF9F3] shadow" />
            <div className="text-center">
              <div className="font-serif font-bold text-lg md:text-xl tracking-wide mb-1">Hamed Alikhani, PhD</div>
            </div>
          </div>
          {/* Mia C */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-8">
            <img src="/team/mia.jpeg" alt="Mia C" className="w-32 h-32 object-cover rounded-full mb-6 border-4 border-[#FFF9F3] shadow" />
            <div className="text-center">
              <div className="font-serif font-bold text-lg md:text-xl tracking-wide mb-1">Mia C, PhD</div>
            </div>
          </div>
        </div>
        {/* Warm, inclusive text block below team */}
        <div className="mt-16 max-w-3xl mx-auto rounded-xl bg-gradient-to-r from-[#F8F6F0] to-[#FFF9F3] py-10 px-6 md:px-12 shadow text-center">
          <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed" style={{ fontFamily: 'serif', letterSpacing: '0.01em' }}>
            This platform is our way of giving back—building a welcoming community, together.
          </p>
        </div>
      </section>
    </div>
  );
} 