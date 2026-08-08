'use client';

import { 
  Star, 
  Compass, 
  HeartPulse, 
  Activity, 
  Wind, 
  Flower2, 
  Layers, 
  Eye, 
  Hand, 
  User, 
  Book, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', desc: 'Understand your cosmic patterns.', icon: Star },
  { id: 'vastu', name: 'Vastu', desc: 'Create harmony in your environment.', icon: Compass },
  { id: 'healing', name: 'Healing', desc: 'Restore balance and wellbeing.', icon: HeartPulse },
  { id: 'eft', name: 'EFT', desc: 'Release emotional blocks.', icon: Activity },
  { id: 'meditation', name: 'Meditation', desc: 'Find calm and clarity.', icon: Wind },
  { id: 'yoga', name: 'Yoga', desc: 'Reconnect mind and body.', icon: Flower2 },
  { id: 'tarot', name: 'Tarot', desc: 'Explore intuitive guidance.', icon: Layers },
  { id: 'psychic', name: 'Psychic Reading', desc: 'Gain another perspective.', icon: Eye },
  { id: 'palmistry', name: 'Palmistry', desc: 'Discover the story in your hands.', icon: Hand },
  { id: 'face-reading', name: 'Face Reading', desc: 'Explore personality and patterns.', icon: User },
  { id: 'lal-kitab', name: 'Lal Kitab', desc: 'Traditional astrological guidance.', icon: Book },
  { id: 'ai-match', name: 'AI Expert Match', desc: 'Find the right practitioner for you.', icon: Sparkles },
];

export function ExploreModalities() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-4">Explore by Category</h2>
          <div className="w-12 h-0.5 bg-primary/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODALITIES.map((mod, i) => (
            <div 
              key={mod.id} 
              id={mod.id} 
              className="group relative bg-card hover:bg-primary/5 rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                <mod.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{mod.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {mod.desc}
              </p>
              <Link href={`/practitioners?category=${mod.id}`} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
