'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology',      name: 'Astrology',        image: '/final_ensights/astrology.png' },
  { id: 'tarot',          name: 'Tarot',            image: '/final_ensights/tarot.png' },
  { id: 'face-reading',   name: 'Face Reading',     image: '/final_ensights/face reading.png' },
  { id: 'palm-reading',   name: 'Palm Reading',     image: '/final_ensights/palm reading.png' },
  { id: 'sound-healing',  name: 'Sound Healing',    image: '/final_ensights/sound healing.png' },
  { id: 'meditation',     name: 'Meditation',       image: '/final_ensights/medidation.png' },
  { id: 'spiritual',      name: 'Spiritual',        image: '/final_ensights/spiritual  guidance.png' },
  { id: 'chakra-healing', name: 'Chakra Healing',   image: '/final_ensights/chakra healing.png' },
  { id: 'breathwork',     name: 'Breathwork',       image: '/final_ensights/breathwork.png' },
  { id: 'dreams',         name: 'Dream Predict',    image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony',  name: 'Space Harmony',    image: '/final_ensights/space harmony.png' },
  { id: 'numerology',     name: 'Numerology',       image: '/final_ensights/numerology.png' },
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
  const imgH = 100; 

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
            <radialGradient id="centerDiscGrad" cx="40%" cy="35%" r="70%">
              <stop offset="0%"   stopColor="#2A1658" />
              <stop offset="60%"  stopColor="#1E1144" />
              <stop offset="100%" stopColor="#0B061A" />
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
            
            {/* Mid-way thin golden concentric circle far from the center */}
            <circle cx={cx} cy={cy} r={260} fill="none" stroke={GOLD} opacity="0.3" strokeWidth="1" />

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
                    <circle cx="0" cy="0" r="40" fill="#0A0415" />

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
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Removed the large yellowish radial gradient background */}
            <img
              src="/main centre logo/finall.png"
              alt="ZenAuraa"
              style={{
                width: '150px', height: '150px', objectFit: 'contain',
                filter: `drop-shadow(0 0 10px rgba(255,255,255,0.1))`,
                position: 'relative', zIndex: 10,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
