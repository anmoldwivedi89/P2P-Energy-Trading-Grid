import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 3D Physics Tilt Container with Specular Light Glare
 * Renders smooth 3D perspective, parallax depth, and realistic light reflections on hover.
 */
export const ThreeDTilt = ({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  perspective = 1000,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics springs for natural, organic 3D elasticity
  const springConfig = { damping: 22, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Glare position
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={`relative inline-block ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full"
      >
        {children}

        {/* Specular 3D Holographic Light Glare */}
        {glare && isHovered && (
          <motion.div
            style={{
              left: glareX,
              top: glareY,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none absolute w-64 h-64 rounded-full bg-gradient-to-r from-emerald-400/20 via-white/15 to-transparent blur-2xl z-20"
          />
        )}
      </motion.div>
    </div>
  );
};

export default ThreeDTilt;
