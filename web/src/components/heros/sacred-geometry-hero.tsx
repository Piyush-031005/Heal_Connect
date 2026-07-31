'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CosmicAuraHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Create 12 cards for a full circle
  const orbitCards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    angle: (i * 360) / 12,
  }));

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-[#05050A]">
      
      {/* Immersive Orbital Zodiac Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-auto z-0 perspective-1000">
        <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] -ml-[40vw] -mt-[40vw] sm:-ml-[600px] sm:-mt-[600px] animate-[spin_120s_linear_infinite]">
          {orbitCards.map((card) => {
            // Calculate fixed position on the circle boundary
            const rad = (card.angle * Math.PI) / 180;
            const radius = 50; // percentage
            const top = 50 + Math.sin(rad) * radius;
            const left = 50 + Math.cos(rad) * radius;
            
            return (
              <div
                key={card.id}
                className="absolute w-32 h-48 sm:w-48 sm:h-64 -ml-16 -mt-24 sm:-ml-24 sm:-mt-32 group"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                }}
              >
                {/* Counter-spin so cards remain upright */}
                <div className="w-full h-full animate-[spin_120s_linear_infinite_reverse] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:scale-125 hover:z-50 hover:shadow-[0_0_80px_rgba(236,72,153,0.8)] cursor-crosshair">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={`/zodiacs/zodiac_${card.id}.jpg`} alt="Zodiac" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-[1.5s]" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Core glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-50 mix-blend-screen blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(236,72,153,0.3) 40%, transparent 70%)' }} />
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center pointer-events-none">
        <div className="pointer-events-auto mb-8 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" /> The Cosmos Await
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-sans font-extrabold tracking-tight leading-[1.0] text-white mb-6 max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          True <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-indigo-200">
            Purpose
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 drop-shadow-md bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
          Unlock the wisdom of the universe with precision astrology readings, detailed numerology, and profound spiritual guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 pointer-events-auto">
          <Link href="/practitioners" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-2xl px-12 h-16 text-lg font-bold text-[#0C0F1A] border-0 transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]"
              style={{ background: 'linear-gradient(135deg, #FDE68A, #F59E0B)' }}>
              Start Your Reading <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(-1deg); }
        }
      `}} />
    </section>
  );
}
