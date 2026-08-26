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

export default function DharmaWheel() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Draw detailed wheel on canvas
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const S = 550;
    canvas.width = S; canvas.height = S;
    const cx = S / 2, cy = S / 2;

    let rotation = 0;
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      rotation += 0.0003; // very slow — ~120s per rotation

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      // Outer ring — dotted pattern
      const outerR = 230;
      ctx.beginPath();
      ctx.arc(0, 0, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = '#8982D0';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Second outer ring
      ctx.beginPath();
      ctx.arc(0, 0, outerR - 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(137,130,208,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.strokeStyle = '#5F3BA9';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 12 Spokes with gradient effect
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = Math.cos(angle) * 55;
        const y1 = Math.sin(angle) * 55;
        const x2 = Math.cos(angle) * (outerR - 15);
        const y2 = Math.sin(angle) * (outerR - 15);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, '#5F3BA9');
        grad.addColorStop(1, '#4E67CC');

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Spoke end ornament
        ctx.beginPath();
        ctx.arc(x2, y2, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#8982D0';
        ctx.fill();

        // Decorative dots along spoke
        for (let d = 0.3; d < 0.8; d += 0.2) {
          const dx = x1 + (x2 - x1) * d;
          const dy = y1 + (y2 - y1) * d;
          ctx.beginPath();
          ctx.arc(dx, dy, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(137,130,208,0.5)';
          ctx.fill();
        }
      }

      // Outer ornamental dots
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const ox = Math.cos(angle) * (outerR - 5);
        const oy = Math.sin(angle) * (outerR - 5);
        ctx.beginPath();
        ctx.arc(ox, oy, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#8982D0' : 'rgba(95,59,169,0.6)';
        ctx.fill();
      }

      ctx.restore();
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: 550, height: 550 }} />

      {/* Static Labels — do NOT rotate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r = 270;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div
              key={mod.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-[10px] font-bold text-[#1E2059] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm border border-[#5F3BA9]/20 hover:bg-white hover:scale-110 transition-all">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Breathing Center Hub */}
      <div className="absolute z-10 flex items-center justify-center">
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-[#5F3BA9]/15 filter blur-xl"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="w-24 h-24 rounded-full bg-white/95 shadow-xl flex items-center justify-center p-2.5 relative z-10 border border-[#5F3BA9]/20">
          <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
}
