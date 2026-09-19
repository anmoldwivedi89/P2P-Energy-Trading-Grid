import React from 'react';

export const StatsCard = ({ title, value, change, isPositive = true, icon: Icon, description }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>

      {change && (
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
          <span className="text-slate-500">vs last cycle</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
