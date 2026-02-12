export default function ValuesSection() {
    return (
        <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                    <p className="text-gray-600">
                        We believe in the power of community and the strength that comes from supporting one another.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
                    <p className="text-gray-600">
                        We&apos;re committed to fostering an environment where continuous learning and personal development thrive.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
                    <p className="text-gray-600">
                        We strive to make mentorship and support accessible to everyone, regardless of their background or circumstances.
                    </p>
                </div>
            </div>
        </div>
    );
}
