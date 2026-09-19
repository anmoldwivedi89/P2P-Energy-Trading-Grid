import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import EnergyChart from '../../components/dashboard/EnergyChart';
import DemandChart from '../../components/dashboard/DemandChart';
import MarketplaceCard from '../../components/buyer/MarketplaceCard';
import PurchaseModal from '../../components/buyer/PurchaseModal';
import { listingService } from '../../services/listingService';
import { ShoppingBag, Zap, DollarSign, Leaf, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerDashboard = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await listingService.getAllListings();
        if (Array.isArray(res)) {
          setFeaturedListings(res.slice(0, 3));
        } else if (res && Array.isArray(res.data)) {
          setFeaturedListings(res.data.slice(0, 3));
        } else {
          setFeaturedListings([]);
        }
      } catch {
        setFeaturedListings([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleBuy = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A]">Buyer Energy Dashboard</h1>
        <p className="text-xs sm:text-sm text-[#475569] mt-1">
          Monitor your renewable energy consumption, savings, and peer transactions in real time.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Green Energy Consumed"
          value="0.0 kWh"
          change="Real-time"
          isPositive={true}
          icon={Zap}
          description="Awaiting IoT smart meter stream"
        />
        <StatsCard
          title="Total Cost Savings"
          value="$0.00"
          change="Active"
          isPositive={true}
          icon={DollarSign}
          description="Compared to utility base rate"
        />
        <StatsCard
          title="Carbon Offset"
          value="0.0 kg CO₂"
          change="Green"
          isPositive={true}
          icon={Leaf}
          description="Verified clean energy credits"
        />
        <StatsCard
          title="Active Energy Orders"
          value="0 Orders"
          icon={ShoppingBag}
          description="Dispatched to smart meter"
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
          <h3 className="text-base font-semibold text-[#12372A]">Available Local Clean Energy</h3>
          <Link to="/marketplace" className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1">
            <span>View All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading && (
          <div className="py-8 text-center text-xs text-[#475569]">
            Loading active energy listings...
          </div>
        )}

        {!loading && featuredListings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredListings.map((l) => (
              <MarketplaceCard key={l.id || l._id} listing={l} onBuyClick={handleBuy} />
            ))}
          </div>
        )}

        {!loading && featuredListings.length === 0 && (
          <div className="p-6 rounded-2xl bg-white border border-[#DDE8E1] text-center space-y-2">
            <Database className="w-5 h-5 text-[#16A34A] mx-auto" />
            <h4 className="text-sm font-semibold text-[#12372A]">No Active Listings in Your Zone</h4>
            <p className="text-xs text-[#475569] max-w-md mx-auto">
              Prosumers have not published surplus power for this cycle. Check back soon or browse the full marketplace.
            </p>
          </div>
        )}
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
