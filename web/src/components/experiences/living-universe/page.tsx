'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { UniverseHero } from './hero';
import { UniverseAbout } from './about';
import { UniverseZodiac } from './zodiac-wheel';
import { UniverseServices } from './services';
import { UniverseFeatures } from './features';
import { UniverseExperts } from './experts';
import { UniverseHoroscope } from './horoscope';
import { UniverseCompatibility } from './compatibility';
import { UniverseNumerology } from './numerology';
import { UniverseBirthChart } from './birth-chart';
import { UniverseHealing } from './healing';
import { UniverseTestimonials } from './testimonials';
import { UniversePricing } from './pricing';
import { UniverseFooter } from './footer';

export function LivingUniverseExperience() {
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
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <UniverseHero />
      <UniverseAbout />
      <UniverseZodiac />
      <UniverseServices />
      <UniverseFeatures />
      <UniverseExperts />
      <UniverseHoroscope />
      <UniverseCompatibility />
      <UniverseNumerology />
      <UniverseBirthChart />
      <UniverseHealing />
      <UniverseTestimonials />
      <UniversePricing />
      <UniverseFooter />
    </div>
  );
}
