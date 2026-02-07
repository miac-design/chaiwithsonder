import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
});

const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-merriweather",
});

export const metadata: Metadata = {
    title: "ChaiChat — Community-Driven Mentoring Platform",
    description:
        "Connect with mentors who understand your journey. A learning and mentorship community where every story matters.",
    keywords: ["mentoring", "mentorship", "community", "accountability", "career growth", "peer learning"],
    openGraph: {
        title: "ChaiChat — Where Sonder Becomes Connection",
        description: "A learning and mentorship community where every story matters.",
        url: "https://chaichathub.com",
        siteName: "ChaiChat",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ChaiChat — Community-Driven Mentoring Platform",
        description: "Connect with mentors who understand your journey.",
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${merriweather.variable} font-sans`}
        >
            <body className="min-h-screen bg-gray-50 text-gray-900">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
