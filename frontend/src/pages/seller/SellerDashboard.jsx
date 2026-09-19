import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import EnergyChart from '../../components/dashboard/EnergyChart';
import PriceRecommendation from '../../components/seller/PriceRecommendation';
import MyListings from '../../components/seller/MyListings';
import { SunMedium, DollarSign, Zap, TrendingUp } from 'lucide-react';

export const SellerDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Prosumer Seller Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">Monitor solar generation, live energy sales, and AI pricing signals.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Energy Generated"
          value="480.5 kWh"
          change="+14.2%"
          isPositive={true}
          icon={SunMedium}
          description="Solar & Storage output"
        />
        <StatsCard
          title="Total Revenue Earned"
          value="$68.40"
          change="+8.5%"
          isPositive={true}
          icon={DollarSign}
          description="Direct P2P payouts"
        />
        <StatsCard
          title="Active Energy Listings"
          value="3 Listings"
          icon={Zap}
          description="Available on grid"
        />
        <StatsCard
          title="Avg. Clearing Rate"
          value="$0.142 / kWh"
          change="+5.0%"
          isPositive={true}
          icon={TrendingUp}
          description="AI optimized price"
        />
      </div>

      {/* Charts & AI recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnergyChart title="Daily Solar Generation vs Grid Feed-in" />
        </div>
        <div>
          <PriceRecommendation energyType="Solar" />
        </div>
      </div>

      {/* Seller listings */}
      <MyListings />
    </div>
  );
};

export default SellerDashboard;
