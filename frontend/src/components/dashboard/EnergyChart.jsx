import React from 'react';
import { Zap } from 'lucide-react';

export const EnergyChart = ({ title = 'Energy Generation & Consumption Trend' }) => {
  // SVG Mock Chart Placeholder
  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-semibold text-white">{title}</h4>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">Last 24 Hours</span>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 px-2">
        {[40, 65, 30, 85, 95, 75, 60, 90, 110, 80, 95, 70].map((height, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full flex items-end justify-center h-32">
              <div
                style={{ height: `${(height / 120) * 100}%` }}
                className="w-full max-w-[18px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-sm group-hover:from-emerald-500 group-hover:to-teal-300 transition-all"
              />
            </div>
            <span className="text-[10px] text-slate-500">{idx * 2}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyChart;
