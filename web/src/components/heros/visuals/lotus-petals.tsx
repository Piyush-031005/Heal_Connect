"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [{id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},{id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},{id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},{id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},{id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},{id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'}];

export default function LotusPetals() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[700px] h-[700px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* 3 Concentric Rings */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinSlow 120s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          return (
            <div key={mod.id} className="absolute flex items-center justify-center" style={{ transform: `rotate(${rotation}deg) translateY(-240px)` }}>
              <div style={{ animation: `sway 4s ease-in-out ${i * 0.3}s infinite alternate` }} className="flex flex-col items-center cursor-pointer group" onClick={() => router.push(`/modalities/${mod.id}`)}>
                {/* Fixed Upright Text */}
                <div style={{ transform: `rotate(${-rotation}deg)` }} className="mb-4">
                  <span className="text-xs font-bold text-[#1E2059] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/50 group-hover:scale-110 transition-all">
                    {mod.name}
                  </span>
                </div>
                <svg width="70" height="150" viewBox="0 0 70 150" className="drop-shadow-xl transition-transform group-hover:scale-110">
                  <defs>
                    <linearGradient id={`petal-rich-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={i % 2 === 0 ? '#3B1A77' : '#2A43A6'} />
                      <stop offset="50%" stopColor={i % 2 === 0 ? '#5F3BA9' : '#4E67CC'} />
                      <stop offset="100%" stopColor={i % 2 === 0 ? '#B9A0E4' : '#8982D0'} />
                    </linearGradient>
                  </defs>
                  <path d="M35,0 C70,45 70,105 35,150 C0,105 0,45 35,0 Z" fill={`url(#petal-rich-${i})`} opacity="0.9" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute z-10 w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center p-3 border-4 border-[#8982D0]/40 relative">
        <div className="absolute inset-0 rounded-full border-[6px] border-[#5F3BA9]/20 animate-pulse" />
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain relative z-10" />
      </div>

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sway { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }
      `}</style>
    </div>
  );
}
