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
    <div className="relative w-[600px] h-[600px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* Deep Nebula Background replacing the broken blob */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full opacity-90 shadow-[0_0_100px_rgba(95,59,169,0.5)] bg-[#1E2059]" style={{ animation: 'breatheNebula 10s ease-in-out infinite alternate' }}>
        <div className="absolute w-[400px] h-[400px] bg-[#5F3BA9] rounded-full mix-blend-screen filter blur-[60px] opacity-70 animate-pulse" style={{ transform: 'translate(-50px, -50px)' }} />
        <div className="absolute w-[350px] h-[350px] bg-[#4E67CC] rounded-full mix-blend-screen filter blur-[70px] opacity-70" style={{ transform: 'translate(100px, 50px)', animation: 'spin 20s linear infinite' }} />
        <div className="absolute w-[450px] h-[450px] bg-[#B9A0E4] rounded-full mix-blend-screen filter blur-[80px] opacity-60" style={{ transform: 'translate(-50px, 150px)', animation: 'spin 30s linear infinite reverse' }} />
      </div>

      {/* Orbit Ring Labels */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spin 120s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const angle = (i / MODALITIES.length) * 360;
          const radius = 290; 

          return (
            <div 
              key={mod.id}
              className="absolute flex items-center justify-center"
              style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
            >
              <div style={{ transform: `rotate(-${angle}deg)`, animation: 'spinReverse 120s linear infinite' }}>
                <span 
                  onClick={() => router.push(`/modalities/${mod.id}`)}
                  className="text-[13px] font-bold text-white bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30 pointer-events-auto cursor-pointer hover:bg-white/30 hover:scale-110 hover:border-white transition-all shadow-[0_4px_15px_rgba(0,0,0,0.2)] whitespace-nowrap flex items-center justify-center"
                >
                  {mod.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-10 w-32 h-32 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,0.8)] flex items-center justify-center p-3">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>

      <style jsx>{`
        @keyframes breatheNebula {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
