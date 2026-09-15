import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

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
  lightMode?: boolean;
}

export default function GhostFibers({
  lineColor = '#140E35',
  glowColor = '#3437A0',
  speed = 0.2,
  scale = 2,
  rotation = 0,
  rotationSpeed = 0.25,
  layers = 4,
  waveAmplitude = 0.015,
  waveFrequency = 3,
  waveSpeed = 0.15,
  layerSpeed = 0.08,
  twist = 0.1,
  twistFrequency = 5,
  twistSpeed = 1.2,
  lineFrequency = 5,
  lineSpacing = 2,
  lineSharpness = 16,
  glowFalloff = 10,
  glowIntensity = 1.6,
  brightness = 2,
  blueBoost = 1.25,
  vignette = 0.8,
  grain = 0.05,
  lightMode = false
}: GhostFibersProps) {
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: transparent; }
    #container { width: 100%; height: 100%; }
    canvas { display: block; width: 100% !important; height: 100% !important; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/ogl/dist/ogl.umd.js"></script>
</head>
<body>
  <div id="container"></div>
  <script>
    window.onload = function() {
      try {
        const { Renderer, Program, Mesh, Triangle } = window.ogl;

        const hexToRgb = hex => {
          const value = hex.trim().replace(/^#/, '');
          const normalized = value.length === 3 ? value.replace(/./g, channel => channel + channel) : value;
          const match = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(normalized);
          if (!match) return [1, 1, 1];
          return [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255];
        };

        const config = {
          lineColor: '${lineColor}',
          glowColor: '${glowColor}',
          speed: ${speed},
          scale: ${scale},
          rotation: ${rotation},
          rotationSpeed: ${rotationSpeed},
          layers: ${layers},
          waveAmplitude: ${waveAmplitude},
          waveFrequency: ${waveFrequency},
          waveSpeed: ${waveSpeed},
          layerSpeed: ${layerSpeed},
          twist: ${twist},
          twistFrequency: ${twistFrequency},
          twistSpeed: ${twistSpeed},
          lineFrequency: ${lineFrequency},
          lineSpacing: ${lineSpacing},
          lineSharpness: ${lineSharpness},
          glowFalloff: ${glowFalloff},
          glowIntensity: ${glowIntensity},
          brightness: ${brightness},
          blueBoost: ${blueBoost},
          vignette: ${vignette},
          grain: ${grain},
          lightMode: ${lightMode ? 1.0 : 0.0}
        };

        const vertex = \`#version 300 es
        in vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }\`;

        const fragment = \`#version 300 es
        precision highp float;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uScale;
        uniform float uRotation;
        uniform float uLayers;
        uniform float uWaveAmplitude;
        uniform float uWaveFrequency;
        uniform float uWaveSpeed;
        uniform float uLayerSpeed;
        uniform float uTwist;
        uniform float uTwistFrequency;
        uniform float uTwistSpeed;
        uniform float uLineFrequency;
        uniform float uLineSpacing;
        uniform float uLineSharpness;
        uniform float uGlowFalloff;
        uniform float uGlowIntensity;
        uniform float uBrightness;
        uniform float uBlueBoost;
        uniform float uVignette;
        uniform float uGrain;
        uniform float uRotationSpeed;
        uniform float uLightMode;
        uniform vec3 uLineColor;
        uniform vec3 uGlowColor;

        out vec4 fragColor;

        #define MAX_LAYERS 30

        mat2 rotate2d(float angle) {
          float sine = sin(angle);
          float cosine = cos(angle);
          return mat2(cosine, -sine, sine, cosine);
        }

        float grainHash(vec2 point) {
          point = floor(point);
          float hash = 52.9829189 * fract(dot(point, vec2(0.065, 0.005)));
          return fract(hash);
        }

        float layeredGrain(vec2 fragmentPixel) {
          vec2 point = mod(fragmentPixel + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
          vec2 rotated = mat2(0.8, -0.5, 0.5, 0.8) * point;
          float grain = 0.0;
          grain += 0.40 * grainHash(rotated);
          grain += 0.25 * grainHash(rotated * 2.0 + 17.0);
          grain += 0.20 * grainHash(rotated * 4.0 + 47.0);
          grain += 0.10 * grainHash(rotated * 8.0 + 113.0);
          grain += 0.05 * grainHash(rotated * 16.0 + 191.0);
          return grain;
        }

        void main() {
          vec2 resolution = max(uResolution, vec2(1.0));
          vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;
          float time = uTime * uSpeed;
          vec3 backdrop = mix(vec3(0.070588, 0.058824, 0.090196), vec3(1.0), step(0.5, uLightMode));
          vec3 centerTone = max(uLineColor * 0.85567 - uGlowColor * 0.06186, vec3(0.0));
          vec3 cloudTone = uLineColor * 0.19588 + uGlowColor * 0.2268;
          vec2 p = uv;
          p /= max(uScale, 0.05);
          p = rotate2d(radians(uRotation) + time * uRotationSpeed) * p;
          vec3 color = vec3(0.0);
          float fiberField = 0.0;

          for (int index = 0; index < MAX_LAYERS; index++) {
            float fi = float(index) + 1.0;
            if (fi > uLayers) break;

            p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + time * (uWaveSpeed + fi * uLayerSpeed));

            float radius = length(p);
            float polarAngle = atan(p.y, p.x);
            polarAngle += sin(radius * uTwistFrequency - time * uTwistSpeed + fi) * uTwist;
            p = vec2(cos(polarAngle), sin(polarAngle)) * radius;

            float lines = abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + time)));
            lines = pow(max(0.0, 1.0 - lines), uLineSharpness);
            fiberField += lines / fi;
            color += uLineColor * lines / fi;

            float glow = exp(-uGlowFalloff * abs(sin(p.x * 3.0 + time + fi)));
            color += uGlowColor * glow * uGlowIntensity / (fi * 2.0);
          }

          float center = exp(-2.2 * dot(uv, uv));
          color += centerTone * center;

          float cloud = exp(-1.5 * length(uv + vec2(sin(time * 0.3) * 0.25, cos(time * 0.25) * 0.18)));
          color += cloudTone * cloud;

          float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv));
          color *= mix(1.0 - uVignette, 1.0, vignette);
          color = 1.0 - exp(-color * uBrightness);
          color.b *= uBlueBoost;

          vec3 outputColor;
          if (uLightMode > 0.5) {
            float edgeFade = mix(1.0 - uVignette, 1.0, vignette);
            float fibers = pow(smoothstep(0.12, 1.05, fiberField) * edgeFade, 1.5);
            float atmosphere = (center * 0.025 + cloud * 0.015) * edgeFade;
            vec3 fiberInk = mix(backdrop, uLineColor, 0.52);
            vec3 airColor = mix(backdrop, uGlowColor, 0.16);

            outputColor = mix(backdrop, airColor, atmosphere);
            outputColor = mix(outputColor, fiberInk, fibers * 0.3);
          } else {
            outputColor = backdrop + color;
          }

          float noise = (layeredGrain(gl_FragCoord.xy) - 0.5) * uGrain;
          outputColor = clamp(outputColor + noise, 0.0, 1.0);
          fragColor = vec4(outputColor, 1.0);
        }\`;

        const container = document.getElementById('container');
        const renderer = new Renderer({ webgl: 2, alpha: false, antialias: false });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        const uniforms = {
          uResolution: { value: new Float32Array([gl.drawingBufferWidth, gl.drawingBufferHeight]) },
          uTime: { value: 0 },
          uSpeed: { value: config.speed },
          uScale: { value: config.scale },
          uRotation: { value: config.rotation },
          uRotationSpeed: { value: config.rotationSpeed },
          uLayers: { value: config.layers },
          uWaveAmplitude: { value: config.waveAmplitude },
          uWaveFrequency: { value: config.waveFrequency },
          uWaveSpeed: { value: config.waveSpeed },
          uLayerSpeed: { value: config.layerSpeed },
          uTwist: { value: config.twist },
          uTwistFrequency: { value: config.twistFrequency },
          uTwistSpeed: { value: config.twistSpeed },
          uLineFrequency: { value: config.lineFrequency },
          uLineSpacing: { value: config.lineSpacing },
          uLineSharpness: { value: config.lineSharpness },
          uGlowFalloff: { value: config.glowFalloff },
          uGlowIntensity: { value: config.glowIntensity },
          uBrightness: { value: config.brightness },
          uBlueBoost: { value: config.blueBoost },
          uVignette: { value: config.vignette },
          uGrain: { value: config.grain },
          uLightMode: { value: config.lightMode },
          uLineColor: { value: new Float32Array(hexToRgb(config.lineColor)) },
          uGlowColor: { value: new Float32Array(hexToRgb(config.glowColor)) }
        };

        const program = new Program(gl, { vertex, fragment, uniforms });
        const geometry = new Triangle(gl);
        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
          renderer.setSize(window.innerWidth, window.innerHeight);
          uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
        }
        window.addEventListener('resize', resize);
        resize();

        let raf;
        function loop(t) {
          raf = requestAnimationFrame(loop);
          uniforms.uTime.value = t * 0.001;
          renderer.render({ scene: mesh });
        }
        raf = requestAnimationFrame(loop);
      } catch (e) {
        document.body.innerHTML = "<h1 style='color:red;'>Error: " + e.message + "</h1>";
      }
    };
  </script>
</body>
</html>
  `;

  if (Platform.OS === 'web') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* @ts-ignore */}
        <iframe 
          srcDoc={htmlContent} 
          style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }} 
        />
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent, baseUrl: 'https://healconnect.com' }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        opaque={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        androidHardwareAccelerationDisabled={false}
        mixedContentMode="always"
      />
    </View>
  );
}

