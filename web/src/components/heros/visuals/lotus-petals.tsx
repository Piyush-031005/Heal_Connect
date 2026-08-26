'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology' }, { id: 'tarot', name: 'Tarot' },
  { id: 'face-reading', name: 'Face Reading' }, { id: 'palm-reading', name: 'Palm Reading' },
  { id: 'sound-healing', name: 'Sound Healing' }, { id: 'meditation', name: 'Meditation' },
  { id: 'spiritual', name: 'Spiritual' }, { id: 'chakra-healing', name: 'Chakra Healing' },
  { id: 'breathwork', name: 'Breathwork' }, { id: 'dreams', name: 'Dream Predict' },
  { id: 'space-harmony', name: 'Space Harmony' }, { id: 'numerology', name: 'Numerology' },
];

export default function LotusPetals() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Rotating Lotus Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: 'spinSlow 90s linear infinite' }}
      >
        {MODALITIES.map((mod, i) => {
          const rotation = (i / MODALITIES.length) * 360;
          const isAlt = i % 2 === 0;

          return (
            <div 
              key={mod.id}
            onClick={() => router.push(`/modalities/${mod.id}`)}
              className="absolute flex items-center justify-center"
              style={{ transform: `rotate(${rotation}deg) translateY(-160px)` }}
            >
              <div 
                style={{ animation: `sway 4s ease-in-out ${i * 0.3}s infinite alternate` }}
                className="flex flex-col items-center cursor-pointer group"
              >
                <span className="mb-2 text-[11px] font-semibold text-[#1E2059] bg-white/40 px-2 py-0.5 rounded-full whitespace-nowrap transform -rotate-180 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  {mod.name}
                </span>
                <svg width="40" height="80" viewBox="0 0 40 80" className="drop-shadow-md transition-transform group-hover:scale-110">
                  <defs>
                    <linearGradient id={`petal-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isAlt ? '#5F3BA9' : '#4E67CC'} />
                      <stop offset="100%" stopColor={isAlt ? '#8982D0' : '#B9A0E4'} />
                    </linearGradient>
                  </defs>
                  <path d="M20,0 C40,30 40,60 20,80 C0,60 0,30 20,0 Z" fill={`url(#petal-${i})`} opacity="0.85" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Stamen Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center p-3 border-4 border-[#8982D0]/20">
        <img src="/zenauraa logo main.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sway {
          from { transform: rotate(-3deg); }
          to { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
