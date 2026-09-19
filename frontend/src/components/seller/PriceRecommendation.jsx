import React from 'react';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import Button from '../common/Button';

export const PriceRecommendation = ({ energyType = 'Solar', onApplyPrice }) => {
  // Demo AI price calculation placeholder
  const estimatedAiPrice = 0.14;
  const marketAverage = 0.16;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-emerald-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-emerald-400" />
      </div>

      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-2">
        <Sparkles className="w-4 h-4" />
        <span>AI Smart Pricing Recommendation</span>
      </div>

      <h4 className="text-base font-semibold text-white mb-1">
        Dynamic Grid Optimization
      </h4>
      <p className="text-xs text-slate-400 mb-4">
        Our ML model analyzes live demand curves, weather forecasts, and historical transactions to recommend your best clearing price.
      </p>

      <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 mb-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Current Market Average:</span>
          <span className="font-semibold text-slate-200">${marketAverage}/kWh</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Predicted Demand Index:</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> High Demand (+12%)
          </span>
        </div>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Recommended Unit Price:</span>
          <span className="text-lg font-semibold text-emerald-400">${estimatedAiPrice}/kWh</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onApplyPrice && onApplyPrice(estimatedAiPrice)}
        className="w-full text-xs"
      >
        <span>Apply AI Recommended Rate</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </Button>
    </div>
  );
};

export default PriceRecommendation;
