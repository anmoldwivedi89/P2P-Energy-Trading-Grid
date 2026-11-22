import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, TrendingUp, RefreshCw } from 'lucide-react';
import Button from '../common/Button';
import { predictionService } from '../../services/predictionService';

export const PriceRecommendation = ({ energyType = 'Solar', onApplyPrice }) => {
  const [loading, setLoading] = useState(true);
  const [aiPrice, setAiPrice] = useState(0.14);
  const [source, setSource] = useState('standby');
  const marketAverage = 0.16;

  const fetchAiPrice = async () => {
    setLoading(true);
    try {
      const res = await predictionService.getPriceRecommendation({ energyType });
      const price =
        res?.data?.recommendedPricePerKwh ||
        res?.recommendedPricePerKwh ||
        res?.data?.recommended_price_per_kwh ||
        res?.recommended_price_per_kwh;

      if (price !== undefined && price !== null) {
        setAiPrice(Number(price));
        setSource(res?.data?.source || res?.source || 'ml_model');
      }
    } catch {
      // Graceful fallback to default market rate
      setSource('baseline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAiPrice();
  }, [energyType]);

  return (
    <div className="p-5 rounded-2xl bg-[#F0E8DE] dark:from-[#242424] dark:to-[#1C1C1C] border border-[#DCD6CB] dark:border-[#DAA520]/40 relative overflow-hidden neu-card-sm">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-[#DAA520] dark:text-[#DAA520]" />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-[#DAA520] dark:text-[#DAA520] text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI Smart Pricing Recommendation</span>
        </div>
        <button
          type="button"
          onClick={fetchAiPrice}
          disabled={loading}
          className="text-[#77736B] hover:text-[#FF6F61] dark:text-[#B5A898] dark:hover:text-[#DAA520] transition text-xs p-1"
          title="Recalculate AI rate"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <h4 className="text-base font-semibold text-[#292824] dark:text-[#F5E8D8] mb-1">
        Dynamic Grid Optimization
      </h4>
      <p className="text-xs text-[#77736B] dark:text-[#B5A898] mb-4">
        Our ML model analyzes live demand curves, weather forecasts, and historical transactions to recommend your best clearing price.
      </p>

      <div className="bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl p-4 border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm mb-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#77736B] dark:text-[#B5A898]">Current Market Average:</span>
          <span className="font-semibold text-[#292824] dark:text-[#F5E8D8]">${marketAverage}/kWh</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#77736B] dark:text-[#B5A898]">Predicted Demand Index:</span>
          <span className="font-semibold text-[#6B8F71] dark:text-[#DAA520] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> High Demand (+12%)
          </span>
        </div>
        <div className="pt-2 border-t border-[#DCD6CB] dark:border-[#383430] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#292824] dark:text-[#F5E8D8] font-medium">Recommended Unit Price:</span>
            {source === 'ml_model' && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#DAA520]/20 text-[#DAA520] font-mono">
                ML LIVE
              </span>
            )}
          </div>
          <span className="text-lg font-semibold text-[#DAA520] dark:text-[#DAA520]">
            {loading ? '...' : `$${aiPrice.toFixed(2)}/kWh`}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={loading}
        onClick={() => onApplyPrice && onApplyPrice(aiPrice)}
        className="w-full text-xs"
      >
        <span>Apply AI Recommended Rate</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </Button>
    </div>
  );
};

export default PriceRecommendation;
