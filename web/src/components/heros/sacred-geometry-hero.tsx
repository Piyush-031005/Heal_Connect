'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// ── Layout 3: "Cosmic Aura" ───────────────────────────────────────────────
// Highly vibrant, modern, and beautiful aura gradient layout.
// Minimalist structure, maximum visual impact, positive energy.

export default function CosmicAuraHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-[#0C0F1A]">
      
      {/* Dynamic Aura Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1000px] max-h-[1000px] rounded-full opacity-60 mix-blend-screen blur-[100px] animate-[pulse_10s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(236,72,153,0.4) 40%, transparent 70%)' }} />
        
        {/* Orbiting accents */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-50 mix-blend-screen blur-[80px] animate-[spin_20s_linear_infinite]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)', transformOrigin: '200% 200%' }} />
          
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-40 mix-blend-screen blur-[90px] animate-[spin_25s_linear_infinite_reverse]"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)', transformOrigin: '-100% -100%' }} />
      </div>

      {/* Scattered Starfield Overlay */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={Math.random() * 0.15 + 0.05} fill="#FFF" 
              style={{ animation: `pulse ${Math.random() * 3 + 2}s infinite ${Math.random() * 5}s` }} />
          ))}
        </svg>
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="mb-8 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" /> 24/7 Astrologer Availability
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-sans font-extrabold tracking-tight leading-[1.05] text-white mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 drop-shadow-2xl">
          Align With Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-indigo-200">
            True Purpose
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          Unlock the wisdom of the universe with precision astrology readings, detailed numerology, and profound spiritual guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
          <Link href="/practitioners" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-2xl px-10 h-14 text-base font-bold text-[#0C0F1A] border-0 transition-transform hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
              style={{ background: 'linear-gradient(135deg, #FDE68A, #F59E0B)' }}>
              Start Your Reading <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </Link>
          <Link href="#experts" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full rounded-2xl px-10 h-14 text-base text-white border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all font-medium">
              Meet the Experts
            </Button>
          </Link>
        </div>

        {/* Minimalist 3D-ish Zodiac Icons row */}
        <div className="mt-16 w-full max-w-3xl flex justify-between animate-in fade-in duration-1000 delay-700">
          {['♈', '♋', '♎', '♑'].map((sign, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-2xl text-white/50 group-hover:text-white group-hover:bg-white/10 group-hover:border-white/30 transition-all group-hover:-translate-y-2 shadow-lg">
                {sign}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
