import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';
import { Sun, ShieldCheck, MapPin, Zap, ArrowLeft } from 'lucide-react';
import { formatCurrency, formatEnergy } from '../../utils/formatters';

export const EnergyDetails = () => {
  const { id } = useParams();

  const listing = {
    id: id || 'LST-001',
    sellerName: 'Alice Solar Microgrid',
    energyType: 'Solar',
    amount: 150,
    pricePerKwh: 0.12,
    location: 'Zone 4, Node 12 (Substation Beta)',
    reliabilityScore: '99.4%',
    carbonReduction: '45 kg CO₂ / 100 kWh',
    description: 'Surplus solar output generated from residential 10kW photovoltaic array with integrated battery storage.',
  };

  return (
    <div className="min-h-screen bg-[#EAE6DE] dark:bg-[#1C1C1C] flex flex-col text-[#292824] dark:text-[#F5E8D8] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-xs text-[#77736B] dark:text-[#B5A898] hover:text-[#292824] dark:hover:text-[#F5E8D8] transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-3xl p-6 sm:p-8 space-y-6 neu-card">
          <div className="flex items-start justify-between">
            <div>
              <span className="px-2.5 py-1 text-xs rounded-full bg-[#DAA520]/15 text-[#DAA520] dark:bg-[#DAA520]/15 dark:text-[#DAA520] border border-[#DAA520]/30 dark:border-[#DAA520]/30 mb-2 inline-block font-semibold">
                {listing.energyType} Source
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8]">{listing.sellerName}</h1>
              <p className="text-xs text-[#77736B] dark:text-[#B5A898] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#6B8F71] dark:text-[#DAA520]" />
                {listing.location}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#77736B] dark:text-[#B5A898] block">Unit Price</span>
              <span className="text-xl font-semibold text-[#DAA520] dark:text-[#DAA520]">{formatCurrency(listing.pricePerKwh)}/kWh</span>
            </div>
          </div>

          <p className="text-sm text-[#77736B] dark:text-[#B5A898] leading-relaxed border-t border-b border-[#DCD6CB] dark:border-[#383430] py-4">
            {listing.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
              <span className="text-xs text-[#77736B] dark:text-[#B5A898] block mb-1">Available Supply</span>
              <span className="text-base font-semibold text-[#292824] dark:text-[#F5E8D8]">{formatEnergy(listing.amount)}</span>
            </div>
            <div className="p-4 bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
              <span className="text-xs text-[#77736B] dark:text-[#B5A898] block mb-1">Grid Reliability</span>
              <span className="text-base font-semibold text-[#6B8F71] dark:text-[#DAA520]">{listing.reliabilityScore}</span>
            </div>
            <div className="p-4 bg-[#EAE6DE] dark:bg-[#1C1C1C] rounded-xl border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
              <span className="text-xs text-[#77736B] dark:text-[#B5A898] block mb-1">CO₂ Offset Potential</span>
              <span className="text-base font-semibold text-[#6B8F71] dark:text-[#DAA520]">{listing.carbonReduction}</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Proceed to Instant Purchase
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EnergyDetails;
