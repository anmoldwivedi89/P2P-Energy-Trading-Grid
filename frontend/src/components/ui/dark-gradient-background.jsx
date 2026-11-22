import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import LinearGridBackground from './linear-grid-background';

export const GradientBackground = ({
  children,
  className = '',
  containerClassName = '',
}) => {
  const { themeMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-300 ${isLightGrid ? 'bg-[#EAE6DE] text-[#292824]' : 'bg-[#1C1C1C] text-[#F5E8D8]'} ${containerClassName}`}>
      {/* Background layer selection */}
      {isLightGrid ? (
        <LinearGridBackground />
      ) : (
        /* Dynamic Ambient Warm Dark Mesh Gradient Layers */
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top-Center Gold-Warm Glow */}
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] h-[650px] rounded-full bg-gradient-to-b from-[#DAA520]/15 via-[#FF6F61]/10 to-transparent blur-[140px] opacity-75 animate-pulse" style={{ animationDuration: '8s' }} />

          {/* Left Side Muted Coral Aurora Glow */}
          <div className="absolute top-[25%] -left-[10%] w-[50vw] max-w-[700px] h-[600px] rounded-full bg-gradient-to-tr from-[#FF6F61]/12 via-[#FF4500]/8 to-transparent blur-[150px] opacity-60" />

          {/* Right Side Golden Yellow Glow */}
          <div className="absolute top-[45%] -right-[10%] w-[55vw] max-w-[750px] h-[650px] rounded-full bg-gradient-to-bl from-[#DAA520]/12 via-[#FF6F61]/8 to-transparent blur-[160px] opacity-50" />

          {/* Bottom Ambient Microgrid Aura */}
          <div className="absolute bottom-[5%] left-1/3 w-[60vw] max-w-[800px] h-[500px] rounded-full bg-gradient-to-t from-[#DAA520]/10 via-[#1C1C1C] to-transparent blur-[140px] opacity-50" />

          {/* Subtle Micro-Grid Overlay Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #F5E8D8 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 w-full ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
