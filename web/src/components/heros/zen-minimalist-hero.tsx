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
      
      {/* Huge Orbiting 2D Wheel Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {mounted && (
          <div className="absolute w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] rounded-full" style={{ animation: 'crimsonSpin 90s linear infinite' }}>
            {/* The circular track line */}
            <div className="absolute inset-10 rounded-full border border-red-900/10" />
            <div className="absolute inset-20 rounded-full border border-red-900/5 border-dashed" />
            
            {cards.map((card, index) => {
              // Calculate exact x,y positions on the circle
              const radius = 50; // percentage
              const angleInRads = (card.angle - 90) * (Math.PI / 180);
              const x = 50 + radius * Math.cos(angleInRads);
              const y = 50 + radius * Math.sin(angleInRads);

              return (
                <div
                  key={card.id}
                  className="absolute w-32 h-48 md:w-56 md:h-80 -ml-16 -mt-24 md:-ml-28 md:-mt-40 origin-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  {/* Counter-rotating container keeps the card upright */}
                  <div className="w-full h-full" style={{ animation: 'crimsonCounterSpin 90s linear infinite' }}>
                    <img 
                      src={`/zodiacs/red/red_${card.id}.png`} 
                      alt="Zodiac" 
                      className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] opacity-40" 
                    />
                  </div>
                </div>
              );
            })}
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes crimsonSpin {
          100% { transform: rotate(360deg); }
        }
        @keyframes crimsonCounterSpin {
          100% { transform: rotate(-360deg); }
        }
      `}} />
    </section>
  );
}
