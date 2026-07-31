'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// ── Layout 4: "Split Astrologer" ─────────────────────────────────────────────
// Inspired by: The half-light/half-dark chart layout from reference image.
// Left half = warm parchment cream with line art chart. Right = deep navy dark.
// This is the most unique layout — a bold split-screen effect that is eye-catching.

const SPLIT_SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function SplitAstrologerHero() {
  const [activeSign, setActiveSign] = useState(4); // Leo default

  return (
    <section className="relative overflow-hidden min-h-[95vh] flex flex-col md:flex-row">

      {/* LEFT HALF — Warm parchment */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F2E8D5 0%, #E8DBBF 100%)' }}>

        {/* Faint chart watermark left */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="190" fill="none" stroke="#6B4C1E" strokeWidth="1" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="#6B4C1E" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="110" fill="none" stroke="#6B4C1E" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="#6B4C1E" strokeWidth="1" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            return <line key={i} x1={200 + 60 * Math.cos(a)} y1={200 + 60 * Math.sin(a)} x2={200 + 190 * Math.cos(a)} y2={200 + 190 * Math.sin(a)} stroke="#6B4C1E" strokeWidth="0.6" />;
          })}
        </svg>

        {/* Moon phase decorations */}
        <div className="absolute top-8 left-8 flex gap-2 opacity-30">
          {['●', '◕', '◑', '◔', '○'].map((m, i) => (
            <span key={i} className="text-2xl" style={{ color: '#6B4C1E' }}>{m}</span>
          ))}
        </div>

        {/* Content left */}
        <div className="relative z-10 max-w-sm text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase block mb-6" style={{ color: '#B87333' }}>
            HealConnect · Astrology
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black leading-tight mb-6" style={{ color: '#1C1208' }}>
            Discover<br />
            <span className="italic font-light" style={{ color: '#8B6914' }}>Your Destiny</span><br />
            Through Stars
          </h1>
          <p className="text-base font-light leading-relaxed mb-8" style={{ color: '#5A4A2E' }}>
            Ancient celestial wisdom decoded by India's most verified expert astrologers, available 24x7 at your fingertips.
          </p>
          <Link href="/practitioners">
            <Button size="lg" className="rounded-none px-10 h-12 text-sm font-bold uppercase tracking-widest border-0 text-white shadow-md transition-all hover:scale-105"
              style={{ background: '#C4772A' }}>
              Begin Your Journey
            </Button>
          </Link>
        </div>
      </div>

      {/* CENTER DIVIDER LINE with spinning chart */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center hidden md:flex">
        <div className="relative">
          {/* Spinning circle chart at center */}
          <svg className="animate-[spin_60s_linear_infinite] drop-shadow-2xl" width="220" height="220" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="106" fill="rgba(18,18,30,0.9)" stroke="#D4A843" strokeWidth="2" />
            <circle cx="110" cy="110" r="80" fill="none" stroke="#D4A843" strokeWidth="0.8" opacity="0.5" />
            <circle cx="110" cy="110" r="55" fill="none" stroke="#D4A843" strokeWidth="0.5" opacity="0.4" />
            <circle cx="110" cy="110" r="28" fill="#D4A843" opacity="0.15" />
            <circle cx="110" cy="110" r="14" fill="#D4A843" opacity="0.8" />
            <text x="110" y="115" textAnchor="middle" fontSize="14" fill="#1C1208" fontFamily="serif">☀</text>
            {SPLIT_SIGNS.map((sign, i) => {
              const a = ((i * 30 - 90) * Math.PI) / 180;
              const sr = 92;
              return (
                <text key={i} x={110 + sr * Math.cos(a)} y={110 + sr * Math.sin(a)}
                  textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#D4A843" opacity="0.9" fontFamily="serif">
                  {sign}
                </text>
              );
            })}
            {Array.from({ length: 12 }, (_, i) => {
              const a = ((i * 30 - 90) * Math.PI) / 180;
              return <line key={i} x1={110 + 28 * Math.cos(a)} y1={110 + 28 * Math.sin(a)} x2={110 + 106 * Math.cos(a)} y2={110 + 106 * Math.sin(a)} stroke="#D4A843" strokeWidth="0.5" opacity="0.3" />;
            })}
          </svg>
        </div>
      </div>

      {/* RIGHT HALF — Deep navy dark */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #12121E 0%, #0D0D1A 100%)' }}>

        {/* Stars background right */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }, (_, i) => (
            <div key={i} className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`, height: `${Math.random() * 2 + 0.5}px`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 3 + 2}s`,
              }} />
          ))}
        </div>

        {/* Content right */}
        <div className="relative z-10 max-w-sm text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase block mb-6 text-amber-400/70">
            ✦ 500+ Verified Experts
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light leading-tight mb-6 text-white">
            Choose Your<br />
            <span className="font-black text-amber-300 italic text-4xl md:text-5xl">Sign</span>
          </h2>

          {/* Sign selector grid */}
          <div className="grid grid-cols-6 gap-2 mb-8">
            {SPLIT_SIGNS.map((sign, i) => (
              <button key={i} onClick={() => setActiveSign(i)}
                className="w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border"
                style={{
                  background: activeSign === i ? 'rgba(212,168,67,0.3)' : 'rgba(255,255,255,0.04)',
                  borderColor: activeSign === i ? '#D4A843' : 'rgba(255,255,255,0.1)',
                  color: activeSign === i ? '#D4A843' : 'rgba(255,255,255,0.5)',
                }}>
                {sign}
              </button>
            ))}
          </div>

          <Link href="/practitioners">
            <Button size="lg" className="rounded-full px-10 h-12 text-sm font-bold border-2 text-amber-300 hover:bg-amber-300/10 transition-all"
              style={{ borderColor: '#D4A843' }}>
              Talk to an Expert <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
