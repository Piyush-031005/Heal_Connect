"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [{id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},{id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},{id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},{id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},{id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},{id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'}];

export default function FloatingPebbles() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center scale-90 lg:scale-100">
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-[0_0_40px_rgba(109,79,199,0.5)] flex items-center justify-center p-3">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain drop-shadow-md" />
      </div>

      {MODALITIES.map((mod, i) => {
        const angle = (i / MODALITIES.length) * Math.PI * 2;
        const radius = 210; // FIXED RADIUS FOR PERFECT CIRCLE
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const size = 50 + (i % 3) * 15;
        const delay = (i % 5) * 0.5;
        const isReversed = i % 3 === 0;

        return (
          <div 
            key={mod.id}
            onClick={() => router.push(`/modalities/${mod.id}`)}
            className="absolute flex flex-col items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
              '--x': `${x}px`, '--y': `${y}px`,
              animation: `float ${4 + (i % 3)}s ease-in-out ${delay}s infinite alternate`
            } as React.CSSProperties}
          >
            <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg opacity-90">
              <defs>
                <radialGradient id={`grad-peb-${i}`} cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={isReversed ? '#4E67CC' : '#6D4FC7'} />
                  <stop offset="100%" stopColor={isReversed ? '#6D4FC7' : '#4E67CC'} />
                </radialGradient>
              </defs>
              <path 
                d={i % 2 === 0 
                  ? "M40.5,15.5 C65.5,5.5 85.5,25.5 90.5,50.5 C95.5,75.5 75.5,95.5 50.5,90.5 C25.5,85.5 5.5,65.5 10.5,40.5 C15.5,15.5 25.5,20.5 40.5,15.5 Z"
                  : "M50,10 C75,15 90,35 85,60 C80,85 60,95 35,90 C10,85 5,60 15,35 C25,10 40,5 50,10 Z"
                }
                fill={`url(#grad-peb-${i})`}
                className="transition-all duration-300"
              />
            </svg>
            <span className="mt-2 text-xs font-semibold text-[#1E2059] bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap">
              {mod.name}
            </span>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(var(--x, 0), calc(var(--y, 0) - 8px)) rotate(-5deg); }
          100% { transform: translate(var(--x, 0), calc(var(--y, 0) + 8px)) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
