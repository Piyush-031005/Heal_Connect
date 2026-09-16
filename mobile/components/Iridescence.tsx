import React, { useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
}

export default function Iridescence({
  color = [0.53, 0.39, 0.77],
  speed = 0.3,
  amplitude = 0.1,
  mouseReact = true,
}: IridescenceProps) {
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: transparent; }
    canvas { display: block; width: 100vw; height: 100vh; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/ogl@0.0.113/dist/ogl.umd.js"></script>
</head>
<body>
  <div id="container"></div>
  <script>
    const vertexShader = \`
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    \`;

    const fragmentShader = \`
      precision highp float;
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uResolution;
      uniform vec2 uMouse;
      uniform float uAmplitude;
      uniform float uSpeed;
      varying vec2 vUv;

      void main() {
        float mr = min(uResolution.x, uResolution.y);
        vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

        uv += (uMouse - vec2(0.5)) * uAmplitude;

        float d = -uTime * 0.5 * uSpeed;
        float a = 0.0;
        for (float i = 0.0; i < 8.0; ++i) {
          a += cos(i - d - a * uv.x);
          d += sin(uv.y * i + a);
        }
        d += uTime * 0.5 * uSpeed;
        vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
        col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
        gl_FragColor = vec4(col, 1.0);
      }
    \`;

    const ctn = document.getElementById('container');
    const renderer = new ogl.Renderer({ alpha: true });
    const gl = renderer.gl;
    
    // Convert array color to vec3 format
    const rgbColor = [${color[0]}, ${color[1]}, ${color[2]}];

    let program;
    let mousePos = { x: 0.5, y: 0.5 };

    function init() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      const geometry = new ogl.Triangle(gl);
      
      program = new ogl.Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new ogl.Color(...rgbColor) },
          uResolution: { value: new ogl.Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
          uMouse: { value: new Float32Array([mousePos.x, mousePos.y]) },
          uAmplitude: { value: ${amplitude} },
          uSpeed: { value: ${speed} }
        }
      });

      const mesh = new ogl.Mesh(gl, { geometry, program });
      ctn.appendChild(gl.canvas);

      requestAnimationFrame(update);
    }

    function update(t) {
      requestAnimationFrame(update);
      if(program) {
        program.uniforms.uTime.value = t * 0.001;
      }
      renderer.render({ scene: program.mesh || new ogl.Mesh(gl, { geometry: new ogl.Triangle(gl), program }) }); // safe fallback
    }

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if(program) {
        program.uniforms.uResolution.value = new ogl.Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
      }
    });

    init();
  </script>
</body>
</html>
  `;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        originWhitelist={['*']}
        androidHardwareAccelerationDisabled={Platform.OS === 'android'}
      />
    </View>
  );
}