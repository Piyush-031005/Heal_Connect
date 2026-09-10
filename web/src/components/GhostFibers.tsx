'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GhostFibersProps {
  lineColor?: string;
  glowColor?: string;
  speed?: number;
  scale?: number;
  rotation?: number;
  rotationSpeed?: number;
  layers?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
  layerSpeed?: number;
  twist?: number;
  twistFrequency?: number;
  twistSpeed?: number;
  lineFrequency?: number;
  lineSpacing?: number;
  lineSharpness?: number;
  glowFalloff?: number;
  glowIntensity?: number;
  brightness?: number;
  blueBoost?: number;
  vignette?: number;
  grain?: number;
  dpr?: number;
  lightMode?: boolean;
  fps?: number;
  paused?: boolean;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;
uniform float uSpeed;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uLineFrequency;
uniform float uGlowIntensity;

varying vec2 vUv;

// Simple 2D noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv;
  float time = uTime * uSpeed;
  
  // Create wavy lines
  float wave = sin(uv.y * uWaveFrequency + time * uWaveSpeed) * uWaveAmplitude;
  uv.x += wave;
  
  float twist = sin(uv.y * uTwistFrequency - time) * uTwist;
  uv.x += twist;
  
  // Calculate fiber intensity
  float fiber = sin(uv.x * uLineFrequency);
  fiber = smoothstep(0.8, 1.0, fiber);
  
  // Add glowing edge
  float edge = 1.0 - abs(uv.x - 0.5) * 2.0;
  edge = smoothstep(0.0, 1.0, edge);
  
  vec3 color = mix(uGlowColor, uLineColor, fiber) * fiber * uGlowIntensity;
  color *= edge; // Fade out at edges
  
  gl_FragColor = vec4(color, fiber * edge);
}
`;

function FibersMaterial(props: any) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uLineColor: { value: new THREE.Color(props.lineColor || '#362d64') },
    uGlowColor: { value: new THREE.Color(props.glowColor || '#8b53c1') },
    uSpeed: { value: props.speed || 0.2 },
    uWaveAmplitude: { value: props.waveAmplitude || 0.015 },
    uWaveFrequency: { value: props.waveFrequency || 3.0 },
    uWaveSpeed: { value: props.waveSpeed || 0.15 },
    uTwist: { value: props.twist || 0.1 },
    uTwistFrequency: { value: props.twistFrequency || 5.0 },
    uLineFrequency: { value: props.lineFrequency || 50.0 },
    uGlowIntensity: { value: props.glowIntensity || 1.6 },
  }), []);

  useFrame((state) => {
    if (materialRef.current && !props.paused) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      attach="material"
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      blending={THREE.NormalBlending}
      depthWrite={false}
    />
  );
}

export default function GhostFibers(props: GhostFibersProps) {
  return (
    <Canvas dpr={props.dpr || [1, 2]} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
      <mesh scale={[props.scale || 2, props.scale || 2, 1]}>
        <planeGeometry args={[2, 2, 64, 64]} />
        <FibersMaterial {...props} />
      </mesh>
    </Canvas>
  );
}