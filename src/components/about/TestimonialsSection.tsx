import Image from 'next/image';

const testimonials = [
    {
        name: 'Sara',
        title: 'PhD Student',
        initials: 'S',
        quote: 'Having a mentor who understands my academic journey has been transformative. I now feel more confident about my research and career path.',
    },
    {
        name: 'Saleh',
        title: 'Power Systems Engineer',
        initials: 'Sa',
        quote: 'Chai Chat helped me give back and stay grounded. The connections I\'ve made are more than professional, they\'re personal.',
    },
    {
        name: 'Raheleh',
        title: 'Research Scientist',
        initials: 'R',
        quote: 'This platform makes you feel seen. It\'s not just about knowledge sharing, it\'s about humanity and belonging.',
    },
    {
        name: 'Jason',
        title: 'UX Designer',
        initials: 'J',
        quote: 'The one-on-one conversations gave me clarity I couldn\'t find elsewhere. This community truly lives up to its mission.',
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-0 fade-in-up">
            <h2 className="text-2xl font-bold text-center mb-10">What Members Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {testimonials.map((t, i) => (
                    <div key={t.name} className="bg-white p-6 rounded-2xl shadow-md transition hover:shadow-lg flex flex-col items-center text-center animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="flex justify-center mb-4">
                            <Image
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}`}
                                alt={`Avatar of ${t.name}`}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-full object-cover mx-auto ring-1 ring-indigo-100 bg-indigo-50"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = 'w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600 shadow';
                                    fallback.innerText = t.initials;
                                    if (e.currentTarget.parentNode) {
                                        e.currentTarget.parentNode.appendChild(fallback);
                                    }
                                }}
                            />
                        </div>
                        <div className="font-semibold text-gray-800 mt-4">{t.name}</div>
                        <div className="text-sm italic text-gray-500">{t.title}</div>
                        <div className="text-base text-gray-700 leading-relaxed mt-3">&quot;{t.quote}&quot;</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
