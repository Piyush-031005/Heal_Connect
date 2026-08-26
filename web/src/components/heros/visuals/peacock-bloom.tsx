"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [{id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},{id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},{id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},{id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},{id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},{id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'}];

export default function PeacockBloom() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[700px] h-[700px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Scale Breathing Fan Container */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'breatheScale 8s ease-in-out infinite alternate' }}>
        
        {/* 12 Feathers */}
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          return (
            <div key={`feather-${i}`} className="absolute origin-bottom flex items-end justify-center pointer-events-none" style={{ transform: `rotate(${rotation}deg)`, height: '560px' }}>
              <div style={{ animation: `shimmer 4s ease-in-out ${i * 0.3}s infinite alternate` }} className="origin-bottom">
                <svg width="80" height="280" viewBox="0 0 100 300" className="drop-shadow-lg opacity-90">
                  <defs>
                    <radialGradient id={`grad-feather-${i}`} cx="50%" cy="10%" r="90%">
                      <stop offset="0%" stopColor="#B9A0E4" />
                      <stop offset="40%" stopColor="#8982D0" />
                      <stop offset="70%" stopColor="#5F3BA9" />
                      <stop offset="100%" stopColor="#1E2059" />
                    </radialGradient>
                  </defs>
                  {/* Feather Shape */}
                  <path d="M50,0 C80,20 100,60 90,150 C80,240 55,290 50,300 C45,290 20,240 10,150 C0,60 20,20 50,0 Z" fill={`url(#grad-feather-${i})`} />
                  <ellipse cx="50" cy="40" rx="15" ry="20" fill="#5F3BA9" opacity="0.6" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static Labels Overlaid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          const radius = 290;
          const x = Math.sin(rotation * (Math.PI / 180)) * radius;
          const y = -Math.cos(rotation * (Math.PI / 180)) * radius;

          return (
            <div 
              key={mod.id} 
              className="absolute pointer-events-auto cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-xs font-bold text-[#1E2059] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-md border border-[#B9A0E4]/40 hover:scale-110 hover:bg-white transition-all">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Logo (replaces peacock body) */}
      <div className="absolute z-10 w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center p-3 border-4 border-[#5F3BA9]/30 relative">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain relative z-10 drop-shadow-md" />
      </div>

      <style jsx>{`
        @keyframes breatheScale { from { transform: scale(0.96); } to { transform: scale(1.04); } }
        @keyframes shimmer { from { transform: rotate(-2deg); opacity: 0.8; } to { transform: rotate(2deg); opacity: 1; } }
      `}</style>
    </div>
  );
}
