'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

function Dust() {
  const ref = useRef<any>();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.2} color="#D4AF37" />
    </group>
  );
}

export default function MagicalDust() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Dust />
    </Canvas>
  );
}
