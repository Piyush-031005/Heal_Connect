'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology' }, { id: 'tarot', name: 'Tarot' },
  { id: 'face-reading', name: 'Face Reading' }, { id: 'palm-reading', name: 'Palm Reading' },
  { id: 'sound-healing', name: 'Sound Healing' }, { id: 'meditation', name: 'Meditation' },
  { id: 'spiritual', name: 'Spiritual' }, { id: 'chakra-healing', name: 'Chakra Healing' },
  { id: 'breathwork', name: 'Breathwork' }, { id: 'dreams', name: 'Dream Predict' },
  { id: 'space-harmony', name: 'Space Harmony' }, { id: 'numerology', name: 'Numerology' },
];

export default function AuroraBlob() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Morphing Aurora Blob Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-80">
        <div 
          className="w-full h-full absolute transition-all"
          style={{
            background: 'linear-gradient(120deg, #1E2059, #5F3BA9, #4E67CC, #8982D0)',
            backgroundSize: '300% 300%',
            animation: 'blob 10s ease-in-out infinite, gradientShift 15s ease infinite',
            filter: 'blur(10px)',
            opacity: 0.7
          }}
        />
        <div 
          className="w-[80%] h-[80%] absolute transition-all"
          style={{
            background: 'linear-gradient(45deg, #4E67CC, #B9A0E4, #5F3BA9)',
            backgroundSize: '300% 300%',
            animation: 'blob 8s ease-in-out infinite reverse, gradientShift 12s ease infinite',
            filter: 'blur(8px)',
            opacity: 0.9
          }}
        />
      </div>

      {/* Fixed Orbit Text Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * Math.PI * 2;
          const radius = 230; 
          const x = 250 + Math.cos(angle) * radius;
          const y = 250 + Math.sin(angle) * radius;

          return (
            <div 
              key={mod.id}
              onClick={() => router.push(`/modalities/${mod.id}`)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
            >
              <span className="text-[12px] font-bold text-[#1E2059] opacity-90 whitespace-nowrap bg-white/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 pointer-events-auto cursor-pointer hover:bg-white/70 hover:scale-105 transition-all">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,0.8)] flex items-center justify-center p-3 relative">
        <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
        <img src="/zenauraa logo main.png" alt="ZenAuraa" className="w-full h-full object-contain relative z-10" />
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
