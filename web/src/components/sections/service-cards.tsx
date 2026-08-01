'use client';

import Link from 'next/link';
import { Zap, MessageCircle, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { Button } from '@/components/ui/button';

export function ServiceCards({ variant }: { variant: string }) {
  const { t } = useLang();

  if (variant === 'cosmic-future') {
    return (
      <section className="py-24 relative z-10 bg-white font-sans selection:bg-sky-200">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Cosmic Toolbox</span>
              <h2 className="text-4xl md:text-5xl font-medium text-[#111111] tracking-tight">Explore <span className="text-gray-400">Services.</span></h2>
            </div>
            <Link href="/services" className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {t.servicesList.slice(0, 4).map((svc: any, idx: number) => (
              <div key={idx} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gray-100 transition-all duration-500">
                  <Zap className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{svc.name}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{svc.desc}</p>
                <div className="mt-auto pt-8 flex justify-between items-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                   <span>Available</span>
                   <span className="text-gray-900 group-hover:translate-x-2 transition-transform duration-500">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'divine-lotus') {
    return (
      <section className="py-24 relative z-10 bg-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <svg className="absolute w-[800px] h-[800px] top-0 left-[-200px]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="#EC4899" strokeWidth="0.1" strokeDasharray="2 4" className="animate-spin-slow" />
          </svg>
          <svg className="absolute w-[800px] h-[800px] bottom-0 right-[-200px]" viewBox="0 0 100 100" fill="none">
             <circle cx="50" cy="50" r="30" stroke="#EC4899" strokeWidth="0.1" strokeDasharray="1 3" className="animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-pink-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Sacred Arts</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#1A0B16] tracking-tight font-light">Spiritual <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500">Disciplines</span></h2>
            </div>
            <Link href="/services" className="text-pink-600 hover:text-fuchsia-600 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold group">
              View All <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t.servicesList.slice(0, 4).map((svc: any, idx: number) => (
              <div key={idx} className="group p-10 rounded-[2rem] border border-pink-100 bg-white shadow-[0_10px_40px_rgba(236,72,153,0.03)] hover:shadow-[0_30px_60px_rgba(236,72,153,0.1)] hover:-translate-y-2 transition-all duration-700 cursor-pointer flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-16 h-16 rounded-full border border-pink-200 bg-pink-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                  <Zap className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-2xl font-serif text-[#1A0B16] mb-4 group-hover:text-pink-600 transition-colors">{svc.name}</h3>
                <p className="text-gray-500 leading-relaxed text-sm font-light">{svc.desc}</p>
                <div className="mt-auto pt-8 flex justify-between items-center text-xs font-bold text-pink-300 uppercase tracking-widest">
                   <span>Available</span>
                   <span className="text-pink-500 group-hover:translate-x-2 transition-transform duration-500">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'cinematic-nature') {
    return (
      <section className="py-24 relative z-10 bg-[#FDFCF8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(50,205,50,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 border-t border-gray-100 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-[#32CD32] text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Universal Access</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight">Cosmic Disciplines</h2>
            </div>
            <Link href="/services" className="text-[#FFC300] hover:text-[#E6B000] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              View All Services <Sparkles className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t.servicesList.slice(0, 4).map((svc: any, idx: number) => (
              <div key={idx} className="group p-10 rounded-[2rem] border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(50,205,50,0.1)] hover:-translate-y-2 transition-all duration-700 cursor-pointer flex flex-col relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#32CD32]/10 to-[#FFC300]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
                  <Zap className="w-6 h-6 text-[#32CD32]" />
                </div>
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-[#32CD32] transition-colors">{svc.name}</h3>
                <p className="text-[#4A4A4A] leading-relaxed text-sm font-light">{svc.desc}</p>
                <div className="mt-auto pt-8 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>Available</span>
                  <span className="text-[#FFC300] group-hover:translate-x-2 transition-transform duration-500">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Different rendering based on the layout variant
  if (variant === 'cosmic') {
    return (
      <section className="py-24 relative z-10 bg-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A0B0F] mb-4">Our Services</h2>
            <p className="text-[#4A3B3F]">Explore spiritual connections in a new dimension.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {t.servicesList.slice(0, 4).map((svc: any, idx: number) => (
              <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] cursor-pointer border border-red-900/10 bg-white hover:border-red-500/50 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)] transition-all duration-700">
                <img src={`/zodiacs/red/red_${idx + 1}.png`} className="absolute inset-0 w-full h-full object-contain p-8 opacity-40 transition-transform duration-[2s] group-hover:scale-110 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]" alt="Service" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transform transition-transform duration-700 group-hover:-translate-y-4">
                  <div className="w-16 h-16 rounded-full border border-red-200 bg-white shadow-lg flex items-center justify-center mb-6 group-hover:bg-red-50 group-hover:border-red-300 group-hover:shadow-[0_10px_20px_rgba(220,38,38,0.2)] group-hover:scale-110 transition-all duration-500">
                     <Sparkles className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1A0B0F] mb-4 group-hover:text-red-700 transition-colors">{svc.name}</h3>
                  <div className="h-0 group-hover:h-20 overflow-hidden transition-all duration-700">
                    <p className="text-sm text-[#4A3B3F] leading-relaxed font-medium">{svc.desc}</p>
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
