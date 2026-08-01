'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkle, ArrowRight } from 'lucide-react';

export default function DivineLotusHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const petals = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12;
    return { id: i + 1, angle };
  });

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center bg-[#0d0714] overflow-hidden pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-900/30 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-900/40 rounded-full blur-[100px]" />
      </div>

      {/* Rotating Lotus Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {mounted && (
          <div className="relative w-[600px] h-[600px] md:w-[900px] md:h-[900px]" style={{ animation: 'lotusSpin 150s linear infinite' }}>
            {petals.map((petal) => {
              const angleInRads = (petal.angle - 90) * (Math.PI / 180);
              // Position petals on a circle
              const x = 50 + 35 * Math.cos(angleInRads);
              const y = 50 + 35 * Math.sin(angleInRads);

              return (
                <div
                  key={petal.id}
                  className="absolute origin-center w-28 h-40 md:w-40 md:h-56 -ml-14 -mt-20 md:-ml-20 md:-mt-28"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `rotate(${petal.angle}deg)`,
                  }}
                >
                  {/* Petal Shape */}
                  <div className="relative w-full h-full">
                    {/* SVG Petal Background */}
                    <svg viewBox="0 0 100 150" className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                      <path 
                        d="M50 0 C80 50, 100 100, 50 150 C0 100, 20 50, 50 0 Z" 
                        fill="rgba(253, 224, 243, 0.05)" 
                        stroke="rgba(236, 72, 153, 0.4)" 
                        strokeWidth="1"
                      />
                    </svg>
                    
                    {/* Counter-rotating Image so it stays somewhat upright, or just let it rotate with petal */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.5)] mb-2">
                        <img 
                          src={`/zodiacs/zodiac_${petal.id}.jpg`} 
                          alt="Zodiac" 
                          className="w-full h-full object-cover mix-blend-lighten"
                        />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-pink-300 uppercase tracking-widest" style={{ transform: 'rotate(180deg) scaleX(-1)' }}>
                        {["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][petal.id - 1]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Inner Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-pink-500/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.2)]">
               <div className="w-32 h-32 rounded-full border border-pink-400/30 flex items-center justify-center" style={{ animation: 'lotusSpin 30s linear infinite reverse' }}>
                 <Sparkle className="w-12 h-12 text-pink-400" />
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Content Overlay */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center max-w-4xl pt-10">
        <h2 className="text-pink-400 font-bold tracking-[0.4em] uppercase mb-6 text-sm flex items-center gap-4">
          <span className="w-12 h-[1px] bg-pink-500/50"></span>
          Heal Connect
          <span className="w-12 h-[1px] bg-pink-500/50"></span>
        </h2>
        
        <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-8 font-black drop-shadow-lg">
          The Divine <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Lotus</span>
        </h1>
        
        <p className="text-lg md:text-xl text-pink-100/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
          Step into a realm of pure spiritual awakening. Unfold the petals of your destiny and discover the cosmic truths hidden within your zodiac.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all hover:scale-105 border border-white/10">
              Seek Guidance
            </Button>
          </Link>
          <Link href="/services" className="text-pink-300 font-semibold hover:text-white transition-colors flex items-center gap-2 px-6 py-4">
            View Offerings <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes lotusSpin { 100% { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
