import type { Metadata } from "next";
import { Space_Grotesk, Inter, Merriweather } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chai Chat - Community-Driven Mentoring Platform",
  description: "Empowering growth through story-sharing and mutual support — one cup at a time.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${merriweather.variable} font-sans`}>
      <body className="min-h-screen bg-cosmic-deep text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
