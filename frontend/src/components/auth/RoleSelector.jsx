import React from 'react';
import { SunMedium, ShoppingCart, Check } from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';

/**
 * Public Role Selector for Registration
 * Only exposes Consumer/Buyer and Prosumer/Seller roles.
 * Admin role is strictly restricted to server-side provisioning.
 */
export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  const roles = [
    {
      id: USER_ROLES.BUYER,
      title: 'Consumer / Buyer',
      badge: 'Grid Consumer',
      desc: 'Purchase certified clean solar and renewable energy directly from nearby producers.',
      icon: ShoppingCart,
    },
    {
      id: USER_ROLES.SELLER,
      title: 'Prosumer / Seller',
      badge: 'Energy Producer',
      desc: 'Sell surplus rooftop solar, wind, or stored battery energy at algorithmic spot rates.',
      icon: SunMedium,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full auth-crisp-text">
      {roles.map((r) => {
        const Icon = r.icon;
        const isSelected = selectedRole === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRole(r.id)}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group relative overflow-hidden ${isSelected
                ? 'bg-[#073D30] text-[#F4EFE3] border-[#B58A45] shadow-md shadow-[#062D24]/30 ring-1 ring-[#B58A45]/60'
                : 'bg-white text-[#0F2922] border-[#D5CBBB] hover:border-[#B58A45]/60 hover:bg-white shadow-2xs'
              }`}
          >
            {/* Top row: Icon and selection indicator */}
            <div className="flex items-center justify-between w-full mb-1.5">
              <div
                className={`p-1.5 rounded-lg transition-colors ${isSelected
                    ? 'bg-[#B58A45]/20 text-[#E5C378] border border-[#B58A45]/40'
                    : 'bg-[#F4EFE3] text-[#073D30] border border-[#D5CBBB] group-hover:bg-[#EAE2D2]/60'
                  }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${isSelected
                    ? 'bg-[#B58A45] border-[#B58A45] text-[#062D24]'
                    : 'border-[#B8C2BA] bg-white group-hover:border-[#B58A45]'
                  }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className={`text-xs font-bold leading-tight font-sans ${isSelected ? 'text-[#F4EFE3]' : 'text-[#0F2922]'}`}>
                  {r.title}
                </h4>
              </div>
              <p
                className={`text-[11px] leading-snug line-clamp-2 mt-1 font-sans ${isSelected ? 'text-[#F4EFE3]/85' : 'text-[#46524B]'
                  }`}
              >
                {r.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
