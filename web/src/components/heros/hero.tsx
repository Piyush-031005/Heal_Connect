'use client';
import GhostFibers from '@/components/GhostFibers';


import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Sparkles, Flower2, Star, MessageCircle, Phone } from 'lucide-react';
import { useTheme } from 'next-themes';
import ModalityWheel from '@/components/modality-wheel';
import OpticalWheel from '@/components/optical-wheel';

// --- PRIMARY LAYOUT HERO (Locked) ---
function PrimaryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 min-h-[90vh] flex items-center" style={{ background: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 30%, #C4B5FD 60%, #A78BFA 100%)', color: '#1e1b4b' }}>
      <GhostFibers lineColor="#8345bd" glowColor="#7c41e0" speed={0.2} scale={2} rotation={0} rotationSpeed={0.25} layers={4} waveAmplitude={0.022} waveFrequency={4} waveSpeed={0.18} layerSpeed={0.1} twist={0.15} twistFrequency={7} twistSpeed={1.5} lineFrequency={10} lineSpacing={1.0} lineSharpness={13} glowFalloff={7} glowIntensity={2.5} brightness={3.0} blueBoost={1.5} vignette={0.5} grain={0.04} dpr={1} lightMode={true} fps={60} paused={false} />
      {/* Scattered star particles -  */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        {[
          [8, 12], [15, 65], [22, 38], [30, 82], [38, 18], [45, 55], [52, 90], [60, 28], [68, 72], [75, 45],
          [82, 15], [88, 60], [93, 35], [5, 48], [18, 78], [35, 5], [50, 68], [65, 92], [80, 30], [95, 80],
          [12, 25], [28, 50], [42, 75], [58, 12], [72, 55], [85, 88], [3, 70], [20, 95], [48, 35], [78, 8],
          [91, 50], [25, 15], [55, 85], [70, 22], [40, 60], [10, 90], [62, 40], [87, 68], [33, 30], [16, 55],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={i % 5 === 0 ? '1.5' : i % 3 === 0 ? '1' : '0.7'}
            fill="white"
            opacity={i % 4 === 0 ? '0.6' : i % 3 === 0 ? '0.4' : '0.25'}
          />
        ))}
      </svg>

      {/* Big Modality Wheel - Scaled up and shifted right to create the Arc effect */}
      <div className="absolute right-0 translate-x-[25%] md:translate-x-[30%] lg:translate-x-[25%] top-1/2 -translate-y-1/2 h-[700px] w-[700px] md:h-[750px] md:w-[750px] lg:h-[850px] lg:w-[850px] opacity-90 lg:opacity-100 z-10 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
        <OpticalWheel />
      </div>

      {/* Meditation image - flawlessly blended using CSS mask-image and multiply blend mode */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] md:w-[55%] lg:w-[50%] aspect-[4/5] pointer-events-none" style={{ zIndex: 5 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/main/new.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
            opacity: 0.9,
            WebkitMaskImage: "radial-gradient(ellipse 60% 65% at 50% 50%, black 20%, rgba(0,0,0,0.6) 45%, transparent 80%)",
            maskImage: "radial-gradient(ellipse 60% 65% at 50% 50%, black 20%, rgba(0,0,0,0.6) 45%, transparent 80%)"
          }}
        />
      </div>
    </section >
  );
}

// --- EDITORIAL LAYOUT HERO (Magazine) ---
export default function Hero() {
  return <PrimaryHero />;
}