"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Torus, Cylinder, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

function Wheel3D() {
  const wheelRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z -= delta * 0.1;
      wheelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      wheelRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
        <group ref={wheelRef}>
      {/* Magical Stardust */}
      <Sparkles count={400} scale={6} size={2} speed={0.4} color="#D5B6DC" opacity={0.5} />
      <Sparkles count={200} scale={4} size={3} speed={0.2} color="#ffffff" opacity={0.8} />
      {/* Outer very thin glowing rings */}
      <Torus args={[2.8, 0.015, 16, 128]} material={new THREE.MeshBasicMaterial({ color: "#B9A0E4", transparent: true, opacity: 0.6 })} />
      <Torus args={[2.65, 0.005, 16, 128]} material={new THREE.MeshBasicMaterial({ color: "#8982D0", transparent: true, opacity: 0.4 })} />
      <Torus args={[0.8, 0.01, 16, 64]} material={new THREE.MeshBasicMaterial({ color: "#5F3BA9", transparent: true, opacity: 0.8 })} />
      <Torus args={[0.7, 0.005, 16, 64]} material={new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.3 })} />
      
      {/* Center glowing core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>

      {/* 24 thin ethereal spokes */}
      {Array.from({length: 24}).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const isMajor = i % 2 === 0;
        return (
          <group key={`spoke-${i}`} rotation={[0, 0, angle]}>
            <Cylinder 
              args={[isMajor ? 0.01 : 0.003, isMajor ? 0.01 : 0.003, 1.85, 8]} 
              position={[0, 1.725, 0]} 
              material={new THREE.MeshBasicMaterial({ color: isMajor ? "#ffffff" : "#D5B6DC", transparent: true, opacity: isMajor ? 0.5 : 0.2 })} 
            />
            {isMajor && (
              <mesh position={[0, 2.7, 0]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function DharmaWheel() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 280;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={1.5} color="#B9A0E4" />
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <Wheel3D />
          </Float>
          
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
      <div className="absolute z-20 w-28 h-28 rounded-full bg-white/95 shadow-2xl flex items-center justify-center p-3 border-2 border-[#8982D0]/40 cursor-pointer hover:scale-105 transition-transform">
        <img src="/center_logo_final.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
