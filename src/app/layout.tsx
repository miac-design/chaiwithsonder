import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
    title: {
        default: "ChaiChat — Community-Driven Mentoring Platform",
        template: "%s | ChaiChat",
    },
    description:
        "Free 15-minute chats with mentors from Big Tech, startups, and academia. Connect with people who understand your journey. No fees, no agenda — just real conversations.",
    keywords: ["mentoring", "mentorship", "community", "accountability", "career growth", "peer learning", "free mentorship", "career advice", "chai chat", "sonder"],
    metadataBase: new URL("https://chaichathub.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "ChaiChat — Where Sonder Becomes Connection",
        description: "Free 15-minute chats with mentors from Big Tech, startups, and academia. No fees, no agenda — just real conversations.",
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
        description: "Free 15-minute chats with mentors from Big Tech, startups, and academia.",
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
    description: "A free, community-driven mentorship platform where every story matters. Free 15-minute chats with mentors from Big Tech, startups, and academia.",
    foundingDate: "2024",
    parentOrganization: {
        "@type": "Organization",
        name: "Austin AI Hub",
        url: "https://austinaihub.com",
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
        description: "Free 15-minute mentorship sessions",
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
            </head>
            <body className="min-h-screen bg-gray-50 text-gray-900">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
