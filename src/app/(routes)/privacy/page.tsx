import { Shield, Eye, Lock, UserCheck, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ethics & Privacy',
    description: 'How ChaiChat protects your data, respects your privacy, and maintains ethical mentorship standards.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 text-sm font-medium rounded-full mb-6">
                        Trust & Safety
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Ethics & Privacy
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Your trust is the foundation of ChaiChat. Here&apos;s how we protect it.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Data Privacy */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-teal-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Data Privacy</h2>
                        </div>
                        <div className="space-y-3 text-gray-600 leading-relaxed">
                            <p>We collect only the minimum data needed to connect mentors and mentees. Your personal information is never sold, shared with third parties for marketing, or used for purposes beyond the platform.</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Your profile information is visible only to registered members</li>
                                <li>Session notes and conversations are private between participants</li>
                                <li>You can request full data deletion at any time</li>
                                <li>We use industry-standard encryption for all data in transit and at rest</li>
                            </ul>
                        </div>
                    </section>

                    {/* Session Privacy */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                <Lock className="w-5 h-5 text-teal-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Session Confidentiality</h2>
                        </div>
                        <div className="space-y-3 text-gray-600 leading-relaxed">
                            <p>Every mentorship conversation on ChaiChat is confidential. What&apos;s shared in a chai session stays in the session.</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Sessions are not recorded unless both parties explicitly consent</li>
                                <li>Mentors and mentees agree to maintain confidentiality</li>
                                <li>No session content is used for analytics or model training</li>
                            </ul>
                        </div>
                    </section>

                    {/* Ethical Mentorship */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-teal-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Ethical Mentorship Standards</h2>
                        </div>
                        <div className="space-y-3 text-gray-600 leading-relaxed">
                            <p>ChaiChat is built on mutual respect and genuine connection. We hold all participants to high ethical standards:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li><strong>No solicitation:</strong> Mentorship is free. No one should ask for payment, sell services, or recruit during sessions</li>
                                <li><strong>Respect boundaries:</strong> Both mentors and mentees set their own availability and topic preferences</li>
                                <li><strong>Inclusive environment:</strong> We welcome people of all backgrounds, identities, and experience levels</li>
                                <li><strong>No discrimination:</strong> Zero tolerance for harassment, bias, or exclusionary behavior</li>
                                <li><strong>Honest representation:</strong> Mentors represent their experience accurately and give advice in good faith</li>
                            </ul>
                        </div>
                    </section>

                    {/* Transparency */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                <Eye className="w-5 h-5 text-teal-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Transparency</h2>
                        </div>
                        <div className="space-y-3 text-gray-600 leading-relaxed">
                            <p>ChaiChat is a community initiative of Austin AI Hub. We are committed to being transparent about how the platform works:</p>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Our matching algorithm uses your stated preferences — not hidden behavioral data</li>
                                <li>We are a nonprofit initiative — all donations go to infrastructure and platform development</li>
                                <li>This policy will be updated as the platform evolves, and we will notify users of any changes</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gradient-to-r from-teal-50/80 to-white rounded-2xl border border-teal-100 p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                <Mail className="w-5 h-5 text-teal-600" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Questions or Concerns?</h2>
                        <p className="text-gray-600 mb-4">
                            If you have questions about our privacy practices or want to report an issue, reach out anytime.
                        </p>
                        <a
                            href="mailto:hello@chaichathub.com"
                            className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                        >
                            hello@chaichathub.com
                        </a>
                    </section>
                </div>

                <div className="text-center mt-12">
                    <Link href="/about" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
                        &larr; Back to About
                    </Link>
                </div>
            </div>
        </div>
    );
}
