'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function RubyVelvetHero() {
  const [mounted, setMounted] = useState(false);
  
  return (
    <section className="relative overflow-hidden min-h-[95vh] flex items-center justify-center bg-[#FDFBF7]">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft reddish/creamish gradients */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#8B0000]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#DAA520]/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        
        {/* Circular Mandala Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] border border-[#8B0000]/10 rounded-full animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] border border-[#DAA520]/20 rounded-full border-dashed animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left pt-20 md:pt-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B0000]/5 border border-[#8B0000]/10 text-[#8B0000] text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4 text-[#DAA520]" /> 
            Ancient Wisdom, Modern Clarity
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2C1810] leading-[1.1] mb-6">
            Illuminate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#DAA520] italic font-light">Destiny</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#5C4033] mb-10 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
            Connect with India's most profound astrologers and tarot readers. Experience guidance that transforms confusion into absolute conviction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/practitioners">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-[#8B0000] hover:bg-[#660000] text-[#FDFBF7] font-bold tracking-wide transition-all hover:shadow-[0_10px_30px_rgba(139,0,0,0.3)] hover:-translate-y-1">
                Consult an Expert
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-xl border-[#DAA520] text-[#8B0000] hover:bg-[#DAA520]/10 font-bold tracking-wide">
                Free Kundli
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Images (Zodiac Cards in Red/Gold Tint) */}
        <div className="flex-1 relative h-[600px] w-full hidden md:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full perspective-1000">
            {/* Main Center Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(139,0,0,0.2)] border-4 border-[#FDFBF7] z-30 animate-float">
              <div className="absolute inset-0 bg-[#8B0000]/20 mix-blend-multiply z-10" />
              <img src="/zodiacs/zodiac_1.jpg" alt="Leo" className="w-full h-full object-cover sepia-[0.3]" />
            </div>
            
            {/* Left Angled Image */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-56 h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-[#FDFBF7] z-20 -rotate-12 hover:rotate-0 hover:z-40 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-[#DAA520]/20 mix-blend-multiply z-10" />
              <img src="/zodiacs/zodiac_2.jpg" alt="Aries" className="w-full h-full object-cover sepia-[0.3]" />
            </div>
            
            {/* Right Angled Image */}
            <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-56 h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-[#FDFBF7] z-20 rotate-12 hover:rotate-0 hover:z-40 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-[#8B0000]/20 mix-blend-multiply z-10" />
              <img src="/zodiacs/zodiac_3.jpg" alt="Sagittarius" className="w-full h-full object-cover sepia-[0.3]" />
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
