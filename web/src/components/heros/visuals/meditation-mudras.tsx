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

// Clean Gyan Mudra SVG path — elegant, not eerie
const MUDRA_PATHS = [
  // Gyan Mudra (thumb-index)
  "M30,85 C25,80 18,65 18,50 C18,42 22,38 28,38 C32,38 35,42 35,48 C35,42 38,35 44,33 C50,31 55,35 55,42 C55,50 50,60 45,70 L42,78 C38,82 34,85 30,85Z M32,48 C32,44 30,42 28,42 C26,42 24,44 24,48 C24,52 26,54 28,52",
  // Dhyana Mudra (cupped)
  "M20,80 C15,75 12,60 15,48 C18,36 25,30 32,30 C39,30 46,36 49,48 C52,60 49,75 44,80 L32,85Z M22,55 Q32,50 42,55",
  // Prithvi Mudra (ring finger)
  "M28,82 C22,78 16,62 16,48 C16,38 20,32 26,32 C30,32 34,36 34,42 L36,38 C38,34 42,32 46,34 C50,36 52,42 50,50 C48,58 42,72 36,80Z",
];

export default function MeditationMudras() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 220;

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      
      {/* Slowly rotating circle of hands */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
      >
        {MODALITIES.map((mod, i) => {
          const angle = (i / 12) * 360;
          const pathIdx = i % MUDRA_PATHS.length;
          return (
            <div key={`hand-${i}`} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(-${RADIUS}px)` }}>
              <motion.svg
                width="45" height="60" viewBox="0 0 65 90"
                className="drop-shadow-md"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <defs>
                  <linearGradient id={`hand-g-${i}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5F3BA9" />
                    <stop offset="100%" stopColor="#8982D0" />
                  </linearGradient>
                </defs>
                <path d={MUDRA_PATHS[pathIdx]} fill="none" stroke={`url(#hand-g-${i})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </div>
          );
        })}
      </motion.div>

      {/* Static upright labels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const lr = RADIUS + 55;
          const x = Math.cos(angle) * lr;
          const y = Math.sin(angle) * lr;
          return (
            <div
              key={`lbl-${mod.id}`}
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
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white/95 shadow-[0_0_50px_rgba(255,255,255,0.7)] flex items-center justify-center p-2.5 border border-[#8982D0]/20">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
