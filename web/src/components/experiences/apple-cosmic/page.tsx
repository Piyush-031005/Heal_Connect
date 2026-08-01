'use client';
import { AppleCosmicNavigation } from './navigation';
import { AppleCosmicHero } from './hero';
import { AppleCosmicFeatures } from './features';
import { AppleCosmicExperts } from './experts';
import { AppleCosmicFooter } from './footer';
import { useEffect } from 'react';
import Lenis from 'lenis';

export function AppleCosmicExperience() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#FBFBFD] min-h-screen text-[#1D1D1F] font-sans selection:bg-black selection:text-white">
      <AppleCosmicNavigation />
      <main>
        <AppleCosmicHero />
        <AppleCosmicFeatures />
        <AppleCosmicExperts />
      </main>
      <AppleCosmicFooter />
    </div>
  );
}
