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
import { FinalHybridExperts } from '@/components/sections/final-hybrid-experts';
import { FinalHybridTarot } from '@/components/sections/final-hybrid-tarot';
import { FinalHybridWhyYouHere } from '@/components/sections/final-hybrid-why-you-here';
import { FinalHybridSupport } from '@/components/sections/24-hour-support';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { layout } = useLayout();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const isNewDesign1 = layout === 'new-design-1';
  const isFinalHybrid = layout === 'final-hybrid';

  let themeStyles = {};
  let themeClasses = 'bg-background';

  if (isNewDesign1) {
    themeClasses = 'theme-layout-2';
    themeStyles = {
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
    };
  } else if (isFinalHybrid) {
    themeClasses = 'theme-final-hybrid bg-[#150d30]';
    themeStyles = {
      '--background': '#150d30',
      '--foreground': '#F8F7FA',
      '--card': '#25174A',
      '--card-foreground': '#F8F7FA',
      '--primary': '#D4AF37', // Gold
      '--primary-foreground': '#150d30',
      '--secondary': '#3B236D', // Lavender deep
      '--secondary-foreground': '#F8F7FA',
      '--muted': '#25174A',
      '--muted-foreground': '#9E88C7', // Light lavender
      '--accent': '#D4AF37',
      '--accent-foreground': '#150d30',
      '--border': '#3B236D',
      '--input': '#25174A',
      '--ring': '#D4AF37',
      backgroundColor: '#150d30',
      color: '#F8F7FA',
    };
  }

  return (
    <div
      className={`min-h-screen text-foreground flex flex-col font-sans transition-colors duration-500 ${themeClasses}`}
      style={themeStyles as React.CSSProperties}
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
        ) : isFinalHybrid ? (
          <>
            {/* FINAL HYBRID LAYOUT */}
            <FinalHybridExperts />
            <ExploreModalities />
            <FinalHybridTarot />
            
            <YourNextDiscovery />
            <Testimonials />
            <FinalHybridSupport />
            
            <div className="bg-[#150d30] pt-12">
              <FaqSection />
            </div>
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
