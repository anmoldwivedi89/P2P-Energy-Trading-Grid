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
    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white dark:from-slate-800/90 dark:to-slate-900/90 border border-emerald-500/30 relative overflow-hidden shadow-xs">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-emerald-400" />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI Smart Pricing Recommendation</span>
        </div>
        <button
          type="button"
          onClick={fetchAiPrice}
          disabled={loading}
          className="text-[#475569] hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition text-xs p-1"
          title="Recalculate AI rate"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <h4 className="text-base font-semibold text-[#12372A] dark:text-white mb-1">
        Dynamic Grid Optimization
      </h4>
      <p className="text-xs text-[#475569] dark:text-slate-400 mb-4">
        Our ML model analyzes live demand curves, weather forecasts, and historical transactions to recommend your best clearing price.
      </p>

      <div className="bg-white/80 dark:bg-slate-950/60 rounded-xl p-4 border border-emerald-500/20 dark:border-slate-800/80 mb-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#475569] dark:text-slate-400">Current Market Average:</span>
          <span className="font-semibold text-[#12372A] dark:text-slate-200">${marketAverage}/kWh</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#475569] dark:text-slate-400">Predicted Demand Index:</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> High Demand (+12%)
          </span>
        </div>
        <div className="pt-2 border-t border-[#DDE8E1] dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#12372A] dark:text-slate-300 font-medium">Recommended Unit Price:</span>
            {source === 'ml_model' && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                ML LIVE
              </span>
            )}
          </div>
          <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
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
