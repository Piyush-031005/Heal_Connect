'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/lang-context';

const PLAN_IMAGES = [
  '/12-modalities-v2/astrology-v3.png',
  '/12-modalities-v2/tarot-v3.png',
  '/12-modalities-v2/spiritual.png',
];
const PLAN_COLORS = [
  { color: 'from-blue-50 to-blue-100', borderColor: 'border-blue-200' },
  { color: 'from-pink-50 to-pink-100', borderColor: 'border-pink-200' },
  { color: 'from-purple-50 to-purple-100', borderColor: 'border-purple-200' },
];

export default function PricingSection() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold mb-4">{t.pricingHeading}</h2>
          <p className="text-muted-foreground text-lg">{t.pricingSubtext}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {t.pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-[2rem] p-8 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-pink-400 shadow-2xl md:-translate-y-4 md:scale-105 z-10 bg-gradient-to-b from-white to-pink-50/30'
                  : 'border border-border shadow-md hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                  {t.mostPopular}
                </div>
              )}

              <div className={`w-24 h-32 mx-auto mb-6 rounded-t-full rounded-b-xl border border-white/50 shadow-inner flex items-center justify-center bg-gradient-to-b ${PLAN_COLORS[idx].color} ${PLAN_COLORS[idx].borderColor} relative overflow-hidden`}>
                <div className="absolute inset-0 border-[3px] border-white/40 rounded-t-full rounded-b-xl m-1" />
                <img src={PLAN_IMAGES[idx]} alt={plan.name} className="w-16 h-16 object-contain mix-blend-multiply drop-shadow-md z-10" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center text-pink-600">
                  <span className="text-5xl font-black">{plan.price}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-pink-500' : 'text-primary/70'}`} />
                    <span className="text-sm font-medium text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full py-6 rounded-xl font-bold text-base transition-all shadow-sm ${
                  plan.popular
                    ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-500/25'
                    : 'bg-muted hover:bg-primary hover:text-white text-foreground'
                }`}
              >
                {t.pricingGetStarted}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
