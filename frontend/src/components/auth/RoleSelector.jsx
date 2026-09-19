import React from 'react';
import { SunMedium, ShoppingCart, ShieldCheck } from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    {
      id: USER_ROLES.BUYER,
      title: 'Energy Buyer',
      desc: 'Purchase green renewable energy directly from local producers.',
      icon: ShoppingCart,
    },
    {
      id: USER_ROLES.SELLER,
      title: 'Prosumer / Seller',
      desc: 'Sell excess solar, wind, or battery storage energy at smart market rates.',
      icon: SunMedium,
    },
    {
      id: USER_ROLES.ADMIN,
      title: 'Grid Administrator',
      desc: 'Monitor grid telemetry, manage nodes, and oversee marketplace settlement.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {roles.map((r) => {
        const Icon = r.icon;
        const isSelected = selectedRole === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRole(r.id)}
            className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
              isSelected
                ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-emerald-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-emerald-400 border-emerald-300' : 'border-slate-600'}`} />
            </div>
            <h4 className="text-sm font-semibold text-white">{r.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
