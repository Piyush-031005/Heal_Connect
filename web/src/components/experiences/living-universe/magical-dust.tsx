'use client';
import { useEffect, useRef } from 'react';

export default function MagicalDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Create 300 stars (dust particles)
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speedY: -Math.random() * 0.5 - 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random(),
      alphaChange: (Math.random() - 0.5) * 0.02
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Move
        star.y += star.speedY;
        star.x += star.speedX;
        star.alpha += star.alphaChange;
        
        // Wrap around
        if (star.y < 0) star.y = height;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        
        // Pulse alpha
        if (star.alpha > 1) {
          star.alpha = 1;
          star.alphaChange *= -1;
        } else if (star.alpha < 0.1) {
          star.alpha = 0.1;
          star.alphaChange *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Draw some golden (#D4AF37) and some white
        const isGold = i % 4 === 0;
        ctx.fillStyle = isGold 
          ? `rgba(212, 175, 55, ${star.alpha})` 
          : `rgba(255, 255, 255, ${star.alpha * 0.5})`;
          
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block opacity-60" />;
}
