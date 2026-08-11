'use client';

import { Search, UserCircle, CalendarCheck, Leaf } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';

export function HowItWorks() {
  const { layout } = useLayout();
  const isNewDesign1 = layout === 'new-design-1';

  if (isNewDesign1) {
    return (
      <section className="py-28 bg-[#EDF8FC] border-t border-[#CDE9F4]/60 relative z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1A92C6]" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1A92C6]">Simple Process</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F]">How Zenauraa Works</h2>
            </div>
            <p className="text-[#17619A]/80 font-medium max-w-md">Your seamless journey to connecting with verified cosmic guides and spiritual practitioners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Discover Guides', desc: 'Filter through vetted astrologers, tarot readers & energy healers by specialty and rating.', icon: Search },
              { num: '02', title: 'Compare Profiles', desc: 'Read genuine reviews, explore certifications, and view real-time practitioner availability.', icon: UserCircle },
              { num: '03', title: 'Instant Booking', desc: 'Reserve 1-on-1 video or audio consultation sessions effortlessly with flexible slots.', icon: CalendarCheck },
              { num: '04', title: 'Transform & Thrive', desc: 'Gain deep cosmic clarity, personalized horoscopes, and spiritual alignment for life.', icon: Leaf },
            ].map((step, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl border border-[#CDE9F4] rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#9FD6EE] transition-all duration-500 group relative overflow-hidden">
                <div className="text-5xl font-black text-[#1A92C6]/15 group-hover:text-[#1A92C6]/25 transition-colors mb-6 font-mono">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#EDF8FC] border border-[#CDE9F4] flex items-center justify-center mb-6 group-hover:bg-[#1A92C6] group-hover:text-white transition-colors duration-500">
                  <step.icon className="w-6 h-6 text-[#1A92C6] group-hover:text-white transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-[#12527F] mb-3">{step.title}</h3>
                <p className="text-sm text-[#17619A]/75 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-4">How HealConnect Works</h2>
          <div className="w-12 h-0.5 bg-primary/40 mx-auto" />
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px border-t-2 border-dashed border-border" />
          
          <div className="flex-1 flex flex-col items-center text-center px-4 relative z-10 mb-12 md:mb-0">
            <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
              <Search className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">1. Discover</h3>
            <p className="text-sm text-muted-foreground">Search and explore practitioners by specialty, service or location.</p>
          </div>

          <div className="flex-1 flex flex-col items-center text-center px-4 relative z-10 mb-12 md:mb-0">
            <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
              <UserCircle className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">2. Connect</h3>
            <p className="text-sm text-muted-foreground">View profiles, read reviews and find the perfect match for your needs.</p>
          </div>

          <div className="flex-1 flex flex-col items-center text-center px-4 relative z-10 mb-12 md:mb-0">
            <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
              <CalendarCheck className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">3. Book</h3>
            <p className="text-sm text-muted-foreground">Book sessions or services securely and easily through our platform.</p>
          </div>

          <div className="flex-1 flex flex-col items-center text-center px-4 relative z-10">
            <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
              <Leaf className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">4. Thrive</h3>
            <p className="text-sm text-muted-foreground">Begin your journey toward balance, clarity and transformation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

