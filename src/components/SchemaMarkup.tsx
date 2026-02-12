/**
 * ChaiChat AI Visibility Schema Markup
 * Maximizes discoverability in AI-powered search: Google AI Overviews,
 * Bing Copilot, Perplexity, ChatGPT Browse, Claude web search, Gemini.
 * Last Updated: February 2026
 */

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.chaichathub.com/#organization",
    name: "ChaiChat",
    alternateName: ["Chai Chat", "ChaiChat Hub", "ChaiChat Mentoring"],
    url: "https://www.chaichathub.com",
    logo: {
        "@type": "ImageObject",
        url: "https://www.chaichathub.com/logo.png",
        width: 512,
        height: 512,
    },
    description:
        "ChaiChat is a free, community-driven mentoring platform where anyone can be a mentor or mentee. Using AI-powered Sonder Match technology, ChaiChat connects people based on shared experiences, not just keywords. A community initiative by Austin AI Hub, a 501(c)(3) nonprofit growing Austin's AI ecosystem.",
    slogan: "Where Sonder Becomes Connection",
    foundingDate: "2025",
    foundingLocation: {
        "@type": "Place",
        name: "Austin, Texas",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Austin",
            addressRegion: "TX",
            addressCountry: "US",
        },
    },
    parentOrganization: {
        "@type": "Organization",
        "@id": "https://austinaihub.com/#organization",
        name: "Austin AI Hub",
        url: "https://austinaihub.com",
        description:
            "A 501(c)(3) nonprofit with 500+ members focused on growing Austin's AI ecosystem.",
        nonprofitStatus: "Nonprofit501c3",
    },
    nonprofitStatus: "Nonprofit501c3",
    areaServed: [
        {
            "@type": "City",
            name: "Austin",
            containedInPlace: { "@type": "State", name: "Texas" },
        },
        { "@type": "Country", name: "United States" },
        "Worldwide",
    ],
    sameAs: [],
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://www.chaichathub.com/contact",
        availableLanguage: "English",
    },
    keywords: [
        "free mentoring platform",
        "AI-powered mentor matching",
        "community mentorship",
        "peer mentoring",
        "find a mentor",
        "become a mentor",
        "Austin AI community",
        "sonder",
        "mentoring for career transitions",
        "accessible mentorship",
    ],
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.chaichathub.com/#website",
    name: "ChaiChat",
    alternateName: "ChaiChat — Where Sonder Becomes Connection",
    url: "https://www.chaichathub.com",
    description:
        "A free mentoring platform powered by AI matching. Find a mentor, become a mentor, or grow together through meaningful human connection.",
    publisher: { "@id": "https://www.chaichathub.com/#organization" },
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate:
                "https://www.chaichathub.com/mentor?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
};

