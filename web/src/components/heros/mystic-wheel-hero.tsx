'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ZodiacWheel from '@/components/zodiac-wheel';

// Beautiful twinkle starfield component reused here
export function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2.5 + 0.5}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.duration, opacity: 0.6 }}
        />
      ))}
    </div>
  );
}

export default function MysticWheelHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-background min-h-[90vh] flex items-center">
      <StarField />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Big zodiac wheel overflowing on right */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[-50%] md:right-[-30%] lg:right-[-15%] opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
        <ZodiacWheel />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-primary/60" />
            <span className="text-xs tracking-[0.25em] uppercase text-primary/80 font-medium">HealConnect — Est. 2024</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight leading-[0.95] mb-8 animate-in slide-in-from-left duration-1000">
            <span className="text-foreground drop-shadow-md">Guidance.</span><br />
            <span className="text-foreground drop-shadow-md">Clarity.</span><br />
            <span className="bg-gradient-to-r from-primary via-amber-200 to-primary bg-clip-text text-transparent drop-shadow-lg">Confidence.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-foreground/70 mb-10 max-w-xl animate-in slide-in-from-left duration-1000 delay-150 font-light leading-relaxed">
            Find trusted guidance for every stage of life. Connect with verified experts instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-in slide-in-from-left duration-1000 delay-300">
            <Link href="/practitioners">
              <Button size="lg" className="bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#0B1020] px-10 h-14 text-lg rounded-full font-bold shadow-[0_0_30px_rgba(214,180,107,0.3)] group border-none transition-all">
                Book Consultation <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#horoscope">
              <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-10 h-14 text-lg rounded-full font-medium transition-all">
                Today's Horoscope
              </Button>
            </Link>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 animate-in fade-in duration-1000 delay-500">
            {[['4.9★', 'Rating'], ['100k+', 'Sessions'], ['500+', 'Experts'], ['24x7', 'Available']].map(([v, l]) => (
              <div key={l} className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">{v}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
