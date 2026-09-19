import React from 'react';
import { DollarSign } from 'lucide-react';

export const PriceChart = ({ title = 'Tariff & Spot Market Pricing ($/kWh)' }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-white">{title}</h4>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">Realtime Feed</span>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 px-2">
        {[0.12, 0.11, 0.14, 0.18, 0.22, 0.19, 0.15, 0.13, 0.16, 0.20, 0.17, 0.14].map((price, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full flex items-end justify-center h-32">
              <div
                style={{ height: `${(price / 0.25) * 100}%` }}
                className="w-full max-w-[18px] bg-gradient-to-t from-amber-600 to-yellow-400 rounded-t-sm group-hover:from-amber-500 group-hover:to-yellow-300 transition-all"
              />
            </div>
            <span className="text-[10px] text-slate-500">${price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceChart;
