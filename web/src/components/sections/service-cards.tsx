'use client';

import Link from 'next/link';
import { Zap, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';

export function ServiceCards({ variant }: { variant: 'mystic' | 'golden' | 'cosmic' | 'split' }) {
  const { t } = useLang();

  // Different rendering based on the layout variant
  if (variant === 'cosmic') {
    return (
      <section className="py-24 relative z-10 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Our Services</h2>
            <p className="text-white/60">Explore spiritual connections in a new dimension.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {t.servicesList.slice(0, 4).map((svc: any, idx: number) => (
              <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] cursor-pointer border border-white/10 hover:border-pink-500/50 hover:shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-all duration-700">
                <img src={`/zodiacs/zodiac_${idx + 13}.jpg`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Service" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transform transition-transform duration-700 group-hover:-translate-y-4">
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-pink-500/20 group-hover:border-pink-500/50 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] group-hover:scale-110 transition-all duration-500">
                     <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-pink-300 transition-colors drop-shadow-md">{svc.name}</h3>
                  <div className="h-0 group-hover:h-20 overflow-hidden transition-all duration-700">
                    <p className="text-sm text-white/70 leading-relaxed font-light">{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className="py-24 relative z-10 bg-[#12121E]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-[#D4A843]/20 pb-8">
            <div>
              <span className="text-[#D4A843] text-sm uppercase tracking-widest mb-2 block font-serif">Divination</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Our Services</h2>
            </div>
            <Link href="/services" className="text-[#D4A843] hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
              View All <Sparkles className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-[#D4A843]/20 divide-y md:divide-y-0 md:divide-x divide-[#D4A843]/20 max-w-7xl mx-auto">
            {t.servicesList.slice(0, 4).map((svc: any, idx: number) => (
              <div key={idx} className="p-10 group hover:bg-[#D4A843]/5 transition-colors duration-500 cursor-pointer flex flex-col items-start">
                <Zap className="w-10 h-10 text-[#D4A843] mb-8 opacity-70 group-hover:opacity-100 group-hover:-translate-y-2 transition-all" />
                <h3 className="text-2xl font-serif text-white mb-4">{svc.name}</h3>
                <p className="text-[#8A8A9E] leading-relaxed text-sm font-light">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default fallback (mystic/golden)
  return (
    <section className="py-16 md:py-24 relative z-10 border-y border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">{t.servicesTitle}</h2>
          <p className="text-muted-foreground text-lg">Comprehensive guidance for every aspect of your life journey.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {t.servicesList.slice(0, 10).map((svc: any, idx: number) => (
            <Link key={idx} href="/signup" className="group relative">
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-xl border border-primary/10 shadow-sm hover:border-primary/30 transition-all group-hover:-translate-y-2 duration-500 h-full">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500">
                  <Zap className="w-6 h-6 text-primary group-hover:text-amber-500" />
                </div>
                <p className="font-bold text-foreground text-sm mb-2">{svc.name}</p>
                <p className="text-xs text-muted-foreground font-light">{svc.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
