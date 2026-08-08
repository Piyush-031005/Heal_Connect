'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Sparkles, Flower2 } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';
import ModalityWheel from '@/components/modality-wheel';

// --- PRIMARY LAYOUT HERO (Locked) ---
function PrimaryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-background min-h-[90vh] flex items-center">
      {/* Soft Light Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Big Modality Wheel overflowing on right */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[-50%] md:right-[-30%] lg:right-[-15%] opacity-40 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
        <ModalityWheel />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-primary font-bold">Align Your Wellness</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-normal tracking-tight leading-[1] mb-6 animate-in slide-in-from-left duration-1000">
            <span className="text-foreground">Heal</span>
            <span className="text-primary italic">Connect.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-foreground/80 mb-10 max-w-xl animate-in slide-in-from-left duration-1000 delay-150 font-sans font-light leading-relaxed">
            Your one stop shop to discover and connect with holistic health, astrological and wellness practitioners around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in slide-in-from-left duration-1000 delay-300">
            <Link href="/practitioners">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full font-medium transition-all shadow-lg shadow-primary/20">
                Book Consultation <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </div>
          
          {/* Subtle Trust Indicators */}
          <div className="flex items-center gap-8 animate-in fade-in duration-1000 delay-500 border-t border-primary/20 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-foreground">10,000+</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">Trusted Practitioners</span>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-foreground">50+</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">Wellness Categories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- EDITORIAL LAYOUT HERO (Magazine) ---
function EditorialHero() {
  return (
    <section className="relative pt-32 pb-20 bg-background min-h-[90vh] flex flex-col justify-center border-b border-primary/10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight leading-[0.95] mb-8 text-foreground">
              Your Path to <br />
              <span className="italic text-primary">Wellness</span> Begins Here.
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 mb-10 max-w-2xl font-light leading-relaxed">
              Connect with trusted holistic health, astrological and wellness practitioners from around the world—all in one place.
            </p>
            
            {/* Search Bar matching Zen Align reference */}
            <div className="flex items-center bg-card rounded-full p-2 max-w-xl shadow-lg border border-primary/10">
              <Search className="w-5 h-5 text-muted-foreground ml-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search by specialty, service or name" 
                className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-medium">
                Search
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">Popular:</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Astrologers</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Energy Healing</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Yoga</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-t-full rounded-b-full overflow-hidden relative border-8 border-background shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80" 
                alt="Meditation and Wellness" 
                fill 
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
            
            {/* Editorial Floating Modality Badge */}
            <div className="absolute top-12 -left-12 bg-card p-4 rounded-2xl shadow-xl border border-primary/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Find Clarity</p>
                <p className="text-xs text-muted-foreground">Expert Astrologers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ORGANIC LAYOUT HERO (Flow) ---
function OrganicHero() {
  return (
    <section className="relative overflow-hidden pt-64 pb-24 bg-background min-h-[90vh] flex items-center">
      {/* Flowing Organic Shapes */}
      <svg className="absolute bottom-0 left-0 w-full h-1/2 text-primary/10 opacity-50 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,100 Q50,0 100,100 Z" fill="currentColor" />
      </svg>
      
      {/* Modality Wheel Arc at Top Center */}
      <div className="absolute top-[-400px] left-1/2 -translate-x-1/2 opacity-90 z-20 pointer-events-auto">
        <ModalityWheel />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center mt-12">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] flex items-center justify-center text-primary animate-[spin_10s_linear_infinite]">
            <Flower2 className="w-10 h-10 animate-[spin_10s_linear_infinite_reverse]" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight leading-tight mb-8 text-foreground max-w-5xl mx-auto">
          Heal your mind, body <br />
          <span className="text-primary italic">& energy.</span>
        </h1>
        
        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto font-light">
          Join a global community dedicated to healing, growth and transformation. Find your perfect practitioner today.
        </p>
        
        <Link href="/practitioners">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full font-medium transition-all shadow-xl shadow-primary/20">
            Join HealConnect Today
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- MINIMALIST LAYOUT HERO (Clean) ---
function MinimalistHero() {
  return (
    <section className="relative pt-40 pb-32 bg-background min-h-[85vh] flex flex-col items-center justify-center text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight text-foreground mb-8">
          Wellness, <span className="font-semibold text-primary">Simplified.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto">
          Connect with elite practitioners to heal your mind, body, and energy in a space free of distractions.
        </p>
        <Link href="/practitioners">
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-12 h-14 uppercase tracking-widest text-xs font-bold transition-all">
            Find Your Expert
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- MODERN GLOW LAYOUT HERO (Neon) ---
function ModernGlowHero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32 bg-[#090514] min-h-[90vh] flex items-center border-b border-primary/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,180,107,0.15)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] mix-blend-screen" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs uppercase tracking-widest font-bold">Live Sessions Available</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-primary/80 to-accent mb-8">
          Awaken Your Potential
        </h1>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium">
          The most vibrant community of modern mystics, healers, and guides.
        </p>
        <Link href="/practitioners">
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground rounded-full px-12 h-14 text-lg font-bold transition-all shadow-[0_0_30px_rgba(214,180,107,0.3)] hover:shadow-[0_0_50px_rgba(214,180,107,0.5)] border border-primary/50">
            Start Journey
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- MAIN EXPORT ---
export default function Hero() {
  const { layout } = useLayout();
  
  if (layout === 'editorial') return <EditorialHero />;
  if (layout === 'organic') return <OrganicHero />;
  if (layout === 'minimalist') return <MinimalistHero />;
  if (layout === 'modern-glow') return <ModernGlowHero />;
  return <PrimaryHero />; // layout === 'primary' or default
}
