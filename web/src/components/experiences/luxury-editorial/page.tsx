'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LuxuryHero } from './hero';
import { LuxuryDailyCards } from './daily-cards';
import { LuxuryExperts } from './experts';
import { LuxuryNumerology } from './numerology';
import { LuxuryKundli } from './kundli';
import { LuxuryCompatibility } from './compatibility';
import { LuxuryTarot } from './tarot';
import { LuxuryTestimonials } from './testimonials';
import { LuxuryPricing } from './pricing';
import { LuxuryFooter } from './footer';
import { useLayout } from '@/lib/layout-context';

export function LuxuryEditorialExperience() {
  const { setLayout } = useLayout();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#FFF9F2] min-h-screen text-[#2A2A2A] font-serif overflow-x-hidden selection:bg-[#E8A359] selection:text-white">
      {/* Return Button */}
      <button 
        onClick={() => setLayout('mystic-wheel')} 
        className="fixed top-8 left-8 z-[100] text-[#2A2A2A]/50 hover:text-[#2A2A2A] uppercase text-[10px] tracking-[0.3em] font-sans border border-[#2A2A2A]/10 px-6 py-2 rounded-full transition-all hover:bg-[#2A2A2A]/5 backdrop-blur-md mix-blend-multiply"
      >
        Return to Original
      </button>

      <LuxuryHero />
      <LuxuryDailyCards />
      <LuxuryExperts />
      <LuxuryNumerology />
      <LuxuryKundli />
      <LuxuryCompatibility />
      <LuxuryTarot />
      <LuxuryTestimonials />
      <LuxuryPricing />
      <LuxuryFooter />
    </div>
  );
}
