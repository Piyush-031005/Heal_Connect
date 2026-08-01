'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import { useLayout } from '@/lib/layout-context';
import { useTheme } from 'next-themes';

import MysticWheelHero from '@/components/heros/mystic-wheel-hero';
import CelestialMapHero from '@/components/heros/celestial-map-hero';
import SacredGeometryHero from '@/components/heros/sacred-geometry-hero';
import ModernMinimalHero from '@/components/heros/modern-minimal-hero';
import RubyVelvetHero from '@/components/heros/ruby-velvet-hero';
import ZenMinimalistHero from '@/components/heros/zen-minimalist-hero';
import SunburstRadianceHero from '@/components/heros/sunburst-radiance-hero';
import LotusHarmonyHero from '@/components/heros/lotus-harmony-hero';
import EmeraldAuroraHero from '@/components/heros/emerald-aurora-hero';
import DivineLotusHero from '@/components/heros/divine-lotus-hero';
import { ThemeWheel } from '@/components/theme-wheel';
import { AppleCosmicExperience } from '@/components/experiences/apple-cosmic/page';
import { LuxuryEditorialExperience } from '@/components/experiences/luxury-editorial/page';
import { CosmicObservatoryExperience } from '@/components/experiences/cosmic-observatory/page';
import { LivingUniverseExperience } from '@/components/experiences/living-universe/page';
import { WellnessSanctuaryExperience } from '@/components/experiences/wellness-sanctuary/page';
import { AiFutureExperience } from '@/components/experiences/ai-future/page';
import { DivineLotusMonolithExperience } from '@/components/experiences/divine-lotus-monolith/page';

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

  // NEW EXPERIMENTAL LAYOUTS - Monolithic Architecture
  if (layout === 'cosmic-future' || layout === 'apple-cosmic') return <AppleCosmicExperience />;
  if (layout === 'luxury-editorial') return <LuxuryEditorialExperience />;
  if (layout === 'cosmic-observatory') return <CosmicObservatoryExperience />;
  if (layout === 'living-universe') return <LivingUniverseExperience />;
  if (layout === 'wellness-sanctuary') return <WellnessSanctuaryExperience />;
  if (layout === 'ai-future') return <AiFutureExperience />;
  if (layout === 'divine-lotus-monolith') return <DivineLotusMonolithExperience />;

  // ORIGINAL LAYOUTS (8 Core Themes) - Shared Architecture
  let variant = 'mystic'; // default
  if (layout === 'celestial-map' || layout === 'modern-minimal') variant = 'cinematic-nature';
  if (layout === 'ruby-velvet') variant = 'golden';
  if (layout === 'sacred-geometry') variant = 'cosmic';
  if (layout === 'zen-minimalist') variant = 'split';
  if (layout === 'sunburst-radiance' || layout === 'lotus-harmony' || layout === 'emerald-aurora') variant = 'mystic';
  if (layout === 'divine-lotus') variant = 'divine-lotus';

  return (
    <div className={`min-h-screen ${layout === 'divine-lotus' ? 'bg-[#FDFBF7] text-[#1A0B16]' : 'bg-background text-foreground'} flex flex-col font-sans`}>
      <Navbar />
      <ThemeWheel />

      <main className="flex-1">
        {/* ═══ HERO ENGINE ═══ */}
        {layout === 'mystic-wheel' && <MysticWheelHero />}
        {layout === 'celestial-map' && <CelestialMapHero />}
        {layout === 'sacred-geometry' && <SacredGeometryHero />}
        {layout === 'modern-minimal' && <ModernMinimalHero />}
        {layout === 'ruby-velvet' && <RubyVelvetHero />}
        {layout === 'zen-minimalist' && <ZenMinimalistHero />}
        {layout === 'sunburst-radiance' && <SunburstRadianceHero />}
        {layout === 'lotus-harmony' && <LotusHarmonyHero />}
        {layout === 'emerald-aurora' && <EmeraldAuroraHero />}
        {layout === 'divine-lotus' && <DivineLotusHero />}
        {!['mystic-wheel', 'celestial-map', 'sacred-geometry', 'modern-minimal', 'ruby-velvet', 'zen-minimalist', 'sunburst-radiance', 'lotus-harmony', 'emerald-aurora', 'divine-lotus'].includes(layout) && <MysticWheelHero /> /* Default */}

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
