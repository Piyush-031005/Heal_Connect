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

export default function FloatingOrbs() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 240;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Slow rotating ripple rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
      >
        {[200, 320, 440].map((r, idx) => (
          <motion.div
            key={`ring-${idx}`}
            className="absolute rounded-full border border-[#8982D0]/30"
            style={{ width: r, height: r }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5 + idx * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* Rotating Orbs Ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
      >
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;
          const size = 65 + (i % 4) * 12; // Increased size

          return (
            <motion.div
              key={`orb-${mod.id}`}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{ left: `calc(50% + ${x}px - ${size/2}px)`, top: `calc(50% + ${y}px - ${size/2}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <div
                  className="rounded-full relative group-hover:scale-110 transition-transform shadow-[0_4px_25px_rgba(95,59,169,0.3)]"
                  style={{
                    width: size, height: size,
                    background: `linear-gradient(135deg, rgba(137,130,208,0.85), rgba(78,103,204,0.85))`,
                    border: '1px solid rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Glass highlight */}
                  <div className="absolute top-[12%] left-[18%] w-[35%] h-[35%] bg-white/60 rounded-full blur-[1px]" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Static Upright Labels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
          const labelR = RADIUS + 65; // Push labels slightly out
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
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white/95 shadow-xl flex items-center justify-center p-3 backdrop-blur-sm border border-white/40">
        <img src="/main centre logo/girl.png" alt="ZenAuraa" className="w-full h-full object-cover scale-[1.25] mt-2 ml-1" />
      </div>

    </div>
  );
}
