'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import { useLayout } from '@/lib/layout-context';

import MysticWheelHero from '@/components/heros/mystic-wheel-hero';
import CelestialMapHero from '@/components/heros/celestial-map-hero';
import SacredGeometryHero from '@/components/heros/sacred-geometry-hero';
import ModernMinimalHero from '@/components/heros/modern-minimal-hero';
import RubyVelvetHero from '@/components/heros/ruby-velvet-hero';
import CosmicFutureHero from '@/components/heros/cosmic-future-hero';
// We will create the others shortly. For now, let's map them.
// import AetherGoldHero from '@/components/heros/aether-gold-hero';
// import CosmicLibraryHero from '@/components/heros/cosmic-library-hero';
// import CelestialGardenHero from '@/components/heros/celestial-garden-hero';

import { TrustLayer } from '@/components/sections/trust-layer';
import { ServiceCards } from '@/components/sections/service-cards';
import { TopAstrologers } from '@/components/sections/top-astrologers';
import { DailyHoroscope } from '@/components/sections/daily-horoscope';
import { BrowseCategories } from '@/components/sections/browse-categories';
import { Testimonials } from '@/components/sections/testimonials';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { layout } = useLayout();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  let variant = 'cosmic'; // default
  
  if (layout === 'modern-minimal') variant = 'split';
  if (layout === 'cosmic-future') variant = 'cosmic-future';
  if (layout === 'aether-gold') variant = 'aether-gold';
  if (layout === 'cosmic-library') variant = 'cosmic-library';
  if (layout === 'celestial-garden') variant = 'celestial-garden';

  return (
    <div className={`min-h-screen ${
      ['cosmic-future', 'aether-gold', 'cosmic-library', 'celestial-garden'].includes(layout) 
        ? 'bg-white text-gray-900' 
        : 'bg-background text-foreground'
    } flex flex-col font-sans`}>
      <Navbar />

      <main className="flex-1">
        {layout === 'cosmic-future' && <CosmicFutureHero />}
        {layout === 'aether-gold' && <CosmicFutureHero /> /* Temporary fallback */}
        {layout === 'cosmic-library' && <CosmicFutureHero /> /* Temporary fallback */}
        {layout === 'celestial-garden' && <CosmicFutureHero /> /* Temporary fallback */}
        {layout === 'modern-minimal' && <ModernMinimalHero />}
        {!['cosmic-future', 'aether-gold', 'cosmic-library', 'celestial-garden', 'modern-minimal'].includes(layout) && <CosmicFutureHero /> /* Default */}

        {/* ═══ FULL PAGE LAYOUT SECTIONS ═══ */}
        <TrustLayer variant={variant} />
        <ServiceCards variant={variant} />
        <DailyHoroscope variant={variant} />
        <BrowseCategories variant={variant} />
        <TopAstrologers variant={variant} />
        <Testimonials variant={variant} />

      </main>

      {/* FOOTER */}
      <footer className={`py-12 ${variant === 'cosmic' ? 'bg-black border-t border-white/10' : variant === 'split' ? 'bg-[#0D0D1A] border-t border-[#D4A843]/20' : 'bg-background border-t border-border'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${variant === 'cosmic' ? 'text-white/40' : variant === 'split' ? 'text-[#8A8A9E] font-serif' : 'text-muted-foreground'}`}>
            &copy; 2026 HealConnect Astrology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
