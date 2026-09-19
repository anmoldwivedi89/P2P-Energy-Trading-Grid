import React from 'react';
import { Sun, Wind, Droplets, Flame, Zap, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatEnergy } from '../../utils/formatters';

export const MarketplaceCard = ({ listing, onBuyClick }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Solar': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-500" />;
      case 'Hydro': return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'Biomass': return <Flame className="w-5 h-5 text-lime-600" />;
      default: return <Zap className="w-5 h-5 text-[#16A34A]" />;
    }
  };

  return (
    <div className="bg-white border border-[#DDE8E1] hover:border-[#16A34A]/50 rounded-2xl p-5 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between gap-4 group">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ECFDF3] border border-[#DDE8E1] group-hover:scale-105 transition">
              {getIcon(listing?.energyType || 'Solar')}
            </div>
            <div>
              <h4 className="font-semibold text-[#12372A] text-base">{listing?.sellerName || 'Local Microgrid Node'}</h4>
              <p className="text-xs text-[#475569] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#16A34A]" />
                {listing?.location || 'Zone 4, Sector B'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#ECFDF3] text-[#16A34A] border border-[#DDE8E1]">
            {listing?.energyType || 'Solar'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-[#F7FAF8] rounded-xl border border-[#DDE8E1] text-xs">
          <div>
            <span className="text-[#475569] block mb-0.5">Available</span>
            <span className="font-semibold text-[#12372A] text-sm">{formatEnergy(listing?.amount || 0)}</span>
          </div>
          <div>
            <span className="text-[#475569] block mb-0.5">Tariff Rate</span>
            <span className="font-semibold text-[#16A34A] text-sm">{formatCurrency(listing?.pricePerKwh || 0)}/kWh</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#DDE8E1]">
        <div className="flex items-center gap-1 text-[11px] text-[#475569]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
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
