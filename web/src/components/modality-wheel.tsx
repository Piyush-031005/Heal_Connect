'use client';

import { useState } from 'react';
import { 
  Star, 
  Compass, 
  HeartPulse, 
  Activity, 
  Wind, 
  Flower2, 
  Layers, 
  Eye, 
  Hand, 
  User, 
  Book, 
  Sparkles 
} from 'lucide-react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', image: '/12-modalities/astrology.png' },
  { id: 'tarot', name: 'Tarot Reading', image: '/12-modalities/tarocard.png' },
  { id: 'palm-reading', name: 'Palm Reading', image: '/12-modalities/ai-match.png' },
  { id: 'face-reading', name: 'Face Reading', image: '/12-modalities/face reading.png' },
  { id: 'numerology', name: 'Numerology', image: '/12-modalities/numeriology.png' },
  { id: 'healing', name: 'Energy Healing', image: '/12-modalities/energy healing.png' },
  { id: 'meditation', name: 'Meditation & Breathwork', image: '/12-modalities/medidation and breathing.png' },
  { id: 'yoga', name: 'Yoga & Mindfulness', image: '/12-modalities/yoga.png' },
  { id: 'vastu', name: 'Vastu & Space Energy', image: '/12-modalities/vastu.png' },
  { id: 'eft', name: 'EFT Tapping', image: '/12-modalities/eft.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', image: '/12-modalities/spitutality.png' },
  { id: 'sound-healing', name: 'Sound Healing', image: '/12-modalities/sound.png' },
];

