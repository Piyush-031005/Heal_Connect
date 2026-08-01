'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-expect-error maath lacks typings
import * as random from 'maath/random/dist/maath-random.esm';
import { useState, useRef } from 'react';

function ParticleSwarm(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#4F46E5" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export function QuantumCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ParticleSwarm />
    </Canvas>
  );
}
