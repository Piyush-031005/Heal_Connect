'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/heros/hero';
import Footer from '@/components/footer';
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

  const isFinalHybrid = layout === 'final-hybrid' || layout.startsWith('layout-');



  return (
    <div className={`min-h-screen text-foreground flex flex-col font-sans transition-colors duration-500 ${layout.startsWith('layout-') ? 'bg-transparent' : 'bg-background'}`}>
      {layout.startsWith('layout-') && (
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(160deg,#D5B6DC_0%,#E5D9F2_30%,#B79AE6_70%,#8982D0_100%)] opacity-80" />
      )}
      <Navbar />

      <main className="flex-1">
        {/* 01 - Hero & Modality Wheel */}
        <Hero />

        {false ? (
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
            {/* 06 - Zenauraa Global Distribution Map */}
            <GlobalGuidanceMap />
            {/* 07 - Your Next Discovery (3-path CTA) */}
            <YourNextDiscovery />
            {/* 08 - Pricing */}
            <PricingSection />
            {/* 09 - FAQ */}
            <FaqSection />
          </>
        ) : isFinalHybrid ? (
          <div>
            {/* FINAL HYBRID LAYOUT */}
            <FinalHybridExperts />
            <ExploreModalities />
            <FinalHybridTarot />
            <YourNextDiscovery />
            <Testimonials />
            <FinalHybridSupport />
            
            <div className={layout === 'new-layout-1' ? "pt-12" : "bg-background pt-12"}>
              <FaqSection />
            </div>
          </div>
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

      <Footer />
    </div>
  );
}
