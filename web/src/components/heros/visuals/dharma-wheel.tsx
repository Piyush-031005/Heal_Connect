"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [{id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},{id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},{id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},{id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},{id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},{id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'}];

export default function DharmaWheel() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Rotating Wheel Background */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinSlow 120s linear infinite' }}>
        
        {/* Outer Ring */}
        <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-[#8982D0] border-dashed opacity-60" />
        <div className="absolute w-[480px] h-[480px] rounded-full border-2 border-[#5F3BA9] opacity-40" />

        {/* Spokes */}
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          return (
            <div key={`spoke-${i}`} className="absolute w-[2px] h-[240px] origin-bottom pointer-events-none" style={{ transform: `rotate(${rotation}deg) translateY(-240px)` }}>
              <div className="w-full h-full bg-gradient-to-b from-[#4E67CC] to-[#5F3BA9] opacity-70" />
              <div className="absolute -top-3 -left-1.5 w-3 h-3 rounded-full bg-[#8982D0]" />
            </div>
          );
        })}
      </div>

      {/* Static Modality Labels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          // Calculate exact position for labels to keep them static
          const radius = 280;
          const x = Math.sin(rotation * (Math.PI / 180)) * radius;
          const y = -Math.cos(rotation * (Math.PI / 180)) * radius;

          return (
            <div 
              key={mod.id} 
              className="absolute pointer-events-auto cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-xs font-bold text-[#1E2059] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-[#5F3BA9]/30 hover:scale-110 hover:bg-white transition-all flex items-center justify-center">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Breathing Center Hub */}
      <div className="absolute z-10 flex items-center justify-center">
        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#5F3BA9] to-[#8982D0] opacity-20 filter blur-xl animate-pulse" />
        <div className="w-28 h-28 rounded-full bg-white shadow-[0_0_50px_rgba(137,130,208,0.6)] flex items-center justify-center p-3 relative z-10 border-2 border-[#5F3BA9]/20">
          <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
