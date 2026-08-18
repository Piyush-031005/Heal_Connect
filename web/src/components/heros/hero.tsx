'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Sparkles, Flower2 } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';
import ModalityWheel from '@/components/modality-wheel';
import OpticalWheel from '@/components/optical-wheel';

// --- PRIMARY LAYOUT HERO (Locked) ---
function PrimaryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-background min-h-[90vh] flex items-center">
      {/* Soft Light Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Big Modality Wheel - slightly smaller, perfectly centered */}
      <div className="absolute right-[-15%] md:right-[-5%] top-1/2 -translate-y-1/2 h-[650px] w-[650px] md:h-[780px] md:w-[780px] opacity-90 lg:opacity-100 z-10 pointer-events-none lg:pointer-events-auto flex items-center justify-center">
        <OpticalWheel />
      </div>

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.25em] uppercase text-primary font-bold">Align Your Wellness</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-normal tracking-tight leading-[1] mb-6 animate-in slide-in-from-left duration-1000">
            <span className="text-foreground">Heal</span>
            <span className="text-primary italic">Connect.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-foreground/80 mb-10 max-w-xl animate-in slide-in-from-left duration-1000 delay-150 font-sans font-light leading-relaxed">
            Your one stop shop to discover and connect with holistic health, astrological and wellness practitioners around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in slide-in-from-left duration-1000 delay-300">
            <Link href="/practitioners">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full font-medium transition-all shadow-lg shadow-primary/20">
                Book Consultation <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </div>
          
          {/* Subtle Trust Indicators */}
          <div className="flex items-center gap-8 animate-in fade-in duration-1000 delay-500 border-t border-primary/20 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-foreground">10,000+</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">Trusted Practitioners</span>
            </div>
            <div className="w-px h-10 bg-primary/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-foreground">50+</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest">Wellness Categories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- EDITORIAL LAYOUT HERO (Magazine) ---
