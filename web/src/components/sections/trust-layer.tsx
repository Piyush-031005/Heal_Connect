'use client';

import { Star, MessageCircle, Shield, Globe } from 'lucide-react';

export function TrustLayer({ variant }: { variant: 'mystic' | 'golden' | 'cosmic' | 'split' }) {
  if (variant === 'cosmic') {
    return (
      <section className="relative z-20 py-12 border-y border-red-900/10 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8">
            {[
              { label: 'Rating', value: '4.9 ★', icon: Star },
              { label: 'Readings', value: '100k+', icon: MessageCircle },
              { label: 'Masters', value: '500+', icon: Shield },
              { label: 'Available', value: '24x7', icon: Globe },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <stat.icon className="w-8 h-8 text-red-600 mb-3 group-hover:scale-125 transition-transform duration-500 group-hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]" />
                <span className="text-3xl font-black text-[#1A0B0F]">{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#4A3B3F] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className="relative z-20 py-12 border-y border-[#D4A843]/20 bg-[#12121E]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 divide-x divide-[#D4A843]/20">
            {[
              { label: 'Global Rating', value: '4.9 ★', icon: Star },
              { label: 'Consultations', value: '100k+', icon: MessageCircle },
              { label: 'Verified Seers', value: '500+', icon: Shield },
              { label: 'Access', value: '24x7', icon: Globe },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 md:px-12 flex-1 group">
                <span className="text-4xl font-serif text-[#D4A843] group-hover:scale-110 transition-transform">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-[#8A8A9E] mt-2 font-serif">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default mystic/golden
  return (
    <section className="relative z-20 py-8 border-y border-border bg-card/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6">
          {[
            { label: 'Rating', value: '4.9 ★', icon: Star },
            { label: 'Consultations', value: '100k+', icon: MessageCircle },
            { label: 'Verified Experts', value: '500+', icon: Shield },
            { label: 'Availability', value: '24x7', icon: Globe },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start group">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-primary group-hover:text-amber-500 transition-colors" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground ml-7">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
