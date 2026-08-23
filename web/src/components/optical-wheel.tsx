'use client';

import { useState } from 'react';

const MODALITIES = [
  { id: 'astrology', name: 'Astrology', image: '/final_ensights/astrology.png' },
  { id: 'tarot', name: 'Tarot', image: '/final_ensights/tarot.png' },
  { id: 'face-reading', name: 'Face Reading', image: '/final_ensights/face reading.png' },
  { id: 'palm-reading', name: 'Palm Reading', image: '/final_ensights/palm reading.png' },
  { id: 'sound-healing', name: 'Sound Healing', image: '/final_ensights/sound healing.png' },
  { id: 'meditation', name: 'Meditation', image: '/final_ensights/medidation.png' },
  { id: 'spiritual', name: 'Spiritual Guidance', image: '/final_ensights/spiritual  guidance.png' },
  { id: 'chakra-healing', name: 'Chakra Healing', image: '/final_ensights/chakra healing.png' },
  { id: 'breathwork', name: 'Breathwork', image: '/final_ensights/breathwork.png' },
  { id: 'dreams', name: 'Dream Prediction', image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony', name: 'Space Harmony', image: '/final_ensights/space harmony.png' },
  { id: 'numerology', name: 'Numerology', image: '/final_ensights/numerology.png' },
];

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerRadius = 360;
  // Size of each raw image (no clip)
  const imgHalf = 85;

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(`modality-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseEnter={() => setPlayState('paused')}
      onMouseLeave={() => setPlayState('running')}
    >
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <svg viewBox="0 0 1000 1000" className="w-full h-full mx-auto">
          <defs>
            {/* Soft ambient glow for center */}
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9B7FD4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#9B7FD4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient soft glow behind entire wheel */}
          <circle cx={cx} cy={cy} r="470" fill="url(#ambientGlow)" />

          {/* ── CONCENTRIC DASHED ORBIT RINGS (matching Zenauraa reference) ── */}
          {/* Outermost faint ring */}
          <circle cx={cx} cy={cy} r={outerRadius + 110} fill="none" stroke="#9B7FD4" opacity="0.12" strokeWidth="1" strokeDasharray="6 18" />
          {/* Main orbit ring where logos sit */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke="#9B7FD4" opacity="0.3" strokeWidth="1" strokeDasharray="4 12" />
          {/* Inner ring */}
          <circle cx={cx} cy={cy} r={outerRadius - 80} fill="none" stroke="#9B7FD4" opacity="0.18" strokeWidth="0.75" strokeDasharray="3 10" />
          {/* Innermost ring near center */}
          <circle cx={cx} cy={cy} r={outerRadius - 170} fill="none" stroke="#9B7FD4" opacity="0.15" strokeWidth="0.75" strokeDasharray="2 8" />

          {/* ── THE 12 MODALITY NODES — raw images, no clip circles ── */}
          <g
            style={{
              animation: 'spin 60s linear infinite',
              animationPlayState: playState,
              transformOrigin: '500px 500px',
            }}
          >
            {MODALITIES.map((modality, idx) => {
              const angle = (idx * 30 - 90) * (Math.PI / 180);
              const x = cx + outerRadius * Math.cos(angle);
              const y = cy + outerRadius * Math.sin(angle);
              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={idx}
                  transform={`translate(${x}, ${y})`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => handleScrollTo(modality.id)}
                  className="cursor-pointer"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {/* Counter-spin so logos stay upright */}
                  <g
                    style={{
                      animation: 'spin 60s linear infinite reverse',
                      animationPlayState: playState,
                      transformOrigin: '0px 0px',
                    }}
                  >
                    {/* Small dark decorative dot behind the logo (subtle, like reference) */}
                    <circle
                      cx="0"
                      cy="0"
                      r="50"
                      fill="#1a0e3a"
                      opacity="0.55"
                    />

                    {/* RAW image — no clipping, no circular border, just the PNG */}
                    <image
                      href={`${modality.image}?v=7`}
                      x={-imgHalf}
                      y={-imgHalf}
                      width={imgHalf * 2}
                      height={imgHalf * 2}
                      preserveAspectRatio="xMidYMid meet"
                      opacity={isHovered ? '1' : '0.92'}
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 0 16px rgba(183,154,230,0.9)) brightness(1.15)'
                          : 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    {/* Name label — visible always, subtle; brighter on hover */}
                    <text
                      x="0"
                      y={imgHalf + 22}
                      textAnchor="middle"
                      fill={isHovered ? '#E5D9F2' : '#B79AE6'}
                      fontSize="18"
                      fontFamily="serif"
                      fontWeight={isHovered ? '600' : '400'}
                      opacity={isHovered ? '1' : '0.75'}
                    >
                      {modality.name}
                    </text>

                    {/* Hit area (invisible, generous) */}
                    <circle cx="0" cy="0" r={imgHalf + 30} fill="transparent" pointerEvents="all" />
                  </g>
                </g>
              );
            })}
          </g>

        </svg>

        {/* ── CENTER: Main logo (large, prominent, like Zenauraa reference) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Soft glow ring behind logo */}
            <div
              className="absolute rounded-full"
              style={{
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(155,127,212,0.35) 0%, rgba(77,49,107,0.2) 60%, transparent 100%)',
              }}
            />
            <img
              src="/new_logo.png"
              alt="ZenAuraa Logo"
              style={{
                width: '220px',
                height: '220px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 30px rgba(183,154,230,0.6))',
                position: 'relative',
                zIndex: 10,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
