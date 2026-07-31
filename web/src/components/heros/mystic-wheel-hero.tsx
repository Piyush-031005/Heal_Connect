'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ZodiacWheel from '@/components/zodiac-wheel';

export function StarField() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-repeat opacity-20 mix-blend-screen animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full blur-[1px] animate-ping" />
      <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-amber-200 rounded-full blur-[2px] animate-pulse delay-700" />
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-blue-200 rounded-full blur-[1px] animate-pulse delay-300" />
    </div>
  );
}

export default function MysticWheelHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-background min-h-[90vh] flex items-center">
      <StarField />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Majestic overflowing background wheel */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[-50%] md:right-[-30%] lg:right-[-15%] opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
        <ZodiacWheel />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight leading-tight mb-8 animate-in slide-in-from-left duration-1000">
            <span className="text-foreground drop-shadow-md">Guidance.</span><br />
            <span className="text-foreground drop-shadow-md">Clarity.</span><br />
            <span className="bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent drop-shadow-lg">Confidence.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-foreground/80 mb-10 max-w-xl animate-in slide-in-from-left duration-1000 delay-150 font-light">
            Find trusted guidance for every stage of life. Connect with verified experts instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-in slide-in-from-left duration-1000 delay-300">
            <Link href="/practitioners">
              <Button size="lg" className="bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0B1020] px-10 h-14 text-lg rounded-full font-bold shadow-[0_0_30px_rgba(214,180,107,0.3)] group border-none transition-all">
                Book Consultation <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
