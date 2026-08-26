"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
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

function GalaxyStone({ position, scale, rotationSpeed, textureUrl }: { position: [number, number, number], scale: number, rotationSpeed: number, textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle self rotation and bobbing
      meshRef.current.rotation.z += delta * rotationSpeed;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HybridWheel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Wheel slow rotation
      groupRef.current.rotation.z -= delta * 0.05;
    }
  });

  // Distribute stones in a majestic hybrid arc/wheel
  const stones = useMemo(() => {
    const textures = [
      '/galaxy_crystal_1.png',
      '/galaxy_crystal_2.png',
      '/galaxy_crystal_3.png'
    ];
    
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 2.5 + Math.sin(i * 3.14) * 0.2; // slight variation
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return {
        pos: [x, y, 0] as [number, number, number],
        scale: 0.8 + Math.random() * 0.6,
        speed: (Math.random() - 0.5) * 0.5,
        texture: textures[Math.floor(Math.random() * textures.length)]
      };
    });
  }, []);
  
  return (
    <group ref={groupRef}>
      {/* Background soft glow for the wheel */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#5F3BA9" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {stones.map((stone, i) => (
        <GalaxyStone 
          key={i} 
          position={stone.pos} 
          scale={stone.scale} 
          rotationSpeed={stone.speed} 
          textureUrl={stone.texture} 
        />
      ))}
    </group>
  );
}

export default function DharmaWheel() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <HybridWheel />
          </Float>
        </Canvas>
      </div>

      {/* Revolving Minimal Ethereal Labels */}
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
                <div className="flex items-center gap-2 px-3 py-1.5 transition-all duration-300 hover:scale-110">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E2059]/40 group-hover:bg-[#5F3BA9] shadow-[0_0_8px_rgba(95,59,169,0.5)] transition-colors" />
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#3A247A] group-hover:text-[#1E2059] uppercase transition-colors drop-shadow-md">
                    {mod.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center pointer-events-auto shadow-[0_0_40px_rgba(255,255,255,0.9)] overflow-hidden bg-white group transition-transform duration-700 hover:scale-105">
          <img
            src="/center_logo_final.png"
            alt="ZenAuraa"
            className="w-[110%] h-[110%] object-cover scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700 mt-2 ml-1"
          />
        </div>
      </div>
    </div>
  );
}
