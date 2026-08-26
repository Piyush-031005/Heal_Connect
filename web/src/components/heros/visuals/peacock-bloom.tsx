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

// Custom Leaf Shape
const leafShape = new THREE.Shape();
leafShape.moveTo(0, 0);
leafShape.quadraticCurveTo(0.6, 1.2, 0, 3);
leafShape.quadraticCurveTo(-0.6, 1.2, 0, 0);
const leafGeometry = new THREE.ShapeGeometry(leafShape);

function Leaf({ rotation, color, scale, distance, zOffset, opacity }: { rotation: [number, number, number], color: string, scale: number, distance: number, zOffset: number, opacity: number }) {
  return (
    <group rotation={rotation} position={[0, 0, zOffset]}>
      <mesh geometry={leafGeometry} position={[0, distance, 0]} scale={[scale, scale, 1]}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={opacity} 
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function MandalaPeacock() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} > {/* SCALED DOWN SO IT NEVER CUTS OFF */}
        {/* Layer 1: Outer Soft Purple/Blue Leaves */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Leaf 
            key={`outer-${i}`}
            rotation={[0, 0, (i / 12) * Math.PI * 2]} 
            color="#8982D0" 
            scale={1.2}
            distance={1.6}
            zOffset={-0.3}
            opacity={0.4}
          />
        ))}
        {/* Layer 2: Mid Purple Leaves */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Leaf 
            key={`mid-${i}`}
            rotation={[0, 0, (i / 12) * Math.PI * 2 + Math.PI/12]} 
            color="#6B52AD" 
            scale={0.9}
            distance={1.0}
            zOffset={-0.2}
            opacity={0.6}
          />
        ))}
        {/* Layer 3: Inner Deep Indigo Leaves */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Leaf 
            key={`inner-${i}`}
            rotation={[0, 0, (i / 12) * Math.PI * 2]} 
            color="#3A247A" 
            scale={0.6}
            distance={0.6}
            zOffset={-0.1}
            opacity={0.85}
          />
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
            <MandalaPeacock />
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
        {/* LOGO SCALED DOWN SLIGHTLY SO IT FITS PERFECTLY (w-24 instead of w-28) */}
        <div className="relative w-48 h-48 md:w-72 md:h-72 -mt-16 rounded-full flex items-center justify-center pointer-events-auto  overflow-hidden  group transition-transform duration-700 hover:scale-105">
          <img src="/main centre logo/girl.png" alt="ZenAuraa" className="w-[100%] h-[100%] object-cover scale-[1.0] group-hover:scale-[1.1] transition-transform duration-700 mt-2 ml-1" />
        </div>
      </div>
    </div>
  );
}
