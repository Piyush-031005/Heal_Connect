'use client';

import { Search, UserCircle, CalendarCheck, Leaf } from 'lucide-react';

export function HowItWorks() {
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
