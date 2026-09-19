import React from 'react';

export const GradientBackground = ({
  children,
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#060913] ${containerClassName}`}>
      {/* Dynamic Ambient Mesh Gradient Layers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Center Solar-Emerald Glow */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] h-[650px] rounded-full bg-gradient-to-b from-emerald-600/15 via-teal-500/10 to-transparent blur-[140px] opacity-75 animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Left Side Emerald Aurora Glow */}
        <div className="absolute top-[25%] -left-[10%] w-[50vw] max-w-[700px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/12 via-emerald-700/8 to-transparent blur-[150px] opacity-60" />

        {/* Right Side Solar Amber Glow */}
        <div className="absolute top-[45%] -right-[10%] w-[55vw] max-w-[750px] h-[650px] rounded-full bg-gradient-to-bl from-amber-500/10 via-emerald-600/8 to-transparent blur-[160px] opacity-50" />

        {/* Bottom Ambient Microgrid Aura */}
        <div className="absolute bottom-[5%] left-1/3 w-[60vw] max-w-[800px] h-[500px] rounded-full bg-gradient-to-t from-emerald-900/15 via-slate-900/10 to-transparent blur-[140px] opacity-50" />

        {/* Subtle Micro-Grid Overlay Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
