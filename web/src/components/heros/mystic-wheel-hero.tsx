'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

// ── Layout 1: "Ethereal Zodiac" ───────────────────────────────────────────
// A highly premium, light-themed, ethereal layout with positive energy.
// Inspired by high-end luxury wellness brands.

export default function EtherealZodiacHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32 min-h-[95vh] flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(180deg, #FFFAF0 0%, #FDF4E3 50%, #F8E8C7 100%)' 
      }}>

      {/* Large Glowing Aura Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(circle, #FDE68A 0%, #FBCFE8 50%, transparent 80%)' }} />

      {/* Intricate Mandala / Astrolabe SVG */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] min-w-[800px] max-w-[1400px] opacity-[0.04] pointer-events-none animate-[spin_120s_linear_infinite]" viewBox="0 0 1000 1000">
        <circle cx="500" cy="500" r="480" fill="none" stroke="#8B6914" strokeWidth="2" />
        <circle cx="500" cy="500" r="400" fill="none" stroke="#8B6914" strokeWidth="1" />
        <circle cx="500" cy="500" r="320" fill="none" stroke="#8B6914" strokeWidth="0.5" strokeDasharray="5,5" />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          return (
            <line key={i} x1={500 + 320 * Math.cos(angle)} y1={500 + 320 * Math.sin(angle)} 
                  x2={500 + 480 * Math.cos(angle)} y2={500 + 480 * Math.sin(angle)} 
                  stroke="#8B6914" strokeWidth="0.5" />
          );
        })}
      </svg>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-white/50 backdrop-blur-md text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-3.5 h-3.5" /> Awaken Your Destiny
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[1.05] text-[#1A150C] mb-8 animate-in slide-in-from-bottom-8 duration-700 delay-150">
          Unveil the Secrets of <br />
          <span className="italic font-light bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">the Cosmos</span>
        </h1>

        <p className="text-lg md:text-xl text-[#5A4A2E] mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-300">
          Experience profound clarity and direction with India's most verified spiritual guides. 
          Your journey to inner peace begins here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom-8 duration-700 delay-500">
          <Link href="/practitioners">
            <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all border-0"
              style={{ background: 'linear-gradient(135deg, #E69538, #F5B942)' }}>
              Consult an Expert <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </Link>
          <Link href="#horoscope">
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-base border-amber-200 text-amber-800 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all font-medium">
              Daily Horoscope
            </Button>
          </Link>
        </div>

        {/* Premium Zodiac Strip */}
        <div className="mt-20 pt-10 border-t border-amber-900/10 animate-in fade-in duration-1000 delay-700">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-700/60 font-bold mb-6">Explore Your Sign</p>
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {['♈', '♉', '♊', '♋', '♌', '♍', '♎'].map((symbol, i) => (
              <div key={i} className="w-12 h-12 rounded-full border border-amber-200 bg-white shadow-sm flex items-center justify-center text-xl text-amber-600 hover:scale-110 hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer">
                {symbol}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
