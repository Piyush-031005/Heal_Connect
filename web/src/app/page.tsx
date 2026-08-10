'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/heros/hero';
import ExploreModalities from '@/components/sections/explore-modalities';
import { HowItWorks } from '@/components/sections/how-it-works';
import { AiExpertMatching } from '@/components/sections/ai-expert-matching';
import { FeaturedExperts } from '@/components/sections/featured-experts';
import { TrustLayer } from '@/components/sections/trust-layer';
import { Testimonials } from '@/components/sections/testimonials';
import ZodiacHoroscope from '@/components/sections/zodiac-horoscope';
import PricingSection from '@/components/sections/pricing';
import FaqSection from '@/components/sections/faq';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-500">
      <Navbar />

      <main className="flex-1">
        {/* 01 - Hero & Modality Wheel */}
        <Hero />

        {/* 02 - Global Trust & Scale */}
        <TrustLayer />

        {/* 03 - Featured Experts Showcase */}
        <FeaturedExperts />

        {/* 04 - AI Expert Matching Feature */}
        <AiExpertMatching />

        {/* 05 - Explore All Modalities */}
        <ExploreModalities />

        {/* 06 - Zodiac Horoscope */}
        <ZodiacHoroscope />

        {/* 07 - How HealConnect Works */}
        <HowItWorks />

        {/* 08 - Pricing */}
        <PricingSection />

        {/* 09 - Testimonials / Global Community */}
        <Testimonials />

        {/* 10 - FAQ Section */}
        <FaqSection />
      </main>

      {/* 08 - FOOTER */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-2xl font-heading font-medium text-foreground mb-4 md:mb-0">
              Heal<span className="text-primary italic">Connect.</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground font-medium">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm border-t border-border pt-8">
            &copy; {new Date().getFullYear()} HealConnect Wellness. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
