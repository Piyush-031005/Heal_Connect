'use client';

import React, { useRef } from 'react';
import { useLang } from '@/lib/lang-context';
import { useLayout } from '@/lib/layout-context';
import { TESTIMONIALS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Testimonials() {
  const { t } = useLang();
  const { layout } = useLayout();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isFinalHybrid = layout === 'final-hybrid';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400; // card width approx + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className={`py-24 relative z-10 ${isFinalHybrid ? 'bg-fixed bg-center bg-cover border-none' : 'bg-card border-t border-border'}`}
      style={isFinalHybrid ? { backgroundImage: "url('/hands-star-bg.png')" } : {}}
    >
      {/* Overlay for readability */}
      {isFinalHybrid && <div className="absolute inset-0 bg-[#4D316B]/80 backdrop-blur-[2px] z-0" />}
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            {isFinalHybrid && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#B79AE6]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B79AE6]">Global Impact</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-foreground">
              {t.testimonialTitle || "Stories of Healing"}
            </h2>
            <div className="w-12 h-0.5 bg-primary/40 mb-6" />
            <p className="text-muted-foreground text-lg">
              {t.testimonialSubtext || "Real experiences from our global community of seekers."}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} className="rounded-full w-12 h-12 border-border/50 hover:bg-primary/5">
              <ArrowRight className="w-5 h-5 rotate-180 text-foreground" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')} className="rounded-full w-12 h-12 border-border/50 hover:bg-primary/5">
              <ArrowRight className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar max-w-7xl mx-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((testi, idx) => (
            <div key={idx} className={`w-[280px] md:w-[400px] shrink-0 snap-start rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border hover:-translate-y-1 transition-all duration-500 group flex flex-col ${isFinalHybrid ? 'bg-[#7A48AB]/40 backdrop-blur-xl border-[#694091] shadow-xl hover:bg-[#7A48AB]/60 hover:border-[#B79AE6]/50' : 'bg-background border-border shadow-sm hover:shadow-lg hover:border-primary/30'}`}>
              <div className="flex gap-1 mb-4 md:mb-6 text-primary">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed font-light mb-6 md:mb-8 flex-1 text-sm md:text-lg">
                "{testi.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-border pt-6 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{testi.name}</h4>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mt-0.5">{testi.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
