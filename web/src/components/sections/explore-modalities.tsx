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
  { id: 'astrology', name: 'Astrology', desc: 'Understand your cosmic patterns.', image: '/12-modalities-v2/astrology.png' },
  { id: 'tarot', name: 'Tarot', desc: 'Explore intuitive guidance.', image: '/12-modalities-v2/tarot.png' },
  { id: 'palm-reading', name: 'Palm Reading', desc: 'Discover the story in your hands.', image: '/12-modalities-v2/palm.png' },
  { id: 'face-reading', name: 'Face Reading', desc: 'Explore personality and patterns.', image: '/12-modalities-v2/face.png' },
  { id: 'numerology', name: 'Numerology', desc: 'Uncover your numbers.', image: '/12-modalities-v2/numerology.png' },
  { id: 'energy-healing', name: 'Energy Healing', desc: 'Restore balance and wellbeing.', image: '/12-modalities-v2/energy.png' },
  { id: 'meditation', name: 'Meditation', desc: 'Find calm and clarity.', image: '/12-modalities-v2/meditation.png' },
  { id: 'yoga', name: 'Yoga & Mindfulness', desc: 'Reconnect mind and body.', image: '/12-modalities-v2/yoga.png' },
  { id: 'vastu', name: 'Vastu & Space Energy', desc: 'Create harmony in your environment.', image: '/12-modalities-v2/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', desc: 'Release emotional blocks.', image: '/12-modalities-v2/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', desc: 'Awaken your inner potential.', image: '/12-modalities-v2/spiritual.png' },
  { id: 'sound-healing', name: 'Sound Healing', desc: 'Heal through frequencies.', image: '/12-modalities-v2/sound.png' },
];

export default function ExploreModalities() {
  return (
    <section className="py-24 bg-background border-b border-border/50 relative">
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
              <div className="w-28 h-28 rounded-full bg-primary/[0.03] border-4 border-primary/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 shadow-sm relative overflow-hidden">
                <img src={mod.image} alt={mod.name} className="w-full h-full object-cover rounded-full" />
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
