'use client'

import React from 'react';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[520px] bg-white border border-[#DDE8E1] rounded-3xl relative overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 sm:p-12 relative z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] border border-[#DDE8E1] text-[#16A34A] text-xs font-semibold uppercase tracking-wider w-fit mb-4">
            Interactive Grid Simulation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A] tracking-tight">
            Next-Gen Microgrid Architecture
          </h2>
          <p className="mt-4 text-[#475569] text-sm md:text-base max-w-lg leading-relaxed font-normal">
            Interact with real-time peer-to-peer energy routing models. Visualize solar generation, battery nodes, and automated billing settlements.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-64 md:h-full w-full bg-[#F7FAF8]">
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
