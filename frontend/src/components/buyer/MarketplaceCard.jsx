import React from 'react';
import { Sun, Wind, Droplets, Flame, Zap, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatEnergy } from '../../utils/formatters';

export const MarketplaceCard = ({ listing, onBuyClick }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Solar': return <Sun className="w-5 h-5 text-[#DAA520]" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#6B8F71]" />;
      case 'Hydro': return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'Biomass': return <Flame className="w-5 h-5 text-[#D69A75]" />;
      default: return <Zap className="w-5 h-5 text-[#FF6F61]" />;
    }
  };

  return (
    <div className="bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] hover:border-[#FF6F61]/50 dark:hover:border-[#FF6F61]/50 rounded-2xl p-5 neu-card transition-all duration-200 flex flex-col justify-between gap-4 group">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAE6DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm group-hover:scale-105 transition">
              {getIcon(listing?.energyType || 'Solar')}
            </div>
            <div>
              <h4 className="font-semibold text-[#292824] dark:text-[#F5E8D8] text-base">{listing?.sellerName || 'Local Microgrid Node'}</h4>
              <p className="text-xs text-[#77736B] dark:text-[#B5A898] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#6B8F71] dark:text-[#DAA520]" />
                {listing?.location || 'Zone 4, Sector B'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#F0E8DE] dark:bg-[#DAA520]/15 text-[#6B8F71] dark:text-[#DAA520] border border-[#DCD6CB] dark:border-[#DAA520]/30">
            {listing?.energyType || 'Solar'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm text-xs">
          <div>
            <span className="text-[#77736B] dark:text-[#B5A898] block mb-0.5">Available</span>
            <span className="font-semibold text-[#292824] dark:text-[#F5E8D8] text-sm">{formatEnergy(listing?.amount || 0)}</span>
          </div>
          <div>
            <span className="text-[#77736B] dark:text-[#B5A898] block mb-0.5">Tariff Rate</span>
            <span className="font-semibold text-[#DAA520] dark:text-[#DAA520] text-sm">{formatCurrency(listing?.pricePerKwh || 0)}/kWh</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#DCD6CB] dark:border-[#383430]">
        <div className="flex items-center gap-1 text-[11px] text-[#77736B] dark:text-[#B5A898]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6B8F71] dark:text-[#DAA520]" />
          <span>Grid Verified</span>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => onBuyClick && onBuyClick(listing)}
          className="text-xs px-3.5"
        >
          <span>Buy Energy</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceCard;
