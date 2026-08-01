'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight } from 'lucide-react';

export default function EmeraldAuroraHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[100vh] bg-[#02130A] overflow-hidden flex items-center">
      
      {/* Energetic Green Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full pt-28 lg:pt-0">
        
        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-10 shadow-sm">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-bold tracking-[0.25em] uppercase">Awaken Your Potential</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-serif text-white tracking-tight leading-[1.05] mb-8 font-light drop-shadow-lg">
            Emerald <br />
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-lime-500">Aurora</span>
          </h1>
          
          <p className="text-lg md:text-xl text-emerald-100/70 mb-12 font-light leading-relaxed max-w-lg">
            Tap into the vibrant forces of the universe. Our expert astrologers reveal the pathways to abundance, health, and limitless energy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto w-full sm:w-auto">
            <Link href="/practitioners" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#02130A] font-bold text-base transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 border-0">
                Get Energized
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-white font-medium hover:text-emerald-300 transition-colors border border-emerald-500/20 rounded-full hover:bg-emerald-500/10 backdrop-blur-sm">
              View Offerings <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Content (Premium Emerald Crystal) */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[100vh] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 lg:right-[-5%] z-0">
          {mounted && (
            <div className="relative w-[100%] h-[100%] lg:w-[130%] lg:h-[130%] flex items-center justify-center pointer-events-none" style={{ animation: 'floatCrystal 8s ease-in-out infinite' }}>
              
              {/* High Quality AI Generated Image */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ mixBlendMode: 'screen' }}>
                <img 
                  src="/premium/emerald_crystal.png" 
                  alt="Emerald Crystal" 
                  className="w-full h-full object-contain opacity-90 drop-shadow-[0_0_80px_rgba(16,185,129,0.4)]"
                />
              </div>

            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatCrystal { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(-30px) scale(1.02); } 
        }
      `}} />
    </section>
  );
}
