'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'aries', name: 'Aries', image: '/new-zodiacs/aries_new.png' },
  { id: 'taurus', name: 'Taurus', image: '/new-zodiacs/taurus.png' },
  { id: 'gemini', name: 'Gemini', image: '/new-zodiacs/gemini_new.png' },
  { id: 'cancer', name: 'Cancer', image: '/new-zodiacs/cancer.png' },
  { id: 'leo', name: 'Leo', image: '/new-zodiacs/leo_new.png' },
  { id: 'virgo', name: 'Virgo', image: '/new-zodiacs/virgo_new.png' },
  { id: 'libra', name: 'Libra', image: '/new-zodiacs/libra_new.png' },
  { id: 'scorpio', name: 'Scorpio', image: '/new-zodiacs/scorpio_new.png' },
  { id: 'sagittarius', name: 'Sagittarius', image: '/new-zodiacs/saggitarius.png' },
  { id: 'capricorn', name: 'Capricorn', image: '/new-zodiacs/capricon_new.png' },
  { id: 'aquarius', name: 'Aquarius', image: '/new-zodiacs/aqarius.png' },
  { id: 'pisces', name: 'Pisces', image: '/new-zodiacs/pices.png' },
];

const GOLD = '#F5C84C'; 

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Pause animation only when hovering over a specific logo
  const playState = hoveredIdx !== null ? 'paused' : 'running';

  const cx = 600;
  const cy = 600;
  const outerR = 500; // Increased to push the wheel outward for the arc look
  
  // Increased icon size slightly as requested by the user
  const imgH = 95; 

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(`modality-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-full select-none">
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1200 1200" className="w-full h-full">
          <defs>
            <radialGradient id="outerGlowWhl" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={GOLD} stopOpacity="0.10" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0"   />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx={cx} cy={cy} r="580" fill="url(#outerGlowWhl)" />

          {/* ── WHEEL PATTERN ── */}
          <g style={{ animation: 'spin 180s linear infinite', transformOrigin: '600px 600px', animationPlayState: playState }}>
            
            {/* Primary thin gold ring */}
            <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={GOLD} opacity="0.4" strokeWidth="1" />
            
            {/* Outer decorative ring */}
            <circle cx={cx} cy={cy} r={outerR + 70} fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.75" />
            
            {/* Inner dashed ring */}
            <circle cx={cx} cy={cy} r={outerR - 80} fill="none" stroke={GOLD} opacity="0.2" strokeWidth="0.75" strokeDasharray="3 9" />

            {/* ── THE 12 MODALITY NODES ── */}
            {MODALITIES.map((mod, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const nx = cx + outerR * Math.cos(angle);
              const ny = cy + outerR * Math.sin(angle);
              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={idx}
                  transform={`translate(${nx}, ${ny})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(mod.id)}
                  className="cursor-pointer"
                >
                  {/* Counter-spin so labels/icons stay upright (Fixed duration match) */}
                  <g style={{
                    animation: 'spin 180s linear infinite reverse',
                    animationPlayState: playState,
                    transformOrigin: '0px 0px',
                  }}>
                    {/* Hit area */}
                    <circle cx="0" cy="0" r={imgH + 20} fill="transparent" pointerEvents="all" />

                    {/* Small black dot in the center of the logo (fingertip size) */}
                    

                    {/* MODALITY ICON */}
                    <image
                      href={`${mod.image}?v=16`}
                      x={-imgH} y={-imgH}
                      width={imgH * 2} height={imgH * 2}
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 10px ${GOLD})` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        transition: 'filter 0.3s ease',
                      }}
                    />

                    {/* Label */}
                    <text
                      x="0" y={imgH + 24}
                      textAnchor="middle"
                      fill={isHovered ? '#FFFFFF' : GOLD}
                      fontSize="14"
                      fontFamily="'Georgia', serif"
                      fontWeight="300"
                      letterSpacing="1.5"
                      opacity={isHovered ? '1' : '0.8'}
                    >
                      {mod.name.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* ── CENTER MEDALLION (No outer dark concentric rings, just the logo) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: '320px', height: '320px', borderRadius: '50%',
              background: `radial-gradient(circle, rgba(245,200,76,0.1) 0%, transparent 55%)`,
            }} />
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa Center"
              style={{
                width: '210px', height: '210px', objectFit: 'contain',
                position: 'relative', zIndex: 10,
                filter: `drop-shadow(0 0 15px rgba(245,200,76,0.2))`
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
