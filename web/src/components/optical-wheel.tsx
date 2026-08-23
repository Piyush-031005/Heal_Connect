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
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerR = 360; // Uniform circle radius matching HealConnect
  const imgH = 55; // Icon size (110x110)

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(`modality-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseEnter={() => setPlayState('paused')}
      onMouseLeave={() => setPlayState('running')}
    >
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            <radialGradient id="outerGlowWhl" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={GOLD} stopOpacity="0.10" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0"   />
            </radialGradient>
            <radialGradient id="centerDiscGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#240E4E" />
              <stop offset="100%" stopColor="#15082E" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <circle cx={cx} cy={cy} r="480" fill="url(#outerGlowWhl)" />

          {/* ── WHEEL PATTERN (Exact HealConnect Structure) ── */}
          <g style={{ animation: 'spin 120s linear infinite', transformOrigin: '500px 500px', animationPlayState: playState }}>
            
            {/* Primary thin gold ring */}
            <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={GOLD} opacity="0.4" strokeWidth="1" />
            
            {/* Outer decorative ring */}
            <circle cx={cx} cy={cy} r={outerR + 70} fill="none" stroke={GOLD} opacity="0.15" strokeWidth="0.75" />
            
            {/* Inner dashed ring */}
            <circle cx={cx} cy={cy} r={outerR - 80} fill="none" stroke={GOLD} opacity="0.2" strokeWidth="0.75" strokeDasharray="3 9" />

            {/* ── THE 12 MODALITY NODES (Evenly spaced, uniform circle) ── */}
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
                  {/* Counter-spin so labels/icons stay upright */}
                  <g style={{
                    animation: 'spin 120s linear infinite reverse',
                    animationPlayState: playState,
                    transformOrigin: '0px 0px',
                  }}>
                    {/* Hit area */}
                    <circle cx="0" cy="0" r={imgH + 20} fill="transparent" pointerEvents="all" />

                    {/* MODALITY ICON (NO dark vignette/badge behind it, just the raw transparent icon on the ring) */}
                    <image
                      href={`${mod.image}?v=15`}
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
                      x="0" y={imgH + 22}
                      textAnchor="middle"
                      fill={isHovered ? '#FFFFFF' : GOLD}
                      fontSize="14"
                      fontFamily="'Georgia', serif"
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

          {/* ── CENTER MEDALLION ── */}
          <circle cx={cx} cy={cy} r="160" fill="none" stroke={GOLD} opacity="0.25" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="145" fill="none" stroke={GOLD} opacity="0.4" strokeWidth="1" strokeDasharray="2 6" style={{ animation: 'spin 80s linear infinite', transformOrigin: '500px 500px' }} />
          <circle cx={cx} cy={cy} r="135" fill="url(#centerDiscGrad)" />
          
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', width: '240px', height: '240px', borderRadius: '50%',
              background: `radial-gradient(circle, rgba(245,200,76,0.12) 0%, transparent 65%)`,
            }} />
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa Center"
              style={{
                width: '140px', height: '140px', objectFit: 'contain',
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
