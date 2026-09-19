import React, { useRef, useState, useEffect } from 'react';
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

export default function RadialBurst({ scrollLength = 160 }) {
  const ref = useRef(null);
  
  // Trigger smoothly across entire section visibility with immediate response
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start 80%", "end 20%"] 
  });
  
  // Snappy yet smooth spring physics for instant rotation feedback
  const progress = useTransform(
    useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 }),
    [0, 1],
    [0, 1]
  );

  return (
    <section
      ref={ref}
      className="relative w-full select-none bg-slate-950 text-slate-100 transition-colors duration-500 overflow-hidden border-y border-emerald-500/10"
      style={{ height: `${scrollLength}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambient background glow (Solar Emerald & Cyan) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 blur-[130px]">
          <div className="w-[50vw] h-[50vw] rounded-full bg-emerald-500/30 mix-blend-screen animate-pulse" />
          <div className="w-[40vw] h-[40vw] rounded-full bg-cyan-500/20 mix-blend-screen" />
        </div>

        {/* Main Center Text Layer */}
        <motion.div 
          className="absolute z-30 text-center px-8 py-7 rounded-3xl backdrop-blur-xl bg-slate-900/85 border border-emerald-500/25 shadow-2xl shadow-emerald-950/60 pointer-events-none max-w-lg mx-4" 
          style={{ opacity: useTransform(progress, [0, 0.5, 0.95, 1], [0.85, 1, 1, 0.6]) }}
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
            
            // As progress goes 0 -> 1, rotate 1.5 full circles with snappy response
            const tx = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 3;
              const radius = 22 + 10 * Math.sin(p * Math.PI); // Organic pulsation
              return `${Math.cos(currentAngle) * radius}vw`;
            });

            const ty = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 3;
              const radius = 18 + 10 * Math.sin(p * Math.PI);
              return `${Math.sin(currentAngle) * radius}vh`;
            });

            const rot = useTransform(progress, (p) => {
              const currentAngle = baseAngle + p * Math.PI * 3;
              return currentAngle * (180 / Math.PI) + 90;
            });

            const scale = useTransform(progress, [0, 0.5, 1], [0.75, 0.9, 0.75]);
            const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

            return (
              <motion.div
                key={i}
                className="absolute w-[24vw] h-[28vw] md:w-[18vw] md:h-[22vw] rounded-2xl overflow-hidden shadow-2xl shadow-black/90 ring-1 ring-emerald-400/30 will-change-transform bg-slate-900"
                style={{ x: tx, y: ty, rotate: rot, scale, opacity }}
              >
                <img 
                  src={src} 
                  alt="Solar Panel & Clean Microgrid" 
                  className="w-full h-full object-cover brightness-95 hover:brightness-100 transition-all duration-300" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Instruction Hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/80">
          <span className="opacity-80">Scroll to Orbit Solar Array</span>
          <div className="w-[1px] h-6 bg-emerald-500/30 relative overflow-hidden">
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
