import React from 'react';
import { Sun, Wind, Droplets, Flame, Zap, Clock, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';

export const ListingCard = ({ listing, onEdit, onDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Solar': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-400" />;
      case 'Hydro': return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'Biomass': return <Flame className="w-5 h-5 text-lime-400" />;
      default: return <Zap className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] hover:border-[#FF6F61]/50 dark:hover:border-[#FF6F61]/50 rounded-2xl p-5 neu-card transition flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
              {getIcon(listing?.energyType || 'Solar')}
            </div>
            <div>
              <h4 className="font-semibold text-[#292824] dark:text-[#F5E8D8] text-base">{listing?.title || `${listing?.energyType || 'Solar'} Energy`}</h4>
              <p className="text-xs text-[#77736B] dark:text-[#B5A898]">ID: {listing?.id || 'LST-101'}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs rounded-full bg-[#6B8F71]/15 text-[#6B8F71] dark:bg-[#DAA520]/15 dark:text-[#DAA520] border border-[#6B8F71]/20 dark:border-[#DAA520]/30 font-semibold">
            {listing?.status || 'Active'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm text-xs">
          <div>
            <span className="text-[#77736B] dark:text-[#B5A898] block mb-0.5">Quantity</span>
            <span className="font-semibold text-[#292824] dark:text-[#F5E8D8] text-sm">{formatEnergy(listing?.amount || 100)}</span>
          </div>
          <div>
            <span className="text-[#77736B] dark:text-[#B5A898] block mb-0.5">Unit Price</span>
            <span className="font-semibold text-[#DAA520] dark:text-[#DAA520] text-sm">{formatCurrency(listing?.pricePerKwh || 0.14)} / kWh</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#77736B] dark:text-[#B5A898] pt-3 border-t border-[#DCD6CB] dark:border-[#383430]">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatDate(listing?.createdAt || new Date())}
        </span>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button onClick={() => onEdit(listing)} className="text-[#292824] hover:text-[#FF6F61] dark:text-[#B5A898] dark:hover:text-[#F5E8D8] transition font-medium">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(listing?.id)} className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
