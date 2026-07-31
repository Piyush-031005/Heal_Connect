'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CosmicAuraHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Floating animation styles for background cards
  const floatingCards = [
    { id: 21, top: '10%', left: '5%', size: 'w-48 h-64', delay: '0s', duration: '15s', rot: '-10deg' },
    { id: 22, top: '15%', right: '10%', size: 'w-56 h-72', delay: '2s', duration: '18s', rot: '15deg' },
    { id: 23, bottom: '15%', left: '15%', size: 'w-52 h-64', delay: '4s', duration: '20s', rot: '-5deg' },
    { id: 24, bottom: '10%', right: '5%', size: 'w-64 h-80', delay: '1s', duration: '17s', rot: '12deg' },
    { id: 25, top: '40%', left: '80%', size: 'w-40 h-56', delay: '3s', duration: '16s', rot: '-20deg' },
    { id: 26, top: '50%', left: '2%', size: 'w-44 h-60', delay: '5s', duration: '19s', rot: '8deg' },
  ];

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-[#05050A]">
      
      {/* Immersive Floating Zodiac Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-auto z-0 perspective-1000">
        {floatingCards.map((card) => (
          <div
            key={card.id}
            className={`absolute ${card.size} rounded-3xl overflow-hidden border border-white/5 cursor-crosshair transition-all duration-700 hover:scale-[1.15] hover:z-50 hover:shadow-[0_0_80px_rgba(245,158,11,0.6)] group`}
            style={{
              top: card.top,
              left: card.left,
              right: card.right,
              bottom: card.bottom,
              transform: `rotate(${card.rot}) translateZ(0)`,
              animation: `float ${card.duration} ease-in-out infinite alternate ${card.delay}`,
            }}
          >
            {/* Dark overlay for contrast, removed on hover */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img src={`/zodiacs/zodiac_${card.id}.jpg`} alt="Zodiac" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
          </div>
        ))}
        
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
