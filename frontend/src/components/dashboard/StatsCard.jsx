import React from 'react';

export const StatsCard = ({ title, value, change, isPositive = true, icon: Icon, description }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-[#DDE8E1] dark:border-slate-800 hover:border-[#16A34A]/50 dark:hover:border-slate-700 transition-all duration-200 shadow-xs hover:shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#475569] dark:text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-[#ECFDF3] dark:bg-emerald-950/40 border border-[#DDE8E1] dark:border-emerald-800/40 text-[#16A34A] dark:text-emerald-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-xl font-semibold text-[#12372A] dark:text-white">{value}</h3>
        {description && <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">{description}</p>}
      </div>

      {change && (
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className={isPositive ? 'text-[#16A34A] dark:text-emerald-400 font-semibold' : 'text-rose-600 font-semibold'}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
          <span className="text-[#475569] dark:text-slate-500">vs last cycle</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
