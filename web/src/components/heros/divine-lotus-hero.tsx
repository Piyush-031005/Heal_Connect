'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Play, Star } from 'lucide-react';

export default function DivineLotusHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const signs = [
    { name: "Aries", icon: "♈" }, { name: "Taurus", icon: "♉" }, { name: "Gemini", icon: "♊" },
    { name: "Cancer", icon: "♋" }, { name: "Leo", icon: "♌" }, { name: "Virgo", icon: "♍" },
    { name: "Libra", icon: "♎" }, { name: "Scorpio", icon: "♏" }, { name: "Sagittarius", icon: "♐" },
    { name: "Capricorn", icon: "♑" }, { name: "Aquarius", icon: "♒" }, { name: "Pisces", icon: "♓" }
  ];

  return (
    <section className="relative min-h-[100vh] bg-[#FDFBF7] overflow-hidden flex items-center font-sans">
      
      {/* 
        Awwwards Level Ambience:
        Soft, elegant, light gradients. 
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-100/60 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-100/60 rounded-full blur-[150px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full pt-28 lg:pt-0">
        
        {/* Left Content (Text - Awwwards Typography) */}
        <div className="w-full lg:w-[45%] flex flex-col items-start text-left z-20">
          <div className="overflow-hidden mb-6">
             <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-pink-200 bg-white shadow-sm animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
               </span>
               <span className="text-pink-600 text-[10px] font-bold tracking-[0.3em] uppercase">The Awakening</span>
             </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] font-serif text-[#1A0B16] tracking-tighter leading-[0.95] mb-8 font-light relative">
            <span className="block overflow-hidden pb-2">
              <span className="block animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>Divine</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 pr-4">Lotus</span>
              </span>
            </span>
            {/* Decorative asterisk */}
            <div className="absolute top-0 right-0 lg:right-[-40px] animate-spin-slow opacity-20">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                 <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
               </svg>
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-[#5E4A56] mb-12 font-light leading-relaxed max-w-md animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            Elevate your cosmic awareness. Our sacred geometrical diagrams and real-time planetary orbits map your destiny with absolute precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto w-full sm:w-auto animate-slide-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <Link href="/practitioners" className="group relative w-full sm:w-auto">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <Button size="lg" className="relative w-full h-16 px-10 rounded-full bg-[#1A0B16] hover:bg-[#2D1426] text-white font-medium text-base transition-transform group-hover:scale-[1.02] border-0 flex items-center justify-between gap-4">
                <span>Awaken Destiny</span>
                <span className="bg-white/20 p-2 rounded-full"><ArrowRight className="w-4 h-4" /></span>
              </Button>
            </Link>
            
            <button className="flex items-center gap-4 text-[#1A0B16] font-medium hover:text-pink-600 transition-colors group">
               <div className="w-14 h-14 rounded-full border border-pink-200 flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform">
                 <Play className="w-4 h-4 fill-current ml-1" />
               </div>
               <span className="uppercase tracking-widest text-xs font-bold">Watch Video</span>
            </button>
          </div>
        </div>

        {/* Right Content (Complex Technical Diagram & Rotating Lotus) */}
        <div className="w-full lg:w-[55%] relative h-[600px] lg:h-[100vh] flex items-center justify-center mt-16 lg:mt-0 lg:right-[-5%] z-0">
          {mounted && (
            <div className="relative w-[100%] h-[100%] lg:w-[120%] lg:h-[120%] flex items-center justify-center">
              
              {/* Outer Diagram Rings (Technical Awwwards Feel) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ animation: 'spin 180s linear infinite' }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#EC4899" strokeWidth="0.1" strokeDasharray="1 1" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#EC4899" strokeWidth="0.05" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#EC4899" strokeWidth="0.1" strokeDasharray="2 2" />
                  {/* Axis lines */}
                  <line x1="5" y1="50" x2="95" y2="50" stroke="#EC4899" strokeWidth="0.05" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="#EC4899" strokeWidth="0.05" />
                </svg>
              </div>

              {/* The Lotus Image in Center */}
              <div className="absolute w-[50%] h-[50%] flex items-center justify-center" style={{ animation: 'spin 120s linear infinite reverse' }}>
                <img 
                  src="/premium/divine_lotus.png" 
                  alt="Lotus" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(236,72,153,0.3)] filter contrast-125 saturate-150"
                  style={{ mixBlendMode: 'multiply' }} 
                />
              </div>

              {/* Orbiting Zodiac Emotes/Nodes */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spin 60s linear infinite' }}>
                {signs.map((sign, i) => {
                  const angleInRads = ((i * 30) - 90) * (Math.PI / 180);
                  const radius = 45; // Outer ring
                  const x = 50 + radius * Math.cos(angleInRads);
                  const y = 50 + radius * Math.sin(angleInRads);

                  return (
                    <div
                      key={sign.name}
                      className="absolute w-12 h-12 lg:w-16 lg:h-16 -ml-6 -mt-6 lg:-ml-8 lg:-mt-8 origin-center flex flex-col items-center justify-center group"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      {/* Node container - counter rotates so it stays upright */}
                      <div className="relative flex items-center justify-center w-full h-full" style={{ animation: 'spin 60s linear infinite reverse' }}>
                         {/* Connecting line to center */}
                         <div className="absolute top-1/2 left-1/2 w-[200px] h-[1px] bg-gradient-to-r from-pink-300/0 via-pink-400/20 to-pink-500/50 -translate-y-1/2 origin-left -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: `rotate(${i * 30}deg)` }} />
                         
                         {/* Emote/Zodiac Bubble */}
                         <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white/80 backdrop-blur-xl rounded-full border border-pink-200 flex items-center justify-center shadow-lg shadow-pink-500/10 hover:scale-125 hover:bg-pink-50 hover:border-pink-400 transition-all duration-500 cursor-pointer overflow-hidden relative">
                           {/* Small spinning border effect */}
                           <div className="absolute inset-[-50%] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-0 group-hover:opacity-20 animate-spin-fast" />
                           <span className="text-lg lg:text-2xl text-pink-500 relative z-10">{sign.icon}</span>
                         </div>

                         {/* Hover Tooltip (Awwwards Style) */}
                         <div className="absolute top-[-40px] opacity-0 group-hover:opacity-100 group-hover:top-[-50px] transition-all duration-500 pointer-events-none">
                            <div className="bg-[#1A0B16] text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                              {sign.name}
                            </div>
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Floating Star Emotes */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={`star-${i}`} 
                  className="absolute"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  <Star className="w-3 h-3 text-pink-300 opacity-50" />
                </div>
              ))}

            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-fast { 100% { transform: rotate(360deg); } }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes slide-up { 
          0% { opacity: 0; transform: translateY(40px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        @keyframes float {
          100% { transform: translateY(-20px) rotate(15deg); }
        }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-fast { animation: spin-fast 3s linear infinite; }
      `}} />
    </section>
  );
}
