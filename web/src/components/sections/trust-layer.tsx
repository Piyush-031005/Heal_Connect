'use client';

import { Star, MessageCircle, Shield, Globe } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';

export function TrustLayer() {
  const { layout } = useLayout();
  const isNewDesign1 = layout === 'new-design-1';

  if (isNewDesign1) {
    return (
      <section className="relative z-20 py-12 border-y border-[#CDE9F4] bg-[#EDF8FC]/90 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Rating', value: '4.9 ★', icon: Star, desc: 'Over 15k+ 5-Star Reviews' },
              { label: 'Consultations', value: '100k+', icon: MessageCircle, desc: 'Completed Sessions' },
              { label: 'Verified Experts', value: '500+', icon: Shield, desc: 'Background Checked' },
              { label: 'Availability', value: '24x7', icon: Globe, desc: 'Global Practitioners' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-[#CDE9F4] shadow-sm flex items-center gap-4 hover:shadow-md hover:border-[#9FD6EE] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#CDE9F4]/50 flex items-center justify-center shrink-0">
                  <stat.icon className="w-6 h-6 text-[#1A92C6]" />
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#12527F]">{stat.value}</div>
                  <div className="text-xs font-bold text-[#17619A]/80 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

