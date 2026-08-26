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

export default function PeacockBloom() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const FEATHER_COUNT = 24; // Double for density
  const LABEL_RADIUS = 280;

  return (
    <div className="relative w-[700px] h-[700px] flex items-center justify-center scale-[0.85] lg:scale-100">
      
      {/* Breathing feather fan */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({length: FEATHER_COUNT}).map((_, i) => {
          const angle = (i / FEATHER_COUNT) * 360;
          const isLong = i % 2 === 0;
          const len = isLong ? 260 : 220;
          const width = isLong ? 50 : 38;
          // Gradient position shifts per feather for blend effect
          const colorPos = i / FEATHER_COUNT;

          return (
            <motion.div
              key={`feather-${i}`}
              className="absolute origin-bottom"
              style={{ transform: `rotate(${angle}deg)`, height: len }}
              animate={{ rotate: [angle - 1.5, angle + 1.5, angle - 1.5] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            >
              <svg width={width} height={len} viewBox={`0 0 ${width} ${len}`} className="drop-shadow-md" style={{ opacity: 0.75 + colorPos * 0.15 }}>
                <defs>
                  <linearGradient id={`feath-${i}`} x1="0.5" y1="1" x2="0.5" y2="0">
                    <stop offset="0%" stopColor="#1E2059" />
                    <stop offset="30%" stopColor="#5F3BA9" />
                    <stop offset="60%" stopColor="#8982D0" />
                    <stop offset="100%" stopColor="#B9A0E4" />
                  </linearGradient>
                </defs>
                <path d={`M${width/2},0 C${width},${len*0.15} ${width},${len*0.7} ${width/2},${len} C0,${len*0.7} 0,${len*0.15} ${width/2},0Z`} fill={`url(#feath-${i})`} />
                {/* Eye spot */}
                {isLong && <ellipse cx={width/2} cy={len*0.25} rx={width*0.18} ry={len*0.05} fill="#5F3BA9" opacity="0.5" />}
              </svg>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Static upright labels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * LABEL_RADIUS;
          const y = Math.sin(angle) * LABEL_RADIUS;
          return (
            <div
              key={mod.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-[10px] font-bold text-[#1E2059] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full whitespace-nowrap shadow-md border border-[#B9A0E4]/30 hover:bg-white hover:scale-110 transition-all">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Logo — peacock body position */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white/95 shadow-2xl flex items-center justify-center p-3 border-2 border-[#5F3BA9]/20">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
