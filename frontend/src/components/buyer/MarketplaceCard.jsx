import React from 'react';
import { Sun, Wind, Droplets, Flame, Zap, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatEnergy } from '../../utils/formatters';

export const MarketplaceCard = ({ listing, onBuyClick }) => {
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
    <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 transition flex flex-col justify-between gap-4 group">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700/80 group-hover:scale-105 transition">
              {getIcon(listing?.energyType || 'Solar')}
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">{listing?.sellerName || 'Local Microgrid Node'}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {listing?.location || 'Zone 4, Sector B'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {listing?.energyType || 'Solar'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Available</span>
            <span className="font-semibold text-slate-100 text-sm">{formatEnergy(listing?.amount || 120)}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Tariff Rate</span>
            <span className="font-bold text-emerald-400 text-sm">{formatCurrency(listing?.pricePerKwh || 0.12)}/kWh</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Grid Verified</span>
        </div>
        <Button
          size="sm"
          onClick={() => onBuyClick && onBuyClick(listing)}
          className="text-xs px-4"
        >
          <span>Buy Energy</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceCard;
