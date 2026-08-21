'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────
// 01. WHY YOU ARE HERE — Life intention star clusters
// ─────────────────────────────────────────────────────────────────────────
const INTENTION_STARS = [
  { id: 1, name: 'Find Love', x: 16, y: 32, cluster: 'love', tip: 'Love & Relationships' },
  { id: 2, name: 'Heal a Relationship', x: 24, y: 50, cluster: 'love', tip: 'Love & Relationships' },
  { id: 3, name: 'Marriage Timing', x: 12, y: 66, cluster: 'love', tip: 'Love & Relationships' },
  { id: 4, name: 'Career Clarity', x: 72, y: 20, cluster: 'career', tip: 'Career & Finance' },
  { id: 5, name: 'Business Growth', x: 84, y: 36, cluster: 'career', tip: 'Career & Finance' },
  { id: 6, name: 'Financial Future', x: 78, y: 52, cluster: 'career', tip: 'Career & Finance' },
  { id: 7, name: 'Heal Trauma', x: 42, y: 74, cluster: 'health', tip: 'Health & Wellbeing' },
  { id: 8, name: 'Inner Peace', x: 56, y: 82, cluster: 'health', tip: 'Health & Wellbeing' },
  { id: 9, name: 'Life Purpose', x: 60, y: 30, cluster: 'spiritual', tip: 'Spiritual Growth' },
  { id: 10, name: 'Spiritual Awakening', x: 70, y: 62, cluster: 'spiritual', tip: 'Spiritual Growth' },
  { id: 11, name: 'Know Myself', x: 38, y: 20, cluster: 'self', tip: 'Self Discovery' },
  { id: 12, name: 'Life Decisions', x: 30, y: 78, cluster: 'self', tip: 'Self Discovery' },
];

const INTENTION_COLORS: Record<string, string> = {
  love: '#FF6B9D',
  career: '#D4A853',
  health: '#7EDEA0',
  spiritual: '#C9A0DC',
  self: '#63BFE4',
};

const INTENTION_LABELS: Record<string, string> = {
  love: 'Love & Relationships',
  career: 'Career & Finance',
  health: 'Health & Wellbeing',
  spiritual: 'Spiritual Growth',
  self: 'Self Discovery',
};

