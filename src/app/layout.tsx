import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import SchemaMarkup from '@/components/SchemaMarkup';

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ChaiChat — Free AI-Powered Mentoring Platform",
  description:
    "ChaiChat is a free, AI-powered mentoring platform where anyone can find a mentor or become one. Using Sonder Match technology, we connect people through shared experiences. A 501(c)(3) community initiative by Austin AI Hub in Austin, Texas.",
  keywords: [
    "free mentoring platform",
    "find a mentor",
    "become a mentor",
    "AI mentor matching",
    "ChaiChat",
    "Austin AI Hub",
    "sonder",
    "peer mentorship",
    "career mentoring",
    "community mentoring",
  ],
  openGraph: {
    title: "ChaiChat — Free AI-Powered Mentoring Platform",
    description:
      "Find a mentor who gets your journey. Free mentoring powered by AI matching. A community initiative by Austin AI Hub.",
    url: "https://www.chaichathub.com",
    siteName: "ChaiChat",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.chaichathub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChaiChat — Free AI-Powered Mentoring Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChaiChat — Free AI-Powered Mentoring Platform",
    description:
      "Find a mentor who gets your journey. Free mentoring powered by AI matching.",
    images: ["https://www.chaichathub.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.chaichathub.com",
  },
  other: {
    "ai-content-declaration": "human-created",
  },
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans bg-white min-h-screen">
      <head>
        <SchemaMarkup />
      </head>
      <body className="min-h-screen bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
