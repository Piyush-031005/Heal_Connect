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

  const RADIUS = 220;

  return (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">
      {/* Ripple rings */}
      {[180, 280, 380].map((r, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full border border-[#8982D0]/30"
          style={{ width: r, height: r }}
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Center */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white/90 shadow-xl flex items-center justify-center p-3 backdrop-blur-sm border border-white/40">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      {MODALITIES.map((mod, i) => {
        const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        const size = 42 + (i % 4) * 8;

        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4, type: 'spring' }}
            onClick={() => router.push(`/modalities/${mod.id}`)}
            className="absolute flex flex-col items-center cursor-pointer group"
            style={{ left: `calc(50% + ${x}px - ${size/2}px)`, top: `calc(50% + ${y}px - ${size/2}px)` }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <div
                className="rounded-full relative group-hover:scale-110 transition-transform shadow-[0_4px_20px_rgba(95,59,169,0.25)]"
                style={{
                  width: size, height: size,
                  background: `linear-gradient(135deg, rgba(137,130,208,0.8), rgba(78,103,204,0.8))`,
                  border: '1px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Glass highlight */}
                <div className="absolute top-[12%] left-[18%] w-[30%] h-[30%] bg-white/50 rounded-full blur-[1px]" />
              </div>
            </motion.div>
            <span className="mt-1.5 text-[10px] font-semibold text-[#1E2059] bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap border border-white/40 opacity-80 group-hover:opacity-100 transition-all">
              {mod.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
