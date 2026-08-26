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
import { useLayout } from '@/lib/layout-context';
import { useTheme } from 'next-themes';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', desc: 'Gain cosmic insights and life path guidance.', image: '/final_ensights/astrology.png' },
  { id: 'tarot', name: 'Tarot', desc: 'Unveil hidden truths through symbolic cards.', image: '/final_ensights/tarot.png' },
  { id: 'face-reading', name: 'Face Reading', desc: 'Understand personality and health markers.', image: '/final_ensights/face reading.png' },
  { id: 'palm-reading', name: 'Palm Reading', desc: 'Discover destiny written in your hands.', image: '/final_ensights/palm reading.png' },
  { id: 'sound-healing', name: 'Sound Healing', desc: 'Harmonize your body with therapeutic frequencies.', image: '/final_ensights/sound healing.png' },
  { id: 'meditation', name: 'Meditation', desc: 'Cultivate mindfulness and inner peace.', image: '/final_ensights/medidation.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', desc: 'Connect with higher purpose and wisdom.', image: '/final_ensights/spiritual  guidance.png' },
  { id: 'chakra-healing', name: 'Chakra Healing', desc: 'Restore balance and clear energy blockages.', image: '/final_ensights/chakra healing.png' },
  { id: 'breathwork', name: 'Breathwork', desc: 'Align mind, body, and spirit through mindful breathing.', image: '/final_ensights/breathwork.png' },
  { id: 'dreams', name: 'Dream Prediction', desc: 'Unlock the power of your subconscious dreams.', image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony', name: 'Space Harmony', desc: 'Harmonize your living and working spaces.', image: '/final_ensights/space harmony.png' },
  { id: 'numerology', name: 'Numerology', desc: 'Uncover the hidden vibrations of numbers.', image: '/final_ensights/numerology.png' },
];

export default function ExploreModalities() {
  const { layout } = useLayout();
  const isNewLayout = layout.startsWith("layout-");
  const { theme } = useTheme();
  
  const isNewDesign1 = layout === 'new-design-1';
  const isFinalHybrid = layout === 'final-hybrid';
  const isNewColor = theme === 'theme-new-color';
  const gridClass = isNewColor ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

  if (isFinalHybrid) {
    return (
      <section className={`py-28 ${isNewLayout ? "bg-transparent" : "bg-background"} border-t border-primary/20 relative transition-colors duration-500`}>
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary transition-colors duration-500">Explore Free Insights</span>
              <div className="w-8 h-[2px] bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1E2059] mb-6 transition-colors duration-500">Free Insights</h2>
            <p className="text-muted-foreground font-medium max-w-md mx-auto transition-colors duration-500">Browse 12 ancient and modern insights to find the exact guidance your soul seeks.</p>
          </div>

          <div className={gridClass}>
            {MODALITIES.map((mod) => (
              <Link 
                href={`/modalities/${mod.id}`}
                key={mod.id} 
                id={`modality-${mod.id}`}
                className="group bg-primary/10 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center shadow-lg hover:shadow-[0_10px_30px_rgba(var(--primary),0.15)] cursor-pointer relative overflow-hidden"
              >
                <div className="w-32 h-32 rounded-full bg-[#2A1658] border-2 border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary group-hover:scale-105 transition-all duration-500 shadow-inner relative p-3">
                  <img src={`${mod.image}?v=5`} alt={mod.name} className="w-full h-full object-contain rounded-full transition-all brightness-90 group-hover:brightness-110"  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-500">{mod.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium mb-6 transition-colors duration-500">{mod.desc}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-primary opacity-80 group-hover:opacity-100 transition-colors duration-500">
                  Explore Modality <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isNewDesign1) {
    return (
      <section className="py-28 bg-[#EDF8FC] border-t border-[#CDE9F4]/60 relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#1A92C6]" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1A92C6]">Explore Specialties</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F]">Curated Modalities</h2>
            </div>
            <p className="text-[#17619A]/80 font-medium max-w-md">Browse 12 ancient and modern modalities to find the exact guidance your soul seeks.</p>
          </div>

          <div className={gridClass}>
            {MODALITIES.map((mod) => (
              <div 
                key={mod.id} 
                id={`modality-${mod.id}`}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-[#CDE9F4] hover:border-[#9FD6EE] transition-all duration-500 flex flex-col items-center text-center shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden"
              >
                <div className="w-36 h-36 rounded-full bg-[#EDF8FC] border-2 border-[#9FD6EE]/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700 shadow-inner relative p-2">
                  <img src={`${mod.image}?v=5`} alt={mod.name} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-lg font-bold text-[#12527F] mb-2 group-hover:text-[#1A92C6] transition-colors">{mod.name}</h3>
                <p className="text-xs text-[#17619A]/75 leading-relaxed font-medium mb-4">{mod.desc}</p>
                <Link href="/signup" className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-[#1A92C6] hover:text-[#17619A]">
                  Explore Practitioners <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border-b border-purple-100 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1E2059] mb-6 drop-shadow-sm">Explore by Category</h2>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full mb-6" />
          <p className="text-[#3730A3] text-lg font-light">
            Find the perfect practitioner for your unique journey. 
          </p>
        </div>

        <div className={gridClass}>
          {MODALITIES.map((mod) => (
            <div 
              key={mod.id} 
              id={mod.id} 
              className="group bg-gradient-to-br from-[#2D1B69] to-[#170936] text-[#3A247A] rounded-3xl p-6 border border-primary/5 hover:border-primary/20 transition-all duration-300 text-center flex flex-col items-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer"
            >
              <div className="w-40 h-40 rounded-full bg-primary/[0.03] border-4 border-primary/10 flex items-center justify-center mb-6 group-hover:scale-[1.15] transition-transform duration-700 shadow-xl relative overflow-hidden">
                <div className="absolute inset-2 border border-dashed border-primary/30 rounded-full animate-[spin_30s_linear_infinite]" />
                <img src={`${mod.image}?v=2`} alt={mod.name} className="w-full h-full object-cover rounded-full mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-medium text-[#E2D4FF] font-medium mb-3">{mod.name}</h3>
              <div className="w-8 h-0.5 bg-primary/20 rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
              <p className="text-sm text-[#A78BFA] font-light leading-relaxed mb-6">{mod.desc}</p>
              
              <Link href="/signup" className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
