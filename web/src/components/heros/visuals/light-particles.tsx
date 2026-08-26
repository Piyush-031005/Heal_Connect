'use client';
import { useEffect, useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology' }, { id: 'tarot', name: 'Tarot' },
  { id: 'face-reading', name: 'Face Reading' }, { id: 'palm-reading', name: 'Palm Reading' },
  { id: 'sound-healing', name: 'Sound Healing' }, { id: 'meditation', name: 'Meditation' },
  { id: 'spiritual', name: 'Spiritual' }, { id: 'chakra-healing', name: 'Chakra Healing' },
  { id: 'breathwork', name: 'Breathwork' }, { id: 'dreams', name: 'Dream Predict' },
  { id: 'space-harmony', name: 'Space Harmony' }, { id: 'numerology', name: 'Numerology' },
];

export default function LightParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      {/* Constellation Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ animation: 'spinParallax 120s linear infinite' }}>
        <g stroke="#B9A0E4" strokeWidth="1" strokeOpacity="0.2">
          {MODALITIES.map((mod, i) => {
            const angle1 = (i / MODALITIES.length) * Math.PI * 2;
            const r1 = 120 + ((i*7)%3) * 50;
            const x1 = 300 + Math.cos(angle1) * r1;
            const y1 = 300 + Math.sin(angle1) * r1;
            
            const nextI = (i + 1) % MODALITIES.length;
            const angle2 = (nextI / MODALITIES.length) * Math.PI * 2;
            const r2 = 120 + ((nextI*7)%3) * 50;
            const x2 = 300 + Math.cos(angle2) * r2;
            const y2 = 300 + Math.sin(angle2) * r2;
            
            return <line key={`l1-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </svg>

      {/* Orbiting Particles */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spinParallax 120s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * 360;
          const radius = 120 + ((i*7)%3) * 50;
          const size = 6 + (i % 3) * 4;

          return (
            <div 
              key={mod.id}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
            >
              {/* Un-rotate content so it stays upright relative to screen (approx) */}
              <div style={{ transform: `rotate(-${angle}deg)`, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <div 
                  className="rounded-full shadow-[0_0_15px_rgba(137,130,208,0.8)]"
                  style={{
                    width: size, height: size,
                    background: 'radial-gradient(circle, #8982D0 0%, #4E67CC 100%)',
                    animation: `twinkle ${2 + i%3}s ease-in-out infinite alternate`
                  }}
                />
                <span className="text-[11px] font-semibold text-[#1E2059] opacity-70 group-hover:opacity-100 transition-opacity bg-white/40 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {mod.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Sun Logo */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white shadow-[0_0_50px_rgba(78,103,204,0.6)] flex items-center justify-center p-2">
        <img src="/zenauraa logo main.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      <style jsx>{`
        @keyframes spinParallax {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0% { opacity: 0.4; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