const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.chaichathub.com/#app",
    name: "ChaiChat",
    url: "https://www.chaichathub.com",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Mentoring Platform",
    operatingSystem: "Web Browser",
    browserRequirements:
        "Requires JavaScript. Works on all modern browsers.",
    description:
        "Free AI-powered mentoring platform that matches mentors and mentees based on shared life experiences using Sonder Match technology.",
    featureList: [
        "AI-powered mentor matching (Sonder Match)",
        "Live mentor availability and instant chat",
        "Mentor profile browsing and filtering",
        "Session booking and scheduling",
        "Community-driven peer mentorship",
        "Free to use — no subscription required",
    ],
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
            "ChaiChat is completely free for both mentors and mentees.",
        availability: "https://schema.org/InStock",
    },
    creator: { "@id": "https://www.chaichathub.com/#organization" },
    screenshot: "https://www.chaichathub.com/og-image.png",
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.chaichathub.com/#mentoring-service",
    name: "ChaiChat Mentoring",
    serviceType: "Mentoring and Peer Support",
    description:
        "Free one-on-one mentoring sessions connecting people through AI-powered matching based on shared experiences. Available for career guidance, life transitions, tech mentoring, personal growth, and more.",
    provider: { "@id": "https://www.chaichathub.com/#organization" },
    areaServed: "Worldwide",
    audience: {
        "@type": "Audience",
        audienceType:
            "Anyone seeking mentorship or wanting to mentor others",
        geographicArea: {
            "@type": "AdministrativeArea",
            name: "Worldwide",
        },
    },
    availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.chaichathub.com/mentor",
        servicePlatform: "Web",
    },
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Always free. No hidden costs.",
        availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mentoring Categories",
        itemListElement: [
            {
                "@type": "OfferCatalog",
                name: "Career & Professional",
                itemListElement: [
                    "Career Transitions",
                    "Tech & AI Mentoring",
                    "Leadership Development",
                    "Entrepreneurship",
                    "Job Search Strategy",
                ],
            },
            {
                "@type": "OfferCatalog",
                name: "Personal Growth",
                itemListElement: [
                    "Life Coaching",
                    "Work-Life Balance",
                    "Communication Skills",
                    "Confidence Building",
                ],
            },
            {
                "@type": "OfferCatalog",
                name: "Community & Impact",
                itemListElement: [
                    "Nonprofit Leadership",
                    "Community Building",
                    "AI for Social Good",
                    "Diversity & Inclusion",
                ],
            },
        ],
    },
    termsOfService: "https://www.chaichathub.com/about#ethics",
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.chaichathub.com/#faq",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is ChaiChat?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "ChaiChat is a free, community-driven mentoring platform where anyone can be a mentor or mentee. Built on the concept of 'sonder' — the realization that every person has a rich inner life — ChaiChat uses AI-powered Sonder Match technology to connect people based on shared experiences, not just keywords. It's a community initiative by Austin AI Hub, a 501(c)(3) nonprofit.",
            },
        },
        {
            "@type": "Question",
            name: "Is ChaiChat free?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, ChaiChat is 100% free for both mentors and mentees. There are no hidden fees, subscriptions, or premium tiers. ChaiChat is a nonprofit community initiative supported by Austin AI Hub and community contributions.",
            },
        },
        {
            "@type": "Question",
            name: "How does ChaiChat match mentors and mentees?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "ChaiChat uses Sonder Match, an AI-powered matching system that connects mentors and mentees based on shared life experiences, interests, and goals — not just keywords or job titles. You create a profile sharing your story, and the AI finds people who truly understand your journey.",
            },
        },
        {
            "@type": "Question",
            name: "How do I find a mentor on ChaiChat?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Visit chaichathub.com, create a free profile in under 2 minutes, and either browse available mentors or let Sonder Match AI recommend mentors based on your experiences and goals. You can also connect instantly with mentors who are live and available for a conversation right now.",
            },
        },
        {
            "@type": "Question",
            name: "How do I become a mentor on ChaiChat?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Anyone can become a mentor on ChaiChat. Visit chaichathub.com/mentor/become, fill out a brief application sharing your experience and what you'd like to offer, and start connecting with mentees. No formal credentials required — just a willingness to listen, share, and support.",
            },
        },
        {
            "@type": "Question",
            name: "What is sonder?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Sonder is a word coined by writer John Koenig in The Dictionary of Obscure Sorrows. It means the realization that every person you encounter — even strangers — has a life as vivid and complex as your own, full of thoughts, memories, and experiences. ChaiChat is built on this philosophy, believing that mutual understanding is the foundation of meaningful mentorship.",
            },
        },
        {
            "@type": "Question",
            name: "What is Austin AI Hub?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Austin AI Hub is a 501(c)(3) nonprofit organization with 500+ members, focused on growing Austin's AI ecosystem through community events, education, and initiatives like ChaiChat. It serves as the parent organization behind ChaiChat's mentoring platform.",
            },
        },
        {
            "@type": "Question",
            name: "What topics can I get mentoring on through ChaiChat?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "ChaiChat mentors cover a wide range of topics including career transitions, AI and technology, leadership, entrepreneurship, personal growth, work-life balance, community building, nonprofit leadership, and more. The platform is designed for holistic mentoring based on shared human experiences.",
            },
        },
        {
            "@type": "Question",
            name: "Is ChaiChat only for people in Austin, Texas?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No. While ChaiChat was founded in Austin, Texas as an initiative of Austin AI Hub, the platform is available to anyone worldwide. Mentoring sessions happen online, so geography is not a barrier to connection.",
            },
        },
        {
            "@type": "Question",
            name: "What is Sonder Match?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Sonder Match is ChaiChat's AI-powered mentor matching system. Unlike traditional matching that relies on keyword filters or job titles, Sonder Match analyzes shared experiences, values, and personal journeys to create deeper, more meaningful mentor-mentee connections.",
            },
        },
    ],
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://www.chaichathub.com/#howto-find-mentor",
    name: "How to Find a Free Mentor on ChaiChat",
    description:
        "A step-by-step guide to finding a mentor on ChaiChat, a free AI-powered mentoring platform.",
    totalTime: "PT5M",
    tool: { "@type": "HowToTool", name: "Web browser" },
    step: [
        {
            "@type": "HowToStep",
            position: 1,
            name: "Create Your Free Profile",
            text: "Visit chaichathub.com and click 'Join Free'. Share your experiences, interests, and what you're looking for in a mentor. It takes less than 2 minutes.",
            url: "https://www.chaichathub.com/start-here",
        },
        {
            "@type": "HowToStep",
            position: 2,
            name: "Get Matched by Sonder Match AI",
            text: "ChaiChat's AI-powered Sonder Match technology analyzes your profile and recommends mentors based on shared life experiences — not just keywords or job titles.",
            url: "https://www.chaichathub.com/mentor",
        },
        {
            "@type": "HowToStep",
            position: 3,
            name: "Start a Conversation",
            text: "Browse recommended mentors, check who's available live, and book a session or jump into an instant chat. Listen, share, and grow at your own pace.",
            url: "https://www.chaichathub.com/mentor",
        },
    ],
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.chaichathub.com",
        },
    ],
};

const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.chaichathub.com/#webpage",
    name: "ChaiChat — Free AI-Powered Mentoring Platform",
    description:
        "Find a mentor who gets your journey. ChaiChat is a free mentoring community powered by AI matching, built on the philosophy of sonder. A community initiative by Austin AI Hub.",
    url: "https://www.chaichathub.com",
    isPartOf: { "@id": "https://www.chaichathub.com/#website" },
    about: { "@id": "https://www.chaichathub.com/#organization" },
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".hero-description", ".how-it-works"],
    },
    primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.chaichathub.com/og-image.png",
    },
};

/** All JSON-LD schemas for the site-wide <head> */
export const schemas = [
    organizationSchema,
    websiteSchema,
    webAppSchema,
    serviceSchema,
    faqSchema,
    howToSchema,
    breadcrumbSchema,
    webpageSchema,
];

/** Renders all schema script tags */
export default function SchemaMarkup() {
    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
