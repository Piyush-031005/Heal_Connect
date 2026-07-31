'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// ── Layout 2: "Golden Destiny" ──────────────────────────────────────────────
// Inspired by: Mysta template — warm cream/beige, golden astro chart on right,
// constellation doodles in background, very premium wellness app energy.
// Totally different from dark themes — this is a LIGHT, luxurious, warm layout.

export default function GoldenDestinyHero() {
  const SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  const LABELS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-36 lg:pb-28 min-h-[95vh] flex items-center"
      style={{ background: 'linear-gradient(135deg, #F5EDD8 0%, #EDE0C4 40%, #F0E8D2 100%)' }}>

      {/* Faint constellation background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stars-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1" fill="#6B5B3E" />
            <circle cx="40" cy="20" r="1.5" fill="#6B5B3E" />
            <circle cx="70" cy="60" r="1" fill="#6B5B3E" />
            <line x1="4" y1="4" x2="40" y2="20" stroke="#6B5B3E" strokeWidth="0.5" />
            <line x1="40" y1="20" x2="70" y2="60" stroke="#6B5B3E" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars-grid)" />
      </svg>

      {/* Golden sun/moon doodle top-right */}
      <svg className="absolute top-8 right-[42%] opacity-20 pointer-events-none" width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="18" fill="none" stroke="#C4A35A" strokeWidth="1.5" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return <line key={i} x1={50 + 22 * Math.cos(a)} y1={50 + 22 * Math.sin(a)} x2={50 + 30 * Math.cos(a)} y2={50 + 30 * Math.sin(a)} stroke="#C4A35A" strokeWidth="1.5" />;
        })}
        <circle cx="50" cy="50" r="8" fill="#C4A35A" opacity="0.4" />
      </svg>

      {/* Large crescent moon top-left */}
      <svg className="absolute -top-10 -left-10 opacity-10 pointer-events-none" width="200" height="200" viewBox="0 0 200 200">
        <path d="M120 30 Q60 100 120 170 Q40 140 40 100 Q40 60 120 30Z" fill="#C4A35A" />
      </svg>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* LEFT: Text */}
        <div className="lg:w-1/2 lg:pr-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#B87333] mb-4 block">
            ✦ Ask one question for free
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.05] mb-6 text-[#1C1208]">
            Learn more<br />about your<br />
            <span className="italic font-light text-[#6B4C1E]">destiny</span>
          </h1>
          <p className="text-lg text-[#5A4A2E] mb-10 max-w-md font-light leading-relaxed">
            Connect with the world's most trusted astrologers, numerologists, tarot readers, and Vastu experts — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/practitioners">
              <Button size="lg" className="rounded-xl px-10 h-14 text-base font-bold border-none text-white shadow-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #C4772A, #E8A84C)' }}>
                Get Started <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </Link>
            <Link href="/practitioners">
              <Button size="lg" variant="outline" className="rounded-xl px-10 h-14 text-base border-2 transition-all"
                style={{ borderColor: '#C4772A', color: '#C4772A' }}>
                Find an Expert
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: Animated Astrology Chart Wheel */}
        <div className="lg:w-1/2 flex items-center justify-center relative">
          {/* Arched card behind wheel */}
          <div className="absolute w-[360px] h-[400px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] top-1/2 -translate-y-1/2"
            style={{ background: 'rgba(174, 196, 210, 0.35)', backdropFilter: 'blur(4px)', border: '1px solid rgba(174,196,210,0.5)' }} />

          {/* Animated SVG natal chart wheel */}
          <svg className="relative z-10 w-[340px] h-[340px] animate-[spin_90s_linear_infinite]" viewBox="0 0 340 340">
            <circle cx="170" cy="170" r="165" fill="none" stroke="#C4A35A" strokeWidth="1.5" opacity="0.8" />
            <circle cx="170" cy="170" r="135" fill="none" stroke="#C4A35A" strokeWidth="0.8" opacity="0.5" />
            <circle cx="170" cy="170" r="100" fill="none" stroke="#6B4C1E" strokeWidth="1" opacity="0.4" />
            <circle cx="170" cy="170" r="55" fill="none" stroke="#C4A35A" strokeWidth="1" opacity="0.6" />
            <circle cx="170" cy="170" r="18" fill="#C4A35A" opacity="0.9" />
            <text x="170" y="175" textAnchor="middle" fontSize="14" fill="#1C1208" fontFamily="serif">☀</text>
            {/* 12 house lines */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = ((i * 30 - 90) * Math.PI) / 180;
              const x1 = 170 + 55 * Math.cos(a);
              const y1 = 170 + 55 * Math.sin(a);
              const x2 = 170 + 165 * Math.cos(a);
              const y2 = 170 + 165 * Math.sin(a);
              const lx = 170 + 148 * Math.cos(((i * 30 + 15 - 90) * Math.PI) / 180);
              const ly = 170 + 148 * Math.sin(((i * 30 + 15 - 90) * Math.PI) / 180);
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C4A35A" strokeWidth="0.8" opacity="0.6" />
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#6B4C1E" fontFamily="serif">{SIGNS[i]}</text>
                </g>
              );
            })}
            {/* Constellation dots */}
            {[45, 95, 145, 210, 265, 310].map((angle, i) => {
              const a = ((angle - 90) * Math.PI) / 180;
              return <circle key={i} cx={170 + 118 * Math.cos(a)} cy={170 + 118 * Math.sin(a)} r="3" fill="#C4A35A" opacity="0.8" />;
            })}
          </svg>

          {/* Sign labels around outside - static so they don't spin */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {LABELS.map((label, i) => {
              const angle = ((i * 30 - 90) * Math.PI) / 180;
              const r = 185;
              const x = 50 + (r * Math.cos(angle)) / 3.4;
              const y = 50 + (r * Math.sin(angle)) / 3.4;
              return (
                <span key={label} className="absolute text-[10px] font-bold tracking-widest uppercase"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', color: '#6B4C1E', opacity: 0.8 }}>
                  {label.slice(0, 3)}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
