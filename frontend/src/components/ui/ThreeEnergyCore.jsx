import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const ThreeEnergyCore = ({ className, size = 320 }) => {
  const containerRef = useRef(null);
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Inner Core: Icosahedron Wireframe with glowing points
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isLightGrid ? 0x16a34a : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: isLightGrid ? 0.35 : 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Glowing Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: isLightGrid ? 0x22c55e : 0x34d399,
      transparent: true,
      opacity: isLightGrid ? 0.15 : 0.25,
      blending: THREE.AdditiveBlending,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    scene.add(innerSphere);

    // 2. Orbiting Clean Energy Rings
    const createRing = (radius, tube, color, rotX, rotY) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: isLightGrid ? 0.45 : 0.65,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createRing(
      2.2,
      0.02,
      isLightGrid ? 0x16a34a : 0x10b981,
      Math.PI / 3,
      Math.PI / 6
    );
    const ring2 = createRing(
      2.45,
      0.018,
      isLightGrid ? 0x0d9488 : 0x38bdf8,
      -Math.PI / 4,
      Math.PI / 4
    );
    const ring3 = createRing(
      2.7,
      0.015,
      0xf59e0b,
      Math.PI / 2,
      0
    );

    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);

    // 3. Orbiting Energy Photon Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.2 + (Math.random() - 0.5) * 0.8;
      particlePos[i * 3] = Math.cos(angle) * radius;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
      particlePos[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePos, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: isLightGrid ? 0x16a34a : 0x34d399,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = -y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse tilt
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Rotate core
      coreMesh.rotation.y = elapsed * 0.4 + mouseX * 0.8;
      coreMesh.rotation.x = elapsed * 0.2 + mouseY * 0.8;

      // Pulse inner sphere
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.06;
      innerSphere.scale.set(scale, scale, scale);

      // Rotate rings at varying orbital speeds
      ring1.rotation.z = elapsed * 0.35;
      ring2.rotation.z = -elapsed * 0.28;
      ring3.rotation.x = Math.PI / 2 + Math.sin(elapsed * 0.4) * 0.2;
      ring3.rotation.y = elapsed * 0.2;

      // Rotate particles
      particles.rotation.y = elapsed * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isLightGrid, size]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center pointer-events-none select-none ${className || ''}`}
    />
  );
};

export default ThreeEnergyCore;
