'use client';

import { useState } from 'react';

// Using final_ensights logos as RAW images - exactly like HealConnect reference
const MODALITIES = [
  { id: 'astrology',     name: 'Astrology',         image: '/final_ensights/astrology.png' },
  { id: 'tarot',         name: 'Tarot',             image: '/final_ensights/tarot.png' },
  { id: 'face-reading',  name: 'Face Reading',      image: '/final_ensights/face reading.png' },
  { id: 'palm-reading',  name: 'Palm Reading',      image: '/final_ensights/palm reading.png' },
  { id: 'sound-healing', name: 'Sound Healing',     image: '/final_ensights/sound healing.png' },
  { id: 'meditation',    name: 'Meditation',        image: '/final_ensights/medidation.png' },
  { id: 'spiritual',     name: 'Spiritual',         image: '/final_ensights/spiritual  guidance.png' },
  { id: 'chakra-healing',name: 'Chakra Healing',    image: '/final_ensights/chakra healing.png' },
  { id: 'breathwork',    name: 'Breathwork',        image: '/final_ensights/breathwork.png' },
  { id: 'dreams',        name: 'Dream Prediction',  image: '/final_ensights/dream interpretetion.png' },
  { id: 'space-harmony', name: 'Space Harmony',     image: '/final_ensights/space harmony.png' },
  { id: 'numerology',    name: 'Numerology',        image: '/final_ensights/numerology.png' },
];

// Gold color from reference image
const GOLD = '#C9A84C';

export default function OpticalWheel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [playState, setPlayState] = useState<'running' | 'paused'>('running');

  const cx = 500;
  const cy = 500;
  const outerRadius = 340;
  // Each image half-size (no clipping — raw rectangular image)
  const imgHalf = 90;

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
            {/* Gold radial glow for center */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.4" />
              <stop offset="50%" stopColor={GOLD} stopOpacity="0.1" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </radialGradient>
            {/* Dark backdrop for each image stamp */}
            <radialGradient id="stampGrad" cx="40%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#1a0a2e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d061c" stopOpacity="0.95" />
            </radialGradient>
          </defs>

          {/* ── ORBIT RINGS — thin gold, like reference ── */}
          {/* Outermost subtle ring */}
          <circle cx={cx} cy={cy} r={outerRadius + 105} fill="none" stroke={GOLD} opacity="0.12" strokeWidth="0.75" />
          {/* Main orbit path (logos sit on this) */}
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke={GOLD} opacity="0.45" strokeWidth="1" />
          {/* Inner decorative ring */}
          <circle cx={cx} cy={cy} r={outerRadius - 75} fill="none" stroke={GOLD} opacity="0.2" strokeWidth="0.75" strokeDasharray="5 15" />
          {/* Center ring */}
          <circle cx={cx} cy={cy} r={outerRadius - 155} fill="none" stroke={GOLD} opacity="0.25" strokeWidth="0.75" />
          {/* Innermost tight ring around center */}
          <circle cx={cx} cy={cy} r={175} fill="none" stroke={GOLD} opacity="0.35" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={155} fill="none" stroke={GOLD} opacity="0.2" strokeWidth="0.75" strokeDasharray="3 8" style={{ animation: 'spin 120s linear infinite', transformOrigin: '500px 500px' }} />

          {/* Ambient gold glow behind center */}
          <circle cx={cx} cy={cy} r="200" fill="url(#centerGlow)" />

          {/* Center dark disc */}
          <circle cx={cx} cy={cy} r="155" fill="#0d061c" opacity="0.95" />
          <circle cx={cx} cy={cy} r="155" fill="none" stroke={GOLD} opacity="0.6" strokeWidth="1.5" />

          {/* ── THE 12 MODALITY NODES ── */}
          <g
            style={{
              animation: 'spin 55s linear infinite',
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
                >
                  {/* Counter-spin so everything stays upright */}
                  <g
                    style={{
                      animation: 'spin 55s linear infinite reverse',
                      animationPlayState: playState,
                      transformOrigin: '0px 0px',
                    }}
                  >
                    {/* Hit area */}
                    <circle cx="0" cy="0" r={imgHalf + 25} fill="transparent" pointerEvents="all" />

                    {/* Small dark rectangular stamp behind image — like the reference */}
                    <rect
                      x={-imgHalf - 4}
                      y={-imgHalf - 4}
                      width={(imgHalf + 4) * 2}
                      height={(imgHalf + 4) * 2}
                      rx="12"
                      ry="12"
                      fill="url(#stampGrad)"
                      opacity={isHovered ? '0.95' : '0.75'}
                    />

                    {/* Thin gold border on hover */}
                    {isHovered && (
                      <rect
                        x={-imgHalf - 4}
                        y={-imgHalf - 4}
                        width={(imgHalf + 4) * 2}
                        height={(imgHalf + 4) * 2}
                        rx="12"
                        ry="12"
                        fill="none"
                        stroke={GOLD}
                        strokeWidth="1.5"
                        opacity="0.7"
                      />
                    )}

                    {/* RAW image — NO circular clip, exactly like HealConnect reference */}
                    <image
                      href={`${modality.image}?v=8`}
                      x={-imgHalf}
                      y={-imgHalf}
                      width={imgHalf * 2}
                      height={imgHalf * 2}
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 0 12px ${GOLD}) brightness(1.1)`
                          : 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    {/* Name label in gold text below image — like reference */}
                    <text
                      x="0"
                      y={imgHalf + 20}
                      textAnchor="middle"
                      fill={isHovered ? '#FFE082' : GOLD}
                      fontSize="17"
                      fontFamily="'Georgia', serif"
                      fontWeight="400"
                      letterSpacing="1"
                      opacity={isHovered ? '1' : '0.8'}
                    >
                      {modality.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

        </svg>

        {/* ── CENTER LOGO overlay (HTML, not SVG for clarity) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Gold glow behind logo */}
            <div
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.1) 50%, transparent 75%)`,
              }}
            />
            {/* The center logo */}
            <img
              src="/new_center_logo_dark.png"
              alt="ZenAuraa"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                filter: `drop-shadow(0 0 20px rgba(201,168,76,0.5))`,
                position: 'relative',
                zIndex: 10,
              }}
              onError={(e) => {
                // Fallback to other logo if primary fails
                (e.target as HTMLImageElement).src = '/this_is_the_logo.png';
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
