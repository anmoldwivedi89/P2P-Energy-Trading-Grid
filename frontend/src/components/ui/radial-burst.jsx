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
      className="relative w-full select-none bg-[#F7FAF8] text-[#12372A] transition-colors duration-300 overflow-hidden border-y border-[#DDE8E1]"
      style={{ height: `${scrollLength}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Soft natural green ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 blur-[120px]">
          <div className="w-[50vw] h-[50vw] rounded-full bg-[#ECFDF3]" />
        </div>

        {/* Main Center Text Layer */}
        <motion.div 
          className="absolute z-30 text-center px-8 py-7 rounded-3xl bg-white/95 border border-[#DDE8E1] shadow-lg shadow-emerald-950/5 pointer-events-none max-w-lg mx-4" 
          style={{ opacity: useTransform(progress, [0, 0.4, 0.9, 1], [0.95, 1, 1, 0.75]) }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] border border-[#DDE8E1] text-[#16A34A] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sun className="w-4 h-4 text-[#16A34A]" />
            <span>Solar Microgrid Network</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#12372A]">
            Decentralized <span className="text-[#16A34A]">Solar Power</span>
          </h2>
          <p className="text-xs md:text-sm text-[#475569] mt-3 font-normal leading-relaxed">
            Directly connect rooftop solar producers with local energy consumers. Clean, verifiable peer-to-peer power exchange.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-medium text-[#16A34A]">
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> 100% Clean Energy</span>
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
                className="absolute w-[24vw] h-[28vw] md:w-[18vw] md:h-[22vw] rounded-2xl overflow-hidden shadow-md border border-[#DDE8E1] will-change-transform bg-white"
                style={{ x: tx, y: ty, rotate: rot, scale, opacity }}
              >
                <img 
                  src={src} 
                  alt="Solar Panel & Clean Microgrid" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Instruction Hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#16A34A]">
          <span>Scroll to Orbit Solar Array</span>
          <div className="w-[1px] h-6 bg-[#DDE8E1] relative overflow-hidden">
            <motion.div 
              className="absolute inset-x-0 top-0 bg-[#16A34A] h-full"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
