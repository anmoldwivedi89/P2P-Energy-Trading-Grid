import React from 'react';

export const StatsCard = ({ title, value, change, isPositive = true, icon: Icon, description }) => {
  return (
    <div className="p-5 rounded-2xl bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] hover:border-[#FF6F61]/50 dark:hover:border-[#FF6F61]/50 neu-card transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#77736B] dark:text-[#B5A898]">{title}</span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm text-[#DAA520] dark:text-[#DAA520]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-xl font-semibold text-[#292824] dark:text-[#F5E8D8]">{value}</h3>
        {description && <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-0.5">{description}</p>}
      </div>

      {change && (
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className={isPositive ? 'text-[#6B8F71] dark:text-[#DAA520] font-semibold' : 'text-rose-600 font-semibold'}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
          <span className="text-[#77736B] dark:text-[#B5A898]">vs last cycle</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
