export default function MissionSection() {
    return (
        <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                <div className="bg-neutral-50 rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-base leading-relaxed text-gray-600">
                        At Chai Chat, we believe that everyone deserves access to quality mentorship and support in their personal and professional journey. Our platform connects mentors and mentees, creating meaningful relationships that foster growth and development.
                    </p>
                </div>

                <div className="bg-neutral-50 rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
                    <p className="text-base leading-relaxed text-gray-600">
                        We envision a world where knowledge sharing and personal growth are accessible to all. Through our community-driven platform, we&apos;re creating a space where people can find the guidance and support they need to achieve their goals.
                    </p>
                </div>
            </div>
        </div>
    );
}
