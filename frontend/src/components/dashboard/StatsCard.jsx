import React from 'react';

export const StatsCard = ({ title, value, change, isPositive = true, icon: Icon, description }) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-[#DDE8E1] hover:border-[#16A34A]/50 transition-all duration-200 shadow-xs hover:shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#475569]">{title}</span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-[#ECFDF3] border border-[#DDE8E1] text-[#16A34A]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-2xl font-bold text-[#12372A] tracking-tight">{value}</h3>
        {description && <p className="text-xs text-[#475569] mt-0.5">{description}</p>}
      </div>

      {change && (
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className={isPositive ? 'text-[#16A34A] font-semibold' : 'text-rose-600 font-semibold'}>
            {isPositive ? '▲' : '▼'} {change}
          </span>
          <span className="text-[#475569]">vs last cycle</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
