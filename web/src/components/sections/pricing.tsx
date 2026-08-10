'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const PLANS = [
  {
    name: 'Starter',
    price: '₹10',
    type: '/min',
    description: 'Perfect for quick answers.',
    features: ['Chat only', 'Basic horoscope', '24/7 support'],
    popular: false,
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    image: '/12-modalities-v2/astrology-v3.png'
  },
  {
    name: 'Pro',
    price: '$89',
    period: 'per month',
    description: 'Perfect for dedicated seekers wanting regular guidance.',
    features: ['Chat + Call', 'Detailed horoscope', 'Priority support', 'Kundli access'],
    popular: true,
    color: 'from-pink-50 to-pink-100',
    borderColor: 'border-pink-200',
    image: '/12-modalities-v2/tarot-v3.png'
  },
  {
    name: 'Premium',
    price: '₹50',
    type: '/min',
    description: 'Unlimited access to top experts.',
    features: ['Chat + Call + Video', 'Full horoscope', 'Dedicated astrologer', 'All reports'],
    popular: false,
    color: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    image: '/12-modalities-v2/spiritual.png'
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-lg">Choose a plan that fits your needs. All plans include first consultation free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {PLANS.map((plan, idx) => (
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
                  Most Popular
                </div>
              )}
              
              {/* Tarot Card Top Imagery */}
              <div className={`w-24 h-32 mx-auto mb-6 rounded-t-full rounded-b-xl border border-white/50 shadow-inner flex items-center justify-center bg-gradient-to-b ${plan.color} ${plan.borderColor} relative overflow-hidden`}>
                <div className="absolute inset-0 border-[3px] border-white/40 rounded-t-full rounded-b-xl m-1" />
                <img src={plan.image} alt={plan.name} className="w-16 h-16 object-contain mix-blend-multiply drop-shadow-md z-10" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center text-pink-600">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-lg font-medium ml-1">{plan.type}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
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
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
