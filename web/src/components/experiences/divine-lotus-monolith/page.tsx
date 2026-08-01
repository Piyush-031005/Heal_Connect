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
    <div className="bg-[#FAF8F5] min-h-screen text-[#2D3A3A] font-serif overflow-x-hidden selection:bg-[#E3A8B1] selection:text-white">
      {/* Return Button */}
      <button 
        onClick={() => setLayout('mystic-wheel')} 
        className="fixed top-8 left-8 z-[100] text-[#2D3A3A]/50 hover:text-[#2D3A3A] uppercase text-[10px] tracking-[0.3em] font-sans border border-[#2D3A3A]/10 px-6 py-2 rounded-full transition-all hover:bg-[#2D3A3A]/5 backdrop-blur-md"
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