export function WhyYouHere() {
  const [hovered, setHovered] = useState<(typeof INTENTION_STARS)[0] | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex flex-col border-t border-[#EDF8FC]"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #FFFFFF 0%, #EDF8FC 60%, #CDE9F4 100%)' }}>
      {/* Deep starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(200)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-[#1A92C6]"
            style={{
              width: `${(i % 3) + 0.5}px`, height: `${(i % 3) + 0.5}px`,
              left: `${(i * 17.3) % 100}%`, top: `${(i * 23.7) % 100}%`,
              opacity: 0.05 + (i % 8) * 0.05,
              animation: `zen-twinkle ${2 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 pt-20 pb-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#D4A853]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4A853]">What Brings You Here</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F] mb-2">What Are You Seeking?</h2>
        <p className="text-[#1A92C6] text-sm font-bold max-w-lg">Every star is a question someone asked. Hover to explore what Zenauraa can answer for you. Drag to navigate.</p>
      </div>

      <div className="container mx-auto px-6 lg:px-16 z-10 flex gap-5 flex-wrap mb-4">
        {Object.entries(INTENTION_LABELS).map(([c, label]) => (
          <div key={c} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: INTENTION_COLORS[c], boxShadow: `0 0 8px ${INTENTION_COLORS[c]}40` }} />
            <span className="text-xs font-bold text-[#12527F]/70">{label}</span>
          </div>
        ))}
      </div>

      <div
        ref={ref}
        className="relative flex-1 min-h-[460px] cursor-grab active:cursor-grabbing z-10 select-none"
        onMouseDown={e => {
          setDragging(true);
          dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
        }}
        onMouseMove={e => {
          if (dragging) {
            setOffset({ x: dragStart.current.ox + e.clientX - dragStart.current.x, y: dragStart.current.oy + e.clientY - dragStart.current.y });
          }
        }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ transform: `translate(${offset.x}px,${offset.y}px)` }}>
          {INTENTION_STARS.map(s => {
            const col = INTENTION_COLORS[s.cluster];
            const isHov = hovered?.id === s.id;
            return (
              <g key={s.id} style={{ cursor: 'pointer' }}
                onMouseEnter={e => {
                  setHovered(s);
                  const rect = ref.current?.getBoundingClientRect();
                  if (rect) setTipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={`${s.x}%`} cy={`${s.y}%`} r="35" fill="transparent" />
                {/* Outer glow ring */}
                <circle cx={`${s.x}%`} cy={`${s.y}%`} r={isHov ? '24' : '18'} fill={col}
                  opacity={isHov ? 0.15 : 0.05}
                  style={{ transition: 'all 0.4s ease' }} />
                {/* Core star */}
                <circle cx={`${s.x}%`} cy={`${s.y}%`} r={isHov ? '14' : '10'} fill={col} fillOpacity={isHov ? 1 : 0.9}
                  style={{ filter: `drop-shadow(0 0 ${isHov ? 20 : 10}px ${col})`, transition: 'all 0.4s ease' }} />
                {/* Label */}
                <text x={`${s.x}%`} y={`${s.y}%`} dy="32" textAnchor="middle"
                  fill="#12527F" fontSize="12" fontWeight="700" opacity={isHov ? 1 : 0.8}
                  style={{ transition: 'all 0.3s ease' }}>{s.name}</text>
              </g>
            );
          })}
        </svg>
        {hovered && (
          <div className="absolute z-50 pointer-events-none backdrop-blur-xl border rounded-2xl p-5 w-60 shadow-xl"
            style={{ left: Math.min(tipPos.x + 18, 600), top: tipPos.y - 80, backgroundColor: 'rgba(255,255,255,0.95)', borderColor: `${INTENTION_COLORS[hovered.cluster]}50` }}>
            <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: INTENTION_COLORS[hovered.cluster] }}>{INTENTION_LABELS[hovered.cluster]}</div>
            <div className="text-base font-bold text-[#12527F] mb-3">{hovered.name}</div>
            <Link href="/signup" className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
              style={{ color: INTENTION_COLORS[hovered.cluster] }}>
              Find Specialists <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Bottom cluster CTAs */}
      <div className="container mx-auto px-6 lg:px-16 py-8 z-10 flex flex-wrap justify-center gap-3">
        {Object.entries(INTENTION_LABELS).map(([cluster, label]) => (
          <Link key={cluster} href="/signup"
            className="px-5 py-2.5 rounded-full text-xs font-bold border transition-all hover:scale-105"
            style={{ borderColor: `${INTENTION_COLORS[cluster]}40`, color: INTENTION_COLORS[cluster], backgroundColor: `${INTENTION_COLORS[cluster]}10` }}>
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes zen-twinkle { 0%,100%{opacity:0.04} 50%{opacity:0.55} }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 02. ZODIAC ORBIT RING — Interactive rotating orbital
// ─────────────────────────────────────────────────────────────────────────
const ZODIACS = [
  { id: 'aries', name: 'Aries', img: '/new-zodiacs/aries_new.png', element: 'Fire', quality: 'Cardinal', trait: 'Bold, ambitious, passionate leader.', date: 'Mar 21–Apr 19', color: '#FF6B6B' },
  { id: 'taurus', name: 'Taurus', img: '/new-zodiacs/taurus.png', element: 'Earth', quality: 'Fixed', trait: 'Patient, reliable, sensual, determined.', date: 'Apr 20–May 20', color: '#7EDEA0' },
  { id: 'gemini', name: 'Gemini', img: '/new-zodiacs/gemini_new.png', element: 'Air', quality: 'Mutable', trait: 'Curious, communicative, adaptable, witty.', date: 'May 21–Jun 20', color: '#F4D58D' },
  { id: 'cancer', name: 'Cancer', img: '/new-zodiacs/cancer.png', element: 'Water', quality: 'Cardinal', trait: 'Nurturing, intuitive, protective, empathic.', date: 'Jun 21–Jul 22', color: '#9FD6EE' },
  { id: 'leo', name: 'Leo', img: '/new-zodiacs/leo_new.png', element: 'Fire', quality: 'Fixed', trait: 'Magnetic, generous, creative, warmhearted.', date: 'Jul 23–Aug 22', color: '#FFB347' },
  { id: 'virgo', name: 'Virgo', img: '/new-zodiacs/virgo_new.png', element: 'Earth', quality: 'Mutable', trait: 'Analytical, detail-oriented, service-driven.', date: 'Aug 23–Sep 22', color: '#98E6A2' },
  { id: 'libra', name: 'Libra', img: '/new-zodiacs/libra_new.png', element: 'Air', quality: 'Cardinal', trait: 'Balanced, harmonious, fair, socially gifted.', date: 'Sep 23–Oct 22', color: '#C9A0DC' },
  { id: 'scorpio', name: 'Scorpio', img: '/new-zodiacs/scorpio_new.png', element: 'Water', quality: 'Fixed', trait: 'Intense, perceptive, transformative, deep.', date: 'Oct 23–Nov 21', color: '#7B6CF6' },
  { id: 'sagittarius', name: 'Sagittarius', img: '/new-zodiacs/saggitarius.png', element: 'Fire', quality: 'Mutable', trait: 'Adventurous, philosophical, free-spirited.', date: 'Nov 22–Dec 21', color: '#F4A261' },
  { id: 'capricorn', name: 'Capricorn', img: '/new-zodiacs/capricon_new.png', element: 'Earth', quality: 'Cardinal', trait: 'Disciplined, responsible, ambitious, wise.', date: 'Dec 22–Jan 19', color: '#A0AEC0' },
  { id: 'aquarius', name: 'Aquarius', img: '/new-zodiacs/aqarius.png', element: 'Air', quality: 'Fixed', trait: 'Innovative, humanitarian, eccentric, visionary.', date: 'Jan 20–Feb 18', color: '#63BFE4' },
  { id: 'pisces', name: 'Pisces', img: '/new-zodiacs/pices.png', element: 'Water', quality: 'Mutable', trait: 'Dreamy, compassionate, mystical, creative.', date: 'Feb 19–Mar 20', color: '#9B8FFF' },
];

const ELEMENT_BG: Record<string, string> = {
  Fire: 'radial-gradient(ellipse at 30% 40%, #FFF5F5 0%, #EDF8FC 60%, #EDF8FC 100%)',
  Earth: 'radial-gradient(ellipse at 30% 40%, #F0FFF4 0%, #EDF8FC 60%, #EDF8FC 100%)',
  Air: 'radial-gradient(ellipse at 30% 40%, #F5F3FF 0%, #EDF8FC 60%, #EDF8FC 100%)',
  Water: 'radial-gradient(ellipse at 30% 40%, #E0F2FE 0%, #EDF8FC 60%, #EDF8FC 100%)',
};

export function ZodiacOrbitRing() {
  const [active, setActive] = useState(ZODIACS[4]);
  const [rotation, setRotation] = useState(0);
  const CX = 50, CY = 50, R = 38;

  useEffect(() => {
    const t = setInterval(() => setRotation(r => r + 0.008), 50);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: ELEMENT_BG[active.element], transition: 'background 1.2s ease' }}>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: `${(i % 2) + 1}px`, height: `${(i % 2) + 1}px`, left: `${(i * 13.7) % 100}%`, top: `${(i * 19.3) % 100}%`, opacity: 0.04 + (i % 5) * 0.03 }} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-24 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-[2px]" style={{ backgroundColor: active.color }} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: active.color }}>Zodiac Orbit</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Orbital SVG */}
          <div className="relative w-full max-w-[520px] mx-auto aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="zodiacGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={active.color} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={active.color} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#12527F" strokeOpacity="0.15" strokeWidth="0.5" />
              <circle cx={CX} cy={CY} r={R - 2} fill="none" stroke="#12527F" strokeOpacity="0.1" strokeWidth="0.3" strokeDasharray="2 3" />
              {ZODIACS.map((z, i) => {
                const angle = ((i / 12) * Math.PI * 2) + rotation;
                const x = CX + R * Math.cos(angle);
                const y = CY + R * Math.sin(angle);
                const isActive = z.id === active.id;
                return (
                  <g key={z.id} onClick={() => setActive(z)} style={{ cursor: 'pointer' }}>
                    <circle cx={x} cy={y} r={isActive ? 10 : 8}
                      fill="white"
                      style={{ filter: isActive ? `drop-shadow(0 0 8px ${z.color})` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))', transition: 'all 0.4s ease' }} />
                    <image href={z.img} x={x - (isActive ? 7.5 : 6)} y={y - (isActive ? 7.5 : 6)} width={isActive ? 15 : 12} height={isActive ? 15 : 12}
                      opacity={isActive ? 1 : 0.8}
                      style={{ transition: 'all 0.4s ease' }} />
                  </g>
                );
              })}
              <circle cx={CX} cy={CY} r="22" fill="white" style={{ filter: 'drop-shadow(0 4px 12px rgba(18,82,127,0.15))' }} />
              <image href={active.img} x={CX - 13} y={CY - 16} width="26" height="26" style={{ transition: 'all 0.5s ease' }} />
              <text x={CX} y={CY + 13} textAnchor="middle" fill="#12527F" fontSize="4" opacity="0.9"
                fontFamily="serif" fontWeight="bold">{active.name.toUpperCase()}</text>
            </svg>
          </div>

          {/* Content */}
          <div key={active.id} style={{ animation: 'zen-fade 0.5s ease' }}>
            <h2 className="text-5xl md:text-7xl font-serif font-medium text-[#12527F] mb-6 drop-shadow-sm">
              {active.name}
            </h2>
            <p className="text-sm text-[#1A92C6] mb-6 font-mono tracking-widest font-bold">{active.date}</p>
            <p className="text-lg text-[#12527F]/80 font-medium leading-relaxed mb-10 max-w-md">{active.trait}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Love Compatibility', 'Career Outlook', 'Monthly Reading', 'Find a Guide'].map(tag => (
                <Link key={tag} href="/signup"
                  className="px-5 py-2.5 rounded-full text-sm font-bold border transition-all hover:scale-105 bg-white shadow-sm"
                  style={{ borderColor: `${active.color}40`, color: '#12527F' }}>
                  {tag}
                </Link>
              ))}
            </div>
            <Link href="/signup" className="inline-flex items-center gap-3 text-[#12527F] font-bold group">
              <span className="text-lg">Explore {active.name}</span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#12527F]/20 group-hover:bg-[#12527F] group-hover:text-white transition-all bg-white"
                style={{ borderColor: `${active.color}40` }}>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zen-fade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 03. TAROT TABLE — Premium zodiac-art card reading
