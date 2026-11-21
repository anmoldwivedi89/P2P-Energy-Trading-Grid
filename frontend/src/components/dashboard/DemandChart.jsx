import React from 'react';
import { Activity } from 'lucide-react';

export const DemandChart = ({ title = 'Predicted Grid Demand (AI Forecast)' }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-[#DDE8E1] dark:border-slate-800 flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#ECFDF3] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-[#12372A] dark:text-white">{title}</h4>
        </div>
        <span className="text-xs text-[#16A34A] dark:text-emerald-400 bg-[#ECFDF3] dark:bg-emerald-950/40 border border-[#DDE8E1] dark:border-emerald-800/40 px-2.5 py-1 rounded-lg font-medium">AI Predicted</span>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 px-2">
        {[55, 60, 45, 70, 80, 100, 115, 90, 85, 95, 70, 60].map((height, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full flex items-end justify-center h-32">
              <div
                style={{ height: `${(height / 120) * 100}%` }}
                className="w-full max-w-[16px] bg-[#16A34A]/80 dark:bg-emerald-500/80 rounded-t-sm group-hover:bg-[#16A34A] dark:group-hover:bg-emerald-400 transition-all"
              />
            </div>
            <span className="text-[10px] text-[#475569] dark:text-slate-400 font-mono">T+{idx * 2}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandChart;
