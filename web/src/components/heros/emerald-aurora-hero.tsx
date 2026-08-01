'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Sparkles, Zap } from 'lucide-react';

export default function EmeraldAuroraHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50 overflow-hidden">
      
      {/* Energetic Green Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {mounted && (
          <>
            {/* Dynamic Swirls */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-400/20 rounded-full blur-[80px] mix-blend-multiply animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-lime-300/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
            
            {/* Central Energy Ring */}
            <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border-[20px] border-green-500/5 flex items-center justify-center" style={{ animation: 'spinPulse 20s linear infinite' }}>
               <div className="w-[80%] h-[80%] rounded-full border-[10px] border-lime-400/10 border-dashed" style={{ animation: 'counterSpin 30s linear infinite' }} />
            </div>
            
            {/* Energy particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-emerald-500"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.6 + 0.2,
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                  animation: `flicker ${Math.random() * 3 + 2}s infinite alternate`,
                  animationDelay: `-${Math.random() * 5}s`
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl pt-12">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-emerald-200 text-emerald-700 text-sm font-bold tracking-widest uppercase mb-10 shadow-lg">
          <Leaf className="w-5 h-5 text-emerald-500" />
          Heal Connect
        </div>
        
        <h1 className="text-6xl md:text-8xl font-heading text-emerald-950 tracking-tight leading-[1.05] mb-8 drop-shadow-sm font-black">
          Awaken Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500 inline-block mt-2">True Potential</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-emerald-800/80 mb-12 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
          Tap into the vibrant forces of the universe. Our expert astrologers reveal the pathways to abundance, health, and limitless energy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold text-xl shadow-[0_10px_35px_rgba(16,185,129,0.4)] transition-all hover:scale-105 border-0">
              <Zap className="w-6 h-6 mr-2 fill-current" />
              Get Energized
            </Button>
          </Link>
          <Link href="/services" className="text-emerald-800 font-bold hover:text-emerald-950 transition-colors flex items-center gap-2 px-8 py-4 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full shadow-md border border-emerald-100">
            View Offerings <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Floating Zodiac Cards */}
        <div className="flex justify-center gap-4 md:gap-6 opacity-90 flex-wrap">
          {[
            { sign: "Taurus", element: "Earth" },
            { sign: "Virgo", element: "Earth" },
            { sign: "Capricorn", element: "Earth" }
          ].map((item, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-4 md:px-8 md:py-5 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl hover:-translate-y-2 transition-transform cursor-pointer">
               <span className="text-lg font-black text-emerald-900">{item.sign}</span>
               <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mt-1">{item.element}</span>
             </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinPulse {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes counterSpin {
          100% { transform: rotate(-360deg); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
      `}} />
    </section>
  );
}
