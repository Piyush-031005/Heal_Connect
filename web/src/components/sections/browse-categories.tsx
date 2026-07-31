'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { CATEGORIES } from '@/lib/constants';

export function BrowseCategories({ variant }: { variant: 'mystic' | 'golden' | 'cosmic' | 'split' }) {
  const { t } = useLang();

  if (variant === 'cosmic') {
    return (
      <section className="py-24 relative z-10 bg-[#05050A]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white">{t.browseTitle}</h2>
            <div className="h-px bg-gradient-to-r from-pink-500/50 to-transparent flex-1 ml-8 hidden md:block" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {CATEGORIES.map((cat, idx) => {
              const catData = t.categories[idx] || { name: cat.name, count: cat.count };
              return (
                <Link key={cat.name} href="/signup" className="group">
                  <div className="relative flex flex-col justify-end p-8 rounded-3xl overflow-hidden aspect-video border border-white/5 shadow-2xl hover:shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-all group-hover:scale-[1.02] duration-700">
                    <img src={`/zodiacs/zodiac_${(idx % 30) + 1}.jpg`} alt={catData.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                        <cat.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-black text-white text-2xl mb-1">{catData.name}</h3>
                      <p className="text-sm text-white/70 font-light">{catData.count} {t.browseSubtitleEm === 'astrologer' ? 'experts' : 'विशेषज्ञ'}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className="py-24 relative z-10 bg-[#0D0D1A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Seek Guidance By Focus</h2>
            <p className="text-[#8A8A9E] font-light italic text-lg max-w-xl mx-auto">Where does your destiny require clarity today?</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {CATEGORIES.map((cat, idx) => {
              const catData = t.categories[idx] || { name: cat.name, count: cat.count };
              return (
                <Link key={cat.name} href="/signup" className="group block">
                  <div className="p-8 border border-[#D4A843]/30 hover:border-[#D4A843] transition-colors duration-500 bg-[#12121E] flex flex-col items-center text-center">
                    <cat.icon className="w-8 h-8 text-[#D4A843] mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    <h3 className="text-xl font-serif text-white mb-2">{catData.name}</h3>
                    <p className="text-xs tracking-widest text-[#D4A843]/60 uppercase">{catData.count} Consults</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Default (mystic/golden)
  return (
    <section className="py-16 md:py-24 bg-card/30 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">{t.browseTitle}</h2>
            <p className="text-muted-foreground text-lg">{t.browseSubtitle}</p>
          </div>
          <Link href="/services" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-medium">
            Explore All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CATEGORIES.map((cat, idx) => {
            const catData = t.categories[idx] || { name: cat.name, count: cat.count };
            return (
              <Link key={cat.name} href="/signup" className="group">
                <div className="relative flex flex-col justify-end p-5 rounded-3xl overflow-hidden aspect-[16/9] border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all group-hover:-translate-y-1 duration-500">
                  <img src={`/zodiacs/zodiac_${idx + 1}.jpg`} alt={catData.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="relative z-10 flex items-end justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <cat.icon className={`w-4 h-4 text-amber-500`} />
                        <h3 className="font-bold text-white text-base truncate">{catData.name}</h3>
                      </div>
                      <p className="text-xs text-white/70 font-light truncate">{catData.count} {t.browseSubtitleEm === 'astrologer' ? 'astrologers' : 'ज्योतिषी'}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
