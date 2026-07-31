'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CelestialMapHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-20">
      
      {/* Lively Parrot Green & Orange Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#FAFAFA]">
        {/* Vibrant glowing blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(50,205,50,0.3)_0%,transparent_60%)] blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(255,140,0,0.25)_0%,transparent_60%)] blur-[100px] animate-[pulse_15s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(255,165,0,0.2)_0%,transparent_70%)] blur-[80px] animate-[pulse_12s_ease-in-out_infinite_alternate-reverse]" />
        
        {/* Subtle dot matrix overlay for texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (Left/Center) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#32CD32]/30 bg-white/60 backdrop-blur-md mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#32CD32] animate-pulse shadow-[0_0_8px_#32CD32]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#2E8B57]">Fresh Cosmic Insights</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-sans font-black leading-[1.05] tracking-tight text-[#1A1A1A] mb-8">
              Awaken Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#32CD32] to-[#FF8C00]">
                True Path
              </span>
            </h1>
            
            <p className="text-xl text-[#4A4A4A] max-w-xl font-medium leading-relaxed mb-12 border-l-4 border-[#FF8C00] pl-6 bg-white/30 backdrop-blur-sm py-2 rounded-r-xl">
              Experience astrology in a vibrant new light. Connect with top seers who bring positive, actionable energy to your destiny.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/practitioners">
                <Button className="h-14 px-10 rounded-2xl bg-gradient-to-r from-[#32CD32] to-[#4CBB17] hover:from-[#2E8B57] hover:to-[#32CD32] text-white font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 shadow-xl shadow-[#32CD32]/20">
                  Start Reading <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Creative Zodiac Cards (Right) */}
          <div className="lg:col-span-6 relative h-[600px] hidden lg:block">
            {mounted && (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main floating card (Taurus) */}
                <div className="absolute top-[10%] left-[20%] w-56 h-80 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-3 shadow-2xl shadow-[#32CD32]/20 transform rotate-[-8deg] hover:rotate-0 hover:scale-105 transition-all duration-500 z-30 animate-[float_8s_ease-in-out_infinite]">
                  <img src="/zodiacs/zodiac_2.jpg" alt="Taurus" className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg font-bold text-[#1A1A1A] text-sm whitespace-nowrap">
                    ♉ Taurus Energy
                  </div>
                </div>
                
                {/* Secondary card (Pisces) */}
                <div className="absolute top-[30%] right-[10%] w-48 h-72 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-3 shadow-2xl shadow-[#FF8C00]/20 transform rotate-[12deg] hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 animate-[float_10s_ease-in-out_infinite_reverse]">
                  <img src="/zodiacs/zodiac_12.jpg" alt="Pisces" className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg font-bold text-[#1A1A1A] text-sm whitespace-nowrap">
                    ♓ Pisces Intuition
                  </div>
                </div>
                
                {/* Tertiary card (Sagittarius) */}
                <div className="absolute bottom-[5%] left-[30%] w-40 h-60 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-2 shadow-2xl shadow-gray-200 transform rotate-[-15deg] hover:rotate-0 hover:scale-105 transition-all duration-500 z-10 animate-[float_12s_ease-in-out_infinite]">
                  <img src="/zodiacs/zodiac_9.jpg" alt="Sagittarius" className="w-full h-full object-cover rounded-xl" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg font-bold text-[#1A1A1A] text-xs whitespace-nowrap">
                    ♐ Sagittarius
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(-8deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(-8deg); }
        }
      `}} />
    </section>
  );
}
