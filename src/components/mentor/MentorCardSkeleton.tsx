'use client';

export default function MentorCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center animate-pulse">
            <div className="rounded-full w-32 h-32 bg-gray-200" />
            <div className="h-5 bg-gray-200 rounded w-3/4 mt-4" />
            <div className="h-4 bg-gray-100 rounded w-1/2 mt-2" />
            <div className="flex gap-4 mt-4">
                <div className="w-6 h-6 bg-gray-200 rounded" />
                <div className="w-6 h-6 bg-gray-200 rounded" />
            </div>
        </div>
    );
}

export function MentorGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {Array.from({ length: count }).map((_, i) => (
                <MentorCardSkeleton key={i} />
            ))}
        </div>
    );
}
