'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkle, ArrowRight } from 'lucide-react';

export default function DivineLotusHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

  return (
    <section className="relative min-h-[100vh] bg-[#05010a] overflow-hidden flex items-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[1000px] bg-fuchsia-900/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full pt-28 lg:pt-0">
        
        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-md mb-8">
            <Sparkle className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-xs font-bold tracking-[0.2em] uppercase">Premium Astrology</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-serif text-white tracking-tight leading-[1.05] mb-8 font-light drop-shadow-2xl">
            Divine <br />
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-fuchsia-400 to-purple-600">Lotus</span>
          </h1>
          
          <p className="text-lg md:text-xl text-pink-100/60 mb-12 font-light leading-relaxed max-w-lg">
            Experience astrology like never before. Align your cosmic energies with the divine lotus, and unlock the sacred truths of your zodiac journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto w-full sm:w-auto">
            <Link href="/practitioners" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 rounded-full bg-white hover:bg-pink-50 text-[#05010a] font-bold text-base transition-all hover:scale-105 border-0 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-white font-medium hover:text-pink-300 transition-colors border border-white/10 rounded-full hover:bg-white/5 backdrop-blur-sm">
              Discover More <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Content (Rotating Lotus + Zodiacs) */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[100vh] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 lg:right-[-15%] z-0">
          {mounted && (
            <div className="relative w-[600px] h-[600px] lg:w-[1200px] lg:h-[1200px] flex items-center justify-center pointer-events-none" style={{ animation: 'lotusSpin 120s linear infinite' }}>
              
              {/* High Quality AI Generated Lotus Image */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ mixBlendMode: 'screen' }}>
                <img 
                  src="/premium/divine_lotus.png" 
                  alt="Divine Lotus" 
                  className="w-full h-full object-contain opacity-90 drop-shadow-[0_0_50px_rgba(236,72,153,0.3)]"
                />
              </div>

              {/* Orbiting Zodiac Signs attached to the petals/edges */}
              {signs.map((sign, i) => {
                const angleInRads = ((i * 30) - 90) * (Math.PI / 180);
                // Position on the edge of the lotus
                const radius = 38; // percentage from center
                const x = 50 + radius * Math.cos(angleInRads);
                const y = 50 + radius * Math.sin(angleInRads);

                return (
                  <div
                    key={sign}
                    className="absolute w-20 h-20 lg:w-28 lg:h-28 -ml-10 -mt-10 lg:-ml-14 lg:-mt-14 origin-center flex flex-col items-center justify-center pointer-events-auto"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    {/* Counter rotate so the text stays readable and upright while the flower spins */}
                    <div className="flex flex-col items-center justify-center bg-black/50 backdrop-blur-xl rounded-full w-full h-full border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)] p-2 transition-transform hover:scale-110 hover:border-pink-400 cursor-pointer group" style={{ animation: 'lotusSpin 120s linear infinite reverse' }}>
                       <span className="text-xl lg:text-3xl text-pink-400 group-hover:text-white transition-colors mb-1 drop-shadow-md">
                         {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"][i]}
                       </span>
                       <span className="text-[8px] lg:text-[10px] font-bold text-pink-200/80 uppercase tracking-widest group-hover:text-white transition-colors">
                         {sign}
                       </span>
                    </div>
                  </div>
                );
              })}

            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes lotusSpin { 100% { transform: rotate(360deg); } }
      `}} />
    </section>
  );
}
