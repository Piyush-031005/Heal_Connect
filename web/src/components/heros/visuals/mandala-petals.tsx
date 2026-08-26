"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [{id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},{id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},{id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},{id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},{id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},{id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'}];

export default function MandalaPetals() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const INNER_PETALS = 8;
  const MIDDLE_PETALS = 12;

  return (
    <div className="relative w-[700px] h-[700px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Outer Ring (12 Petals) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinSlow 90s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          return (
            <div key={mod.id} className="absolute flex items-center justify-center" style={{ transform: `rotate(${rotation}deg) translateY(-260px)` }}>
              <div className="flex flex-col items-center cursor-pointer group" onClick={() => router.push(`/modalities/${mod.id}`)}>
                {/* Fixed Upright Text */}
                <div style={{ transform: `rotate(${-rotation}deg)` }} className="mb-2">
                  <span className="text-xs font-bold text-[#1E2059] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/50 group-hover:scale-110 transition-all">
                    {mod.name}
                  </span>
                </div>
                <svg width="60" height="140" viewBox="0 0 60 140" className="drop-shadow-lg transition-transform group-hover:scale-110">
                  <defs>
                    <linearGradient id={`grad-out-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4E67CC" />
                      <stop offset="100%" stopColor="#8982D0" />
                    </linearGradient>
                  </defs>
                  <path d="M30,0 C60,40 60,100 30,140 C0,100 0,40 30,0 Z" fill={`url(#grad-out-${i})`} opacity="0.85" />
                  {/* Subtle Vein */}
                  <path d="M30,10 L30,130" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Ring (12 Petals) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinSlowReverse 60s linear infinite' }}>
        {Array.from({length: MIDDLE_PETALS}).map((_, i) => {
          const rotation = (i / MIDDLE_PETALS) * 360 + 15; // Offset by 15deg
          return (
            <div key={`mid-${i}`} className="absolute flex items-center justify-center pointer-events-none" style={{ transform: `rotate(${rotation}deg) translateY(-160px)` }}>
              <svg width="50" height="110" viewBox="0 0 50 110" className="drop-shadow-md">
                <defs>
                  <linearGradient id={`grad-mid-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5F3BA9" />
                    <stop offset="100%" stopColor="#4E67CC" />
                  </linearGradient>
                </defs>
                <path d="M25,0 C50,30 50,80 25,110 C0,80 0,30 25,0 Z" fill={`url(#grad-mid-${i})`} opacity="0.9" />
                <path d="M25,10 L25,100" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Inner Ring (8 Petals) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinSlow 40s linear infinite' }}>
        {Array.from({length: INNER_PETALS}).map((_, i) => {
          const rotation = (i / INNER_PETALS) * 360;
          return (
            <div key={`in-${i}`} className="absolute flex items-center justify-center pointer-events-none" style={{ transform: `rotate(${rotation}deg) translateY(-90px)` }}>
              <svg width="40" height="90" viewBox="0 0 40 90" className="drop-shadow-sm">
                <defs>
                  <linearGradient id={`grad-in-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E2059" />
                    <stop offset="100%" stopColor="#5F3BA9" />
                  </linearGradient>
                </defs>
                <path d="M20,0 C40,25 40,65 20,90 C0,65 0,25 20,0 Z" fill={`url(#grad-in-${i})`} opacity="0.95" />
                <path d="M20,10 L20,80" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.8)] flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 rounded-full border-4 border-[#8982D0]/40 animate-pulse" />
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain relative z-10" />
      </div>

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinSlowReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}
