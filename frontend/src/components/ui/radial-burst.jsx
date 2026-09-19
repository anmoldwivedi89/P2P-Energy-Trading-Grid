import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sun, Zap } from 'lucide-react';

const SOLAR_IMGS = [
  "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop", // Solar Farm Field
  "https://images.unsplash.com/photo-1508873696983-2df57046475a?q=80&w=800&auto=format&fit=crop", // Solar Cells Grid Close-up
  "https://images.unsplash.com/photo-1545208942-e1c9c916524b?q=80&w=800&auto=format&fit=crop", // Rooftop Solar Panels
  "https://images.unsplash.com/photo-1558441719-2347b73f875d?q=80&w=800&auto=format&fit=crop", // Clean Energy Array
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop", // Sunset Solar Station
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop", // Renewable Power Microgrid
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop", // High-tech Silicon Panels
];

export default function RadialBurst({ scrollLength = 320 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // Smooth scroll progression pipeline
  const progress = useTransform(useSpring(scrollYProgress, { stiffness: 90, damping: 30 }), [0.1, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full select-none bg-slate-950 text-slate-100 transition-colors duration-500 overflow-hidden border-y border-emerald-500/10"
      style={{ height: `${scrollLength}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambient background glow (Solar Emerald & Cyan) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 blur-[140px]">
          <div className="w-[55vw] h-[55vw] rounded-full bg-emerald-500/30 mix-blend-screen animate-pulse" />
          <div className="w-[45vw] h-[45vw] rounded-full bg-cyan-500/20 mix-blend-screen" />
        </div>

        {/* Main Center Text Layer */}
        <motion.div 
          className="absolute z-30 text-center px-8 py-8 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-emerald-500/20 shadow-2xl shadow-emerald-950/50 pointer-events-none max-w-lg mx-4" 
          style={{ opacity: useTransform(progress, [0, 0.8, 1], [1, 1, 0.4]) }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sun className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Solar Energy Revolution</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Decentralized <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Solar Grid</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
            Harnessing peer-to-peer clean solar energy trading. Direct from prosumer rooftop panels to your smart microgrid.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-emerald-400/90">
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> 100% Green Energy</span>
            <span>•</span>
            <span>Zero Carbon Footprint</span>
          </div>
        </motion.div>
        
        {/* Revolving Orbital Solar Images Container */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {SOLAR_IMGS.map((src, i) => {
            const baseAngle = (i / SOLAR_IMGS.length) * Math.PI * 2;
            
            // As progress goes 0 -> 1, images diverge outward and rotate an extra full circle around the center text
            const tx = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 2;
              const radius = 24 + 11 * p; // Expands outward from 24vw to 35vw
              return `${Math.cos(currentAngle) * radius}vw`;
            });

            const ty = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 2;
              const radius = 20 + 14 * p; // Expands outward from 20vh to 34vh
              return `${Math.sin(currentAngle) * radius}vh`;
            });

            const rot = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 2;
              return currentAngle * (180 / Math.PI) + 90; // Tangent orientation facing rotation
            });

            const scale = useTransform(progress, [0, 1], [0.7, 0.9]);
            const opacity = useTransform(progress, [0, 0.1, 1], [0.95, 1, 1]);

            return (
              <motion.div
                key={i}
                className="absolute w-[24vw] h-[30vw] md:w-[19vw] md:h-[24vw] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-emerald-400/20 will-change-transform bg-slate-900"
                style={{ x: tx, y: ty, rotate: rot, scale, opacity }}
              >
                <img 
                  src={src} 
                  alt="Solar Panel & Clean Microgrid" 
                  className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Instruction Hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/80">
          <span className="opacity-80">Scroll to Explore Solar Orbit</span>
          <div className="w-[1px] h-6 bg-emerald-500/30 relative overflow-hidden">
            <motion.div 
              className="absolute inset-x-0 top-0 bg-emerald-400 h-full"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
