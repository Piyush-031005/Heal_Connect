'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LotusHero } from './hero';
import { LotusFeatures } from './features';
import { LotusTarot } from './tarot';
import { LotusExperts } from './experts';
import { LotusFooter } from './footer';
import { useLayout } from '@/lib/layout-context';

export function DivineLotusMonolithExperience() {
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
    <div className="bg-[#FDFBF7] min-h-screen text-[#4A3B32] font-serif overflow-x-hidden selection:bg-[#B88B5E]/30 selection:text-[#4A3B32]">
      {/* Return Button */}
      <button 
        onClick={() => setLayout('mystic-wheel')} 
        className="fixed top-8 left-8 z-[100] text-[#4A3B32]/50 hover:text-[#4A3B32] uppercase text-[10px] tracking-[0.3em] font-sans border border-[#4A3B32]/10 px-6 py-2 rounded-full transition-all hover:bg-[#4A3B32]/5 backdrop-blur-md"
      >
        Return to Original
      </button>

      <LotusHero />
      <LotusFeatures />
      <LotusTarot />
      <LotusExperts />
      <LotusFooter />
    </div>
  );
}
