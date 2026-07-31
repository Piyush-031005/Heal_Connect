'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SacredGeometryHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    angle: (i * 360) / 12,
  }));

  return (
    <section className="relative overflow-hidden min-h-[100vh] flex items-center justify-center bg-[#FDFBF7] perspective-[2500px]">
      
      {/* Background Blends - Cream/Polar White mixed with soft Red */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle,rgba(220,38,38,0.08)_0%,transparent_60%)] rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,transparent_70%)] opacity-80" />
      </div>

      {/* Spectacular 3D Cylindrical Carousel */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-auto">
        <div className="relative w-full h-full transform-style-3d animate-[spinCarousel_45s_linear_infinite] mt-20">
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 w-48 h-72 sm:w-64 sm:h-96 -ml-24 -mt-36 sm:-ml-32 sm:-mt-48 rounded-2xl overflow-hidden cursor-crosshair group transition-all duration-700"
                style={{
                  transform: `rotateY(${card.angle}deg) translateZ(35vw) sm:translateZ(600px)`,
                  // Ensure proper 3D rendering
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Glass effect container for the red transparent cards */}
                <div className="w-full h-full bg-white/10 backdrop-blur-[2px] border-2 border-red-900/10 rounded-2xl p-2 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/40 group-hover:shadow-[0_0_50px_rgba(220,38,38,0.3)] group-hover:border-red-600/30">
                  <img 
                    src={`/zodiacs/red/red_${card.id}.png`} 
                    alt="Zodiac" 
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all duration-500" 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center pointer-events-none">
        
        <div className="pointer-events-auto mb-8 p-1 rounded-full bg-white/40 border border-red-900/10 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="px-5 py-2 rounded-full bg-white/60 text-red-900 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-600" /> Supreme Cosmic Mastery
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-black tracking-tight leading-[0.95] text-[#1A0B0F] mb-6 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-2xl">
          Astrology <br />
          <span className="relative inline-block">
            <span className="absolute -inset-2 bg-red-600/10 blur-xl rounded-full" />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-900 italic font-light">Elevated.</span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-[#4A3B3F] mb-12 max-w-2xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 bg-white/50 p-6 rounded-3xl backdrop-blur-md border border-red-900/10 shadow-xl">
          Experience the pinnacle of spiritual guidance. An architectural marvel of ancient wisdom mixed with ultra-modern precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 pointer-events-auto">
          <Link href="/practitioners" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-2xl px-12 h-16 text-lg font-bold text-white bg-red-700 hover:bg-red-800 transition-all hover:scale-105 shadow-[0_15px_40px_rgba(220,38,38,0.4)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.6)] border border-red-500/50">
              Awaken Your Path <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes spinCarousel {
          0% { transform: rotateX(-8deg) rotateY(0deg); }
          100% { transform: rotateX(-8deg) rotateY(-360deg); }
        }
      `}} />
    </section>
  );
}
