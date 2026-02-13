import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Find a Mentor",
    description: "Browse 13+ mentors from Big Tech, startups, and academia. Book a free 30-minute chai chat — career advice, visa guidance, resume tips, or just connect.",
    openGraph: {
        title: "Find a Mentor — ChaiChat",
        description: "Free 30-minute chats with mentors who've been there. Career advice, visa guidance, resume tips, or just connect.",
    },
};

export default function MentorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
