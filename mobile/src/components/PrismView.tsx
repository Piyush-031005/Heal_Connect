import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { WebView } from 'react-native-webview';

interface PrismViewProps {
  height?: DimensionValue;
  width?: DimensionValue;
}

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      body { margin: 0; overflow: hidden; background-color: transparent; }
      canvas { display: block; width: 100vw; height: 100vh; }
    </style>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.CylinderGeometry(0, 4.2, 5.3, 4, 1, false);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x8a2be2,
        emissiveIntensity: 0.5,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
      });

      const prism = new THREE.Mesh(geometry, material);
      prism.scale.set(2.3, 2.3, 2.3);
      scene.add(prism);

      const light1 = new THREE.PointLight(0xff00ff, 1, 100);
      light1.position.set(10, 10, 10);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x00ffff, 1, 100);
      light2.position.set(-10, -10, 10);
      scene.add(light2);

      camera.position.z = 15;

      const animate = function () {
        requestAnimationFrame(animate);
        prism.rotation.x += 0.01 * 0.6;
        prism.rotation.y += 0.01 * 0.6;
        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    </script>
  </body>
</html>
`;

export default function PrismView({ height = 300, width = '100%' }: PrismViewProps) {
  return (
    <View style={[{ height, width }, styles.container]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});