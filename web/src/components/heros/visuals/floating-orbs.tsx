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
            className="absolute rounded-full border-2 border-[#8982D0]/40"
            style={{
              width: `${150 + i * 140}px`, height: `${150 + i * 140}px`,
              animation: `ripple 6s linear ${i * 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse" />
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain relative z-10" />
      </div>

      {/* Orbs */}
      {MODALITIES.map((mod, i) => {
        const angle = (i / MODALITIES.length) * Math.PI * 2;
        const radius = 190 + Math.sin(i * 13) * 60; 
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const size = 50 + (i % 4) * 15;
        const delay = (i % 5) * 1;

        return (
          <div 
            key={mod.id}
            onClick={() => router.push(`/modalities/${mod.id}`)}
            className="absolute flex flex-col items-center justify-center group cursor-pointer"
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
              '--x': `${x}px`,
              '--y': `${y}px`,
              animation: `rise 6s ease-in-out ${delay}s infinite`
            } as React.CSSProperties}
          >
            <div 
              className="rounded-full shadow-[0_8px_32px_rgba(31,38,135,0.2)] border border-white/40 backdrop-blur-md relative flex items-center justify-center transition-transform group-hover:scale-110"
              style={{
                width: size, height: size,
                background: 'linear-gradient(135deg, rgba(137, 130, 208, 0.85) 0%, rgba(78, 103, 204, 0.85) 100%)',
              }}
            >
              {/* White Highlight for Glass Effect */}
              <div className="absolute top-[10%] left-[15%] w-[35%] h-[35%] bg-white/60 rounded-full blur-[2px]" />
            </div>
            
            <span className="absolute -bottom-8 text-[11px] uppercase tracking-wider font-bold text-[#1E2059] opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/50">
              {mod.name}
            </span>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes rise {
          0% { transform: translate(var(--x, 0), calc(var(--y, 0) + 15px)); opacity: 0.6; }
          50% { transform: translate(var(--x, 0), calc(var(--y, 0) - 15px)); opacity: 1; }
          100% { transform: translate(var(--x, 0), calc(var(--y, 0) + 15px)); opacity: 0.6; }
        }
        @keyframes ripple {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
