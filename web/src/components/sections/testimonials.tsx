'use client';

import { useLang } from '@/lib/lang-context';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-card relative z-10 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-foreground">
            {t.testimonialTitle || "Stories of Healing"}
          </h2>
          <div className="w-12 h-0.5 bg-primary/40 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            {t.testimonialSubtext || "Real experiences from our global community of seekers."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testi, idx) => (
            <div key={idx} className="bg-background rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 group flex flex-col">
              <div className="flex gap-1 mb-6 text-primary">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed font-light mb-8 flex-1 text-lg">
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
