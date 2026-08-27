import os

templates = {
    "page.tsx": """'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLayout } from '@/lib/layout-context';
import { QuantumHero } from './hero';
import { QuantumFeatures } from './features';
import { QuantumDataViz } from './data-viz';
import { QuantumFooter } from './footer';

export function AiFutureExperience() {
  const { setLayout } = useLayout();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#111111] font-sans overflow-x-hidden selection:bg-[#E0E7FF] selection:text-[#3730A3]">
      <button 
        onClick={() => setLayout('mystic-wheel')} 
        className="fixed top-8 left-8 z-[100] text-[#111111]/50 hover:text-[#111111] text-[10px] tracking-[0.3em] uppercase font-bold border border-[#111111]/10 px-6 py-2 rounded-full transition-all hover:bg-white backdrop-blur-md"
      >
        Return to Original
      </button>

      <QuantumHero />
      <QuantumFeatures />
      <QuantumDataViz />
      <QuantumFooter />
    </div>
  );
}
""",
    "hero.tsx": """'use client';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const QuantumCanvas = dynamic(() => import('./webgl-canvas').then(mod => mod.QuantumCanvas), { ssr: false });

export function QuantumHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <QuantumCanvas />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center">
        <div className="px-4 py-1.5 rounded-full border border-[#3730A3]/20 bg-white/50 backdrop-blur-xl text-[#3730A3] text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
          Ethereal Processing
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#111111] mb-6">
          Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">Oracle</span>
        </h1>
        <p className="text-[#666666] max-w-lg mx-auto text-sm md:text-base mb-12">
          Experience astrology through the lens of crystalline data structures and light-based WebGL physics.
        </p>
      </motion.div>
    </section>
  );
}
""",
    "webgl-canvas.tsx": """'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useState, useRef } from 'react';

function ParticleSwarm(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#4F46E5" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export function QuantumCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ParticleSwarm />
    </Canvas>
  );
}
""",
    "features.tsx": """'use client';
export function QuantumFeatures() {
  return (
    <section className="bg-white py-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-[#3730A3] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Crystal Clear</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 tracking-tight">Data beyond the stars.</h3>
          <p className="text-[#666666] leading-relaxed">
            We map your astrological profile into complex geometric data structures that resonate with universal energy frequencies.
          </p>
        </div>
        <div className="h-[400px] w-full rounded-3xl bg-gradient-to-tr from-[#EEF2FF] to-[#ECFEFF] border border-[#E0E7FF] shadow-2xl shadow-[#4F46E5]/10 flex items-center justify-center p-8">
           <div className="w-full h-full border border-dashed border-[#4F46E5]/30 rounded-2xl flex items-center justify-center">
             <div className="w-16 h-16 bg-[#4F46E5]/10 rounded-full animate-ping" />
           </div>
        </div>
      </div>
    </section>
  );
}
""",
    "data-viz.tsx": """'use client';
export function QuantumDataViz() {
  return (
    <section className="bg-[#FAFAFA] py-32 text-center">
      <h3 className="text-4xl md:text-5xl font-black text-[#111111] mb-12 tracking-tight">The Neural Map</h3>
      <div className="max-w-5xl mx-auto h-[300px] flex items-end justify-center gap-2 px-8">
        {[40, 70, 45, 90, 60, 100, 85, 30, 50, 80].map((h, i) => (
          <div key={i} className="w-12 bg-gradient-to-t from-[#4F46E5] to-[#06B6D4] rounded-t-lg transition-all duration-1000 hover:opacity-80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </section>
  );
}
""",
    "footer.tsx": """'use client';
export function QuantumFooter() {
  return (
    <footer className="bg-white py-12 flex justify-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#A3A3A3] border-t border-gray-100">
      Quantum Oracle System v1.0
    </footer>
  );
}
"""
}

base_dir = "e:/HealConnect/Heal_Connect/web/src/components/experiences/ai-future"
for comp, content in templates.items():
    with open(os.path.join(base_dir, comp), "w", encoding="utf-8") as f:
        f.write(content)

print("Populated quantum components")
