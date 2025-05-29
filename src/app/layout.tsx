import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sonder Sessions - Community-Driven Mentoring Platform",
  description: "Empowering growth through community-driven mentoring and accountability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
