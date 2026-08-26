"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

const MODALITIES = [
  {id:'astrology',name:'Astrology'},{id:'tarot',name:'Tarot'},
  {id:'face-reading',name:'Face Reading'},{id:'palm-reading',name:'Palm Reading'},
  {id:'sound-healing',name:'Sound Healing'},{id:'meditation',name:'Meditation'},
  {id:'spiritual',name:'Spiritual'},{id:'chakra-healing',name:'Chakra Healing'},
  {id:'breathwork',name:'Breathwork'},{id:'dreams',name:'Dream Predict'},
  {id:'space-harmony',name:'Space Harmony'},{id:'numerology',name:'Numerology'},
];

function ParticleNebula() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random particles in a sphere
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 2.5 * Math.cbrt(Math.random()); // Radius 2.5
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#B9A0E4"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function ConstellationLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    const radius = 2.2;
    for (let i = 0; i < MODALITIES.length; i++) {
      const angle = (i / MODALITIES.length) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 0.5));
    }
    return pts;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Outer connecting lines */}
      <Line points={[...points, points[0]]} color="#8982D0" lineWidth={1} transparent opacity={0.4} />
      
      {/* Inner web connections */}
      {points.map((p, i) => {
        if (i % 3 === 0) {
          const target = points[(i + 4) % points.length];
          return <Line key={i} points={[p, target]} color="#4E67CC" lineWidth={0.5} transparent opacity={0.2} />;
        }
        return null;
      })}

      {/* Glowing nodes */}
      {points.map((p, i) => (
        <mesh key={`node-${i}`} position={p}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#8982D0" : "#B9A0E4"} transparent opacity={0.8} />
          {/* Subtle halo */}
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#4E67CC" : "#5F3BA9"} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

export default function LightParticles() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const RADIUS = 250;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-90 lg:scale-100">
      
      {/* 3D WebGL Canvas underneath */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleNebula />
          <ConstellationLines />
        </Canvas>
      </div>

      {/* Revolving Premium Labels Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{ animation: 'spin 80s linear infinite' }}
      >
        {MODALITIES.map((mod, i) => {
          // Calculate positions in a circle
          const total = MODALITIES.length;
          const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
          // Use a fixed radius for the orbit
          const r = 260; 
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          
          return (
            <div
              key={`label-${mod.id}`}
              className="absolute"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* Counter-rotation to keep labels upright */}
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
      <div className="absolute z-20 w-28 h-28 rounded-full bg-white/95 shadow-[0_0_40px_rgba(137,130,208,0.5)] flex items-center justify-center p-3 backdrop-blur-sm border border-white/40 cursor-pointer hover:scale-105 transition-transform">
        <img src="/new_center_logo.png" alt="ZenAuraa" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
