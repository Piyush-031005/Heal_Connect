'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sun, ArrowRight } from 'lucide-react';

export default function SunburstRadianceHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[100vh] bg-[#FDFBF7] overflow-hidden flex items-center">
      
      {/* Subtle Warm Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-amber-200/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full pt-28 lg:pt-0">
        
        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-10 shadow-sm">
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="text-amber-700 text-xs font-bold tracking-[0.25em] uppercase">Awaken Your Spirit</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-serif text-[#1A0F00] tracking-tight leading-[1.05] mb-8 font-light">
            Sunburst <br />
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600">Radiance</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#5A4F40] mb-12 font-light leading-relaxed max-w-lg">
            Let the golden rays of cosmic wisdom illuminate your path. Step into a journey of clarity, power, and profound astrological guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pointer-events-auto w-full sm:w-auto">
            <Link href="/practitioners" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base transition-all hover:shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-105 border-0">
                Begin Consultation
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-amber-900 font-medium hover:text-amber-700 transition-colors border border-amber-900/10 rounded-full hover:bg-amber-900/5 backdrop-blur-sm">
              Learn More <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Content (Premium Golden Sundial) */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[100vh] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 lg:right-[-5%] z-0">
          {mounted && (
            <div className="relative w-[100%] h-[100%] lg:w-[130%] lg:h-[130%] flex items-center justify-center pointer-events-none" style={{ animation: 'float 10s ease-in-out infinite' }}>
              
              {/* High Quality AI Generated Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/premium/golden_sundial.png" 
                  alt="Golden Sundial" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.2)]"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float { 
          0%, 100% { transform: translateY(0) rotate(0deg); } 
          50% { transform: translateY(-20px) rotate(2deg); } 
        }
      `}} />
    </section>
  );
}
