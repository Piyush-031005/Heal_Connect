"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Torus, Cylinder } from '@react-three/drei';
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
      // Slow rotation on Z axis
      wheelRef.current.rotation.z -= delta * 0.1;
      // Slight tilting for 3D effect
      wheelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      wheelRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const materialProps = {
    color: "#D5B6DC",
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.5,
  };

  const accentProps = {
    color: "#5F3BA9",
    metalness: 0.8,
    roughness: 0.3,
  };

  return (
    <group ref={wheelRef}>
      {/* Outer thick rim */}
      <Torus args={[2.8, 0.12, 16, 100]} material={new THREE.MeshStandardMaterial(materialProps)} />
      
      {/* Inner thin rim */}
      <Torus args={[2.5, 0.04, 16, 100]} material={new THREE.MeshStandardMaterial(accentProps)} />
      
      {/* Center Hub */}
      <Torus args={[0.6, 0.15, 16, 64]} material={new THREE.MeshStandardMaterial(materialProps)} />
      <Cylinder args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI/2, 0, 0]} material={new THREE.MeshStandardMaterial(accentProps)} />

      {/* 12 Spokes */}
      {Array.from({length: 12}).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <group key={`spoke-${i}`} rotation={[0, 0, angle]}>
            <Cylinder 
              args={[0.04, 0.02, 2.2, 16]} 
              position={[0, 1.6, 0]} 
              material={new THREE.MeshStandardMaterial(materialProps)} 
            />
            {/* Spoke ornaments */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
            <mesh position={[0, 2.7, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial {...accentProps} />
            </mesh>
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
              <span className="text-[10px] font-bold text-[#1E2059] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full whitespace-nowrap shadow-md border border-[#5F3BA9]/30 group-hover:bg-white group-hover:scale-110 transition-all">
                {mod.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-20 w-28 h-28 rounded-full bg-white/95 shadow-2xl flex items-center justify-center p-3 border-2 border-[#8982D0]/40 cursor-pointer hover:scale-105 transition-transform">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
