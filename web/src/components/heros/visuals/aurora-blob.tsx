"use client";
import { useEffect, useState, useRef, useMemo } from 'react';
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

// Realistic Feather Shader
const featherShader = {
  uniforms: {
    color: { value: new THREE.Color("#B9A0E4") },
    opacity: { value: 0.8 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      // Gentle flutter
      vec3 pos = position;
      pos.z += sin(pos.y * 10.0) * 0.05;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float opacity;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      // Create a soft, fuzzy edge mask
      float distToCenter = abs(vUv.x - 0.5) * 2.0;
      float alpha = (1.0 - pow(distToCenter, 1.5)) * sin(vUv.y * 3.14159);
      
      // Fresnel shine
      float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
      vec3 finalColor = mix(color, vec3(1.0), pow(1.0 - fresnel, 3.0) * 0.5);

      if(alpha < 0.05) discard;
      
      gl_FragColor = vec4(finalColor, alpha * opacity);
    }
  `
};

function FallingFeather({ startPos, speed, scale, color }: { startPos: [number, number, number], speed: number, scale: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => {
    return {
      color: { value: new THREE.Color(color) },
      opacity: { value: 0.7 }
    };
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y -= speed;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 5) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      
      // Reset if too low
      if (meshRef.current.position.y < -5) {
        meshRef.current.position.y = 5;
        meshRef.current.position.x = startPos[0] + (Math.random() - 0.5) * 2;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={startPos} scale={[scale, scale * 2.5, scale]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial 
        args={[{
          uniforms,
          vertexShader: featherShader.vertexShader,
          fragmentShader: featherShader.fragmentShader,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide
        }]}
      />
    </mesh>
  );
}

function FeatherSwarm() {
  const feathers = useMemo(() => {
    const colors = ["#8982D0", "#B9A0E4", "#ffffff", "#5F3BA9"];
    return Array.from({ length: 40 }).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5] as [number, number, number],
      speed: 0.005 + Math.random() * 0.015,
      scale: 0.2 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  return (
    <group>
      {feathers.map((f, i) => (
        <FallingFeather key={i} startPos={f.pos} speed={f.speed} scale={f.scale} color={f.color} />
      ))}
    </group>
  );
}

export default function AuroraBlob() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
             <FeatherSwarm />
          </Float>
        </Canvas>
      </div>

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
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#3A247A] group-hover:text-[#1E2059] uppercase transition-colors drop-shadow-md">
                    {mod.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center pointer-events-auto shadow-[0_0_40px_rgba(255,255,255,0.9)] overflow-hidden bg-white group transition-transform duration-700 hover:scale-105">
          <img
            src="/center_logo_final.png"
            alt="ZenAuraa"
            className="w-[110%] h-[110%] object-cover scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700 mt-2 ml-1"
          />
        </div>
      </div>
    </div>
  );
}
