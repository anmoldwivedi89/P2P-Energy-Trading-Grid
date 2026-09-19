import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const ThreeEnergyGrid = ({ className }) => {
  const containerRef = useRef(null);
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer, scene, camera, animationFrameId;
    let particleGeometry, particleMaterial, lineGeometry, lineMaterial;

    try {
      const width = container.clientWidth || window.innerWidth || 1200;
      const height = container.clientHeight || 700;

      // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 85;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Particle nodes (Solar prosumer & grid nodes)
      const particleCount = 65;
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];
      const colors = new Float32Array(particleCount * 3);

      const primaryColor = isLightGrid
        ? new THREE.Color('#16A34A')
        : new THREE.Color('#10B981');
      const secondaryColor = isLightGrid
        ? new THREE.Color('#0D9488')
        : new THREE.Color('#34D399');
      const accentColor = new THREE.Color('#F59E0B');

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 160;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 70;

        velocities.push({
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1,
          z: (Math.random() - 0.5) * 0.08,
        });

        const mixColor =
          i % 7 === 0 ? accentColor : i % 2 === 0 ? primaryColor : secondaryColor;
        colors[i3] = mixColor.r;
        colors[i3 + 1] = mixColor.g;
        colors[i3 + 2] = mixColor.b;
      }

      particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Circular canvas texture for smooth glowing dots
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(16,185,129,0.8)');
        gradient.addColorStop(0.8, 'rgba(16,185,129,0.15)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      particleMaterial = new THREE.PointsMaterial({
        size: isLightGrid ? 3.5 : 4.2,
        map: particleTexture,
        transparent: true,
        vertexColors: true,
        blending: isLightGrid ? THREE.NormalBlending : THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Dynamic Connecting Energy Lines
      const maxLineConnections = particleCount * 5;
      const linePositions = new Float32Array(maxLineConnections * 3 * 2);
      const lineColors = new Float32Array(maxLineConnections * 3 * 2);

      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(linePositions, 3).setUsage(
          THREE.DynamicDrawUsage
        )
      );
      lineGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
      );

      // LineBasicMaterial instead of LineSegments
      lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isLightGrid ? 0.35 : 0.45,
        blending: isLightGrid ? THREE.NormalBlending : THREE.AdditiveBlending,
        depthWrite: false,
      });

      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      // Mouse tracking
      let targetMouseX = 0;
      let targetMouseY = 0;
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        targetMouseX = (x / (rect.width || 1) - 0.5) * 2;
        targetMouseY = -(y / (rect.height || 1) - 0.5) * 2;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 700;
        camera.aspect = w / (h || 1);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
        camera.position.x = mouseX * 14;
        camera.position.y = mouseY * 10;
        camera.lookAt(0, 0, 0);

        scene.rotation.y = elapsedTime * 0.03;
        scene.rotation.x = Math.sin(elapsedTime * 0.02) * 0.06;

        const posAttr = particleGeometry.attributes.position;
        let lineIndex = 0;
        let colorIndex = 0;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          posAttr.array[i3] += velocities[i].x;
          posAttr.array[i3 + 1] += velocities[i].y;
          posAttr.array[i3 + 2] += velocities[i].z;

          if (Math.abs(posAttr.array[i3]) > 80) velocities[i].x *= -1;
          if (Math.abs(posAttr.array[i3 + 1]) > 50) velocities[i].y *= -1;
          if (Math.abs(posAttr.array[i3 + 2]) > 35) velocities[i].z *= -1;

          for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            const dx = posAttr.array[i3] - posAttr.array[j3];
            const dy = posAttr.array[i3 + 1] - posAttr.array[j3 + 1];
            const dz = posAttr.array[i3 + 2] - posAttr.array[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            const maxDist = 30;
            if (dist < maxDist && lineIndex < maxLineConnections * 6) {
              const alpha = 1 - dist / maxDist;

              linePositions[lineIndex++] = posAttr.array[i3];
              linePositions[lineIndex++] = posAttr.array[i3 + 1];
              linePositions[lineIndex++] = posAttr.array[i3 + 2];

              linePositions[lineIndex++] = posAttr.array[j3];
              linePositions[lineIndex++] = posAttr.array[j3 + 1];
              linePositions[lineIndex++] = posAttr.array[j3 + 2];

              const lineColor = i % 7 === 0 ? accentColor : primaryColor;
              lineColors[colorIndex++] = lineColor.r * alpha;
              lineColors[colorIndex++] = lineColor.g * alpha;
              lineColors[colorIndex++] = lineColor.b * alpha;

              lineColors[colorIndex++] = lineColor.r * alpha;
              lineColors[colorIndex++] = lineColor.g * alpha;
              lineColors[colorIndex++] = lineColor.b * alpha;
            }
          }
        }

        posAttr.needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex / 3);
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (container && renderer && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        if (particleGeometry) particleGeometry.dispose();
        if (particleMaterial) particleMaterial.dispose();
        if (lineGeometry) lineGeometry.dispose();
        if (lineMaterial) lineMaterial.dispose();
        if (renderer) renderer.dispose();
      };
    } catch (err) {
      console.warn('Three.js WebGL initialization skipped:', err);
    }
  }, [isLightGrid]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className || ''}`}
    />
  );
};

export default ThreeEnergyGrid;
