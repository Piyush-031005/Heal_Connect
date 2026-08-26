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

  const RADIUS = 200;

  return (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">
      {/* Soft halo behind center */}
      <div className="absolute w-40 h-40 rounded-full bg-[#5F3BA9]/20 blur-[60px] animate-pulse" />
      
      {/* Center Logo */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white/90 shadow-[0_0_30px_rgba(109,79,199,0.4)] flex items-center justify-center p-3 backdrop-blur-sm border border-white/50">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      {MODALITIES.map((mod, i) => {
        const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
        const variation = (i % 3 === 0 ? -10 : i % 3 === 1 ? 10 : 0);
        const x = Math.cos(angle) * (RADIUS + variation);
        const y = Math.sin(angle) * (RADIUS + variation);
        const size = 44 + (i % 3) * 10;
        const isAlt = i % 3 === 0;

        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5, type: 'spring' }}
            onClick={() => router.push(`/modalities/${mod.id}`)}
            className="absolute flex flex-col items-center cursor-pointer group"
            style={{ left: `calc(50% + ${x}px - ${size/2}px)`, top: `calc(50% + ${y}px - ${size/2}px)` }}
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md group-hover:drop-shadow-xl transition-all group-hover:scale-110">
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
                  opacity="0.85"
                />
              </svg>
            </motion.div>
            <span className="mt-1.5 text-[10px] font-semibold text-[#1E2059] bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-white/40 group-hover:bg-white group-hover:scale-105 transition-all">
              {mod.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
