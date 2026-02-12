'use client';

interface MentorSearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function MentorSearchBar({ search, onSearchChange }: MentorSearchBarProps) {
    return (
        <div className="relative max-w-2xl mx-auto mb-8">
            <span className="absolute left-4 top-1/2 transform -translate-y-1 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </span>
            <input
                type="text"
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-full px-5 py-3 pl-12 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400"
                placeholder="Search by name, expertise, or role…"
                aria-label="Search mentors by name, expertise, or role"
            />
        </div>
    );
}
