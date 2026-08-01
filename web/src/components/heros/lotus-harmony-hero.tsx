'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flower2, ArrowRight } from 'lucide-react';

export default function LotusHarmonyHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[100vh] bg-[#F7FAFC] overflow-hidden flex items-center">
      
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[800px] h-[800px] bg-pink-200/40 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full pt-28 lg:pt-0">
        
        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-pink-400/20 bg-white/50 backdrop-blur-md mb-10 shadow-sm">
            <Flower2 className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 text-xs font-bold tracking-[0.25em] uppercase">Find Inner Peace</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-serif text-[#1E293B] tracking-tight leading-[1.05] mb-8 font-light">
            Lotus <br />
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-sky-500">Harmony</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#475569] mb-12 font-light leading-relaxed max-w-lg">
            Immerse yourself in serenity. Connect with elite astrologers to realign your energy, clear your mind, and unlock a deeply peaceful future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto w-full sm:w-auto">
            <Link href="/practitioners" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-all hover:shadow-xl hover:-translate-y-1 border-0">
                Begin Healing
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-slate-600 font-medium hover:text-slate-900 transition-colors bg-white/40 hover:bg-white/70 rounded-full backdrop-blur-sm border border-white">
              Our Methods <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Content (Premium Ethereal Lily) */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[100vh] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 lg:right-[-5%] z-0">
          {mounted && (
            <div className="relative w-[100%] h-[100%] lg:w-[120%] lg:h-[120%] flex items-center justify-center pointer-events-none" style={{ animation: 'gentleFloat 12s ease-in-out infinite' }}>
              
              {/* High Quality AI Generated Image */}
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-white/50 backdrop-blur-sm bg-white/10 m-12 lg:m-0">
                <img 
                  src="/premium/ethereal_lily.png" 
                  alt="Ethereal Lily" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                />
              </div>

            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gentleFloat { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-15px); } 
        }
      `}} />
    </section>
  );
}
