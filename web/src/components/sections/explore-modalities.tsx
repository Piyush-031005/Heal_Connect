'use client';

import { 
  Star, 
  GalleryVertical, 
  Hand, 
  UserRound, 
  Hash, 
  Sparkles, 
  Flower2, 
  Activity, 
  Home, 
  Touchpad, 
  Sun, 
  Radio,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', desc: 'Understand your cosmic patterns.', icon: Star },
  { id: 'tarot', name: 'Tarot', desc: 'Explore intuitive guidance.', icon: GalleryVertical },
  { id: 'palm-reading', name: 'Palm Reading', desc: 'Discover the story in your hands.', icon: Hand },
  { id: 'face-reading', name: 'Face Reading', desc: 'Explore personality and patterns.', icon: UserRound },
  { id: 'numerology', name: 'Numerology', desc: 'Uncover your numbers.', icon: Hash },
  { id: 'energy-healing', name: 'Energy Healing', desc: 'Restore balance and wellbeing.', icon: Sparkles },
  { id: 'meditation', name: 'Meditation', desc: 'Find calm and clarity.', icon: Flower2 },
  { id: 'yoga', name: 'Yoga & Mindfulness', desc: 'Reconnect mind and body.', icon: Activity },
  { id: 'vastu', name: 'Vastu & Space Energy', desc: 'Create harmony in your environment.', icon: Home },
  { id: 'eft', name: 'EFT Tapping', desc: 'Release emotional blocks.', icon: Touchpad },
  { id: 'spiritual', name: 'Spiritual Guidance', desc: 'Awaken your inner potential.', icon: Sun },
  { id: 'sound-healing', name: 'Sound Healing', desc: 'Heal through frequencies.', icon: Radio },
];

export default function ExploreModalities() {
  return (
    <section className="py-24 bg-background border-b border-border/50 relative">
      {/* Definitively inject gradient for SVGs */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="zenIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#6848B3" offset="0%" />
          <stop stopColor="#4E59C2" offset="100%" />
        </linearGradient>
      </svg>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 drop-shadow-sm">Explore by Category</h2>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full mb-6" />
          <p className="text-foreground/70 text-lg font-light">
            Find the perfect practitioner for your unique journey. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODALITIES.map((mod) => (
            <div 
              key={mod.id} 
              id={mod.id} 
              className="group bg-card rounded-3xl p-8 border border-primary/5 hover:border-primary/20 transition-all duration-300 text-center flex flex-col items-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-primary/[0.03] border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-inner relative overflow-hidden">
                {/* Subtle outer dashed ring for intricate detail */}
                <div className="absolute inset-2 border border-dashed border-primary/20 rounded-full animate-[spin_30s_linear_infinite]" />
                <mod.icon className="w-12 h-12 stroke-[1.5px]" style={{ stroke: "url(#zenIconGradient)" }} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">{mod.name}</h3>
              <div className="w-6 h-0.5 bg-primary/20 rounded-full mb-4 group-hover:w-12 transition-all duration-300" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 font-light">
                {mod.desc}
              </p>
              
              <Link 
                href={`/category/${mod.id}`}
                className="text-primary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all opacity-80 group-hover:opacity-100"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
