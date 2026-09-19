import React, { useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import EnergyChart from '../../components/dashboard/EnergyChart';
import DemandChart from '../../components/dashboard/DemandChart';
import MarketplaceCard from '../../components/buyer/MarketplaceCard';
import PurchaseModal from '../../components/buyer/PurchaseModal';
import { ShoppingBag, Zap, DollarSign, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerDashboard = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredListings = [
    { id: 'LST-1', sellerName: 'Alice Solar Microgrid', location: 'Zone 4, Node 12', energyType: 'Solar', amount: 150, pricePerKwh: 0.12 },
    { id: 'LST-2', sellerName: 'Coastal Wind Farm', location: 'Zone 1, Node 03', energyType: 'Wind', amount: 400, pricePerKwh: 0.09 },
    { id: 'LST-3', sellerName: 'EcoHydro Storage', location: 'Zone 2, Node 08', energyType: 'Hydro', amount: 85, pricePerKwh: 0.14 },
  ];

  const handleBuy = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Buyer Energy Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor your renewable energy consumption, savings, and peer transactions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Green Energy Consumed"
          value="340 kWh"
          change="+18.5%"
          isPositive={true}
          icon={Zap}
          description="100% renewable mix"
        />
        <StatsCard
          title="Total Cost Savings"
          value="$24.60"
          change="+12.0%"
          isPositive={true}
          icon={DollarSign}
          description="Compared to utility grid"
        />
        <StatsCard
          title="Carbon Offset"
          value="182 kg CO₂"
          change="+22.4%"
          isPositive={true}
          icon={Leaf}
          description="Environmental impact"
        />
        <StatsCard
          title="Active Energy Orders"
          value="2 Pending"
          icon={ShoppingBag}
          description="Dispatched to meter"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnergyChart title="My Hourly Energy Usage (kWh)" />
        <DemandChart title="Neighborhood Grid Peak Demand Forecast" />
      </div>

      {/* Featured Marketplace Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Available Local Clean Energy</h3>
          <Link to="/marketplace" className="text-xs text-emerald-400 hover:underline">
            View All Marketplace Listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredListings.map((l) => (
            <MarketplaceCard key={l.id} listing={l} onBuyClick={handleBuy} />
          ))}
        </div>
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={selectedListing}
      />
    </div>
  );
};

export default BuyerDashboard;
