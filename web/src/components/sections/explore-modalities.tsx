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
  { id: 'astrology', name: 'Astrology', desc: 'Gain cosmic insights and life path guidance.', image: '/12-modalities-v2/astrology-v3.png' },
  { id: 'tarot', name: 'Tarot', desc: 'Unveil hidden truths through symbolic cards.', image: '/12-modalities-v2/tarot-v3.png' },
  { id: 'palm-reading', name: 'Palm Reading', desc: 'Discover destiny written in your hands.', image: '/12-modalities-v2/palm.png' },
  { id: 'face-reading', name: 'Face Reading', desc: 'Understand personality and health markers.', image: '/12-modalities-v2/face-v3.png' },
  { id: 'numerology', name: 'Numerology', desc: 'Unlock the power of your life path numbers.', image: '/12-modalities-v2/numerology.png' },
  { id: 'energy-healing', name: 'Energy Healing', desc: 'Restore balance and clear energy blockages.', image: '/12-modalities-v2/energy.png' },
  { id: 'meditation', name: 'Meditation', desc: 'Cultivate mindfulness and inner peace.', image: '/12-modalities-v2/meditation.png' },
  { id: 'yoga', name: 'Yoga & Mindfulness', desc: 'Align mind, body, and spirit through movement.', image: '/12-modalities-v2/yoga.png' },
  { id: 'vastu', name: 'Vastu & Space Energy', desc: 'Harmonize your living and working spaces.', image: '/12-modalities-v2/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', desc: 'Release emotional distress through tapping.', image: '/12-modalities-v2/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', desc: 'Connect with higher purpose and wisdom.', image: '/12-modalities-v2/spiritual.png' },
  { id: 'sound-healing', name: 'Sound Healing', desc: 'Harmonize your body with therapeutic frequencies.', image: '/12-modalities-v2/sound-v3.png' },
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
              className="group bg-card rounded-3xl p-6 border border-primary/5 hover:border-primary/20 transition-all duration-300 text-center flex flex-col items-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer"
            >
              {/* Massive Image Container */}
              <div className="w-40 h-40 rounded-full bg-primary/[0.03] border-4 border-primary/10 flex items-center justify-center mb-6 group-hover:scale-[1.15] transition-transform duration-700 shadow-xl relative overflow-hidden">
                <div className="absolute inset-2 border border-dashed border-primary/30 rounded-full animate-[spin_30s_linear_infinite]" />
                <img src={`${mod.image}?v=2`} alt={mod.name} className="w-full h-full object-cover rounded-full mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">{mod.name}</h3>
              <div className="w-8 h-0.5 bg-primary/20 rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 font-light px-2">
                {mod.desc}
              </p>
              
              <Link 
                href={`/category/${mod.id}`}
                prefetch={false}
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
