'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ModernMinimalHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen bg-white flex flex-col lg:flex-row items-center overflow-hidden">
      
      {/* LEFT HALF: Content */}
      <div className="w-full lg:w-1/2 pt-32 pb-16 px-6 lg:pl-20 xl:pl-32 relative z-10 flex flex-col justify-center h-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 text-[#FF8C00] font-bold text-xs uppercase tracking-widest mb-8 w-fit border border-[#FF8C00]/20">
          <Sparkles className="w-4 h-4" />
          Illuminate Your Future
        </div>
        
        <h1 className="text-6xl lg:text-[5.5rem] font-black tracking-tighter text-[#1A1A1A] leading-[1.05] mb-6">
          Find Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#32CD32] pr-2">
            Perfect Balance
          </span>
        </h1>
        
        <p className="text-xl text-gray-500 font-medium max-w-md mb-10 leading-relaxed">
          Unlock the secrets of the universe with our vibrant community of professional spiritual guides.
        </p>
        
        <div className="flex gap-4">
          <Link href="/practitioners">
            <Button size="lg" className="rounded-2xl h-14 px-8 bg-[#FF8C00] hover:bg-[#e67e00] text-white shadow-xl shadow-[#FF8C00]/20 font-bold text-base transition-all hover:-translate-y-1">
              Connect Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-base transition-all">
              Our Services
            </Button>
          </Link>
        </div>
      </div>

      {/* RIGHT HALF: Visuals & Masonry */}
      <div className="w-full lg:w-1/2 h-[600px] lg:h-screen relative bg-gradient-to-br from-[#32CD32]/10 via-[#FF8C00]/10 to-transparent flex items-center justify-center p-8">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#32CD32] rounded-full blur-[100px] opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF8C00] rounded-full blur-[100px] opacity-20 animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        
        <div className="relative w-full max-w-lg aspect-square">
          {/* Dynamic Grid Layout for Assets */}
          {mounted && (
            <>
              {/* Top Left Card (Taurus) */}
              <div className="absolute top-0 left-0 w-[45%] h-[55%] bg-white rounded-3xl p-2 shadow-2xl shadow-gray-200/50 transform hover:scale-105 transition-transform duration-500 z-20">
                <img src="/zodiacs/zodiac_2.jpg" alt="Taurus" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#32CD32] rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-gray-800 uppercase">Taurus</span>
                </div>
              </div>
              
              {/* Top Right Card (Sagittarius) */}
              <div className="absolute top-8 right-0 w-[45%] h-[40%] bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 transform hover:scale-105 transition-transform duration-500 z-10">
                <img src="/zodiacs/zodiac_9.jpg" alt="Sagittarius" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute top-4 -right-4 bg-[#FF8C00] text-white px-3 py-1 rounded-full shadow-lg font-bold text-[10px] uppercase">
                  Top Rated
                </div>
              </div>
              
              {/* Bottom Right Card (Pisces) */}
              <div className="absolute bottom-0 right-4 w-[50%] h-[50%] bg-white rounded-3xl p-2 shadow-2xl shadow-gray-200/50 transform hover:scale-105 transition-transform duration-500 z-30">
                <img src="/zodiacs/zodiac_12.jpg" alt="Pisces" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute -left-6 bottom-8 bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex gap-1 text-[#FF8C00]">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Astrology Master</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
