"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
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

function EtherealFeather({ rotation, position, color, scale }: any) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
      meshRef.current.scale.setScalar(scale + breathe);
    }
  });

  return (
    <group ref={meshRef} rotation={rotation} position={position}>
      {/* A stylized curved feather shape made from multiple elongated spheres */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0.2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0.2, 2, 0]} rotation={[0, 0, 0.4]} scale={[0.8, 1.2, 1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0.5, 2.8, 0]} rotation={[0, 0, 0.6]} scale={[0.6, 1.4, 1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function FeatherMandala() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.1; // Smooth rotation
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <EtherealFeather 
            key={i}
            rotation={[0, 0, -angle]}
            position={[Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0]}
            color={i % 2 === 0 ? "#8982D0" : "#9bc9d5"}
            scale={0.8}
          />
        );
      })}
    </group>
  );
}

export default function AuroraBlob() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
             <FeatherMandala />
          </Float>
        </Canvas>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ animation: 'spin 80s linear infinite' }}>
        {MODALITIES.map((mod, i) => {
          const total = MODALITIES.length;
          const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
          const r = 260; 
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div key={`label-${mod.id}`} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
              <div className="pointer-events-auto cursor-pointer group" style={{ animation: 'spin 80s linear infinite reverse' }} onClick={() => router.push(`/modalities/${mod.id}`)}>
                <div className="flex items-center gap-2 px-3 py-1.5 transition-all duration-300 hover:scale-110">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E2059]/40 group-hover:bg-[#5F3BA9] shadow-[0_0_8px_rgba(95,59,169,0.5)] transition-colors" />
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#3A247A] group-hover:text-[#1E2059] uppercase transition-colors drop-shadow-md">{mod.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative w-[300px] h-[450px] flex items-end justify-center pointer-events-none mt-16 group transition-transform duration-700 hover:scale-105">
          <img 
          src="/main centre logo/new.png" 
          alt="ZenAuraa" 
          className="absolute w-[750px] h-[750px] max-w-none object-cover scale-[1.0] translate-y-28"
          style={{
            opacity: 0.85,
            filter: 'brightness(0.9) contrast(1.15) saturate(1.2) drop-shadow(0 0 50px rgba(160,120,255,0.6))',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
            mixBlendMode: 'lighten'
          }}
        />
        </div>
      </div>
    </div>
  );
}
