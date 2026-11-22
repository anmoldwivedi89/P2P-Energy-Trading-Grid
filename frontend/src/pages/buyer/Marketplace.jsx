import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import EnergyFilters from '../../components/buyer/EnergyFilters';
import MarketplaceCard from '../../components/buyer/MarketplaceCard';
import PurchaseModal from '../../components/buyer/PurchaseModal';
import Button from '../../components/common/Button';
import { listingService } from '../../services/listingService';
import { Database, PlusCircle, RefreshCw, Zap, Server, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await listingService.getAllListings();
      if (Array.isArray(res)) {
        setListings(res);
        setApiConnected(true);
      } else if (res && Array.isArray(res.data)) {
        setListings(res.data);
        setApiConnected(true);
      } else {
        setListings([]);
      }
    } catch {
      // Backend not running or endpoint empty
      setListings([]);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchesType = selectedType === 'All' || item.energyType === selectedType;
    const matchesSearch = (item.sellerName || '').toLowerCase().includes(search.toLowerCase()) ||
                          (item.location || '').toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleBuy = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EAE6DE] dark:bg-[#1C1C1C] flex flex-col text-[#292824] dark:text-[#F5E8D8] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8]">Peer-to-Peer Energy Marketplace</h1>
            <p className="text-xs sm:text-sm text-[#77736B] dark:text-[#B5A898] mt-1">
              Browse and purchase live clean energy directly from verified prosumers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchListings}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] hover:border-[#FF6F61] rounded-xl text-[#77736B] dark:text-[#B5A898] hover:text-[#292824] dark:hover:text-[#F5E8D8] neu-btn shadow-none transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Feed</span>
            </button>
            <Link to="/seller/create-listing">
              <Button size="sm" variant="primary" className="gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Energy Listing</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <EnergyFilters
          search={search}
          setSearch={setSearch}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#DDE8E1] dark:border-[#383430] border-t-[#DAA520] mb-3"></div>
            <p className="text-xs font-medium text-[#475569] dark:text-[#B5A898]">Connecting to real-time grid marketplace...</p>
          </div>
        )}

        {/* Live Listings Grid */}
        {!loading && filteredListings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <MarketplaceCard key={listing.id || listing._id} listing={listing} onBuyClick={handleBuy} />
            ))}
          </div>
        )}

        {/* Dynamic Schema & Connection Guide (When No Live Listings / Backend Empty) */}
        {!loading && filteredListings.length === 0 && (
          <div className="bg-[#EAE6DE] dark:bg-[#242424] rounded-3xl border border-[#DCD6CB] dark:border-[#383430] p-8 sm:p-10 space-y-6 neu-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#DCD6CB] dark:border-[#383430]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#EAE6DE] dark:bg-[#DAA520]/15 text-[#DAA520] dark:text-[#DAA520] rounded-2xl border border-[#DCD6CB] dark:border-[#DAA520]/30 neu-inset-sm">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#292824] dark:text-[#F5E8D8]">Live Marketplace Data Schema</h3>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-0.5">
                    {apiConnected ? 'Connected to API. Waiting for prosumers to publish listings.' : 'Ready for API backend integration.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F0E8DE] dark:bg-[#DAA520]/15 border border-[#DCD6CB] dark:border-[#DAA520]/30 text-[#DAA520] dark:text-[#DAA520] text-xs font-semibold">
                <Server className="w-3.5 h-3.5" />
                <span>Endpoint: <code>GET /api/listings</code></span>
              </div>
            </div>

            {/* Required Fields Breakdown */}
            <div>
              <h4 className="text-sm font-medium text-[#292824] dark:text-[#F5E8D8] mb-3">
                Required Listing Payload Fields:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[#292824] dark:text-[#F5E8D8]">sellerName</span>
                    <span className="text-[10px] font-medium text-[#DAA520] dark:text-[#DAA520]">String</span>
                  </div>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1.5">Name of the solar array or prosumer (e.g. <em>"Alice Rooftop Solar"</em>)</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[#292824] dark:text-[#F5E8D8]">energyType</span>
                    <span className="text-[10px] font-medium text-[#DAA520] dark:text-[#DAA520]">Enum</span>
                  </div>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1.5">Source: <code>Solar</code>, <code>Wind</code>, <code>Hydro</code>, <code>Biomass</code></p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[#292824] dark:text-[#F5E8D8]">amount</span>
                    <span className="text-[10px] font-medium text-[#DAA520] dark:text-[#DAA520]">Number (kWh)</span>
                  </div>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1.5">Available units for sale in kilowatt-hours (e.g. <code>150.0</code>)</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[#292824] dark:text-[#F5E8D8]">pricePerKwh</span>
                    <span className="text-[10px] font-medium text-[#DAA520] dark:text-[#DAA520]">Number</span>
                  </div>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1.5">Tariff price per unit (e.g. <code>0.12</code> or <code>₹7.50</code>)</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[#292824] dark:text-[#F5E8D8]">location</span>
                    <span className="text-[10px] font-medium text-[#DAA520] dark:text-[#DAA520]">String</span>
                  </div>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1.5">Grid cluster or node address (e.g. <em>"Zone 4, Node 12"</em>)</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] neu-inset-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[#292824] dark:text-[#F5E8D8]">smartMeterId</span>
                    <span className="text-[10px] font-medium text-[#DAA520] dark:text-[#DAA520]">String</span>
                  </div>
                  <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1.5">Hardware IoT serial number (e.g. <em>"SM-SOLAR-88"</em>)</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#77736B] dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-[#6B8F71] dark:text-emerald-400" />
                <span>Backend services will automatically populate this grid upon POST requests.</span>
              </div>
              <Link to="/seller/create-listing">
                <Button variant="primary" size="md" className="gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Publish First Live Listing</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={selectedListing}
      />

      <Footer />
    </div>
  );
};

export default Marketplace;
