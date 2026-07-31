'use client';

import { useLang } from '@/lib/lang-context';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials({ variant }: { variant: 'mystic' | 'golden' | 'cosmic' | 'split' }) {
  const { t } = useLang();

  if (variant === 'cosmic') {
    return (
      <section className="py-24 relative z-10 bg-[#05050A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Cosmic Connections</h2>
            <p className="text-white/60">Real stories from aligned souls.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testi, idx) => (
              <div key={idx} className="group relative rounded-[2.5rem] p-1 bg-gradient-to-br from-white/10 to-transparent hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-700">
                <div className="absolute inset-0 bg-black/90 rounded-[2.5rem]" />
                <div className="relative p-10 bg-black/40 backdrop-blur-xl rounded-[2.5rem] h-full flex flex-col">
                  <div className="text-pink-500 text-6xl font-serif mb-4 leading-none opacity-50 group-hover:opacity-100 transition-opacity">"</div>
                  <p className="text-lg text-white/80 leading-relaxed mb-8 flex-1">"{testi.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{testi.name}</h4>
                      <p className="text-white/40 text-sm">{testi.loc}</p>
                    </div>
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
      <section className="py-24 relative z-10 bg-[#E8DBBF]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1C1208] mb-16 text-center">Words of the Seekers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#6B4C1E]/20 max-w-6xl mx-auto divide-y md:divide-y-0 md:divide-x divide-[#6B4C1E]/20">
            {TESTIMONIALS.map((testi, idx) => (
              <div key={idx} className="p-12 bg-[#F2E8D5] flex flex-col justify-between group hover:bg-[#E8DBBF] transition-colors duration-500">
                <p className="text-xl text-[#5A4A2E] leading-relaxed font-serif italic mb-8">
                  "{testi.text}"
                </p>
                <div>
                  <h4 className="text-[#1C1208] font-bold tracking-wider uppercase text-sm mb-1">{testi.name}</h4>
                  <p className="text-[#B87333] text-xs font-serif uppercase tracking-widest">{testi.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default mystic/golden
  return (
    <section className="py-16 md:py-24 bg-card/30 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">{t.testimonialTitle}</h2>
          <p className="text-muted-foreground text-lg">{t.testimonialSubtext}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testi, idx) => (
            <div key={idx} className="bg-background rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className="text-amber-500 text-lg group-hover:scale-110 transition-transform delay-75">★</span>
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed italic mb-8 text-lg">"{testi.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">{testi.name}</h4>
                  <p className="text-muted-foreground text-sm">{testi.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
