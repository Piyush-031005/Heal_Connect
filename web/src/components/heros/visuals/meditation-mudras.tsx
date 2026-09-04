"use client";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Icosahedron, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

function EtherealCrystals() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 12 Floating Meditation Crystals representing the 12 mudras/modalities */}
      {Array.from({length: 12}).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={2 + (i%3)} rotationIntensity={1.5} floatIntensity={2} position={[x, y, 0]}>
            <group rotation={[Math.random()*Math.PI, Math.random()*Math.PI, 0]}>
              <Icosahedron args={[0.3, 0]}>
                <MeshTransmissionMaterial 
                  backside
                  samples={4}
                  thickness={0.5}
                  chromaticAberration={1}
                  anisotropy={0.5}
                  distortion={0.5}
                  distortionScale={0.5}
                  temporalDistortion={0.1}
                  color={i % 2 === 0 ? "#8982D0" : "#5F3BA9"}
                  clearcoat={1}
                />
              </Icosahedron>
              {/* Inner glowing core for the crystal */}
              <Icosahedron args={[0.1, 0]}>
                <meshBasicMaterial color="#ffffff" />
              </Icosahedron>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function MeditationMudras() {
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
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          
          <EtherealCrystals />
          
          <Sparkles count={200} scale={10} size={1.5} speed={0.2} opacity={0.4} color="#D5B6DC" />
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
                <meshBasicMaterial color="#D5B6DC" />
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
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#1E2059] font-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] group-hover:text-[#1E2059] uppercase transition-colors drop-shadow-md">
                    {mod.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute z-20 w-28 h-28 rounded-full bg-white/95 shadow-[0_0_50px_rgba(255,255,255,0.7)] flex items-center justify-center p-3 border-2 border-[#8982D0]/20 cursor-pointer hover:scale-105 transition-transform">
        <img src="/main centre logo/new.png" alt="ZenAuraa" className="w-full h-full object-cover scale-[1.25] mt-2 ml-1" />
      </div>
    </div>
  );
}
