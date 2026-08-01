'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';

export function AppleCosmicNavigation() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 50], ['rgba(251, 251, 253, 0)', 'rgba(251, 251, 253, 0.8)']);
  const backdropFilter = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(20px)']);
  const { setLayout } = useLayout();

  return (
    <motion.nav 
      style={{ backgroundColor, backdropFilter }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-transparent transition-all"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-900 to-gray-600 flex items-center justify-center text-white font-bold tracking-tighter text-xs">HC</div>
        <span className="font-semibold tracking-tight text-lg">HealConnect</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-gray-500">
        <a href="#" className="hover:text-black transition-colors">Vision</a>
        <a href="#" className="hover:text-black transition-colors">Astrology</a>
        <a href="#" className="hover:text-black transition-colors">Tarot</a>
        <a href="#" className="hover:text-black transition-colors">Experts</a>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setLayout('mystic-wheel')} className="text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1"><Layout className="w-3 h-3" /> Back to Themes</button>
        <button className="bg-black text-white px-5 py-2 rounded-full text-[13px] font-medium hover:scale-105 transition-transform">Get Started</button>
      </div>
    </motion.nav>
  );
}
