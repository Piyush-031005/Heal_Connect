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
import { useLayout } from '@/lib/layout-context';
import {
  WhyYouHere,
  ZodiacOrbitRing,
  TarotTable,
  ModalityUniverse,
  ExpertStoriesDeck,
  GlobalGuidanceMap,
  YourNextDiscovery,
} from '@/components/sections/zen-cosmos-sections';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { layout } = useLayout();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const isNewDesign1 = layout === 'new-design-1';

  return (
    <div
      className={`min-h-screen text-foreground flex flex-col font-sans transition-colors duration-500 ${isNewDesign1 ? 'theme-layout-2' : 'bg-background'}`}
      style={isNewDesign1 ? {
        '--background': '#EDF8FC',
        '--foreground': '#12527F',
        '--card': '#FFFFFF',
        '--card-foreground': '#12527F',
        '--primary': '#1A92C6',
        '--primary-foreground': '#FFFFFF',
        '--secondary': '#CDE9F4',
        '--secondary-foreground': '#17619A',
        '--muted': '#EDF8FC',
        '--muted-foreground': '#63BFE4',
        '--accent': '#20A6DC',
        '--accent-foreground': '#FFFFFF',
        '--border': '#CDE9F4',
        '--input': '#CDE9F4',
        '--ring': '#1A92C6',
        backgroundColor: '#EDF8FC',
        color: '#12527F',
      } as React.CSSProperties : {}}
    >
      <Navbar />

      <main className="flex-1">
        {/* 01 - Hero & Modality Wheel */}
        <Hero />

        {isNewDesign1 ? (
          <>
            {/* ZEN LAYOUT — User-designed section order */}
            {/* 01 - Meet Your Guide (expert portrait deck) */}
            <ExpertStoriesDeck />
            {/* 02 - What Brings You Here (life intention stars) */}
            <WhyYouHere />
            {/* 03 - Modality Universe (readable node map) */}
            <ModalityUniverse />
            {/* 04 - Zodiac Ring */}
            <ZodiacOrbitRing />
            {/* 05 - Tarot Reading (premium zodiac-art cards) */}
            <TarotTable />
            {/* 06 - HealConnect Global Distribution Map */}
            <GlobalGuidanceMap />
            {/* 07 - Your Next Discovery (3-path CTA) */}
            <YourNextDiscovery />
            {/* 08 - Pricing */}
            <PricingSection />
            {/* 09 - FAQ */}
            <FaqSection />
          </>
        ) : (
          <>
            {/* PRIMARY LOCKED — Standard Sections */}
            <TrustLayer />
            <FeaturedExperts />
            <AiExpertMatching />
            <ExploreModalities />
            <ZodiacHoroscope />
            <HowItWorks />
            <PricingSection />
            <Testimonials />
            <FaqSection />
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`py-12 border-t ${isNewDesign1 ? 'bg-[#EDF8FC] border-[#CDE9F4]' : 'bg-card border-border'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className={`text-2xl font-heading font-medium mb-4 md:mb-0 ${isNewDesign1 ? 'text-[#12527F]' : 'text-foreground'}`}>
              Heal<span className={`${isNewDesign1 ? 'text-[#1A92C6]' : 'text-primary'} italic`}>Connect.</span>
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
