'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', ring: 0 }, { id: 'tarot', name: 'Tarot', ring: 1 },
  { id: 'face-reading', name: 'Face Reading', ring: 2 }, { id: 'palm-reading', name: 'Palm Reading', ring: 0 },
  { id: 'sound-healing', name: 'Sound Healing', ring: 1 }, { id: 'meditation', name: 'Meditation', ring: 2 },
  { id: 'spiritual', name: 'Spiritual', ring: 0 }, { id: 'chakra-healing', name: 'Chakra Healing', ring: 1 },
  { id: 'breathwork', name: 'Breathwork', ring: 2 }, { id: 'dreams', name: 'Dream Predict', ring: 0 },
  { id: 'space-harmony', name: 'Space Harmony', ring: 1 }, { id: 'numerology', name: 'Numerology', ring: 2 },
];

export default function LightParticles() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const RINGS = [150, 210, 270]; // Orbit radii

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Clean Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {RINGS.map((r, idx) => (
          <div 
            key={idx}
            className="absolute rounded-full border border-white/40"
            style={{ width: r * 2, height: r * 2 }}
          />
        ))}
      </div>

      {/* Orbiting Planets (Modalities) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinPlanets 80s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * 360;
          const radius = RINGS[mod.ring];
          const size = 16 + (i % 3) * 6;

          return (
            <div 
              key={mod.id}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
            >
              {/* Un-rotate content so it stays upright relative to screen */}
              <div 
                style={{ transform: `rotate(-${angle}deg)`, animation: 'spinPlanetsReverse 80s linear infinite' }} 
                className="flex flex-row items-center gap-3 relative"
                onClick={() => router.push(`/modalities/${mod.id}`)}
              >
                {/* Glowing Planet */}
                <div 
                  className="rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] border border-white transition-transform group-hover:scale-150"
                  style={{
                    width: size, height: size,
                    background: mod.ring % 2 === 0 ? 'radial-gradient(circle at 30% 30%, #E5D9F2, #5F3BA9)' : 'radial-gradient(circle at 30% 30%, #FFFFFF, #4E67CC)',
                    boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.6)'
                  }}
                />
                <span className="absolute left-[110%] text-xs font-bold text-[#1E2059] opacity-80 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/50">
                  {mod.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Sun Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-[0_0_80px_rgba(255,255,255,1)] flex items-center justify-center p-3">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      <style jsx>{`
        @keyframes spinPlanets {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinPlanetsReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
