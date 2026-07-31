'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ZenMinimalistHero() {
  const [mounted, setMounted] = useState(false);
  
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-20">
      {/* Very subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-[#F5F5F7] rounded-full blur-3xl opacity-50 -z-10" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <span className="block text-[#86868B] text-xs font-semibold tracking-[0.3em] uppercase mb-8">
          Mind • Body • Cosmos
        </span>
        
        <h1 className="text-5xl md:text-7xl font-light text-[#1D1D1F] tracking-tight leading-[1.1] mb-8">
          Clarity for your <br />
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1D1D1F] to-[#86868B]">life's journey.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#86868B] mb-12 font-light leading-relaxed max-w-2xl mx-auto">
          Expert astrological guidance designed for the modern soul. Minimal noise, maximum insight.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link href="/practitioners">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full bg-[#1D1D1F] hover:bg-[#434345] text-white font-medium text-lg transition-all">
              Start Reading
            </Button>
          </Link>
          <Link href="/services" className="text-[#1D1D1F] font-medium hover:text-[#86868B] transition-colors flex items-center gap-2 px-6 py-4">
            Explore Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Elegant Image Gallery at Bottom */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 pb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5F5F7] relative group">
            <img src={`/zodiacs/zodiac_${i + 12}.jpg`} alt="Zodiac Art" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
