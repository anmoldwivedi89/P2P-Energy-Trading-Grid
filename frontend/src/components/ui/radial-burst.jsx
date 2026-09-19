import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sun, Zap } from 'lucide-react';

// Images stored in frontend/public/images/orbit/
const SOLAR_IMGS = [
  "/images/orbit/solar-1.jpg", // Solar Panels Farm
  "/images/orbit/solar-2.jpg", // Solar Cell Grid Array
  "/images/orbit/solar-3.jpg", // Residential Rooftop Solar
  "/images/orbit/solar-4.jpg", // Clean Energy Field
  "/images/orbit/solar-5.jpg", // Sunset Solar Microgrid
  "/images/orbit/solar-6.jpg", // High Efficiency Solar Texture
  "/images/orbit/solar-7.jpg", // Clean Power System
];

export default function RadialBurst({ scrollLength = 115 }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start start", "end end"] 
  });
  
  const progress = useTransform(
    useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 }),
    [0, 1],
    [0, 1]
  );

  return (
    <section
      ref={ref}
      className="relative w-full select-none bg-transparent text-slate-100 transition-colors duration-300 overflow-hidden border-y border-white/5"
      style={{ height: `${scrollLength}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Soft emerald ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-35 blur-[130px]">
          <div className="w-[50vw] h-[50vw] rounded-full bg-emerald-500/20 mix-blend-screen" />
        </div>

        {/* Main Center Text Layer */}
        <motion.div 
          className="absolute z-30 text-center px-4 py-5 sm:px-8 sm:py-7 rounded-2xl sm:rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-emerald-950/40 pointer-events-none max-w-lg mx-3 sm:mx-4" 
          style={{ opacity: useTransform(progress, [0, 0.4, 0.9, 1], [0.95, 1, 1, 0.75]) }}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-medium mb-2 sm:mb-3">
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>Solar Microgrid Network</span>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-white">
            Decentralized <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">Solar Power</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 mt-2 sm:mt-3 font-normal leading-relaxed">
            Directly connect rooftop solar producers with local energy consumers. Clean, verifiable peer-to-peer power exchange.
          </p>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-emerald-400">
            <span className="flex items-center gap-1"><Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> 100% Clean Energy</span>
            <span>•</span>
            <span>Zero Grid Wastage</span>
          </div>
        </motion.div>
        
        {/* Revolving Orbital Solar Images Container */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {SOLAR_IMGS.map((src, i) => {
            const baseAngle = (i / SOLAR_IMGS.length) * Math.PI * 2;
            
            const tx = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 2.5;
              const radius = 22 + 9 * Math.sin(p * Math.PI);
              return `${Math.cos(currentAngle) * radius}vw`;
            });

            const ty = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 2.5;
              const radius = 18 + 9 * Math.sin(p * Math.PI);
              return `${Math.sin(currentAngle) * radius}vh`;
            });

            const rot = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 2.5;
              return currentAngle * (180 / Math.PI) + 90;
            });

            const scale = useTransform(progress, [0, 0.5, 1], [0.75, 0.9, 0.75]);
            const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9]);

            return (
              <motion.div
                key={i}
                className="absolute w-[24vw] h-[28vw] md:w-[18vw] md:h-[22vw] rounded-2xl overflow-hidden shadow-2xl border border-white/10 will-change-transform bg-slate-900"
                style={{ x: tx, y: ty, rotate: rot, scale, opacity }}
              >
                <img 
                  src={src} 
                  alt={`Solar Grid Frame ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300" 
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Instruction Hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-xs font-medium text-emerald-400">
          <span>Scroll to Orbit Solar Array</span>
          <div className="w-[1px] h-6 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute inset-x-0 top-0 bg-emerald-400 h-full"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
