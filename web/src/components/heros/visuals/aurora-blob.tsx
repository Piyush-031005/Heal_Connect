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

export default function AuroraBlob() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const LABEL_RADIUS = 270;

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      
      {/* Breathing Nebula — multiple overlapping blurred circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, #5F3BA9, transparent)', filter: 'blur(60px)' }}
          animate={{ scale: [0.9, 1.1, 0.9], x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, #4E67CC, transparent)', filter: 'blur(50px)' }}
          animate={{ scale: [1.1, 0.9, 1.1], x: [30, -30, 30], y: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[280px] h-[280px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #8982D0, transparent)', filter: 'blur(70px)' }}
          animate={{ scale: [0.95, 1.15, 0.95], x: [-15, 25, -15], y: [15, -25, 15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #B9A0E4, transparent)', filter: 'blur(40px)' }}
          animate={{ scale: [1.05, 0.85, 1.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Static orbit labels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * LABEL_RADIUS;
          const y = Math.sin(angle) * LABEL_RADIUS;
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-[11px] font-bold text-[#1E2059] bg-white/70 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-white/40 hover:bg-white hover:scale-110 transition-all">
                {mod.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Center */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white/95 shadow-[0_0_60px_rgba(255,255,255,0.8)] flex items-center justify-center p-3 border border-white/40">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
