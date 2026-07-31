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
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(50,205,50,0.15)_0%,transparent_60%)] blur-[120px] animate-[cinematicPan_25s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[90vw] h-[90vw] bg-[radial-gradient(circle,rgba(255,195,0,0.12)_0%,transparent_60%)] blur-[150px] animate-[cinematicPan_30s_ease-in-out_infinite_alternate]" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
          
          {/* Main Hero Text (Right) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#FFC300]/30 bg-white/80 backdrop-blur-xl mb-10 shadow-sm transition-all hover:bg-white">
              <Sparkles className="w-4 h-4 text-[#32CD32]" />
              <span className="text-[12px] uppercase tracking-[0.4em] font-semibold text-[#FFC300]">Pure Harmony</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif leading-[0.95] tracking-tight text-[#1A1A1A] mb-8 font-black">
              Heal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFC300] to-[#32CD32]">
                Connect
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
          
          {/* Pure Levitating Art (Left) */}
          <div className="w-full lg:w-1/2 relative h-[800px] hidden md:flex items-center justify-center">
            {mounted && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Sagittarius - Glowing and Levitating */}
                <div className="absolute z-30 transform-gpu transition-transform" style={{ animation: 'levitateSlow 14s ease-in-out infinite' }}>
                  <div className="absolute inset-0 bg-[#32CD32] blur-[120px] opacity-20 animate-pulse" />
                  <img src="/custom/sagittarius.png" alt="Sagittarius" className="w-[450px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,195,0,0.2)]" />
                </div>
                
                {/* Floating Elements Around */}
                <div className="absolute top-[5%] left-[5%] z-20 transform-gpu" style={{ animation: 'levitateMedium 18s ease-in-out infinite reverse' }}>
                  <img src="/custom/mystic_hand.png" alt="Mystic" className="w-[220px] h-auto object-contain opacity-70 drop-shadow-2xl" />
                </div>

                <div className="absolute bottom-[10%] right-[0%] z-40 transform-gpu" style={{ animation: 'levitateFast 12s ease-in-out infinite 1s' }}>
                  <img src="/custom/virgo.png" alt="Virgo" className="w-[280px] h-auto object-contain opacity-60 drop-shadow-2xl" />
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
        @keyframes levitateSlow {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-40px) scale(1.02) rotate(-1deg); }
        }
        @keyframes levitateMedium {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(30px) scale(0.95) rotate(2deg); }
        }
        @keyframes levitateFast {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-20px) scale(1.05) rotate(-3deg); }
        }
      `}} />
    </section>
  );
}
