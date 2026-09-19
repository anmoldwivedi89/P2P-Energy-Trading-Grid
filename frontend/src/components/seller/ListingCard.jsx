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
    <div className="bg-slate-850 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              {getIcon(listing?.energyType || 'Solar')}
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">{listing?.title || `${listing?.energyType || 'Solar'} Energy`}</h4>
              <p className="text-xs text-slate-400">ID: {listing?.id || 'LST-101'}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {listing?.status || 'Active'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-slate-950/40 rounded-xl border border-slate-800/60 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Quantity</span>
            <span className="font-semibold text-slate-200 text-sm">{formatEnergy(listing?.amount || 100)}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Unit Price</span>
            <span className="font-semibold text-emerald-400 text-sm">{formatCurrency(listing?.pricePerKwh || 0.14)} / kWh</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatDate(listing?.createdAt || new Date())}
        </span>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button onClick={() => onEdit(listing)} className="text-slate-300 hover:text-white transition">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(listing?.id)} className="text-rose-400 hover:text-rose-300 transition">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