function EditorialHero() {
  return (
    <section className="relative pt-32 pb-20 bg-background min-h-[90vh] flex flex-col justify-center border-b border-primary/10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight leading-[0.95] mb-8 text-foreground">
              Your Path to <br />
              <span className="italic text-primary">Wellness</span> Begins Here.
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 mb-10 max-w-2xl font-light leading-relaxed">
              Connect with trusted holistic health, astrological and wellness practitioners from around the world—all in one place.
            </p>
            
            {/* Search Bar matching Zen Align reference */}
            <div className="flex items-center bg-card rounded-full p-2 max-w-xl shadow-lg border border-primary/10">
              <Search className="w-5 h-5 text-muted-foreground ml-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search by specialty, service or name" 
                className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 font-medium">
                Search
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">Popular:</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Astrologers</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Energy Healing</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Yoga</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-t-full rounded-b-full overflow-hidden relative border-8 border-background shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80" 
                alt="Meditation and Wellness" 
                fill 
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
            
            {/* Editorial Floating Modality Badge */}
            <div className="absolute top-12 -left-12 bg-card p-4 rounded-2xl shadow-xl border border-primary/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Find Clarity</p>
                <p className="text-xs text-muted-foreground">Expert Astrologers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ORGANIC LAYOUT HERO (Flow) ---
function OrganicHero() {
  return (
    <section className="relative overflow-hidden pt-64 pb-24 bg-background min-h-[90vh] flex items-center">
      {/* Flowing Organic Shapes */}
      <svg className="absolute bottom-0 left-0 w-full h-1/2 text-primary/10 opacity-50 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,100 Q50,0 100,100 Z" fill="currentColor" />
      </svg>
      
      <div className="container mx-auto px-6 relative z-10 text-center mt-12 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] flex items-center justify-center text-primary animate-[spin_10s_linear_infinite]">
              <Flower2 className="w-10 h-10 animate-[spin_10s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight leading-tight mb-8 text-foreground max-w-5xl mx-auto pointer-events-auto">
          Heal your mind, body <br />
          <span className="text-primary italic">& energy.</span>
        </h1>
        
        <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto font-light pointer-events-auto">
          Join a global community dedicated to healing, growth and transformation. Find your perfect practitioner today.
        </p>
        
        <div className="pointer-events-auto">
          <Link href="/practitioners">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg rounded-full font-medium transition-all shadow-xl shadow-primary/20">
              Join Zenauraa Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- MINIMALIST LAYOUT HERO (Clean & Imagery Focused) ---
function MinimalistHero() {
  return (
    <section className="relative pt-32 pb-24 bg-background min-h-[85vh] flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              Healing, <br /><span className="font-semibold text-primary">Elevated.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light mb-12">
              Connect with elite practitioners to heal your mind, body, and energy. Experience the power of crystals, tarot, and holistic therapies.
            </p>
            <Link href="/practitioners">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-12 h-14 uppercase tracking-widest text-xs font-bold transition-all">
                Discover Your Path
              </Button>
            </Link>
          </div>
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1515023677547-593d7638cbd6?auto=format&fit=crop&q=80" 
              alt="Healing Crystals" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MODERN GLOW LAYOUT HERO (Mystic Imagery) ---
function ModernGlowHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-32 bg-card min-h-[90vh] flex items-center border-b border-border">
      {/* Background Image instead of neon glow */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1632516482181-427c3f3ab654?auto=format&fit=crop&q=80" 
          alt="Tarot and Mystic Aesthetic" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md text-primary mb-8 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-bold">Unveil The Future</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight text-foreground mb-8 drop-shadow-sm">
          Awaken Your Spirit
        </h1>
        <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          The most vibrant community of modern mystics, healers, and spiritual guides.
        </p>
        <Link href="/practitioners">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 h-14 text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Start Journey
          </Button>
        </Link>
      </div>
    </section>
  );
}

// --- ZEN ALIGN LAYOUT HERO (New Design 1) ---
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// WebGL-style Canvas Star Field
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.2,
      a: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.05,
      pulse: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.pulse += 0.01;
        const op = s.opacity * (0.7 + 0.3 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 191, 228, ${op})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    draw();
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// Animated constellation SVG lines (decorative)
function ConstellationLines() {
  const points = [
    { x: '10%', y: '20%' }, { x: '25%', y: '12%' }, { x: '40%', y: '28%' },
    { x: '20%', y: '45%' }, { x: '15%', y: '65%' },
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
      {points.slice(0, -1).map((p, i) => (
        <motion.line
          key={i}
          x1={p.x} y1={p.y}
          x2={points[i + 1].x} y2={points[i + 1].y}
          stroke="#63BFE4"
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r="0.5"
          fill="#20A6DC"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.5, delay: i * 0.4 }}
        />
      ))}
    </svg>
  );
}

// --- NEW ZEN ALIGN HERO (REWRITTEN) ---
function ZenAlignHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden border-b border-[#CDE9F4]/40"
      style={{ background: 'linear-gradient(135deg, #EDF8FC 0%, #CDE9F4 40%, #9FD6EE 100%)' }}
    >
      {/* WebGL-style animated star canvas */}
      <StarCanvas />

      {/* Constellation SVG overlay */}
      <ConstellationLines />

      {/* Large radial glow — center-right */}
      <div className="absolute right-0 top-0 w-[70vw] h-full bg-[radial-gradient(ellipse_at_70%_40%,rgba(32,166,220,0.18)_0%,transparent_65%)] pointer-events-none z-0" />
      <div className="absolute left-0 bottom-0 w-[50vw] h-1/2 bg-[radial-gradient(ellipse_at_30%_80%,rgba(23,97,154,0.10)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* Giant background number/glyph */}
      <div className="absolute top-0 right-0 text-[32vw] font-black leading-none text-[#1A92C6]/[0.04] pointer-events-none select-none z-0 tracking-tighter">
        12
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 lg:px-16 relative z-20 pt-36 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT: Text */}
          <motion.div
            style={{ y: yText, opacity }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-[#1A92C6]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1A92C6]">
                Zenauraa Cosmos
              </span>
            </motion.div>

            {/* Main heading — High-end elegant editorial typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-[#12527F] mb-6 leading-[1.05]"
            >
              Align Your <br />
              <span className="italic font-normal text-[#1A92C6]">Inner Cosmos.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-base md:text-lg font-medium text-[#17619A]/75 max-w-sm mb-10 leading-relaxed"
            >
              Discover vetted astrologers, energy healers, and spiritual guides. Reconnect with the universe.
            </motion.p>

            {/* Search Bar — glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center bg-white/70 backdrop-blur-2xl rounded-2xl p-2 max-w-md shadow-[0_8px_40px_rgba(26,146,198,0.18)] border border-white/80 hover:shadow-[0_12px_60px_rgba(26,146,198,0.28)] transition-all duration-500">
                <Search className="w-5 h-5 text-[#1A92C6] ml-4 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Find your guide..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-[#12527F] placeholder:text-[#7FB2D3] font-semibold text-base py-2"
                />
                <Button className="bg-[#1A92C6] hover:bg-[#17619A] text-white rounded-xl px-7 h-11 font-bold text-sm tracking-wider transition-all">
                  Search
                </Button>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-[#9FD6EE]/40"
            >
              <div>
                <p className="text-2xl font-black text-[#12527F]">10K+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A92C6]/70">Practitioners</p>
              </div>
              <div className="w-px h-8 bg-[#9FD6EE]/60" />
              <div>
                <p className="text-2xl font-black text-[#12527F]">50+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A92C6]/70">Modalities</p>
              </div>
              <div className="w-px h-8 bg-[#9FD6EE]/60" />
              <div>
                <p className="text-2xl font-black text-[#12527F]">4.9★</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A92C6]/70">Avg Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Cosmic Wheel Graphic */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center h-[50vw] max-h-[700px] min-h-[350px] w-full lg:-mt-12 lg:-translate-y-6"
          >
            {/* Soft blue background glow for the wheel */}
            <div className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full bg-[radial-gradient(circle,rgba(26,146,198,0.15)_0%,rgba(99,191,228,0.05)_50%,transparent_70%)] blur-2xl z-0" />

            {/* Wheel Container */}
            <div className="relative w-[95%] max-w-[700px] aspect-square flex items-center justify-center rounded-full z-10">
              
              {/* Outer Dashed Ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
                className="absolute w-full h-full rounded-full border border-dashed border-[#1A92C6]/30"
              />
              
              {/* Solid Ring 2 with Nodes */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 110, ease: 'linear' }}
                className="absolute w-[82%] h-[82%] rounded-full border border-[#1A92C6]/25"
              >
                 {/* Zodiac Nodes (CSS positioned around circle) */}
                 {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute inset-0 flex justify-center"
                         style={{ transform: `rotate(${i * 45}deg)` }}>
                       <div className="flex flex-col items-center -mt-2">
                         <div className="w-2 h-2 bg-[#1A92C6] rounded-full shadow-[0_0_10px_#1A92C6]" />
                         <div className="w-[1px] h-4 bg-[#1A92C6]/50 mt-1" />
                       </div>
                    </div>
                 ))}
              </motion.div>

              {/* Inner Dashed Ring 3 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                className="absolute w-[62%] h-[62%] rounded-full border border-[#1A92C6]/40"
                style={{ strokeDasharray: '4 8' }}
              />

              {/* Central Glowing Orb & Logo */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute w-[42%] h-[42%] rounded-full flex items-center justify-center z-20"
              >
                 {/* Main Logo */}
                 <div className="relative w-full h-full z-10">
                   <Image
                     src="/lavender_logo.png"
                     alt="Zenauraa Logo"
                     fill
                     className="object-contain drop-shadow-[0_10px_30px_rgba(26,146,198,0.4)]"
                   />
                 </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A92C6]/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-[#1A92C6] to-transparent"
        />
      </motion.div>
    </section>
  );
}

// --- LAYOUT 2 HERO (Sky Blue Celestial) ---
// --- LAYOUT 2 HERO (Sky Blue Celestial - Awwwards Level) ---
function Layout2Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFloating1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const yFloating2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  
  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-40 lg:pb-56 bg-background min-h-[110vh] flex flex-col items-center justify-center border-b border-border/50 overflow-hidden"
    >
      {/* Massive Background Parallax Text */}
      <motion.div 
        style={{ y: yText }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none select-none opacity-10 mix-blend-overlay"
      >
        <h1 className="text-[15vw] font-serif font-bold tracking-tighter text-primary leading-none whitespace-nowrap">
          ZENAURAA
        </h1>
      </motion.div>

      {/* Soft glowing ambient backgrounds */}
      <motion.div style={{ y: yBg }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(99,191,228,0.2)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: yBg }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(32,166,220,0.15)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20 mt-12 lg:mt-24">
        
        {/* Asymmetrical Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Main Masterpiece Image (Centered / Right Bias) */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 lg:col-start-5 relative flex justify-center lg:justify-end z-10"
          >
            {/* Subtle glow behind image */}
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-[120px] -z-10 animate-[pulse_4s_ease-in-out_infinite]" />
            
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative w-full max-w-[500px] lg:max-w-[750px] aspect-[4/5] z-10"
            >
              <img 
                src="/zodiac-masterpiece.png" 
                alt="Zenauraa Masterpiece" 
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(26,146,198,0.3)] hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&q=80";
                }}
              />
            </motion.div>

            {/* Floating Real-Life Glassmorphism Cards */}
            <motion.div 
              style={{ y: yFloating1 }}
              className="absolute top-10 -left-10 lg:-left-20 w-48 h-64 rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 z-20 hidden md:block"
            >
              <img src="https://images.unsplash.com/photo-1515023677547-593d7638cbd6?auto=format&fit=crop&q=80&w=400" alt="Healing Crystal" className="w-full h-full object-cover opacity-80 mix-blend-overlay hover:opacity-100 hover:mix-blend-normal transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <p className="text-white text-xs font-semibold tracking-wider">Aura Cleansing</p>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: yFloating2 }}
              className="absolute bottom-20 -right-4 lg:-right-12 w-40 h-40 rounded-full overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 z-20 hidden md:block"
            >
              <img src="https://images.unsplash.com/photo-1632516482181-427c3f3ab654?auto=format&fit=crop&q=80&w=400" alt="Tarot" className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700" />
            </motion.div>
          </motion.div>

          {/* Overlapping Typography (Left Bias) */}
          <motion.div 
            className="lg:col-span-6 lg:col-start-1 lg:row-start-1 flex flex-col items-start text-left z-30 pt-12 lg:pt-0 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-background/40 backdrop-blur-md text-primary mb-8 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Awaken Your Destiny</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-bold tracking-tighter text-foreground mb-6 leading-[1.05] drop-shadow-lg">
                Discover <br />
                <span className="text-primary font-serif italic font-medium">Zenauraa.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-foreground/80 mb-12 font-medium leading-relaxed font-sans max-w-md drop-shadow-md pointer-events-auto"
            >
              Connect with vetted spiritual guides, astrologers, and energy healers to align your inner world and outer reality.
            </motion.p>

            {/* Glassmorphism Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-lg"
            >
              <div className="flex items-center bg-white/40 backdrop-blur-2xl rounded-full p-2.5 w-full shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/60 transition-transform duration-500 hover:shadow-[0_12px_48px_rgba(26,146,198,0.15)] hover:scale-[1.02]">
                <Search className="w-5 h-5 text-primary ml-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Find your spiritual guide..." 
                  className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-foreground/50 font-sans font-medium text-lg placeholder:font-light"
                />
                <Button className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 h-12 lg:h-14 font-bold font-sans transition-all text-base shadow-md">
                  Search
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}

// --- FINAL HYBRID HERO (Amethyst/Gold with Classic Typography) ---
function FinalHybridHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <section 
      ref={containerRef}
      className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-background transition-colors duration-500 min-h-[95vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#694091]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B79AE6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Typography & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 z-20"
          >
            {/* Start Chat / Start Calling Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/practitioners"
                className="bg-primary/20 text-primary border border-primary/40 px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/30 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Start Chat
              </Link>
              <Link
                href="/practitioners"
                className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:brightness-110 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Start Calling
              </Link>
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Premium Consultation</span>
            </div>

            {/* Typography from very old layout */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-serif font-medium tracking-tight text-foreground mb-6 leading-[1.1] transition-colors duration-500"
            >
              Guidance.<br/>
              Clarity.<br/>
              <span className="text-primary italic transition-colors duration-500">Confidence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-lg md:text-xl font-medium text-muted-foreground max-w-md mb-12 leading-relaxed transition-colors duration-500"
            >
              Find trusted guidance for every stage of life. Connect with verified experts instantly.
            </motion.p>

            {/* Stats row from screenshot 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center gap-8 pt-8 border-t border-primary/30 transition-colors duration-500"
            >
              <div>
                <p className="text-2xl font-serif text-foreground">4.9★</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rating</p>
              </div>
              <div className="w-px h-8 bg-primary/30" />
              <div>
                <p className="text-2xl font-serif text-foreground">100k+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Consultations</p>
              </div>
              <div className="w-px h-8 bg-primary/30" />
              <div>
                <p className="text-2xl font-serif text-foreground">500+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Experts</p>
              </div>
              <div className="w-px h-8 bg-primary/30" />
              <div>
                <p className="text-2xl font-serif text-foreground">24x7</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Availability</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Cosmic Wheel Graphic (Adapted to Half-Arc) */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 absolute inset-y-0 right-0 w-full h-full pointer-events-none flex items-center justify-center z-0"
          >
            {/* Lavender glow */}
            <div className="absolute top-1/2 right-0 translate-x-[30%] -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(183,154,230,0.15)_0%,rgba(105,64,145,0.25)_50%,transparent_70%)] blur-3xl z-0" />

            {/* Wheel Container - MASSIVE HALF ARC */}
            <div className="absolute top-1/2 right-0 translate-x-[35%] md:translate-x-[30%] lg:translate-x-[25%] -translate-y-1/2 w-[650px] h-[650px] md:w-[900px] md:h-[900px] lg:w-[1150px] lg:h-[1150px] flex items-center justify-center rounded-full z-10 pointer-events-none">
              
              {/* Outer Dashed Ring */}
              <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-[#B79AE6]/30 pointer-events-none" />
              
              {/* Inner Thin Ring */}
              <div className="absolute w-[75%] h-[75%] rounded-full border border-[#B79AE6]/20 pointer-events-none" />

              {/* THE REVOLVING ORBIT — the whole ring spins, icons counter-rotate to stay upright */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                className="absolute w-[95%] h-[95%] rounded-full transition-colors duration-500 pointer-events-none"
              >
                {[
                  { img: '/12-modalities-updates/astrology.png',       label: 'Astrology',     id: 'astrology' },
                  { img: '/12-modalities-updates/tarot.png',            label: 'Tarot',         id: 'tarot' },
                  { img: '/12-modalities-updates/facereading.png',      label: 'Face Reading',  id: 'face-reading' },
                  { img: '/12-modalities-updates/plamreading.png',      label: 'Palm Reading',  id: 'palm-reading' },
                  { img: '/12-modalities-updates/sound.png',            label: 'Sound Healing', id: 'sound-healing' },
                  { img: '/12-modalities-updates/medidation.png',       label: 'Meditation',    id: 'meditation' },
                  { img: '/12-modalities-updates/spiritual.png',        label: 'Spiritual',     id: 'spiritual' },
                  { img: '/12-modalities-updates/chakrahealing.png',    label: 'Chakra',        id: 'chakra-healing' },
                  { img: '/12-modalities-updates/breathwork.png',       label: 'Breathwork',    id: 'breathwork' },
                  { img: '/12-modalities-updates/dream_prediction.png', label: 'Dreams',        id: 'dreams' },
                  { img: '/12-modalities-updates/space_harmony.png',    label: 'Space Harmony', id: 'space-harmony' },
                  { img: '/12-modalities-updates/numerology.png',       label: 'Numerology',    id: 'numerology' },
                ].map((mod, i, arr) => {
                  const angle = (i * 360) / arr.length;
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex justify-center items-start origin-center pointer-events-none"
                      initial={{ rotate: angle }}
                    >
                      {/* Counter-rotate the icon so it always faces upright */}
                      <motion.div
                        initial={{ rotate: -angle }}
                        animate={{ rotate: -(360 + angle) }}
                        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                        className="flex flex-col items-center -mt-12 md:-mt-16 group cursor-pointer pointer-events-auto"
                      >
                        <Link href={`/modalities/${mod.id}`} className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center transition-all duration-500 hover:scale-110 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)] hover:drop-shadow-[0_0_25px_rgba(var(--primary),0.8)]">
                          <img src={mod.img} alt={mod.label} className="w-full h-full object-contain group-hover:brightness-125 transition-all" />
                        </Link>
                        <span className="text-[14px] md:text-[16px] font-bold text-foreground mt-3 tracking-wide whitespace-nowrap drop-shadow-md transition-colors duration-500">{mod.label}</span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Central Logo Area */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute w-[28%] h-[28%] rounded-full flex items-center justify-center z-20 pointer-events-auto"
              >
                {/* Geometric Star Pattern Behind Logo */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="absolute inset-0 w-full h-full border border-primary/30 rotate-0 rounded-sm" />
                  <div className="absolute inset-0 w-full h-full border border-primary/30 rotate-[30deg] rounded-sm" />
                  <div className="absolute inset-0 w-full h-full border border-primary/30 rotate-[60deg] rounded-sm" />
                </motion.div>

                {/* Glowing Dark Center Circle */}
                <div className="absolute w-[80%] h-[80%] rounded-full bg-[#0B1520] shadow-[0_0_80px_rgba(var(--primary),0.3)] border border-primary/40 flex items-center justify-center">
                  {/* Additional inner glow */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(var(--primary),0.2)]" />
                  
                  {/* The Logo */}
                  <div className="relative w-[85%] h-[85%] z-10 flex items-center justify-center">
                    <Image
                      src="/this_is_the_logo.png"
                      alt="HealConnect Logo"
                      fill
                      className="object-contain drop-shadow-[0_10px_20px_rgba(var(--primary),0.6)] hover:scale-105 hover:drop-shadow-[0_15px_30px_rgba(var(--primary),0.8)] transition-all duration-500 cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN EXPORT ---
export default function Hero() {
  const { layout } = useLayout();
  
  if (layout === 'final-hybrid') return <FinalHybridHero />;
  if (layout === 'layout-2') return <Layout2Hero />;
  if (layout === 'new-design-1') return <ZenAlignHero />;
  if (layout === 'editorial') return <EditorialHero />;
  if (layout === 'organic') return <OrganicHero />;
  if (layout === 'minimalist') return <MinimalistHero />;
  if (layout === 'modern-glow') return <ModernGlowHero />;
  return <PrimaryHero />; // layout === 'primary' or default
}
