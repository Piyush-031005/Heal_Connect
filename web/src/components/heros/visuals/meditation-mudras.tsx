"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [{id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},{id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},{id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},{id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},{id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},{id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'}];

export default function MeditationMudras() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Rotating Circle of Hands */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinSlow 100s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          return (
            <div key={`mudra-${i}`} className="absolute flex items-center justify-center" style={{ transform: `rotate(${rotation}deg) translateY(-210px)` }}>
              
              {/* Line-Art Gyan Mudra (Thumb & Index touching) */}
              <div 
                className="pointer-events-auto cursor-pointer group flex flex-col items-center"
                style={{ animation: `breatheOp 4s ease-in-out ${i * 0.5}s infinite alternate` }}
                onClick={() => router.push(`/modalities/${mod.id}`)}
              >
                {/* Fixed Label */}
                <div style={{ transform: `rotate(${-rotation}deg)` }} className="mb-2">
                  <span className="text-xs font-bold text-[#1E2059] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/50 group-hover:scale-110 transition-all">
                    {mod.name}
                  </span>
                </div>
                
                {/* Elegant Hand SVG */}
                <svg width="50" height="70" viewBox="0 0 100 150" className="drop-shadow-md group-hover:scale-110 transition-transform">
                  <defs>
                    <linearGradient id={`grad-hand-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5F3BA9" />
                      <stop offset="100%" stopColor="#8982D0" />
                    </linearGradient>
                  </defs>
                  {/* Clean outline path mimicking Gyan Mudra */}
                  <path 
                    d="M 50 140 C 40 140, 20 120, 20 80 C 20 60, 25 50, 25 50 
                       C 25 40, 30 35, 40 35 C 50 35, 55 45, 55 55 
                       C 60 40, 65 30, 75 30 C 85 30, 90 40, 90 55 
                       C 90 80, 70 120, 50 140 Z" 
                    fill="none" stroke={`url(#grad-hand-${i})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  {/* Internal lines for thumb/index circle */}
                  <circle cx="45" cy="50" r="10" fill="none" stroke={`url(#grad-hand-${i})`} strokeWidth="2" opacity="0.6" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,1)] flex items-center justify-center p-3 border border-[#8982D0]/20">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes breatheOp { from { opacity: 0.6; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
