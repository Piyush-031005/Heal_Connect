'use client';

import { Sparkles, ArrowRight, BrainCircuit, Heart, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AiExpertMatching() {
  return (
    <section className="py-24 bg-card relative overflow-hidden border-y border-border">
      {/* Premium subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20">
            <Sparkles className="w-6 h-6" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-6">
            Not sure who to choose?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-16">
            Tell us what you're looking for. Our intelligent matching system connects you with the perfect practitioner for your unique journey.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />
              <BrainCircuit className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-foreground mb-2">1. Analyze Needs</h3>
              <p className="text-sm text-muted-foreground">Share your current challenges, goals, and what you hope to achieve in your wellness journey.</p>
            </div>

            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />
              <Heart className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-foreground mb-2">2. Understand Preferences</h3>
              <p className="text-sm text-muted-foreground">We consider your preferred communication style, language, and practitioner approach.</p>
            </div>

            <div className="bg-background rounded-2xl p-8 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />
              <Fingerprint className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-foreground mb-2">3. Perfect Match</h3>
              <p className="text-sm text-muted-foreground">Get instantly matched with highly rated experts tailored precisely to your energy and needs.</p>
            </div>
          </div>

          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-10 h-14 text-lg rounded-full font-medium transition-all shadow-xl">
            Find My Expert <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
