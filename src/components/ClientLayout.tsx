'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 