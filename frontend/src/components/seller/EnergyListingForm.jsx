import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import PriceRecommendation from './PriceRecommendation';
import { ENERGY_TYPES } from '../../utils/constants';

export const EnergyListingForm = ({ onSubmitSuccess }) => {
  const [energyType, setEnergyType] = useState(ENERGY_TYPES.SOLAR);
  const [energyAmount, setEnergyAmount] = useState('');
  const [pricePerKwh, setPricePerKwh] = useState('');
  const [durationHours, setDurationHours] = useState('24');
  const [loading, setLoading] = useState(false);

  const handleApplyAiPrice = (recommendedPrice) => {
    setPricePerKwh(recommendedPrice.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
              Energy Source Type
            </label>
            <select
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {Object.values(ENERGY_TYPES).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Available Energy (kWh)"
            type="number"
            min="1"
            step="0.1"
            placeholder="e.g. 50"
            value={energyAmount}
            onChange={(e) => setEnergyAmount(e.target.value)}
            required
          />

          <Input
            label="Price per kWh ($ / kWh)"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="e.g. 0.12"
            value={pricePerKwh}
            onChange={(e) => setPricePerKwh(e.target.value)}
            required
          />

          <Input
            label="Listing Active Duration (Hours)"
            type="number"
            min="1"
            max="168"
            placeholder="24"
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
          />
        </div>

        {/* AI Dynamic Price Recommendation Component */}
        <div className="flex flex-col justify-between">
          <PriceRecommendation
            energyType={energyType}
            onApplyPrice={handleApplyAiPrice}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-800">
        <Button type="submit" isLoading={loading} className="px-8">
          Publish Energy Listing
        </Button>
      </div>
    </form>
  );
};

export default EnergyListingForm;
