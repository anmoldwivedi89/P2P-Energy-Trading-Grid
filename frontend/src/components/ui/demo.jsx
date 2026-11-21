'use client'

import React from 'react';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full min-h-[500px] md:h-[520px] bg-white/80 dark:bg-slate-900/70 border border-[#DDE8E1] dark:border-white/10 rounded-3xl relative overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-md transition-colors duration-300">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        size={350}
      />
      
      <div className="flex flex-col md:flex-row min-h-[500px] md:h-full">
        {/* Left content */}
        <div className="flex-1 p-6 sm:p-10 md:p-12 relative z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium w-fit mb-4">
            Interactive Grid Simulation
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">
            Next-Gen Microgrid Architecture
          </h2>
          <p className="mt-4 text-[#475569] dark:text-slate-300 text-sm md:text-base max-w-lg leading-relaxed font-normal">
            Interact with real-time peer-to-peer energy routing models. Visualize solar generation, battery nodes, and automated billing settlements.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-64 md:h-full w-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}

export default SplineSceneBasic;
