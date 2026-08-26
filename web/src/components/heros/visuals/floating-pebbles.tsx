"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

export default function FloatingPebbles() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 230;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      {/* Soft halo behind center */}
      <div className="absolute w-40 h-40 rounded-full bg-[#5F3BA9]/20 blur-[60px] animate-pulse" />
      
      {/* Rotating Pebbles Ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
          const variation = (i % 3 === 0 ? -15 : i % 3 === 1 ? 15 : 0);
          const x = Math.cos(angle) * (RADIUS + variation);
          const y = Math.sin(angle) * (RADIUS + variation);
          const size = 65 + (i % 3) * 15; // Increased size
          const isAlt = i % 3 === 0;

          return (
            <motion.div
              key={`peb-${mod.id}`}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{ left: `calc(50% + ${x}px - ${size/2}px)`, top: `calc(50% + ${y}px - ${size/2}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all group-hover:scale-110">
                  <defs>
                    <radialGradient id={`peb-g-${i}`} cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor={isAlt ? '#8982D0' : '#6D4FC7'} />
                      <stop offset="100%" stopColor={isAlt ? '#4E67CC' : '#5F3BA9'} />
                    </radialGradient>
                  </defs>
                  <path
                    d={i % 3 === 0
                      ? "M50,8 C72,8 88,28 90,50 C92,72 72,92 50,90 C28,88 8,72 10,50 C12,28 28,8 50,8Z"
                      : i % 3 === 1
                      ? "M45,10 C68,6 90,30 88,55 C86,80 65,94 42,90 C19,86 6,62 12,38 C18,14 30,12 45,10Z"
                      : "M55,8 C78,14 92,38 85,62 C78,86 52,96 30,85 C8,74 2,48 15,28 C28,8 42,4 55,8Z"
                    }
                    fill={`url(#peb-g-${i})`}
                    opacity="0.9"
                  />
                </svg>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Static Upright Labels (Separate Layer) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
          const labelR = RADIUS + 60; // Labels slightly outside the shapes
          const x = Math.cos(angle) * labelR;
          const y = Math.sin(angle) * labelR;
          return (
            <div
              key={`label-${mod.id}`}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-[10px] font-bold text-[#1E2059] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/40 hover:bg-white hover:scale-110 transition-all">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white/95 shadow-[0_0_40px_rgba(109,79,199,0.5)] flex items-center justify-center p-3 backdrop-blur-sm border border-white/50">
        <img src="/center_logo_final.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
