'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ModernMinimalHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden min-h-[100vh] bg-[#FDFCF8] flex items-center justify-center pt-20 perspective-[2000px]">
      
      {/* Cinematic Soft Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Extremely slow, massive, soft glowing orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(50,205,50,0.15)_0%,transparent_60%)] blur-[120px] animate-[cinematicPan_25s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[90vw] h-[90vw] bg-[radial-gradient(circle,rgba(255,195,0,0.12)_0%,transparent_60%)] blur-[150px] animate-[cinematicPan_30s_ease-in-out_infinite_alternate]" />
        
        {/* Subtle noise texture to make it feel like film */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
          
          {/* Main Hero Text (Right) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#FFC300]/30 bg-white/80 backdrop-blur-xl mb-10 shadow-sm transition-all hover:bg-white">
              <Sparkles className="w-4 h-4 text-[#32CD32]" />
              <span className="text-[12px] uppercase tracking-[0.4em] font-semibold text-[#FFC300]">Pure Harmony</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif leading-[0.95] tracking-tight text-[#1A1A1A] mb-8">
              Inner <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-[#FFC300] to-[#32CD32] pr-4">
                Balance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-lg font-light leading-relaxed mb-12">
              Discover the serenity of knowing your path. Our spiritual masters provide profound clarity through cinematic readings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link href="/practitioners" className="w-full sm:w-auto">
                <Button className="w-full h-16 px-12 rounded-full bg-[#FFC300] hover:bg-[#E6B000] text-[#1A1A1A] font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,195,0,0.2)]">
                  Start Healing <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Cinematic Gallery (Left) */}
          <div className="w-full lg:w-1/2 relative h-[700px] hidden md:block">
            {mounted && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Center Image - Massive, slow floating */}
                <div className="absolute top-[15%] right-[20%] w-[340px] h-[480px] bg-white rounded-[2rem] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.08)] transform rotate-[4deg] transition-all duration-1000 ease-out hover:rotate-0 hover:scale-105 z-30" style={{ animation: 'cinematicFloat 15s ease-in-out infinite' }}>
                  <img src="/zodiacs/zodiac_9.jpg" alt="Sagittarius" className="w-full h-full object-cover rounded-3xl" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(255,195,0,0.15)] font-bold text-[#1A1A1A] text-sm whitespace-nowrap uppercase tracking-widest border border-[#FFC300]/20">
                    Cosmic Balance
                  </div>
                </div>
                
                {/* Top Left Image - Pushed back in Z space */}
                <div className="absolute top-[5%] left-[5%] w-[240px] h-[320px] bg-white rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transform rotate-[-8deg] translate-z-[-100px] transition-all duration-1000 ease-out hover:rotate-0 hover:scale-105 hover:translate-z-0 z-20" style={{ animation: 'cinematicFloat 20s ease-in-out infinite reverse' }}>
                  <img src="/zodiacs/zodiac_12.jpg" alt="Pisces" className="w-full h-full object-cover rounded-[1.5rem]" />
                  <div className="absolute top-6 -right-6 bg-[#32CD32] text-white px-4 py-2 rounded-full shadow-lg font-bold text-[10px] uppercase tracking-widest">
                    Clarity
                  </div>
                </div>
                
                {/* Bottom Right Image - Pushed forward */}
                <div className="absolute bottom-[10%] right-[5%] w-[220px] h-[280px] bg-white rounded-[1.5rem] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.12)] transform rotate-[12deg] translate-z-[100px] transition-all duration-1000 ease-out hover:rotate-0 hover:scale-105 z-40" style={{ animation: 'cinematicFloat 18s ease-in-out infinite 2s' }}>
                  <img src="/zodiacs/zodiac_2.jpg" alt="Taurus" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm font-bold text-[#FFC300] text-xs">
                    ★ 5.0
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cinematicPan {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-100px, -50px) scale(1.1); }
        }
        @keyframes cinematicFloat {
          0% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-30px) rotate(calc(var(--tw-rotate) + 2deg)); }
          100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
        }
      `}} />
    </section>
  );
}
