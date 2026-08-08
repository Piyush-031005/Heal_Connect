'use client';

import Link from 'next/link';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', desc: 'Understand your cosmic patterns.', image: '/12-modalities/astrology.png' },
  { id: 'tarot', name: 'Tarot Reading', desc: 'Explore intuitive guidance.', image: '/12-modalities/tarocard.png' },
  { id: 'palm-reading', name: 'Palm Reading', desc: 'Discover the story in your hands.', image: '/12-modalities/ai-match.png' },
  { id: 'face-reading', name: 'Face Reading', desc: 'Explore personality and patterns.', image: '/12-modalities/face reading.png' },
  { id: 'numerology', name: 'Numerology', desc: 'Uncover your numbers.', image: '/12-modalities/numeriology.png' },
  { id: 'energy-healing', name: 'Energy Healing', desc: 'Restore balance and wellbeing.', image: '/12-modalities/energy healing.png' },
  { id: 'meditation', name: 'Meditation & Breathwork', desc: 'Find calm and clarity.', image: '/12-modalities/medidation and breathing.png' },
  { id: 'yoga', name: 'Yoga & Mindfulness', desc: 'Reconnect mind and body.', image: '/12-modalities/yoga.png' },
  { id: 'vastu', name: 'Vastu & Space Energy', desc: 'Create harmony in your environment.', image: '/12-modalities/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', desc: 'Release emotional blocks.', image: '/12-modalities/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', desc: 'Awaken your inner potential.', image: '/12-modalities/spitutality.png' },
  { id: 'sound-healing', name: 'Sound Healing', desc: 'Heal through frequencies.', image: '/12-modalities/sound.png' },
];

export function ExploreModalities() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-4">Explore by Category</h2>
          <div className="w-12 h-0.5 bg-primary/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MODALITIES.map((mod) => (
            <div 
              key={mod.id} 
              id={mod.id} 
              className="group relative bg-card hover:bg-primary/5 rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500 shadow-sm overflow-hidden">
                <img src={mod.image} alt={mod.name} className="w-16 h-16 object-contain mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{mod.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {mod.desc}
              </p>
              <Link href={`/practitioners?category=${mod.id}`} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Explore <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
