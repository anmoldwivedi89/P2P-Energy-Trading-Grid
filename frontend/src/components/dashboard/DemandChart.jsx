import React from 'react';
import { Activity } from 'lucide-react';

export const DemandChart = ({ title = 'Predicted Grid Demand (AI Forecast)' }) => {
  return (
    <div className="p-5 rounded-2xl bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] flex flex-col justify-between neu-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm text-[#DAA520] dark:text-[#DAA520]">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-[#292824] dark:text-[#F5E8D8]">{title}</h4>
        </div>
        <span className="text-xs text-[#DAA520] dark:text-[#DAA520] bg-[#F0E8DE] dark:bg-[#DAA520]/15 border border-[#DCD6CB] dark:border-[#DAA520]/30 px-2.5 py-1 rounded-lg font-medium">AI Predicted</span>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 px-2">
        {[55, 60, 45, 70, 80, 100, 115, 90, 85, 95, 70, 60].map((height, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full flex items-end justify-center h-32">
              <div
                style={{ height: `${(height / 120) * 100}%` }}
                className="w-full max-w-[16px] bg-[#DAA520]/80 dark:bg-[#DAA520]/80 rounded-t-sm group-hover:bg-[#DAA520] dark:group-hover:bg-[#DAA520] transition-all"
              />
            </div>
            <span className="text-[10px] text-[#77736B] dark:text-[#B5A898] font-mono">T+{idx * 2}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandChart;
