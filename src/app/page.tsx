'use client';

import HeroSection from '@/components/home/HeroSection';
import SocialProofBar from '@/components/home/SocialProofBar';
import MentorPreviewSection from '@/components/home/MentorPreviewSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import SonderSwapTeaser from '@/components/home/SonderSwapTeaser';
import SonderSection from '@/components/home/SonderSection';
import DualCTASection from '@/components/home/DualCTASection';


export default function Home() {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const donateRef = useRef(null);
  const donateInView = useInView(donateRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen">
      <HeroSection />
      <SocialProofBar />
      <MentorPreviewSection />
      <HowItWorksSection />
      <SonderSwapTeaser />
      <SonderSection />
      <DualCTASection />
    </div>
  );
}
