"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

function Feather({ angle, radius, size, delay, color, isAccent = false }: { angle: number, radius: number, size: number, delay: number, color: string, isAccent?: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Gentle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.08;
      ref.current.scale.set(scale, scale, scale);
      
      // Slight inward/outward bending
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, angle]}>
      <group ref={ref} position={[0, radius / 2, 0]}>
        {/* Delicate stem */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.005 * size, 0.02 * size, radius, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        
        {/* Peacock Eye (Tip) */}
        <group position={[0, radius / 2 - 0.1 * size, 0.05]}>
          {/* Center bright dot */}
          <mesh position={[0, 0, 0.02]}>
            <sphereGeometry args={[0.06 * size, 16, 16]} />
            <meshBasicMaterial color={isAccent ? "#FFD700" : "#ffffff"} transparent opacity={0.9} />
          </mesh>
          
          {/* Inner ring */}
          <mesh position={[0, 0, 0.01]}>
            <torusGeometry args={[0.12 * size, 0.03 * size, 16, 32]} />
            <meshBasicMaterial color="#5F3BA9" transparent opacity={0.8} />
          </mesh>

          {/* Outer glowing ring */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.22 * size, 0.02 * size, 16, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>

          {/* Ethereal glow behind the eye */}
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[0.8 * size, 1.2 * size]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function MandalaPeacock() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Very slow majestic rotation
      groupRef.current.rotation.z -= delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Background ambient core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#B9A0E4" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Layer 1: Long majestic feathers */}
      {Array.from({length: 16}).map((_, i) => (
        <Feather key={`l1-${i}`} angle={(i / 16) * Math.PI * 2} radius={2.8} size={1.2} delay={i * 0.2} color="#B9A0E4" isAccent={i % 2 === 0} />
      ))}
      
      {/* Layer 2: Medium dense feathers */}
      {Array.from({length: 12}).map((_, i) => (
        <Feather key={`l2-${i}`} angle={(i / 12) * Math.PI * 2 + 0.2} radius={2.0} size={0.9} delay={i * 0.3} color="#8982D0" />
      ))}
      
      {/* Layer 3: Short inner crown */}
      {Array.from({length: 8}).map((_, i) => (
        <Feather key={`l3-${i}`} angle={(i / 8) * Math.PI * 2 + 0.1} radius={1.2} size={0.6} delay={i * 0.4} color="#5F3BA9" isAccent />
      ))}
    </group>
  );
}

export default function PeacockBloom() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
            <MandalaPeacock />
          </Float>
        </Canvas>
      </div>

      {/* Revolving Premium Labels Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{ animation: 'spin 80s linear infinite' }}
      >
        {MODALITIES.map((mod, i) => {
          const total = MODALITIES.length;
          const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
          const r = 260; 
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          
          return (
            <div
              key={`label-${mod.id}`}
              className="absolute"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <div 
                className="pointer-events-auto cursor-pointer group"
                style={{ animation: 'spin 80s linear infinite reverse' }}
                onClick={() => router.push(`/modalities/${mod.id}`)}
              >
                <div className="flex items-center gap-2 bg-[#1E2059]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-[#5F3BA9]/80 hover:border-white/30 transition-all duration-300 hover:scale-110">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5B6DC] group-hover:bg-white shadow-[0_0_8px_#fff] transition-colors" />
                  <span className="text-[10px] sm:text-xs tracking-widest font-medium text-white/90 group-hover:text-white uppercase transition-colors">
                    {mod.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-20 w-28 h-28 rounded-full bg-white/95 shadow-2xl flex items-center justify-center p-3 border-2 border-[#5F3BA9]/30 cursor-pointer hover:scale-105 transition-transform">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
