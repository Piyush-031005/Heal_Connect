'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLayout } from '@/lib/layout-context';
import { QuantumHero } from './hero';
import { QuantumFeatures } from './features';
import { QuantumDataViz } from './data-viz';
import { QuantumFooter } from './footer';

export function AiFutureExperience() {
  const { setLayout } = useLayout();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#111111] font-sans overflow-x-hidden selection:bg-[#E0E7FF] selection:text-[#3730A3]">
      <button 
        onClick={() => setLayout('mystic-wheel')} 
        className="fixed top-8 left-8 z-[100] text-[#111111]/50 hover:text-[#111111] text-[10px] tracking-[0.3em] uppercase font-bold border border-[#111111]/10 px-6 py-2 rounded-full transition-all hover:bg-white backdrop-blur-md"
      >
        Return to Original
      </button>

      <QuantumHero />
      <QuantumFeatures />
      <QuantumDataViz />
      <QuantumFooter />
    </div>
  );
}
