'use client';

import DashboardLayout from '@/components/DashboardLayout';
import MentorStats from '@/components/MentorStats';

// Mock user
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};

export default function AnalyticsPage() {
    return (
        <DashboardLayout user={mockUser}>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-600 mt-1">Track your mentoring impact and growth</p>
                </div>

                {/* Stats Component */}
                <MentorStats />

                {/* Additional Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Topics */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Popular Session Topics</h3>
                        <div className="space-y-3">
                            {[
                                { topic: 'Career Transition', count: 12, percentage: 40 },
                                { topic: 'Interview Prep', count: 9, percentage: 30 },
                                { topic: 'Leadership', count: 6, percentage: 20 },
                                { topic: 'Work-Life Balance', count: 3, percentage: 10 },
                            ].map((item) => (
                                <div key={item.topic} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">{item.topic}</span>
                                            <span className="text-sm text-gray-500">{item.count} sessions</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-teal-500 rounded-full"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Feedback */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Recent Feedback</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    name: 'Sarah C.',
                                    rating: 5,
                                    text: 'Incredibly helpful session. Got exactly the advice I needed!',
                                    date: '2 days ago',
                                },
                                {
                                    name: 'James W.',
                                    rating: 5,
                                    text: 'Great mentor, very patient and knowledgeable.',
                                    date: '5 days ago',
                                },
                                {
                                    name: 'Maria G.',
                                    rating: 4,
                                    text: 'Good practical tips for my career transition.',
                                    date: '1 week ago',
                                },
                            ].map((feedback, i) => (
                                <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900">{feedback.name}</span>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: feedback.rating }).map((_, j) => (
                                                <svg
                                                    key={j}
                                                    className="w-4 h-4 text-amber-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">&quot;{feedback.text}&quot;</p>
                                    <p className="text-xs text-gray-400 mt-1">{feedback.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Milestones */}
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
                    <h3 className="font-semibold text-lg mb-4">🏆 Milestones</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'First Session', achieved: true, icon: '🎉' },
                            { label: '10 Sessions', achieved: true, icon: '📅' },
                            { label: '25 Sessions', achieved: true, icon: '🌟' },
                            { label: '50 Sessions', achieved: false, icon: '🚀', progress: 94 },
                        ].map((milestone) => (
                            <div
                                key={milestone.label}
                                className={`bg-white/10 rounded-xl p-4 text-center ${milestone.achieved ? '' : 'opacity-75'
                                    }`}
                            >
                                <div className="text-2xl mb-2">{milestone.icon}</div>
                                <p className="text-sm font-medium">{milestone.label}</p>
                                {milestone.achieved ? (
                                    <p className="text-xs text-teal-200 mt-1">✓ Achieved</p>
                                ) : (
                                    <p className="text-xs text-teal-200 mt-1">{milestone.progress}% there</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
