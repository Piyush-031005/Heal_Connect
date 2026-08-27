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

// A custom shader to simulate the "galaxy" starry effect inside the 3D crystal
const galaxyStoneShader = {
  uniforms: {
    time: { value: 0 },
    baseColor: { value: new THREE.Color("#4A00E0") }, // Deep purple
    glowColor: { value: new THREE.Color("#8E2DE2") }, // Bright magenta/purple
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 baseColor;
    uniform vec3 glowColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    // Simple noise function for stars
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    
    void main() {
      // Fresnel for crystal edges
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = dot(normal, viewDir);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);
      
      // Twinkling stars effect
      float star = rand(vUv * 50.0);
      float twinkle = sin(time * 3.0 + star * 100.0) * 0.5 + 0.5;
      float starIntensity = step(0.95, star) * twinkle;
      
      vec3 finalColor = mix(baseColor, glowColor, fresnel);
      finalColor += vec3(1.0) * starIntensity * 2.0; // Add bright stars
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `
};

function Custom3DStone({ position, scale, rotationSpeed, geometryType }: { position: [number, number, number], scale: number, rotationSpeed: number, geometryType: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.8;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale * 1.5, scale]}>
      {geometryType === 0 ? <icosahedronGeometry args={[1, 0]} /> : <octahedronGeometry args={[1, 0]} />}
      <shaderMaterial 
        ref={materialRef}
        args={[galaxyStoneShader]}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HybridGalaxyWheel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Wheel slow majestic rotation
      groupRef.current.rotation.z -= delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const stones = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      // Create a majestic hybrid arc
      const angle = (i / 24) * Math.PI * 2;
      const radius = 2.8 + Math.sin(i * 3.14) * 0.3; // wavy arc
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.sin(i) * 0.5;
      return {
        pos: [x, y, z] as [number, number, number],
        scale: 0.2 + Math.random() * 0.25,
        speed: (Math.random() - 0.5) * 1.5,
        geo: Math.floor(Math.random() * 2)
      };
    });
  }, []);
  
  return (
    <group ref={groupRef}>
      {/* Background ethereal core */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#5F3BA9" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {stones.map((stone, i) => (
        <Custom3DStone 
          key={i} 
          position={stone.pos} 
          scale={stone.scale} 
          rotationSpeed={stone.speed} 
          geometryType={stone.geo}
        />
      ))}
    </group>
  );
}

export default function DharmaWheel() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative w-[650px] h-[650px] flex items-center justify-center scale-85 lg:scale-100">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <HybridGalaxyWheel />
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
        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full flex items-center justify-center pointer-events-auto shadow-[0_0_40px_rgba(255,255,255,0.9)] overflow-hidden bg-white group transition-transform duration-700 hover:scale-105">
          <img src="/main centre logo/girl.png" alt="ZenAuraa" className="w-[100%] h-[100%] object-cover scale-[1.0] group-hover:scale-[1.1] transition-transform duration-700 mt-2 ml-1" />
        </div>
      </div>
    </div>
  );
}
