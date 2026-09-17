import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export interface LightfallProps {
  colors?: string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  lightMode?: boolean;
}

export default function Lightfall({
  colors = ['#A6C8FF', '#5227FF', '#FF9FFC'],
  backgroundColor = '#0A29FF',
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1,
  lightMode = false,
}: LightfallProps) {
  
  const colorsJson = JSON.stringify(colors);

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
        
        const MAX_COLORS = 8;
        
        const hexToRGB = hex => {
          const c = hex.replace('#', '').padEnd(6, '0');
          const r = parseInt(c.slice(0, 2), 16) / 255;
          const g = parseInt(c.slice(2, 4), 16) / 255;
          const b = parseInt(c.slice(4, 6), 16) / 255;
          return [r, g, b];
        };
        
        const prepColors = input => {
          const base = (input && input.length ? input : ['#A6C8FF', '#5227FF', '#FF9FFC']).slice(0, MAX_COLORS);
          const count = base.length;
          const arr = [];
          for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
          const avg = [0, 0, 0];
          for (let i = 0; i < count; i++) {
            avg[0] += arr[i][0];
            avg[1] += arr[i][1];
            avg[2] += arr[i][2];
          }
          avg[0] /= count;
          avg[1] /= count;
          avg[2] /= count;
          return { arr, count, avg };
        };

        const config = {
          colors: ${colorsJson},
          backgroundColor: '${backgroundColor}',
          speed: ${speed},
          streakCount: ${streakCount},
          streakWidth: ${streakWidth},
          streakLength: ${streakLength},
          glow: ${glow},
          density: ${density},
          twinkle: ${twinkle},
          zoom: ${zoom},
          backgroundGlow: ${backgroundGlow},
          opacity: ${opacity},
          mouseInteraction: ${mouseInteraction ? 1.0 : 0.0},
          mouseStrength: ${mouseStrength},
          mouseRadius: ${mouseRadius},
          lightMode: ${lightMode ? 1.0 : 0.0}
        };

        const { arr, count, avg } = prepColors(config.colors);

        const vertex = \`#version 300 es
        in vec2 position;
        out vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }\`;

        const fragment = \`#version 300 es
        precision highp float;

        uniform vec3  iResolution;
        uniform vec2  iMouse;
        uniform float iTime;

        uniform vec3  uColor0;
        uniform vec3  uColor1;
        uniform vec3  uColor2;
        uniform vec3  uColor3;
        uniform vec3  uColor4;
        uniform vec3  uColor5;
        uniform vec3  uColor6;
        uniform vec3  uColor7;
        uniform int   uColorCount;

        uniform vec3  uBgColor;
        uniform vec3  uMouseColor;
        uniform float uSpeed;
        uniform int   uStreakCount;
        uniform float uStreakWidth;
        uniform float uStreakLength;
        uniform float uGlow;
        uniform float uDensity;
        uniform float uTwinkle;
        uniform float uZoom;
        uniform float uBgGlow;
        uniform float uOpacity;
        uniform float uMouseEnabled;
        uniform float uMouseStrength;
        uniform float uMouseRadius;
        uniform float uLightMode;

        in vec2 vUv;
        out vec4 fragColor;

        vec3 palette(float h) {
          int count = uColorCount;
          if (count < 1) count = 1;
          int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
          if (idx <= 0) return uColor0;
          if (idx == 1) return uColor1;
          if (idx == 2) return uColor2;
          if (idx == 3) return uColor3;
          if (idx == 4) return uColor4;
          if (idx == 5) return uColor5;
          if (idx == 6) return uColor6;
          return uColor7;
        }

        vec3 tanhv(vec3 x) {
          vec3 e = exp(-2.0 * x);
          return (1.0 - e) / (1.0 + e);
        }

        vec2 sceneC(vec2 frag, vec2 r) {
          vec2 P = (frag + frag - r) / r.x;
          float z = 0.0;
          float d = 1e3;
          vec4 O = vec4(0.0);
          for (int k = 0; k < 39; k++) {
            if (d <= 1e-4) break;
            O = z * normalize(vec4(P, uZoom, 0.0)) - vec4(0.0, 4.0, 1.0, 0.0) / 4.5;
            d = 1.0 - sqrt(length(O * O));
            z += d;
          }
          return vec2(O.x, atan(O.z, O.y));
        }

        void mainImage(out vec4 o, vec2 C) {
          vec2 r = iResolution.xy;
          vec2 uv0 = (C + C - r) / r.x;
          float T = 0.1 * iTime * uSpeed + 9.0;
          float angRings = max(1.0, floor(6.28318530718 * max(uDensity, 0.05) + 0.5));
          vec2 Y = vec2(5e-3, 6.28318530718 / angRings);

          vec2 c0 = sceneC(C, r);
          vec2 cdx = sceneC(C + vec2(1.0, 0.0), r);
          vec2 cdy = sceneC(C + vec2(0.0, 1.0), r);
          vec2 dCx = cdx - c0;
          vec2 dCy = cdy - c0;
          dCx.y -= 6.28318530718 * floor(dCx.y / 6.28318530718 + 0.5);
          dCy.y -= 6.28318530718 * floor(dCy.y / 6.28318530718 + 0.5);
          vec2 fw = abs(dCx) + abs(dCy);
          C = c0;

          vec2 P = vec2(2.0, 1.0) * uv0 - (r / r.x) * vec2(0.0, 1.0);
          vec4 O = uLightMode > 0.5
            ? vec4(0.0)
            : vec4(uBgColor * 90.0 * uBgGlow / (1e3 * dot(P, P) + 6.0), 0.0);

          float mGlow = 0.0;
          if (uMouseEnabled > 0.5) {
            vec2 mN = (iMouse + iMouse - r) / r.x;
            float md = length(uv0 - mN);
            mGlow = exp(-md * md / max(uMouseRadius * uMouseRadius, 1e-4)) * uMouseStrength;
            O.rgb += uMouseColor * mGlow * 0.25;
          }

          float zr = 5e-4 * uStreakWidth;
          vec2 rr = vec2(max(length(fw), 1e-5));
          float tail = 19.0 / max(uStreakLength, 0.05);

          for (int m = 0; m < 16; m++) {
            if (m >= uStreakCount) break;
            float jf = float(m) + 1.0;
            float ic = fract(sin(dot(vec2(jf, floor(C.x / Y.x + 0.5)), vec2(7.0, 11.0)) * 73.0));
            vec2 Pp = C - (T + T * ic) * vec2(0.0, 1.0);
            Pp -= floor(Pp / Y + 0.5) * Y;
            float h = fract(8663.0 * ic);
            vec3 col = palette(h);
            float weight = mix(1.5, 1.0 + sin(T + 7.0 * h + 4.0), uTwinkle);
            weight *= (1.0 + mGlow * 2.0);
            vec2 inner = vec2(length(max(Pp, vec2(-1.0, 0.0))), length(Pp) - zr) - zr;
            vec2 sm = vec2(1.0) - smoothstep(-rr, rr, inner);
            O.rgb += dot(sm, vec2(exp(tail * Pp.y), 3.0)) * col * weight;
            C.x += Y.x / 8.0;
          }

          vec3 colr = sqrt(tanhv(max(O.rgb * uGlow - vec3(0.04, 0.08, 0.02), 0.0)));
          if (uLightMode > 0.5) {
            float peak = max(colr.r, max(colr.g, colr.b));
            float coverage = smoothstep(0.035, 0.58, peak) * uOpacity;
            vec3 chroma = clamp(colr / max(peak, 1e-4), 0.0, 1.0);
            chroma = pow(chroma, vec3(1.35));
            float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
            chroma /= max(chromaPeak, 1e-4);
            o = vec4(chroma, coverage * 0.94);
          } else {
            o = vec4(colr, uOpacity);
          }
        }

        void main() {
          mainImage(fragColor, vUv * iResolution.xy);
        }\`;

        const container = document.getElementById('container');
        const renderer = new Renderer({ alpha: true, antialias: true, dpr: window.devicePixelRatio || 1 });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        const uniforms = {
          iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
          iMouse: { value: [0, 0] },
          iTime: { value: 0 },
          uColor0: { value: arr[0] },
          uColor1: { value: arr[1] },
          uColor2: { value: arr[2] },
          uColor3: { value: arr[3] },
          uColor4: { value: arr[4] },
          uColor5: { value: arr[5] },
          uColor6: { value: arr[6] },
          uColor7: { value: arr[7] },
          uColorCount: { value: count },
          uBgColor: { value: hexToRGB(config.backgroundColor) },
          uMouseColor: { value: avg },
          uSpeed: { value: config.speed },
          uStreakCount: { value: Math.max(1, Math.min(16, Math.round(config.streakCount))) },
          uStreakWidth: { value: config.streakWidth },
          uStreakLength: { value: config.streakLength },
          uGlow: { value: config.glow },
          uDensity: { value: config.density },
          uTwinkle: { value: config.twinkle },
          uZoom: { value: config.zoom },
          uBgGlow: { value: config.backgroundGlow },
          uOpacity: { value: config.opacity },
          uMouseEnabled: { value: config.mouseInteraction },
          uMouseStrength: { value: config.mouseStrength },
          uMouseRadius: { value: config.mouseRadius },
          uLightMode: { value: config.lightMode }
        };

        const program = new Program(gl, { vertex, fragment, uniforms });
        const geometry = new Triangle(gl);
        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
          const rect = container.getBoundingClientRect();
          renderer.setSize(rect.width, rect.height);
          uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
        }
        window.addEventListener('resize', resize);
        resize();

        let targetMouse = [0,0];
        let currentMouse = [0,0];
        
        container.addEventListener('pointermove', e => {
          const rect = gl.canvas.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;
          const x = (e.clientX - rect.left) * dpr;
          const y = (rect.height - (e.clientY - rect.top)) * dpr;
          targetMouse = [x, y];
        });

        let lastTime = 0;
        function render(t) {
          requestAnimationFrame(render);
          uniforms.iTime.value = t * 0.001;
          
          if (config.mouseInteraction) {
            currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.1;
            currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.1;
            uniforms.iMouse.value = currentMouse;
          }

          renderer.render({ scene: mesh });
        }
        requestAnimationFrame(render);
      } catch(e) {
        window.ReactNativeWebView.postMessage(e.message);
      }
    };
  </script>
</body>
</html>
`;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent, baseUrl: 'https://healconnect.com' }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        pointerEvents="none"
        onMessage={(event) => console.error("Lightfall WebGL Error:", event.nativeEvent.data)}
      />
    </View>
  );
}
