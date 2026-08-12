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
  const { layout } = useLayout();
  const isNewDesign1 = layout === 'new-design-1';
  const isFinalHybrid = layout === 'final-hybrid';

  if (isFinalHybrid) {
    return (
      <section className="py-28 bg-[#4D316B] border-t border-[#694091]/50 relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B79AE6]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#B79AE6]">Explore Free Insights</span>
              <div className="w-8 h-[2px] bg-[#B79AE6]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#F8F7FA] mb-6">Free Insights</h2>
            <p className="text-[#B79AE6] font-medium max-w-md mx-auto">Browse 12 ancient and modern insights to find the exact guidance your soul seeks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODALITIES.map((mod) => (
              <Link 
                href={`/modalities/${mod.id}`}
                key={mod.id} 
                id={`modality-${mod.id}`}
                className="group bg-[#7A48AB]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#694091] hover:border-[#B79AE6]/50 transition-all duration-500 flex flex-col items-center text-center shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] cursor-pointer relative overflow-hidden"
              >
                <div className="w-32 h-32 rounded-full bg-[#4D316B] border-2 border-[#694091] flex items-center justify-center mb-6 group-hover:border-[#B79AE6] group-hover:scale-105 transition-all duration-500 shadow-inner relative p-3">
                  <img src={`${mod.image}?v=5`} alt={mod.name} className="w-full h-full object-contain rounded-full brightness-90 group-hover:brightness-110 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-[#F8F7FA] mb-2 group-hover:text-[#B79AE6] transition-colors">{mod.name}</h3>
                <p className="text-xs text-[#B79AE6] leading-relaxed font-medium mb-6">{mod.desc}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-[#B79AE6] opacity-80 group-hover:opacity-100 hover:text-[#F8F7FA] transition-colors">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="w-40 h-40 rounded-full bg-primary/[0.03] border-4 border-primary/10 flex items-center justify-center mb-6 group-hover:scale-[1.15] transition-transform duration-700 shadow-xl relative overflow-hidden">
                <div className="absolute inset-2 border border-dashed border-primary/30 rounded-full animate-[spin_30s_linear_infinite]" />
                <img src={`${mod.image}?v=2`} alt={mod.name} className="w-full h-full object-cover rounded-full mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">{mod.name}</h3>
              <div className="w-8 h-0.5 bg-primary/20 rounded-full mb-4 group-hover:w-16 transition-all duration-300" />
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">{mod.desc}</p>
              
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
