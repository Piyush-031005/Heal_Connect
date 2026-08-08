'use client';

import { Star, MessageCircle, Shield, Globe } from 'lucide-react';

export function TrustLayer() {
  return (
    <section className="relative z-20 py-16 border-b border-border bg-card/50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-12 text-center lg:text-left">
          {[
            { label: 'Rating', value: '4.9 ★', icon: Star },
            { label: 'Consultations', value: '100k+', icon: MessageCircle },
            { label: 'Verified Experts', value: '500+', icon: Shield },
            { label: 'Availability', value: '24x7', icon: Globe },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-serif text-foreground font-medium">{stat.value}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground ml-14">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
