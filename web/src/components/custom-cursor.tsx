'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Add magnetic effect for links and buttons
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // If mobile/touch device, don't show custom cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      opacity: isVisible ? 1 : 0,
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 50 },
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      backgroundColor: 'rgba(236, 72, 153, 0.2)', // Pink hue on hover
      opacity: isVisible ? 1 : 0,
      mixBlendMode: 'difference' as any,
      transition: { type: 'spring', mass: 0.1, stiffness: 800, damping: 50 },
    },
  };

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none; /* Hide default cursor */
        }
        a, button, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] backdrop-blur-[2px] border border-white/30 shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
      />
      {/* Tiny dot in center for precision */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#4F46E5] rounded-full pointer-events-none z-[10000]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', mass: 0.01, stiffness: 1000, damping: 40 }}
      />
    </>
  );
}