// ─────────────────────────────────────────────────────────────────────────
const TAROT_CARDS = [
  {
    name: 'The Fool', roman: '0', subtitle: 'New Beginnings · Spontaneity',
    message: 'A blank slate lies before you. Take the leap of faith without fear, trusting that the universe will catch you. Embrace the unknown with childlike wonder.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The High Priestess', roman: 'II', subtitle: 'Intuition · Inner Voice · Mystery',
    message: 'Your subconscious holds truths the waking mind has yet to hear. Honour the cycles within you — your intuition is your most sacred compass right now.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Sun', roman: 'XIX', subtitle: 'Joy · Vitality · Success',
    message: 'Radiant golden energy courses through every opportunity before you. A magnificent chapter of abundance, creative power, and warmth is beautifully unfolding.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The World', roman: 'XXI', subtitle: 'Completion · Wholeness · Triumph',
    message: 'You stand at the sacred culmination of an extraordinary cycle. Embrace the beautiful wholeness you have earned — a glorious new chapter awaits your first step.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Tower', roman: 'XVI', subtitle: 'Revelation · Transformation · Truth',
    message: 'A powerful revelation shakes what was never truly stable. What crumbles was built on illusion — what remains is the indestructible core of your true self.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Star', roman: 'XVII', subtitle: 'Hope · Inspiration · Serenity',
    message: 'After the storm comes clear, starlit skies. A time of deep spiritual healing and renewed hope is upon you. Trust in the quiet guidance of the universe.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Magician', roman: 'I', subtitle: 'Manifestation · Power · Action',
    message: 'You possess all the tools needed to manifest your desires. Align your thoughts, words, and actions, and watch the universe bend to your will.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  }
];

const CARD_ROTATIONS = [-15, -10, -5, 0, 5, 10, 15];
const CARD_OFFSETS = [30, 20, 10, 0, 10, 20, 30];

export function TarotTable() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-[#EDF8FC]">

      {/* Subtle geometric texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(26,146,198,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,146,198,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Light glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-white" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-[1px] bg-[#1A92C6]" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#1A92C6]">Tarot Reading</span>
          <div className="w-10 h-[1px] bg-[#1A92C6]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F] mb-3">Draw Your Card</h2>
        <p className="text-[#1A92C6] text-sm font-bold mb-3">Set your intention. Choose a card. Receive your message.</p>
        <div className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 mb-14 border border-[#1A92C6]/20 bg-white shadow-sm">
          <span className="text-[#1A92C6] text-sm">✦</span>
          <span className="text-[#12527F]/70 text-sm font-medium italic">&ldquo;What energy should I honour today?&rdquo;</span>
        </div>

        {/* Card spread deck */}
        <div className="relative flex items-end justify-center gap-1 md:gap-2 mb-20 min-h-[300px]">
          {TAROT_CARDS.map((card, i) => {
            const isFlipped = flipped === i;
            const rot = CARD_ROTATIONS[i] || 0;
            const yOffset = CARD_OFFSETS[i] || 0;
            return (
              <div key={i} className="relative group"
                style={{
                  transform: `rotate(${isFlipped ? 0 : rot}deg) translateY(${isFlipped ? -40 : yOffset}px) scale(${isFlipped ? 1.15 : 1})`,
                  zIndex: isFlipped ? 50 : i + 1,
                  transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                  margin: '0 -20px' // Negative margin to overlap cards like a spread deck
                }}>
                <div className="w-[110px] h-[190px] md:w-[150px] md:h-[250px] relative cursor-pointer"
                  style={{ perspective: '1200px' }}
                  onClick={() => setFlipped(isFlipped ? null : i)}>
                  <div className="relative w-full h-full shadow-2xl rounded-xl group-hover:-translate-y-4 transition-transform duration-500"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}>

                    {/* ── Card Back (Static 0deg) ── */}
                    <div className="absolute inset-0 w-full h-full rounded-xl flex items-center justify-center p-2"
                      style={{
                        background: card.backBg, border: `1px solid #E5E5E0`,
                        backfaceVisibility: 'hidden'
                      }}>
                      <div className="w-full h-full border rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
                        style={{ borderColor: card.border }}>
                        <div className="absolute inset-1 border rounded-md pointer-events-none" style={{ borderColor: `${card.border}50` }} />
                        {/* Moon phases */}
                        <svg width="24" height="100" viewBox="0 0 24 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="15" r="4" stroke={card.border} strokeWidth="1" strokeDasharray="1 1" />
                          <path d="M12 28 A 5 5 0 1 1 12 38 A 3 5 0 1 0 12 28" fill={card.border} />
                          <circle cx="12" cy="50" r="5" fill={card.border} />
                          <path d="M12 62 A 5 5 0 1 0 12 72 A 3 5 0 1 1 12 62" fill={card.border} />
                          <circle cx="12" cy="85" r="4" stroke={card.border} strokeWidth="1" strokeDasharray="1 1" />
                        </svg>
                        {/* Little stars */}
                        <div className="absolute top-4 left-4 text-[8px]" style={{ color: card.border }}>✦</div>
                        <div className="absolute bottom-4 right-4 text-[8px]" style={{ color: card.border }}>✦</div>
                        <div className="absolute top-1/4 right-3 text-[6px]" style={{ color: card.border }}>✧</div>
                        <div className="absolute bottom-1/4 left-3 text-[6px]" style={{ color: card.border }}>✧</div>
                      </div>
                    </div>

                    {/* ── Card Front (Static 180deg) ── */}
                    <div className="absolute inset-0 w-full h-full rounded-xl flex flex-col items-center justify-center p-2"
                      style={{
                        background: card.cardBg, border: `1px solid #E5E5E0`,
                        transform: 'rotateY(180deg)', backfaceVisibility: 'hidden'
                      }}>
                      <div className="w-full h-full rounded-lg border flex flex-col items-center justify-center relative p-3" style={{ borderColor: card.border }}>
                        <div className="absolute inset-1 rounded-md border" style={{ borderColor: `${card.border}50` }} />
                        <div className="absolute top-3 w-full text-center text-[10px] font-black tracking-[0.2em]" style={{ color: card.border }}>{card.roman}</div>
                        
                        <div className="my-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border" style={{ borderColor: card.border }}>
                           <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: card.accent }}>
                             <span className="text-2xl md:text-3xl" style={{ color: card.border }}>✦</span>
                           </div>
                        </div>

                        <div className="absolute bottom-4 w-full text-center px-1">
                          <div className="font-serif font-bold text-xs md:text-sm tracking-wider leading-tight" style={{ color: card.border }}>{card.name.toUpperCase()}</div>
                          <div className="text-[5px] md:text-[6.5px] mt-1 uppercase tracking-widest font-bold" style={{ color: card.border }}>{card.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reading panel */}
        {flipped !== null && (
          <div className="max-w-xl mx-auto rounded-3xl p-8 text-center shadow-xl border border-[#CDE9F4]"
            style={{ animation: 'zen-fade 0.5s ease', background: `linear-gradient(135deg, #FFFFFF 0%, #F6FBFC 100%)` }}>
            <div className="text-xs font-black uppercase tracking-[0.3em] mb-3" style={{ color: TAROT_CARDS[flipped].color }}>{TAROT_CARDS[flipped].roman} · {TAROT_CARDS[flipped].name}</div>
            <h3 className="text-2xl font-serif font-medium text-[#12527F] mb-2">{TAROT_CARDS[flipped].subtitle}</h3>
            <div className="w-16 h-[2px] mx-auto mb-5" style={{ backgroundColor: TAROT_CARDS[flipped].color }} />
            <p className="text-sm text-[#1A92C6] leading-relaxed mb-7 font-bold max-w-md mx-auto">{TAROT_CARDS[flipped].message}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/signup" className="px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md hover:scale-105 text-white"
                style={{ background: `linear-gradient(135deg, ${TAROT_CARDS[flipped].color}, ${TAROT_CARDS[flipped].color}EE)` }}>
                Find a Tarot Reader
              </Link>
              <Link href="/signup" className="px-6 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 text-white/50 border border-white/10">
                Full Reading
              </Link>
            </div>
          </div>
        )}
        {flipped === null && (
          <p className="text-white/25 text-xs font-medium" style={{ letterSpacing: '0.2em' }}>✦ SELECT A CARD ✦</p>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 04. MODALITY UNIVERSE — Pixel-perfect node map with readable labels
// ─────────────────────────────────────────────────────────────────────────
const MOD_NODES = [
  { id: 'astrology', label: 'Astrology', cx: 450, cy: 260, r: 75, color: '#63BFE4', center: true, count: '320 guides' },
  { id: 'tarot', label: 'Tarot', cx: 240, cy: 190, r: 54, color: '#C9A0DC', count: '240 guides' },
  { id: 'reiki', label: 'Energy Healing', cx: 300, cy: 370, r: 62, color: '#7EDEA0', count: '180 guides' },
  { id: 'meditation', label: 'Meditation', cx: 660, cy: 380, r: 52, color: '#98E6F4', count: '150 guides' },
  { id: 'palmistry', label: 'Palm Reading', cx: 430, cy: 450, r: 48, color: '#F4A261', count: '70 guides' },
  { id: 'vastu', label: 'Vastu', cx: 580, cy: 140, r: 45, color: '#A0AEC0', count: '45 guides' },
  { id: 'yoga', label: 'Yoga', cx: 180, cy: 90, r: 44, color: '#7EDEA0', count: '95 guides' },
  { id: 'eft', label: 'EFT Tapping', cx: 750, cy: 170, r: 48, color: '#9B8FFF', count: '35 guides' },
  { id: 'coaching', label: 'Life Coaching', cx: 720, cy: 280, r: 55, color: '#F4D58D', count: '110 guides' },
  { id: 'spiritual', label: 'Spiritual Guide', cx: 140, cy: 300, r: 58, color: '#C9A0DC', count: '180 guides' },
  { id: 'face', label: 'Face Reading', cx: 360, cy: 80, r: 46, color: '#FF6B6B', count: '30 guides' },
];

export function ModalityUniverse() {
  const { theme } = useTheme();
  const isNewColor = theme === 'theme-new-color';
  const [hovered, setHovered] = useState<(typeof MOD_NODES)[0] | null>(null);

  return (
    <section className="relative min-h-screen bg-[#F6FBFC] overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-[#1A92C6]"
            style={{ width: `${(i % 2) + 1}px`, height: `${(i % 2) + 1}px`, left: `${(i * 17.3) % 100}%`, top: `${(i * 23.1) % 100}%`, opacity: 0.05 + (i % 4) * 0.05 }} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#1A92C6]" />
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isNewColor ? 'text-primary' : 'text-[#1A92C6]'}`}>Modality Universe</span>
          <div className="w-8 h-[2px] bg-[#1A92C6]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F] mb-3">Explore What Speaks To You</h2>
        <p className="text-[#1A92C6] text-sm font-bold">Hover any circle to discover a healing modality</p>
      </div>

      {/* SVG with fixed viewBox for readable text */}
      <div className="relative w-full max-w-5xl mx-auto px-4" style={{ height: '500px' }}>
        <svg viewBox="0 0 900 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            {MOD_NODES.map(node => (
              <radialGradient key={`grad-${node.id}`} id={`grad-${node.id}`} cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor={node.color} stopOpacity="0.2" />
              </radialGradient>
            ))}
          </defs>

          {/* No connection lines - making it purely floating and organic */}

          {MOD_NODES.map(node => {
            const isHov = hovered?.id === node.id;
            const r = node.r * (isHov ? 1.15 : 1);
            return (
              <g key={node.id}
                onMouseEnter={() => setHovered(node)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}>
                {/* Glow circle */}
                <circle cx={node.cx} cy={node.cy} r={r + 12}
                  fill={node.color} fillOpacity={isHov ? 0.15 : 0.03}
                  style={{ transition: 'all 0.4s ease' }} />
                {/* Main bubble */}
                <circle cx={node.cx} cy={node.cy} r={r}
                  fill={`url(#grad-${node.id})`}
                  stroke={node.color} strokeOpacity={isHov ? 0.8 : 0.3}
                  strokeWidth={isHov ? 2 : 1}
                  style={{ transition: 'all 0.4s ease', filter: isHov ? `drop-shadow(0 10px 20px ${node.color}40)` : 'drop-shadow(0 4px 10px rgba(0,0,0,0.02))' }} />
                {/* Label */}
                <text x={node.cx} y={node.cy} dy="0.35em" textAnchor="middle"
                  fill="#12527F"
                  fontSize={node.center ? 18 : 14}
                  fontWeight={node.center ? '800' : '700'}
                  opacity={isHov ? 1 : 0.9}
                  style={{ transition: 'all 0.4s ease' }}>{node.label}</text>
                {/* Guide count on hover */}
                {isHov && (
                  <text x={node.cx} y={node.cy + r + 18} textAnchor="middle"
                    fill={node.color} fontSize="11" opacity="0.8" fontFamily="sans-serif">
                    {node.count}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {hovered && !hovered.center && (
        <div className="relative z-10 mt-4 text-center" style={{ animation: 'zen-fade 0.3s ease' }}>
          <Link href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
            style={{ backgroundColor: `${hovered.color}18`, border: `1px solid ${hovered.color}50`, color: hovered.color }}>
            Explore {hovered.label} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 05. EXPERT STORIES DECK — Horizontal premium portrait stack
// ─────────────────────────────────────────────────────────────────────────
const STORY_EXPERTS = [
  { name: 'Maya Sharma', role: 'Vedic Astrologer', years: '12 yrs', style: ['Intuitive', 'Spiritual'], langs: ['English', 'Hindi'], available: true, color: '#63BFE4', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', quote: 'I guide souls through life transitions with cosmic clarity.' },
  { name: 'Arun Nair', role: 'Tarot & Crystals', years: '8 yrs', style: ['Creative', 'Warm'], langs: ['English', 'Malayalam'], available: true, color: '#C9A0DC', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', quote: 'Every card tells a story; every story holds your truth.' },
  { name: 'Dr. Elena Rossi', role: 'Energy Healer', years: '15 yrs', style: ['Analytical', 'Gentle'], langs: ['English', 'Italian'], available: false, color: '#7EDEA0', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', quote: 'The body holds wisdom that the mind has not yet heard.' },
  { name: 'Chen Wei', role: 'Numerologist', years: '20 yrs', style: ['Practical', 'Deep'], langs: ['English', 'Mandarin'], available: true, color: '#F4D58D', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', quote: 'Numbers are the universe\'s most honest language.' },
  { name: 'Luna Vega', role: 'Tarot Reader', years: '6 yrs', style: ['Visionary', 'Expressive'], langs: ['English', 'Spanish'], available: true, color: '#9B8FFF', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop', quote: 'Your future is written in the stars and the cards alike.' },
];

export function ExpertStoriesDeck() {
  const [current, setCurrent] = useState(0);
  const expert = STORY_EXPERTS[current];

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center py-24">
      <div className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${expert.color}12, transparent)`, transition: 'background 0.8s ease' }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Large Decorative Quote mark to fill space */}
        <div className="absolute right-0 top-10 text-[200px] leading-none font-serif text-[#12527F] opacity-[0.03] pointer-events-none select-none">
          &rdquo;
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Left: cards */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-[2px]" style={{ backgroundColor: expert.color }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: expert.color }}>Meet Your Guide</span>
            </div>
            <div className="relative" style={{ height: '380px', width: '280px' }}>
              {STORY_EXPERTS.map((ex, i) => {
                const offset = (i - current + STORY_EXPERTS.length) % STORY_EXPERTS.length;
                const isActive = offset === 0;
                const isNext = offset === 1;
                const isNext2 = offset === 2;
                return (
                  <div key={ex.name}
                    className="absolute rounded-3xl overflow-hidden border-4 shadow-2xl cursor-pointer transition-all duration-700"
                    style={{
                      width: '260px', height: '340px',
                      borderColor: isActive ? ex.color : '#f0f0f0',
                      transform: isActive ? 'scale(1) rotate(0deg) translate(0,0)'
                        : isNext ? 'scale(0.9) rotate(5deg) translate(35px,-18px)'
                        : isNext2 ? 'scale(0.82) rotate(9deg) translate(60px,-30px)'
                        : 'scale(0.75) translateY(30px)',
                      zIndex: isActive ? 10 : isNext ? 7 : isNext2 ? 4 : 1,
                      opacity: isActive ? 1 : isNext ? 0.75 : isNext2 ? 0.5 : 0.2,
                    }}
                    onClick={() => setCurrent(i)}
                  >
                    <img src={ex.img} alt={ex.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-bold text-sm">{ex.name}</div>
                      <div className="text-xs opacity-75">{ex.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setCurrent(c => (c - 1 + STORY_EXPERTS.length) % STORY_EXPERTS.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: expert.color, color: expert.color }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {STORY_EXPERTS.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-400 cursor-pointer"
                  style={{ width: i === current ? '24px' : '8px', height: '8px', backgroundColor: i === current ? expert.color : `${expert.color}30` }}
                  onClick={() => setCurrent(i)} />
              ))}
              <button onClick={() => setCurrent(c => (c + 1) % STORY_EXPERTS.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: expert.color, color: expert.color }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: info */}
          <div className="lg:w-1/2" key={current} style={{ animation: 'zen-fade 0.5s ease' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: expert.available ? '#22c55e' : '#94a3b8' }} />
              <span className="text-sm font-bold" style={{ color: expert.available ? '#22c55e' : '#94a3b8' }}>
                {expert.available ? 'Available Now' : 'Accepting Bookings'}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-medium mb-2" style={{ color: '#111', transition: 'color 0.5s ease' }}>
              {expert.name}
            </h2>
            <p className="text-base text-gray-500 mb-6 font-medium">{expert.role} · {expert.years}</p>
            <blockquote className="text-xl font-light text-gray-700 mb-8 leading-relaxed border-l-4 pl-6 italic"
              style={{ borderColor: expert.color }}>
              &ldquo;{expert.quote}&rdquo;
            </blockquote>
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Style</p>
              <div className="flex gap-3 flex-wrap">
                {expert.style.map(s => (
                  <span key={s} className="px-4 py-2 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${expert.color}15`, color: expert.color, border: `1px solid ${expert.color}30` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Languages</p>
              <div className="flex gap-4">
                {expert.langs.map(l => (<span key={l} className="text-sm font-bold text-gray-600">{l}</span>))}
              </div>
            </div>
            <Link href="/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-xl hover:scale-105 transition-all"
              style={{ backgroundColor: expert.color }}>
              Book a Session <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 06. GLOBAL GUIDANCE MAP — Dark world map with glow cities
// ─────────────────────────────────────────────────────────────────────────
// 06. Zenauraa GLOBAL DISTRIBUTION — Platform reach visualised
// ─────────────────────────────────────────────────────────────────────────
const HC_NODES = [
  { name: 'India', x: 71, y: 41, users: '3.2M+', guides: '4,200+', top: 'Vedic Astrology', color: '#63BFE4', size: 'lg' },
  { name: 'USA', x: 21, y: 35, users: '820K+', guides: '1,100+', top: 'Life Coaching · Tarot', color: '#C9A0DC', size: 'md' },
  { name: 'UK', x: 47, y: 24, users: '420K+', guides: '820+', top: 'Tarot · Astrology', color: '#7EDEA0', size: 'sm' },
  { name: 'UAE', x: 64, y: 42, users: '310K+', guides: '650+', top: 'Spiritual Guidance', color: '#F4D58D', size: 'sm' },
  { name: 'Singapore', x: 78, y: 56, users: '180K+', guides: '480+', top: 'Energy Healing', color: '#98E6F4', size: 'sm' },
  { name: 'Australia', x: 85, y: 75, users: '150K+', guides: '390+', top: 'Meditation · Tarot', color: '#9B8FFF', size: 'sm' },
  { name: 'Brazil', x: 32, y: 65, users: '90K+', guides: '290+', top: 'Astrology', color: '#FF6B9D', size: 'xs' },
  { name: 'Japan', x: 86, y: 33, users: '110K+', guides: '310+', top: 'Numerology · Reiki', color: '#F4A261', size: 'xs' },
];

const GROWTH_STATS = [
  { value: '60+', label: 'Countries' },
  { value: '5.5M+', label: 'Users Worldwide' },
  { value: '8,000+', label: 'Verified Guides' },
  { value: '24', label: 'Languages' },
];

export function GlobalGuidanceMap() {
  const [hovered, setHovered] = useState<(typeof HC_NODES)[0] | null>(null);

  const nodeRadius: Record<string, number> = { lg: 22, md: 16, sm: 12, xs: 9 };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-24"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #EDF8FC 55%, #CDE9F4 100%)' }}>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{ backgroundImage: 'linear-gradient(to right, #1A92C6 1px, transparent 1px), linear-gradient(to bottom, #1A92C6 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow centers */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,191,228,0.2) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 lg:px-16 text-center mb-10 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-[1px] bg-[#1A92C6]" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#1A92C6]">Our Global Reach</span>
          <div className="w-10 h-[1px] bg-[#1A92C6]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#12527F] mb-3">Zenauraa Is Everywhere</h2>
        <p className="text-[#1A92C6] text-sm font-medium max-w-xl mx-auto font-bold">From New Delhi to New York, millions of seekers find guidance through Zenauraa every day. Hover a node to see our reach.</p>
      </div>

      {/* World map viz */}
      <div className="relative w-full max-w-4xl mx-auto px-6 z-10 flex items-center justify-center">
        
        {/* Aspect Ratio Container for Map */}
        <div className="relative w-full aspect-[950/620]">
          {/* Actual World Map Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
            <img src="/world-map.svg" alt="World Map" className="w-full h-full object-cover filter drop-shadow-xl" style={{ filter: 'invert(37%) sepia(85%) saturate(366%) hue-rotate(159deg) brightness(85%) contrast(87%)' }} />
          </div>

          {/* Base map connection lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Curved connection lines from India (biggest hub) */}
            {HC_NODES.slice(1).map(node => (
              <path key={`p-${node.name}`}
                d={`M ${HC_NODES[0].x}% ${HC_NODES[0].y}% Q 50% 50% ${node.x}% ${node.y}%`}
                fill="none" stroke={node.color} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 6" />
            ))}
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
          {HC_NODES.map(node => {
            const r = nodeRadius[node.size];
            const isHov = hovered?.name === node.name;
            return (
              <div key={node.name} className="absolute pointer-events-auto"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%,-50%)', zIndex: isHov ? 50 : 10 }}
                onMouseEnter={() => setHovered(node)}
                onMouseLeave={() => setHovered(null)}>
                {/* Pulse ring */}
                <div className="absolute rounded-full animate-ping"
                  style={{ width: r * 2.8 + 'px', height: r * 2.8 + 'px', top: -(r * 0.9) + 'px', left: -(r * 0.9) + 'px', backgroundColor: node.color, opacity: 0.15 }} />
                {/* Halo */}
                <div className="absolute rounded-full"
                  style={{ width: r * 2 + 'px', height: r * 2 + 'px', top: -r * 0.5 + 'px', left: -r * 0.5 + 'px', backgroundColor: node.color, opacity: 0.25, transition: 'all 0.4s ease', transform: isHov ? 'scale(1.5)' : 'scale(1)' }} />
                {/* Core dot */}
                <div className="rounded-full cursor-pointer transition-all duration-400"
                  style={{ width: r + 'px', height: r + 'px', backgroundColor: node.color, boxShadow: `0 0 ${isHov ? 24 : 10}px ${node.color}`, transform: isHov ? 'scale(1.35)' : 'scale(1)' }} />
                {/* City label */}
                <div className="absolute text-center" style={{ top: r + 6 + 'px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                  <span className="text-[10px] font-bold" style={{ color: node.color, opacity: isHov ? 1 : 0.8 }}>{node.name}</span>
                </div>
                {/* Tooltip */}
                {isHov && (
                  <div className="absolute z-50 rounded-2xl p-4 shadow-xl border pointer-events-none"
                    style={{ width: '210px', bottom: r + 20 + 'px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.98)', borderColor: `${node.color}40`, animation: 'zen-fade 0.25s ease', backdropFilter: 'blur(16px)' }}>
                    <div className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: node.color }}>{node.name}</div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xl font-bold text-[#12527F]">{node.users}</span>
                      <span className="text-[10px] text-[#1A92C6] font-bold">active users</span>
                    </div>
                    <div className="text-[11px] text-[#12527F]/70 font-medium mb-1">{node.guides} verified guides</div>
                    <div className="text-[10px] text-[#1A92C6] border-t border-[#CDE9F4] pt-2 mt-2 font-bold">{node.top}</div>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="container mx-auto px-6 lg:px-16 mt-12 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1A92C6]/20 pt-10">
          {GROWTH_STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-[#12527F] mb-1">{s.value}</div>
              <div className="text-[11px] font-black uppercase tracking-widest text-[#1A92C6]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// backward-compat alias so old imports still work
export { GlobalGuidanceMap as GlobalDistributionMap };

// ─────────────────────────────────────────────────────────────────────────
// 07. YOUR NEXT DISCOVERY — Animated 3-path journey CTA
// ─────────────────────────────────────────────────────────────────────────
const JOURNEY_PATHS = [
  {
    id: 'know', label: 'KNOW', title: 'Know Yourself',
    desc: 'Discover your cosmic blueprint through birth chart, numerology, and personality mapping.',
    items: ['Birth Chart Reading', 'Numerology Profile', 'Element & Sign Analysis'],
    color: '#63BFE4', icon: '✦',
  },
  {
    id: 'explore', label: 'EXPLORE', title: 'Explore Your World',
    desc: 'Navigate love, career, and life transitions through tarot, zodiac readings, and guided sessions.',
    items: ['Tarot Card Reading', 'Zodiac Compatibility', 'Monthly Forecasts'],
    color: '#C9A0DC', icon: '◉', featured: true,
  },
  {
    id: 'connect', label: 'CONNECT', title: 'Connect With Guides',
    desc: 'Meet verified practitioners matched to your exact needs, available 24/7 worldwide.',
    items: ['AI-Matched Experts', 'Live 1-on-1 Sessions', 'Ongoing Journey Support'],
    color: '#7EDEA0', icon: '◈',
  },
];

export function YourNextDiscovery() {
  const { theme } = useTheme();
  const isNewColor = theme === 'theme-new-color';
  const [hovered, setHovered] = useState<string | null>('explore');

  return (
    <section className="relative py-32 overflow-hidden"
      style={isNewColor ? { background: 'linear-gradient(135deg, #F7F3FC 0%, #F2ECFB 40%, #ECE4F7 100%)' } : { background: 'linear-gradient(135deg, #EDF8FC 0%, #CDE9F4 40%, #9FD6EE 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-[#12527F]"
            style={{ width: `${(i % 3) + 1}px`, height: `${(i % 3) + 1}px`, left: `${(i * 24.3) % 100}%`, top: `${(i * 18.7) % 100}%`, opacity: 0.02 + (i % 4) * 0.015 }} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-20">
          <div className={`text-5xl mb-4 ${isNewColor ? 'text-primary/15' : 'text-[#12527F]/15'}`}>✦ YOU ✦</div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#1A92C6]" />
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isNewColor ? 'text-primary' : 'text-[#1A92C6]'}`}>Your Next Discovery</span>
            <div className="w-8 h-[2px] bg-[#1A92C6]" />
          </div>
          <h2 className={`text-4xl md:text-6xl font-serif font-medium ${isNewColor ? 'text-foreground' : 'text-[#12527F]'}`}>Where Will You Go Next?</h2>
          <p className={`mt-4 text-base font-medium max-w-xl mx-auto ${isNewColor ? 'text-muted-foreground' : 'text-[#17619A]/70'}`}>
            Three paths. One cosmic journey. Choose where to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {JOURNEY_PATHS.map(path => {
            const isHov = hovered === path.id;
            return (
              <div key={path.id}
                className="relative rounded-3xl p-8 border transition-all duration-500 cursor-pointer group overflow-hidden"
                style={{
                  backgroundColor: isHov ? `${path.color}15` : 'rgba(255,255,255,0.65)',
                  borderColor: isHov ? path.color : 'rgba(255,255,255,0.8)',
                  transform: isHov ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHov ? `0 24px 60px ${path.color}25` : '0 4px 20px rgba(0,0,0,0.04)',
                  backdropFilter: 'blur(16px)',
                }}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered('explore')}>
                {'featured' in path && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: path.color }}>Popular</div>
                )}
                <div className="text-4xl mb-6 font-serif" style={{ color: path.color }}>{path.icon}</div>
                <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: path.color }}>{path.label}</div>
                <h3 className="text-2xl font-serif font-medium text-[#12527F] mb-4">{path.title}</h3>
                <p className="text-sm text-[#17619A]/75 leading-relaxed mb-6 font-medium">{path.desc}</p>
                <div className="space-y-2 mb-8">
                  {path.items.map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#17619A]/80 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: path.color }} />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="/signup"
                  className="inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-4"
                  style={{ color: path.color }}>
                  Begin This Path <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/signup"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(135deg, #1A92C6 0%, #12527F 100%)' }}>
            <span>Begin Your Cosmic Journey</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
          <p className="text-[#17619A]/50 text-xs mt-4 font-medium">Free to explore · No credit card required</p>
        </div>
      </div>
    </section>
  );
}
