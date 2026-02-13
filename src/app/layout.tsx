import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
    title: {
        default: "ChaiChat — Community-Driven Mentoring Platform",
        template: "%s | ChaiChat",
    },
    description:
        "Free 30-minute chats with mentors from Big Tech, startups, and academia. Connect with people who understand your journey. No fees, no agenda — just real conversations.",
    keywords: ["mentoring", "mentorship", "community", "accountability", "career growth", "peer learning", "free mentorship", "career advice", "chai chat", "sonder"],
    metadataBase: new URL("https://chaichathub.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "ChaiChat — Where Sonder Becomes Connection",
        description: "Free 30-minute chats with mentors from Big Tech, startups, and academia. No fees, no agenda — just real conversations.",
        url: "https://chaichathub.com",
        siteName: "ChaiChat",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/new-hero.jpg",
                width: 1200,
                height: 630,
                alt: "ChaiChat — Community-Driven Mentoring Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ChaiChat — Community-Driven Mentoring Platform",
        description: "Free 30-minute chats with mentors from Big Tech, startups, and academia.",
        images: ["/new-hero.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.png", type: "image/png", sizes: "96x96" },
        ],
        shortcut: "/favicon.ico",
        apple: [
            { url: "/favicon.png", sizes: "180x180", type: "image/png" },
        ],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ChaiChat",
    alternateName: "ChaiChatHub",
    url: "https://chaichathub.com",
    logo: "https://chaichathub.com/logo-new.png",
    description: "A free, community-driven mentorship platform where every story matters. Free 30-minute chats with mentors from Big Tech, startups, and academia.",
    foundingDate: "2024",
    parentOrganization: {
        "@type": "Organization",
        name: "Austin AI Hub",
        url: "https://austinhub.com",
    },
    sameAs: [
        "https://linkedin.com/company/austinaihub",
        "https://instagram.com/austinaihub",
    ],
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://chaichathub.com/contact",
    },
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free 30-minute mentorship sessions",
    },
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ChaiChat",
    url: "https://chaichathub.com",
    description: "A free, community-driven mentorship platform where every story matters.",
    potentialAction: {
        "@type": "SearchAction",
        target: "https://chaichathub.com/mentor?search={search_term_string}",
        "query-input": "required name=search_term_string",
    },
};

// FAQ structured data for Google rich results — covers both mentee and mentor FAQs
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        // Mentee FAQs
        {
            "@type": "Question",
            name: "How do I find the right mentor on ChaiChat?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Browse our mentor directory and filter by expertise, industry, and availability. Each mentor profile shows their background, specialties, and open time slots so you can find someone who aligns with your goals.",
            },
        },
        {
            "@type": "Question",
            name: "Is ChaiChat completely free for mentees?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — 100% free. ChaiChat is a community-driven initiative. There are no fees, subscriptions, or hidden costs. We believe mentorship should be accessible to everyone.",
            },
        },
        {
            "@type": "Question",
            name: "Can I book sessions with multiple mentors?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. We encourage you to connect with different mentors for different needs — career advice, technical skills, interview prep, or personal growth. There are no limits.",
            },
        },
        {
            "@type": "Question",
            name: "What happens during a 30-minute chai session?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Think of it as a focused, friendly conversation over a virtual cup of chai. You can ask questions, get advice, discuss challenges, or just listen to someone who has walked a similar path. No pressure, no agenda — just real human connection.",
            },
        },
        {
            "@type": "Question",
            name: "I'm new to the US and feel lost. Can ChaiChat help me?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "That's exactly why ChaiChat was built. Our founder came to the US as a PhD student with no network. Many of our mentors are immigrants, career changers, and first-generation professionals who understand what it's like to start from scratch.",
            },
        },
        {
            "@type": "Question",
            name: "Can I switch mentors if it's not the right fit?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Of course. Finding the right mentor is a journey. You're welcome to explore different mentors until you find the connection that feels right.",
            },
        },
        // Mentor FAQs
        {
            "@type": "Question",
            name: "How do I become a mentor on ChaiChat?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Click \"Become a Mentor,\" complete your profile with your expertise and availability, and submit. Our team reviews applications within 48 hours. No teaching credentials required — just a willingness to share your experience.",
            },
        },
        {
            "@type": "Question",
            name: "How much time do I need to commit as a mentor?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "There's no fixed time commitment. You set your own availability — whether that's one 30-minute session per week or several per month. Mentor on your schedule.",
            },
        },
        {
            "@type": "Question",
            name: "Can I choose who I mentor?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. You have full control over which mentee requests you accept. You can review each mentee's background and goals before committing to a session.",
            },
        },
        {
            "@type": "Question",
            name: "What are mentor badges and how do I earn them?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Badges recognize your impact — earned through completed sessions, mentee feedback, and community engagement. They appear on your profile and show mentees your level of experience on the platform.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need professional mentoring experience?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Not at all. If you've navigated a career transition, job search, immigration journey, or industry change — your lived experience is valuable. The best mentors are people who remember what it was like to need help.",
            },
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="font-sans"
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            </head>
            <body className="min-h-screen bg-gray-50 text-gray-900">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
