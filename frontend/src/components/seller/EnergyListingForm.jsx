import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import PriceRecommendation from './PriceRecommendation';
import { ENERGY_TYPES } from '../../utils/constants';

import { listingService } from '../../services/listingService';

export const EnergyListingForm = ({ onSubmitSuccess }) => {
  const [energyType, setEnergyType] = useState(ENERGY_TYPES.SOLAR);
  const [energyAmount, setEnergyAmount] = useState('');
  const [pricePerKwh, setPricePerKwh] = useState('');
  const [durationHours, setDurationHours] = useState('24');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplyAiPrice = (recommendedPrice) => {
    setPricePerKwh(recommendedPrice.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await listingService.createListing({
        energyType,
        amount: Number(energyAmount),
        pricePerKwh: Number(pricePerKwh),
        durationHours: Number(durationHours) || 24,
      });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setError(err.message || 'Failed to publish energy listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8] block mb-2 transition-colors">
              Energy Source Type
            </label>
            <select
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] rounded-lg text-[#292824] dark:text-[#F5E8D8] neu-inset-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
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

      <div className="flex justify-end pt-4 border-t border-[#DCD6CB] dark:border-[#383430]">
        <Button type="submit" isLoading={loading} className="px-8">
          Publish Energy Listing
        </Button>
      </div>
    </form>
  );
};

export default EnergyListingForm;
