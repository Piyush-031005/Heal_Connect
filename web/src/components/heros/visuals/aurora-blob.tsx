"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

function OrganicBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[2.2, 128, 128]}>
        <MeshDistortMaterial 
          color="#B9A0E4" 
          attach="material" 
          distort={0.4} 
          speed={1.5} 
          roughness={0.1}
          metalness={0.2}
          transmission={0.9} // Glass effect
          thickness={1.5}
          ior={1.2}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      
      {/* Inner glowing core */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial color="#5F3BA9" transparent opacity={0.6} />
      </Sphere>
    </Float>
  );
}

export default function AuroraBlob() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 250;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#8982D0" />
          <pointLight position={[-10, -10, -5]} intensity={1.5} color="#4E67CC" />
          
          <OrganicBlob />
          
          <Sparkles count={150} scale={8} size={2} speed={0.4} opacity={0.5} color="#B9A0E4" />
          <Environment resolution={64}>
            <group>
              <mesh scale={100}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="#333333" side={THREE.BackSide} />
              </mesh>
              <mesh position={[10, 10, -10]}>
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[-10, -10, -10]}>
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial color="#B9A0E4" />
              </mesh>
            </group>
          </Environment>
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
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#1E2059]/60 group-hover:text-[#1E2059] uppercase transition-colors drop-shadow-md">
                    {mod.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-20 w-28 h-28 rounded-full bg-white/95 shadow-[0_0_50px_rgba(255,255,255,0.8)] flex items-center justify-center p-3 backdrop-blur-sm border border-white/50 cursor-pointer hover:scale-105 transition-transform">
        <img src="/center_logo_final.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
