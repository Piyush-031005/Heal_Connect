'use client';

import { useState } from 'react';
import { useLayout } from '@/lib/layout-context';
import { Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ORIGINAL_THEMES = [
  { code: 'divine-lotus', label: 'Divine Lotus', color: '#FDFBF7' },
  { code: 'sunburst-radiance', label: 'Sunburst', color: '#FFC300' },
  { code: 'lotus-harmony', label: 'Lotus Harmony', color: '#FDFCF8' },
  { code: 'emerald-aurora', label: 'Emerald Aurora', color: '#083D31' },
  { code: 'ruby-velvet', label: 'Ruby Velvet', color: '#2D0502' },
  { code: 'zen-minimalist', label: 'Zen Minimalist', color: '#F9F7F1' },
  { code: 'mystic-wheel', label: 'Mystic Wheel', color: '#1B0B2A' },
  { code: 'celestial-map', label: 'Celestial Map', color: '#1A0B0F' },
];

export function ThemeWheel() {
  const { layout, setLayout } = useLayout();
  const [isOpen, setIsOpen] = useState(false);

  // Check if current layout is one of the original themes
  const isOriginalTheme = ORIGINAL_THEMES.some((t) => t.code === layout);
  
  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -45 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-full right-full mb-4 mr-4 flex items-center justify-center"
            style={{ width: '300px', height: '300px' }}
          >
            {ORIGINAL_THEMES.map((theme, idx) => {
              const angle = (idx / ORIGINAL_THEMES.length) * 360;
              const radius = 120;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <motion.button
                  key={theme.code}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y }}
                  exit={{ opacity: 0, x: 0, y: 0 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => {
                    setLayout(theme.code);
                    setIsOpen(false);
                  }}
                  className={`absolute w-12 h-12 rounded-full shadow-lg border-2 flex items-center justify-center group transition-transform hover:scale-110 ${
                    layout === theme.code ? 'border-primary ring-4 ring-primary/20' : 'border-white hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: theme.color }}
                >
                  <div className="absolute opacity-0 group-hover:opacity-100 -bottom-8 whitespace-nowrap bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl pointer-events-none transition-opacity">
                    {theme.label}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          isOpen ? 'bg-black text-white rotate-180' : isOriginalTheme ? 'bg-primary text-primary-foreground' : 'bg-white text-gray-900 border-2 border-gray-100'
        }`}
      >
        <Layout className={`w-6 h-6 ${isOpen ? 'scale-110' : ''}`} />
      </button>
    </div>
  );
}
