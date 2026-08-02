'use client';
import { useEffect, useRef } from 'react';

export function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
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

    const particles: { x: number; y: number; z: number; speed: number }[] = [];
    const count = 400;
    
    // Create random particles in 3D space
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2, // -1 to 1
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        speed: 0.001 + Math.random() * 0.002
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      angleX += 0.002;
      angleY += 0.003;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        
        // Rotate around X and Y
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;
        
        let x2 = p.x * cosY + z1 * sinY;
        let z2 = -p.x * sinY + z1 * cosY;

        // Project to 2D
        const scale = 500 / (500 + z2 * 300); // 3D depth perspective
        const x2d = (width / 2) + x2 * 400 * scale;
        const y2d = (height / 2) + y1 * 400 * scale;

        // Alpha based on depth
        const alpha = Math.max(0, 0.8 - (z2 * 0.5));

        ctx.beginPath();
        ctx.arc(x2d, y2d, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${alpha})`; // #4F46E5
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

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
    />
  );
}
