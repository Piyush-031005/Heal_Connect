'use client';
import { LuxuryNavigation } from './navigation';
import { LuxuryHero } from './hero';
import { LuxuryFeatures } from './features';
import { LuxuryFooter } from './footer';
import { useEffect } from 'react';
import Lenis from 'lenis';

export function LuxuryEditorialExperience() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 2.0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#FFF9F2] min-h-screen text-[#2A231C] font-serif selection:bg-[#D4AF37] selection:text-white">
      <LuxuryNavigation />
      <main>
        <LuxuryHero />
        <LuxuryFeatures />
      </main>
      <LuxuryFooter />
    </div>
  );
}
