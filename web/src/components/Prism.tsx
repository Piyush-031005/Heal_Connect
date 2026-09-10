'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, MeshPhysicalMaterial, PointLight, CylinderGeometry } from 'three';
import { Environment, Float, Sparkles } from '@react-three/drei';

interface PrismProps {
  animationType?: 'rotate' | 'bounce';
  timeScale?: number;
  height?: number;
  baseWidth?: number;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  noise?: number;
  glow?: number;
}

function PrismMesh({
  animationType = 'rotate',
  timeScale = 0.6,
  height = 5.3,
  baseWidth = 4.2,
  scale = 2.3,
  glow = 1,
}: PrismProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (animationType === 'rotate') {
        meshRef.current.rotation.x += delta * timeScale * 0.5;
        meshRef.current.rotation.y += delta * timeScale * 0.8;
      }
    }
    
    if (materialRef.current) {
      const t = state.clock.getElapsedTime();
      const pulse = Math.sin(t * 2) * 0.2 + 0.8;
      materialRef.current.emissiveIntensity = glow * pulse * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        <cylinderGeometry args={[0, baseWidth, height, 4, 1]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#ffffff"
          emissive="#8a2be2"
          emissiveIntensity={glow * 0.8}
          transmission={0.95}
          opacity={1}
          transparent={true}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          ior={1.5}
          thickness={2.0}
        />
      </mesh>
    </Float>
  );
}

export default function Prism(props: PrismProps) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#ff00ff" intensity={100} />
        <pointLight position={[-10, -10, 10]} color="#00ffff" intensity={80} />
        <pointLight position={[0, -10, -10]} color="#8a2be2" intensity={50} />
        
        <Environment preset="city" />
        <Sparkles count={50} scale={12} size={2} speed={0.4} opacity={0.5} color="#d8b4e2" />
        
        <PrismMesh {...props} />
      </Canvas>
    </div>
  );
}