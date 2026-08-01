'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flower2, Sparkle } from 'lucide-react';

export default function LotusHarmonyHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-sky-50 to-white overflow-hidden">
      
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {mounted && (
          <>
            {/* Glowing Orbs */}
            <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-pink-300/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-sky-300/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
            
            {/* Floating Mandala/Lotus silhouette */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] flex items-center justify-center" style={{ animation: 'slowSpin 60s linear infinite' }}>
               <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px]" fill="none" stroke="currentColor" strokeWidth="0.5">
                 <circle cx="50" cy="50" r="48" />
                 <circle cx="50" cy="50" r="40" />
                 <path d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M16 84 L84 16" />
                 {Array.from({ length: 8 }).map((_, i) => (
                   <circle key={i} cx="50" cy="25" r="15" style={{ transformOrigin: '50px 50px', transform: `rotate(${i * 45}deg)` }} />
                 ))}
               </svg>
            </div>
            
            {/* Soft floating stars */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-pink-400"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.5 + 0.1,
                  animation: `floatUp ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `-${Math.random() * 10}s`
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl pt-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 shadow-lg border border-pink-100 mb-6 backdrop-blur-md">
          <Flower2 className="w-8 h-8 text-pink-500" />
        </div>
        
        <h2 className="text-pink-600 font-bold tracking-[0.2em] uppercase mb-4 text-sm drop-shadow-sm">Heal Connect</h2>
        
        <h1 className="text-5xl md:text-7xl font-serif text-slate-800 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
          Find Your Inner <br/>
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-sky-500">Harmony</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Connect with elite astrologers to realign your energy, clear your mind, and unlock a deeply peaceful future.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow-[0_8px_25px_rgba(236,72,153,0.35)] transition-all hover:-translate-y-1 border-0">
              <Sparkle className="w-5 h-5 mr-2" />
              Begin Healing
            </Button>
          </Link>
          <Link href="/services" className="text-sky-700 font-semibold hover:text-sky-900 transition-colors flex items-center gap-2 px-6 py-3 bg-sky-50/50 hover:bg-sky-100/50 backdrop-blur-sm rounded-full shadow-sm">
            Our Methods <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Subtle decorative cards at the bottom */}
        <div className="flex justify-center gap-4 md:gap-8 opacity-80 scale-90 md:scale-100 transition-transform">
          {[
            { title: "Love & Bonds", icon: "♥" },
            { title: "Career Path", icon: "★" },
            { title: "Inner Peace", icon: "✧" }
          ].map((item, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-4 md:px-8 md:py-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-xl">
               <span className="text-2xl text-pink-400 mb-2">{item.icon}</span>
               <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">{item.title}</span>
             </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes slowSpin {
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}} />
    </section>
  );
}
