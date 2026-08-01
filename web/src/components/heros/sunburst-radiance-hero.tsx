'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun, Star, Sparkles } from 'lucide-react';

export default function SunburstRadianceHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const rays = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    angle: (i * 360) / 12,
  }));

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-50 to-red-50 overflow-hidden">
      
      {/* Sunburst Background Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {mounted && (
          <div className="absolute w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] rounded-full flex items-center justify-center" style={{ animation: 'sunSpin 120s linear infinite' }}>
            
            {/* Rays */}
            {rays.map((ray, index) => {
              const angleInRads = (ray.angle - 90) * (Math.PI / 180);
              const x = 50 + 40 * Math.cos(angleInRads);
              const y = 50 + 40 * Math.sin(angleInRads);

              return (
                <div
                  key={ray.id}
                  className="absolute w-20 h-20 md:w-32 md:h-32 -ml-10 -mt-10 md:-ml-16 md:-mt-16 origin-center flex items-center justify-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="w-full h-full p-2 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center opacity-80" style={{ animation: 'sunCounterSpin 120s linear infinite' }}>
                    <img 
                      src={`/zodiacs/zodiac_${ray.id}.jpg`} 
                      alt="Zodiac" 
                      className="w-full h-full object-cover rounded-full mix-blend-overlay opacity-50" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl drop-shadow-md">
                      {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"][index]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-orange-200 text-orange-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
          <Sun className="w-4 h-4 text-orange-500" />
          Awaken Your True Path
          <Star className="w-4 h-4 text-yellow-500" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif text-slate-900 tracking-tight leading-[1.05] mb-8 drop-shadow-sm font-black">
          Heal <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Connect</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 mb-12 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Illuminate your journey with ancient wisdom. Embrace the positive energy of the cosmos to guide your modern life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg shadow-[0_10px_40px_rgba(245,158,11,0.4)] transition-all hover:scale-105 border-0">
              <Sparkles className="w-5 h-5 mr-2" />
              Discover Your Destiny
            </Button>
          </Link>
          <Link href="/services" className="text-orange-700 font-bold hover:text-orange-900 transition-colors flex items-center gap-2 px-6 py-4 bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
            Explore Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sunSpin { 100% { transform: rotate(360deg); } }
        @keyframes sunCounterSpin { 100% { transform: rotate(-360deg); } }
      `}} />
    </section>
  );
}
