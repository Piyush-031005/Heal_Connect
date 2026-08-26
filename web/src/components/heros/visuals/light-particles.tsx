"use client";
import { useEffect, useState, useRef } from 'react';
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

export default function LightParticles() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Draw constellation lines on canvas
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 550, H = 550;
    canvas.width = W; canvas.height = H;
    const cx = W / 2, cy = H / 2;
    const RADIUS = 210;

    const points = MODALITIES.map((_, i) => {
      const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(angle) * RADIUS, y: cy + Math.sin(angle) * RADIUS };
    });

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame += 0.003;

      // Draw connecting lines
      for (let i = 0; i < points.length; i++) {
        const next = (i + 1) % points.length;
        const skip = (i + 2) % points.length;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[next].x, points[next].y);
        ctx.strokeStyle = 'rgba(137,130,208,0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cross lines for some
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[skip].x, points[skip].y);
          ctx.strokeStyle = 'rgba(78,103,204,0.15)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw twinkling background stars
      for (let s = 0; s < 40; s++) {
        const sx = (Math.sin(s * 47.3 + frame) * 0.5 + 0.5) * W;
        const sy = (Math.cos(s * 31.7 + frame * 0.7) * 0.5 + 0.5) * H;
        const opacity = 0.1 + Math.sin(frame * 2 + s) * 0.15;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185,160,228,${opacity})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [mounted]);

  if (!mounted) return null;

  const RADIUS = 210;

  return (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: 550, height: 550 }} />

      {/* Center */}
      <div className="absolute z-10 w-24 h-24 rounded-full bg-white/90 shadow-[0_0_50px_rgba(95,59,169,0.4)] flex items-center justify-center p-3 border border-white/40">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      {MODALITIES.map((mod, i) => {
        const angle = (i / MODALITIES.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        const dotSize = 8 + (i % 3) * 3;

        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => router.push(`/modalities/${mod.id}`)}
            className="absolute flex flex-col items-center cursor-pointer group"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              className="rounded-full"
              style={{
                width: dotSize, height: dotSize,
                background: i % 2 === 0 ? 'radial-gradient(circle, #8982D0, #4E67CC)' : 'radial-gradient(circle, #B9A0E4, #5F3BA9)',
                boxShadow: `0 0 ${dotSize}px rgba(137,130,208,0.8)`,
              }}
            />
            <span className="mt-2 text-[10px] font-bold text-[#1E2059] bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm border border-white/40 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
              {mod.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
