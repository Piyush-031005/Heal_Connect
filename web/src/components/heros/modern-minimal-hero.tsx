'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ModernMinimalHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-40 bg-[#000000] min-h-[95vh] flex items-center justify-center text-center">
      {/* Absolute dark luxury gradient */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/20 opacity-30 blur-[120px] pointer-events-none" />
      
      {/* 3D Orb illusion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black tracking-tighter leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          Clarity.
        </h1>
        
        <p className="text-lg md:text-2xl text-white/50 mb-12 max-w-2xl font-light tracking-wide leading-relaxed">
          Elite astrological consulting for the modern individual. Decode your future with unparalleled precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/practitioners">
            <Button size="lg" className="bg-white hover:bg-white/90 text-black px-12 h-14 text-sm rounded-full font-bold uppercase tracking-widest shadow-xl transition-transform hover:scale-105">
              Consult an Expert
            </Button>
          </Link>
          <Link href="#pricing">
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-12 h-14 text-sm rounded-full font-bold uppercase tracking-widest backdrop-blur-md transition-all">
              View Memberships
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
