"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

function Feather({ angle, radius, isLong, delay }: { angle: number, radius: number, isLong: boolean, delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const length = isLong ? 2.5 : 2.0;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Breathing / fanning animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + delay) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, angle]}>
      {/* Position feather outwards from center */}
      <group position={[0, length / 2 + 0.5, 0]}>
        <mesh ref={meshRef}>
          {/* A stretched sphere acts as a nice thick feather blade */}
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial 
            color="#5F3BA9"
            emissive="#1E2059"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={1}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[100, 400]}
          />
        </mesh>
        
        {/* Scale the sphere to be long and flat like a feather */}
        <group scale={[1, length * 2.5, 0.1]}>
          <mesh>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshPhysicalMaterial 
              color="#8982D0"
              roughness={0.3}
              metalness={0.6}
              clearcoat={1}
              iridescence={1}
            />
          </mesh>
        </group>

        {/* Eye Spot */}
        {isLong && (
          <mesh position={[0, length - 0.5, 0.05]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
            <meshStandardMaterial color="#B9A0E4" emissive="#B9A0E4" emissiveIntensity={0.5} metalness={1} roughness={0} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function PeacockFan() {
  const fanRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (fanRef.current) {
      // Gentle sway
      fanRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      fanRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const FEATHER_COUNT = 24;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={fanRef} position={[0, -0.5, 0]}>
        {Array.from({length: FEATHER_COUNT}).map((_, i) => {
          const angle = (i / FEATHER_COUNT) * Math.PI * 2;
          return (
            <Feather 
              key={i} 
              angle={angle} 
              radius={2} 
              isLong={i % 2 === 0} 
              delay={i * 0.2} 
            />
          );
        })}
      </group>
    </Float>
  );
}

export default function PeacockBloom() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 280;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={2} color="#B9A0E4" />
          
          <PeacockFan />
          
          <Environment preset="dawn" />
        </Canvas>
      </div>

      {/* Static Upright Labels (Separate Layer) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {MODALITIES.map((mod, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;
          return (
            <div
              key={`label-${mod.id}`}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => router.push(`/modalities/${mod.id}`)}
            >
              <span className="text-[10px] font-bold text-[#1E2059] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full whitespace-nowrap shadow-md border border-[#B9A0E4]/40 group-hover:bg-white group-hover:scale-110 transition-all">
                {mod.name}
              </span>
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
