'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology' },
  { id: 'tarot', name: 'Tarot Reading' },
  { id: 'palm-reading', name: 'Palm Reading' },
  { id: 'face-reading', name: 'Face Reading' },
  { id: 'numerology', name: 'Numerology' },
  { id: 'energy-healing', name: 'Energy Healing' },
  { id: 'meditation', name: 'Meditation' },
  { id: 'yoga', name: 'Yoga' },
  { id: 'vastu', name: 'Space Energy' },
  { id: 'eft', name: 'EFT Tapping' },
  { id: 'spiritual', name: 'Spiritual Guide' },
  { id: 'sound-healing', name: 'Sound Healing' },
];

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cx = 500;
  const cy = 500;
  const outerRadius = 400;

  const isAnyHovered = hoveredIdx !== null;
  const playState = isAnyHovered ? 'paused' : 'running';

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-full max-w-[800px] max-h-[800px] aspect-square flex items-center justify-center pointer-events-none">
      
      {/* Central Glow / Magical Aura */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-[20%] bg-[radial-gradient(circle,rgba(104,72,179,0.3)_0%,transparent_70%)] rounded-full animate-pulse blur-[50px] pointer-events-none" style={{ animationDuration: '4s' }} />

      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
          
          {/* LAYER 1: Slow rotating outer mystical bounds (dotted) */}
          <g style={{ animation: 'spin 180s linear infinite', transformOrigin: 'center' }}>
            <circle cx={cx} cy={cy} r={outerRadius + 80} fill="none" className="stroke-primary/10" strokeWidth="1" strokeDasharray="4 12" />
            <circle cx={cx} cy={cy} r={outerRadius + 90} fill="none" className="stroke-accent/10" strokeWidth="0.5" />
          </g>
          
          {/* LAYER 2: Fast counter-rotating mathematical rings */}
          <g style={{ animation: 'spin 90s linear infinite reverse', transformOrigin: 'center' }}>
            <circle cx={cx} cy={cy} r={outerRadius - 40} fill="none" className="stroke-primary/30" strokeWidth="2" strokeDasharray="1 10" />
            <circle cx={cx} cy={cy} r={outerRadius - 60} fill="none" className="stroke-primary/20" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={outerRadius - 75} fill="none" className="stroke-accent/20" strokeWidth="1" strokeDasharray="10 5" />
          </g>

          {/* LAYER 3: Sacred Geometry Mandala (Hexagrams) */}
          <g style={{ animation: 'spin 240s linear infinite', transformOrigin: 'center' }}>
            {[0, 15, 30, 45, 60, 75].map((rot, i) => (
              <g key={`hex-${i}`} transform={`rotate(${rot}, ${cx}, ${cy})`}>
                <polygon 
                  points={`
                    ${cx},${cy - (outerRadius - 150)} 
                    ${cx + (outerRadius - 150) * Math.sin(Math.PI/3)},${cy + (outerRadius - 150) * Math.cos(Math.PI/3)} 
                    ${cx - (outerRadius - 150) * Math.sin(Math.PI/3)},${cy + (outerRadius - 150) * Math.cos(Math.PI/3)}
                  `}
                  fill="none"
                  className="stroke-primary/10"
                  strokeWidth="1"
                />
                <polygon 
                  points={`
                    ${cx},${cy + (outerRadius - 150)} 
                    ${cx + (outerRadius - 150) * Math.sin(Math.PI/3)},${cy - (outerRadius - 150) * Math.cos(Math.PI/3)} 
                    ${cx - (outerRadius - 150) * Math.sin(Math.PI/3)},${cy - (outerRadius - 150) * Math.cos(Math.PI/3)}
                  `}
                  fill="none"
                  className="stroke-primary/10"
                  strokeWidth="1"
                />
              </g>
            ))}
          </g>

          {/* LAYER 4: The 12 Modalities orbiting on a solid magical ring */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" className="stroke-primary/20" strokeWidth="1" />
          <g style={{ animation: 'spin 120s linear infinite', animationPlayState: playState, transformOrigin: 'center' }}>
            
            {/* The nodes */}
            {MODALITIES.map((modality, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const x = cx + outerRadius * Math.cos(angle);
              const y = cy + outerRadius * Math.sin(angle);
              const isHovered = hoveredIdx === idx;
              
              return (
                <g 
                  key={idx} 
                  transform={`translate(${x}, ${y}) scale(${isHovered ? 1.2 : 1})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(modality.id)}
                  className="transition-all duration-500 ease-out cursor-pointer group"
                >
                  <g style={{ animation: 'spin 120s linear infinite reverse', animationPlayState: playState, transformOrigin: 'center' }}>
                    
                    {/* Hit Area */}
                    <circle cx="0" cy="0" r="50" fill="transparent" pointerEvents="all" />
                    
                    {/* Node Visuals */}
                    {/* Glowing Aura on Hover */}
                    <circle cx="0" cy="0" r="35" className="fill-primary/0 group-hover:fill-primary/20 transition-all duration-300 blur-md" />
                    
                    {/* Core Ring */}
                    <circle cx="0" cy="0" r="20" className="fill-background stroke-primary border-2 transition-all duration-300" strokeWidth={isHovered ? "3" : "1.5"} />
                    
                    {/* Mystic Runes/Dots surrounding the node */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 10s linear infinite' }}>
                      {[0, 1, 2, 3].map((d) => (
                        <circle key={d} cx={28 * Math.cos(d * Math.PI/2)} cy={28 * Math.sin(d * Math.PI/2)} r="2" className="fill-accent" />
                      ))}
                    </g>
                    
                    {/* Inner glowing dot */}
                    <circle cx="0" cy="0" r="6" className={isHovered ? "fill-accent" : "fill-primary/50"} />

                    {/* Node Text Label (Floating Outside) */}
                    <text
                      x="0"
                      y={isHovered ? "-45" : "-35"}
                      textAnchor="middle"
                      className="fill-foreground font-sans font-medium tracking-wide transition-all duration-300 shadow-sm pointer-events-none"
                      style={{ 
                        fontSize: '14px',
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      {modality.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* LAYER 5: Central Focus Core (Logo) */}
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Spinning runes/dash array core */}
            <circle cx="0" cy="0" r="100" fill="none" className="stroke-accent/30" strokeWidth="2" strokeDasharray="5 20" style={{ animation: 'spin 60s linear infinite' }} />
            <circle cx="0" cy="0" r="85" fill="none" className="stroke-primary/40" strokeWidth="1" strokeDasharray="30 10" style={{ animation: 'spin 40s linear infinite reverse' }} />
            
            {/* Solid Center Backdrop */}
            <circle cx="0" cy="0" r="70" className="fill-background/80 backdrop-blur-md stroke-primary/30" strokeWidth="1" />
          </g>

        </svg>

        {/* HTML Center Overlay for Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-28 h-28 flex items-center justify-center">
            {/* Using mix-blend-screen to make background of logo transparent and colors pop */}
            <img src="/logo.png" alt="Main Logo" className="w-full h-full object-contain mix-blend-screen scale-150 drop-shadow-[0_0_15px_rgba(104,72,179,0.5)]" />
          </div>
        </div>

      </div>
    </div>
  );
}
