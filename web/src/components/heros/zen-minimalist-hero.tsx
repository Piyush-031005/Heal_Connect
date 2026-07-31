'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ZenMinimalistHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    angle: (i * 360) / 12,
  }));

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden">
      
      {/* Huge Rotating 2D Wheel Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {mounted && (
          <div className="relative w-[150vw] h-[150vw] md:w-[1200px] md:h-[1200px] animate-[spin_60s_linear_infinite] opacity-15">
            {cards.map((card) => (
              <div
                key={card.id}
                className="absolute top-1/2 left-1/2 w-40 h-60 md:w-56 md:h-80 -ml-20 -mt-30 md:-ml-28 md:-mt-40"
                style={{
                  transform: `rotate(${card.angle}deg) translateY(-35vw) md:translateY(-450px)`,
                }}
              >
                <img 
                  src={`/zodiacs/red/red_${card.id}.png`} 
                  alt="Zodiac" 
                  className="w-full h-full object-contain" 
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Gradient overlay to fade the edges of the wheel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#FDFBF7_70%)] pointer-events-none z-0" />

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <span className="block text-red-700 text-sm font-bold tracking-[0.4em] uppercase mb-8">
          The Crimson Wheel
        </span>
        
        <h1 className="text-6xl md:text-8xl font-serif text-[#1A0B0F] tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
          Destiny <br />
          <span className="italic font-light text-red-700">Unveiled.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#4A3B3F] mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
          Expert astrological guidance designed for the modern soul. Pure insight drawn from the ancient cycles.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full bg-red-700 hover:bg-red-800 text-white font-bold text-lg shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all hover:scale-105">
              Start Reading
            </Button>
          </Link>
          <Link href="/services" className="text-[#1A0B0F] font-bold hover:text-red-700 transition-colors flex items-center gap-2 px-6 py-4">
            Explore Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
