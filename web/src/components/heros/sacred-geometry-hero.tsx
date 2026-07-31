'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SacredGeometryHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Deterministic random-like values for 12 cards to avoid hydration mismatch
  const cards = [
    { id: 1, top: 15, left: 10, delay: 0, dur: 25, scale: 0.8, rot: -10 },
    { id: 2, top: 75, left: 15, delay: 2, dur: 28, scale: 0.6, rot: 15 },
    { id: 3, top: 25, left: 85, delay: 5, dur: 22, scale: 0.9, rot: 5 },
    { id: 4, top: 80, left: 80, delay: 1, dur: 30, scale: 0.7, rot: -20 },
    { id: 5, top: 10, left: 50, delay: 8, dur: 26, scale: 0.5, rot: 25 },
    { id: 6, top: 85, left: 45, delay: 4, dur: 24, scale: 1.0, rot: -5 },
    { id: 7, top: 45, left: 5,  delay: 3, dur: 29, scale: 0.7, rot: 12 },
    { id: 8, top: 50, left: 90, delay: 7, dur: 27, scale: 0.8, rot: -18 },
    { id: 9, top: 35, left: 25, delay: 6, dur: 23, scale: 0.6, rot: 8 },
    { id: 10, top: 60, left: 70, delay: 9, dur: 31, scale: 0.9, rot: -12 },
    { id: 11, top: 65, left: 30, delay: 2, dur: 25, scale: 0.7, rot: 20 },
    { id: 12, top: 30, left: 65, delay: 5, dur: 28, scale: 0.8, rot: -8 },
  ];

  return (
    <section className="relative overflow-hidden min-h-[100vh] flex items-center justify-center bg-[#FDFBF7]">
      
      {/* Background Blends - Cream/Polar White mixed with soft Red */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle,rgba(220,38,38,0.05)_0%,transparent_60%)] rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,transparent_70%)] opacity-80" />
      </div>

      {/* Scattered Floating Cards */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {mounted && cards.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-2xl overflow-hidden opacity-30 sm:opacity-50 transition-all duration-[2000ms]"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: '160px',
              height: '240px',
              transform: `translate(-50%, -50%) scale(${c.scale}) rotate(${c.rot}deg)`,
              animation: `float ${c.dur}s ease-in-out infinite alternate`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <div className="w-full h-full bg-white/10 backdrop-blur-[1px] border border-red-900/10 rounded-2xl p-2 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
              <img 
                src={`/zodiacs/red/red_${c.id}.png`} 
                alt="Zodiac" 
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center pointer-events-none">
        
        <div className="pointer-events-auto mb-8 p-1 rounded-full bg-white/60 border border-red-900/10 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="px-5 py-2 rounded-full bg-white/80 text-red-900 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
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

        <p className="text-xl md:text-2xl text-[#4A3B3F] mb-12 max-w-2xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 bg-white/70 p-6 rounded-3xl backdrop-blur-xl border border-red-900/10 shadow-2xl">
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
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(5deg); }
          100% { transform: translate(-50%, -50%) translateY(20px) rotate(-5deg); }
        }
      `}} />
    </section>
  );
}
