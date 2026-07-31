'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CelestialMapHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden min-h-[100vh] bg-[#FDFCF8] flex items-center justify-center pt-20 perspective-[2000px]">
      
      {/* Cinematic Soft Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(50,205,50,0.15)_0%,transparent_60%)] blur-[120px] animate-[cinematicPan_25s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[90vw] h-[90vw] bg-[radial-gradient(circle,rgba(255,195,0,0.12)_0%,transparent_60%)] blur-[150px] animate-[cinematicPan_30s_ease-in-out_infinite_alternate-reverse]" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Main Hero Text (Left) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#32CD32]/20 bg-white/80 backdrop-blur-xl mb-10 shadow-sm transition-all hover:bg-white">
              <Sparkles className="w-4 h-4 text-[#FFC300]" />
              <span className="text-[12px] uppercase tracking-[0.4em] font-semibold text-[#2E8B57]">Awaken Clarity</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif leading-[0.95] tracking-tight text-[#1A1A1A] mb-8 font-black">
              Heal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#32CD32] to-[#FFC300]">
                Connect
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-lg font-light leading-relaxed mb-12">
              Step into a realm of pure insight. Connect with masterful seers who illuminate your path with absolute clarity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link href="/practitioners" className="w-full sm:w-auto">
                <Button className="w-full h-16 px-12 rounded-full bg-[#32CD32] hover:bg-[#28A428] text-white font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(50,205,50,0.2)]">
                  Begin Journey <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Pure Levitating Art (Right) */}
          <div className="w-full lg:w-1/2 relative h-[800px] hidden md:flex items-center justify-center">
            {mounted && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Mystic Hand - Glowing and Levitating */}
                <div className="absolute z-30 transform-gpu transition-transform" style={{ animation: 'levitateSlow 12s ease-in-out infinite' }}>
                  <div className="absolute inset-0 bg-[#FFC300] blur-[100px] opacity-20 animate-pulse" />
                  <img src="/custom/mystic_hand.png" alt="Mystic Energy" className="w-[500px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(50,205,50,0.2)]" />
                </div>
                
                {/* Floating Elements Around */}
                <div className="absolute top-[10%] right-[10%] z-20 transform-gpu" style={{ animation: 'levitateMedium 15s ease-in-out infinite reverse' }}>
                  <img src="/custom/virgo.png" alt="Virgo" className="w-[200px] h-auto object-contain opacity-60 drop-shadow-2xl" />
                </div>

                <div className="absolute bottom-[5%] left-[0%] z-40 transform-gpu" style={{ animation: 'levitateFast 10s ease-in-out infinite 2s' }}>
                  <img src="/custom/sagittarius.png" alt="Sagittarius" className="w-[250px] h-auto object-contain opacity-50 drop-shadow-2xl" />
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cinematicPan {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, -50px) scale(1.1); }
        }
        @keyframes levitateSlow {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-40px) scale(1.02) rotate(1deg); }
        }
        @keyframes levitateMedium {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(30px) scale(0.95) rotate(-2deg); }
        }
        @keyframes levitateFast {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-20px) scale(1.05) rotate(3deg); }
        }
      `}} />
    </section>
  );
}
