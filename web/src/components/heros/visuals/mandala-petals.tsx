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

export default function MandalaPetals() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const OUTER_R = 250, MID_R = 160, INNER_R = 90;
  const INNER_COUNT = 8;

  return (
    <div className="relative w-[700px] h-[700px] flex items-center justify-center scale-[0.85] lg:scale-100">
      
      {/* Outer Ring — 12 petals, slowest (90s) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {MODALITIES.map((_, i) => {
          const angle = (i / 12) * 360;
          return (
            <div key={`out-${i}`} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(-${OUTER_R}px)` }}>
              <svg width="55" height="130" viewBox="0 0 60 140" className="drop-shadow-lg">
                <defs>
                  <linearGradient id={`m-out-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4E67CC" />
                    <stop offset="100%" stopColor="#8982D0" />
                  </linearGradient>
                </defs>
                <path d="M30,0 C55,35 55,105 30,140 C5,105 5,35 30,0Z" fill={`url(#m-out-${i})`} opacity="0.8" />
                <path d="M30,15 L30,125" stroke="white" strokeWidth="0.6" opacity="0.25" fill="none" />
                <path d="M20,40 Q30,35 40,40" stroke="white" strokeWidth="0.4" opacity="0.2" fill="none" />
                <path d="M20,70 Q30,65 40,70" stroke="white" strokeWidth="0.4" opacity="0.15" fill="none" />
              </svg>
            </div>
          );
        })}
      </motion.div>

      {/* Middle Ring — 12 petals offset, medium (60s), reverse */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({length: 12}).map((_, i) => {
          const angle = (i / 12) * 360 + 15;
          return (
            <div key={`mid-${i}`} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(-${MID_R}px)` }}>
              <svg width="45" height="100" viewBox="0 0 50 110" className="drop-shadow-md">
                <defs>
                  <linearGradient id={`m-mid-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5F3BA9" />
                    <stop offset="100%" stopColor="#4E67CC" />
                  </linearGradient>
                </defs>
                <path d="M25,0 C48,28 48,82 25,110 C2,82 2,28 25,0Z" fill={`url(#m-mid-${i})`} opacity="0.85" />
                <path d="M25,12 L25,98" stroke="white" strokeWidth="0.5" opacity="0.2" fill="none" />
              </svg>
            </div>
          );
        })}
      </motion.div>

      {/* Inner Ring — 8 petals, fastest (40s) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({length: INNER_COUNT}).map((_, i) => {
          const angle = (i / INNER_COUNT) * 360;
          return (
            <div key={`in-${i}`} className="absolute" style={{ transform: `rotate(${angle}deg) translateY(-${INNER_R}px)` }}>
              <svg width="32" height="72" viewBox="0 0 36 80" className="drop-shadow-sm">
                <defs>
                  <linearGradient id={`m-in-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E2059" />
                    <stop offset="100%" stopColor="#5F3BA9" />
                  </linearGradient>
                </defs>
                <path d="M18,0 C34,20 34,60 18,80 C2,60 2,20 18,0Z" fill={`url(#m-in-${i})`} opacity="0.9" />
              </svg>
            </div>
          );
        })}
      </motion.div>

      {/* STATIC upright labels on outer tips */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const lr = OUTER_R + 75;
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
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white/95 shadow-[0_0_40px_rgba(137,130,208,0.5)] flex items-center justify-center p-2.5 border border-[#8982D0]/30">
        <img src="/main centre logo/girl.png" alt="ZenAuraa" className="w-full h-full object-cover scale-[1.25] mt-2 ml-1" />
      </div>
    </div>
  );
}
