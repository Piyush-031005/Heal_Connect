'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Sparkles, Flower2 } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';
import ModalityWheel from '@/components/modality-wheel';
import OpticalWheel from '@/components/optical-wheel';

// --- PRIMARY LAYOUT HERO (Locked) ---
function PrimaryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-background min-h-[90vh] flex items-center">
      {/* Soft Light Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Big Modality Wheel overflowing on right */}
      <div className="absolute right-[-20%] md:right-[-10%] top-1/2 -translate-y-1/2 h-[800px] w-[800px] md:h-[1000px] md:w-[1000px] opacity-90 lg:opacity-100 z-10 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
        <OpticalWheel />
      </div>

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
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
      
      <div className="container mx-auto px-6 relative z-10 text-center mt-12 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] flex items-center justify-center text-primary animate-[spin_10s_linear_infinite]">
              <Flower2 className="w-10 h-10 animate-[spin_10s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight leading-tight mb-8 text-foreground max-w-5xl mx-auto pointer-events-auto">
          Heal your mind, body <br />
          <span className="text-primary italic">& energy.</span>
        </h1>
        
        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto font-light pointer-events-auto">
          Join a global community dedicated to healing, growth and transformation. Find your perfect practitioner today.
        </p>
        
        <div className="pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full font-medium transition-all shadow-xl shadow-primary/20">
              Join HealConnect Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- MINIMALIST LAYOUT HERO (Clean & Imagery Focused) ---
function MinimalistHero() {
  return (
    <section className="relative pt-32 pb-24 bg-background min-h-[85vh] flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              Healing, <br /><span className="font-semibold text-primary">Elevated.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light mb-12">
              Connect with elite practitioners to heal your mind, body, and energy. Experience the power of crystals, tarot, and holistic therapies.
            </p>
            <Link href="/practitioners">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-12 h-14 uppercase tracking-widest text-xs font-bold transition-all">
                Discover Your Path
              </Button>
            </Link>
          </div>
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1515023677547-593d7638cbd6?auto=format&fit=crop&q=80" 
              alt="Healing Crystals" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MODERN GLOW LAYOUT HERO (Mystic Imagery) ---
function ModernGlowHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-32 bg-card min-h-[90vh] flex items-center border-b border-border">
      {/* Background Image instead of neon glow */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1632516482181-427c3f3ab654?auto=format&fit=crop&q=80" 
          alt="Tarot and Mystic Aesthetic" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md text-primary mb-8 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-bold">Unveil The Future</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight text-foreground mb-8 drop-shadow-sm">
          Awaken Your Spirit
        </h1>
        <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          The most vibrant community of modern mystics, healers, and spiritual guides.
        </p>
        <Link href="/practitioners">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 h-14 text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Start Journey
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- ZEN ALIGN LAYOUT HERO (New Design 1) ---
function ZenAlignHero() {
  const cartoonModalities = [
    { id: 'astrology', name: 'Astrology', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Astrology&backgroundColor=E8E0F8' },
    { id: 'tarot', name: 'Tarot', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Tarot&backgroundColor=E8E0F8' },
    { id: 'palm-reading', name: 'Palm Reading', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Palm&backgroundColor=E8E0F8' },
    { id: 'face-reading', name: 'Face Reading', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Face&backgroundColor=E8E0F8' },
    { id: 'numerology', name: 'Numerology', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Number&backgroundColor=E8E0F8' },
    { id: 'energy-healing', name: 'Energy Healing', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Energy&backgroundColor=E8E0F8' },
    { id: 'meditation', name: 'Meditation', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Meditate&backgroundColor=E8E0F8' },
    { id: 'yoga', name: 'Yoga', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Yoga&backgroundColor=E8E0F8' },
    { id: 'vastu', name: 'Vastu', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Home&backgroundColor=E8E0F8' },
    { id: 'eft', name: 'EFT Tapping', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Touch&backgroundColor=E8E0F8' },
    { id: 'spiritual', name: 'Spiritual Guide', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Spirit&backgroundColor=E8E0F8' },
    { id: 'sound-healing', name: 'Sound Healing', image: 'https://api.dicebear.com/7.x/micah/svg?seed=Sound&backgroundColor=E8E0F8' },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-24 bg-zen-hero min-h-[95vh] flex flex-col items-center justify-center border-b border-border/50">
      
      {/* Background radial gradient to give a subtle center light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight text-foreground mb-8">
            Align Your <br />
            <span className="text-primary italic">Inner World.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 font-light leading-relaxed">
            Discover a curated space for holistic wellness. Connect with vetted practitioners who guide you toward balance, clarity, and transformation.
          </p>

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
        </div>
      </div>

      {/* Right Optical Wheel (Doctor Strange WebGL style) */}
      <div className="absolute right-[-20%] md:right-[-10%] top-1/2 -translate-y-1/2 h-[800px] w-[800px] md:h-[1000px] md:w-[1000px] opacity-90 lg:opacity-100 z-10 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
        <OpticalWheel />
      </div>
    </section>
  );
}

// --- MAIN EXPORT ---
export default function Hero() {
  const { layout } = useLayout();
  
  if (layout === 'new-design-1') return <ZenAlignHero />;
  if (layout === 'editorial') return <EditorialHero />;
  if (layout === 'organic') return <OrganicHero />;
  if (layout === 'minimalist') return <MinimalistHero />;
  if (layout === 'modern-glow') return <ModernGlowHero />;
  return <PrimaryHero />; // layout === 'primary' or default
}
