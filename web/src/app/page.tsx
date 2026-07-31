'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import { useLayout } from '@/lib/layout-context';

import MysticWheelHero from '@/components/heros/mystic-wheel-hero';
import CelestialMapHero from '@/components/heros/celestial-map-hero';
import SacredGeometryHero from '@/components/heros/sacred-geometry-hero';
import ModernMinimalHero from '@/components/heros/modern-minimal-hero';
import RubyVelvetHero from '@/components/heros/ruby-velvet-hero';
import ZenMinimalistHero from '@/components/heros/zen-minimalist-hero';

import { TrustLayer } from '@/components/sections/trust-layer';
import { ServiceCards } from '@/components/sections/service-cards';
import { TopAstrologers } from '@/components/sections/top-astrologers';
import { DailyHoroscope } from '@/components/sections/daily-horoscope';
import { BrowseCategories } from '@/components/sections/browse-categories';
import { Testimonials } from '@/components/sections/testimonials';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { layout } = useLayout();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  // Determine variant string based on layout context
  let variant: 'mystic' | 'golden' | 'cosmic' | 'split' = 'mystic';
  if (layout === 'celestial-map' || layout === 'ruby-velvet') variant = 'golden';
  if (layout === 'sacred-geometry') variant = 'cosmic';
  if (layout === 'modern-minimal' || layout === 'zen-minimalist') variant = 'split';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ═══ HERO ENGINE ═══ */}
        {layout === 'mystic-wheel' && <MysticWheelHero />}
        {layout === 'celestial-map' && <CelestialMapHero />}
        {layout === 'sacred-geometry' && <SacredGeometryHero />}
        {layout === 'modern-minimal' && <ModernMinimalHero />}
        {layout === 'ruby-velvet' && <RubyVelvetHero />}
        {layout === 'zen-minimalist' && <ZenMinimalistHero />}

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
