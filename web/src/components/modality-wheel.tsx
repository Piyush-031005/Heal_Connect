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
  { id: 'astrology', name: 'Astrology', icon: Star },
  { id: 'vastu', name: 'Vastu', icon: Compass },
  { id: 'healing', name: 'Healing', icon: HeartPulse },
  { id: 'eft', name: 'EFT', icon: Activity },
  { id: 'meditation', name: 'Meditation & Breathwork', icon: Wind },
  { id: 'yoga', name: 'Yoga', icon: Flower2 },
  { id: 'tarot', name: 'Tarot Cards', icon: Layers },
  { id: 'psychic', name: 'Psychic Reading', icon: Eye },
  { id: 'palmistry', name: 'Palmistry', icon: Hand },
  { id: 'face-reading', name: 'Face Reading', icon: User },
  { id: 'lal-kitab', name: 'Lal Kitab', icon: Book },
  { id: 'ai-match', name: 'AI Expert Match', icon: Sparkles },
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
                  {/* Invisible hit area */}
                  <circle cx="0" cy="0" r="45" fill="transparent" />
                  
                  {/* Node Background */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="36" 
                    className={`transition-all duration-300 backdrop-blur-md ${isHovered ? "fill-background stroke-primary" : "fill-background/80 stroke-primary/30"}`} 
                    strokeWidth="1.5" 
                  />
                  
                  {/* HTML Icon overlay */}
                  <foreignObject x="-20" y="-35" width="40" height="40" className="pointer-events-none">
                    <div className="w-full h-full flex items-center justify-center text-primary">
                      <modality.icon strokeWidth={1.5} className={isHovered ? "w-7 h-7" : "w-6 h-6 opacity-70"} />
                    </div>
                  </foreignObject>
                  
                  {/* Modality Name */}
                  <text
                    x="0"
                    y="22"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground font-sans tracking-wide pointer-events-none transition-all duration-300"
                    style={{ 
                      fontSize: '11px',
                      fontWeight: isHovered ? 600 : 500,
                      opacity: isHovered ? 1 : 0.6,
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
        <div className="w-56 h-56 rounded-full flex flex-col items-center justify-center relative bg-background/50 backdrop-blur-sm border border-primary/20 shadow-xl">
          {/* Subtle center glow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(214,180,107,0.08)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <span className="text-primary/60 uppercase tracking-widest text-[10px] font-bold mb-3">Explore Your Path</span>
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <span className="font-serif text-2xl font-medium text-foreground tracking-wide">HealConnect</span>
          </div>
          
          {/* Minimal outer rings */}
          <div className="absolute inset-[-10px] border-[1px] border-primary/20 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
          <div className="absolute inset-[-20px] border-[1px] border-dashed border-accent/10 rounded-full animate-[spin_40s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
