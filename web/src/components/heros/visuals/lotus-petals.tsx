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

export default function LotusPetals() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 230;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center">
      {/* Slowly rotating petal ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * 360;
          const isAlt = i % 2 === 0;
          return (
            <div key={mod.id} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(-${RADIUS}px)` }}>
              <motion.svg
                width="55" height="130" viewBox="0 0 60 140"
                className="drop-shadow-lg cursor-pointer hover:scale-110 transition-transform"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 3 + (i % 2), repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => router.push(`/modalities/${mod.id}`)}
              >
                <defs>
                  <linearGradient id={`lp-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isAlt ? '#3B1A77' : '#2A43A6'} />
                    <stop offset="50%" stopColor={isAlt ? '#5F3BA9' : '#4E67CC'} />
                    <stop offset="100%" stopColor={isAlt ? '#D5B6DC' : '#8982D0'} />
                  </linearGradient>
                </defs>
                <path d="M30,0 C55,35 55,105 30,140 C5,105 5,35 30,0Z" fill={`url(#lp-${i})`} opacity="0.88" />
                <path d="M30,15 L30,125" stroke="white" strokeWidth="0.5" opacity="0.3" fill="none" />
              </motion.svg>
            </div>
          );
        })}
      </motion.div>

      {/* STATIC upright labels — these do NOT rotate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
          const labelR = RADIUS + 80;
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

      {/* Center */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white/90 shadow-2xl flex items-center justify-center p-3 border-2 border-[#8982D0]/30">
        <img src="/main centre logo/new.png" alt="ZenAuraa" className="w-full h-full object-cover scale-[1.25] mt-2 ml-1" />
      </div>
    </div>
  );
}
