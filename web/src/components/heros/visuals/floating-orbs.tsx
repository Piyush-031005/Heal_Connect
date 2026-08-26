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

export default function FloatingOrbs() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">
      {/* Ripple Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className="absolute rounded-full border border-[#8982D0]/30"
            style={{
              width: `${100 + i * 150}px`, height: `${100 + i * 150}px`,
              animation: `ripple 6s linear ${i * 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center p-2">
        <img src="/zenauraa logo main.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      {/* Orbs */}
      {MODALITIES.map((mod, i) => {
        const angle = (i / MODALITIES.length) * Math.PI * 2;
        const radius = 180 + Math.sin(i * 13) * 60; 
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const size = 45 + (i % 4) * 10;
        const delay = (i % 5) * 1;

        return (
          <div 
            key={mod.id}
            onClick={() => router.push(`/modalities/${mod.id}`)}
            className="absolute flex flex-col items-center justify-center group cursor-pointer"
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
              animation: `rise 6s ease-in-out ${delay}s infinite`
            }}
          >
            <div 
              className="rounded-full shadow-lg backdrop-blur-sm relative flex items-center justify-center transition-transform group-hover:scale-110"
              style={{
                width: size, height: size,
                background: 'linear-gradient(135deg, rgba(137, 130, 208, 0.8) 0%, rgba(78, 103, 204, 0.8) 100%)',
              }}
            >
              {/* White Highlight */}
              <div className="absolute top-[15%] left-[20%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[2px]" />
            </div>
            
            <span className="absolute -bottom-6 text-[10px] uppercase tracking-wider font-semibold text-[#1E2059] opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 px-2 py-0.5 rounded-full whitespace-nowrap">
              {mod.name}
            </span>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes rise {
          0% { transform: translate(var(--x, 0), calc(var(--y, 0) + 10px)); opacity: 0.5; }
          50% { transform: translate(var(--x, 0), calc(var(--y, 0) - 10px)); opacity: 1; }
          100% { transform: translate(var(--x, 0), calc(var(--y, 0) + 10px)); opacity: 0.5; }
        }
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