export default function ModalityWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Center of the massive wheel
  const cx = 400;
  const cy = 400;
  const radius = 320; 
  
  const isAnyHovered = hoveredIdx !== null;
  const playState = isAnyHovered ? 'paused' : 'running';

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] flex items-center justify-center">
      {/* Soft Ambient Glows (Replaced deep space with soft aura) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Rotating Wheel Container */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer group"
        style={{ animation: 'spin 120s linear infinite', animationPlayState: playState }}
      >
        <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible">
          {/* Theme-specific background (e.g. white for deep lavender) */}
          <circle cx={cx} cy={cy} r={radius + 60} fill="var(--wheel-bg, transparent)" className="transition-colors duration-500" />
          
          {/* MINIMAL PREMIUM RINGS */}
          
          {/* Outer gentle halo */}
          <circle cx={cx} cy={cy} r={radius + 40} className="stroke-primary" opacity="0.05" strokeWidth="1" fill="none" />
          
          {/* Main Track */}
          <circle cx={cx} cy={cy} r={radius} className="stroke-primary" opacity="0.2" strokeWidth="1" fill="none" />
          <circle cx={cx} cy={cy} r={radius - 10} className="stroke-primary" opacity="0.05" strokeWidth="1" fill="none" />
          
          {/* Inner rings */}
          <circle cx={cx} cy={cy} r={radius - 80} className="stroke-accent" opacity="0.1" strokeWidth="1" strokeDasharray="4 8" fill="none" />
          <circle cx={cx} cy={cy} r={radius - 120} className="stroke-primary" opacity="0.15" strokeWidth="1" fill="none" />
          
          {/* Geometric inner star (minimal sacred geometry) */}
          <path 
            d={`M ${cx},${cy - (radius - 120)} 
                ${Array.from({length: 12}).map((_, i) => {
                  const a1 = (i * 30 + 15) * (Math.PI / 180);
                  const a2 = ((i + 1) * 30) * (Math.PI / 180);
                  const rInner = radius - 140;
                  const rOuter = radius - 120;
                  return `L ${(cx + rInner * Math.sin(a1)).toFixed(2)},${(cy - rInner * Math.cos(a1)).toFixed(2)} L ${(cx + rOuter * Math.sin(a2)).toFixed(2)},${(cy - rOuter * Math.cos(a2)).toFixed(2)}`;
                }).join(' ')} Z`}
            fill="none" 
            className="stroke-primary" 
            opacity="0.1" 
            strokeWidth="0.5"
          />

          {/* Roaming Logo Orbiting the inner track */}
          <g className="pointer-events-none">
            {/* The group rotates at a faster speed to orbit */}
            <g style={{ animation: 'spin 40s linear infinite' }}>
              <g transform={`translate(${cx}, ${cy - (radius - 80)})`}>
                <g style={{ animation: 'spin 40s linear infinite reverse' }}>
                  <image 
                    href="/logo.png" 
                    x="-24" 
                    y="-24" 
                    width="48" 
                    height="48" 
                    className="mix-blend-screen"
                    style={{ filter: 'hue-rotate(240deg) saturate(2) brightness(1.5) drop-shadow(0 0 10px rgba(138, 100, 181, 0.5))' }}
                  />
                </g>
              </g>
            </g>
          </g>

          {/* Modality Nodes around the track */}
          {MODALITIES.map((modality, idx) => {
            const angle = (idx * 30 - 90) * (Math.PI / 180); // Start at top
            const x = (cx + radius * Math.cos(angle)).toFixed(2);
            const y = (cy + radius * Math.sin(angle)).toFixed(2);
            const isHovered = hoveredIdx === idx;
            
            return (
              <g 
                key={idx} 
                transform={`translate(${x}, ${y}) scale(${isHovered ? 1.15 : 1})`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleScrollTo(modality.id)}
                className="transition-all duration-500 ease-out cursor-pointer"
                style={{
                  opacity: hoveredIdx === null ? 0.8 : (isHovered ? 1 : 0.3),
                  filter: isHovered ? 'drop-shadow(0 0 15px rgba(214, 180, 107, 0.4))' : 'none',
                }}
              >
                {/* Counter-rotate group to keep upright */}
                <g style={{ animation: 'spin 120s linear infinite reverse', animationPlayState: playState }}>
                  {/* Invisible hit area - increased size for easier hover */}
                  <circle cx="0" cy="0" r="60" fill="transparent" pointerEvents="all" />
                  
                  {/* Node Background */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="40" 
                    className={`transition-all duration-300 backdrop-blur-md ${isHovered ? "fill-primary/20 stroke-primary" : "fill-background/90 stroke-primary/30"}`} 
                    strokeWidth="1.5" 
                  />
                  
                  {/* High-Fidelity Custom Image Asset */}
                  <g className="transition-all duration-500 pointer-events-none" style={{ transform: isHovered ? 'scale(1.25)' : 'scale(1)' }}>
                    <image 
                      href={modality.image} 
                      x="-100" 
                      y="-100" 
                      width="200" 
                      height="200" 
                      className="transition-all duration-500 mix-blend-screen" 
                      style={{ 
                        filter: isHovered ? 'drop-shadow(0 0 15px rgba(214,180,107,0.9)) brightness(1.3)' : 'drop-shadow(0 0 5px rgba(0,0,0,0.3)) brightness(0.8)' 
                      }} 
                    />
                  </g>
                  
                  {/* Modality Name */}
                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground font-sans tracking-wide pointer-events-none transition-all duration-300 shadow-sm"
                    style={{ 
                      fontSize: '11px',
                      fontWeight: isHovered ? 700 : 500,
                      opacity: isHovered ? 1 : 0.6,
                      textShadow: isHovered ? '0px 2px 8px rgba(0,0,0,0.8)' : 'none'
                    }}
                  >
                    {modality.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Center Minimal Focus Point */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-64 h-64 rounded-full flex flex-col items-center justify-center relative bg-background/50 backdrop-blur-sm border border-primary/20 shadow-xl overflow-hidden">
          {/* Subtle center glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(214,180,107,0.15)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
            <img src="/logo.png" alt="Main Logo" className="w-full h-full object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(214,180,107,0.5)]" />
          </div>
          
          {/* Minimal outer rings */}
          <div className="absolute inset-[4px] border-[1px] border-primary/20 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
          <div className="absolute inset-[12px] border-[1px] border-dashed border-accent/20 rounded-full animate-[spin_40s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
