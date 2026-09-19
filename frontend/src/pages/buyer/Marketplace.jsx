import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import EnergyFilters from '../../components/buyer/EnergyFilters';
import MarketplaceCard from '../../components/buyer/MarketplaceCard';
import PurchaseModal from '../../components/buyer/PurchaseModal';

export const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const listings = [
    { id: 'LST-1', sellerName: 'Alice Solar Microgrid', location: 'Zone 4, Node 12', energyType: 'Solar', amount: 150, pricePerKwh: 0.12 },
    { id: 'LST-2', sellerName: 'Coastal Wind Farm', location: 'Zone 1, Node 03', energyType: 'Wind', amount: 400, pricePerKwh: 0.09 },
    { id: 'LST-3', sellerName: 'EcoHydro Storage', location: 'Zone 2, Node 08', energyType: 'Hydro', amount: 85, pricePerKwh: 0.14 },
    { id: 'LST-4', sellerName: 'Apex Biomass Plant', location: 'Zone 5, Node 19', energyType: 'Biomass', amount: 220, pricePerKwh: 0.11 },
    { id: 'LST-5', sellerName: 'GreenRoof Community Solar', location: 'Zone 4, Node 05', energyType: 'Solar', amount: 95, pricePerKwh: 0.13 },
    { id: 'LST-6', sellerName: 'Valley Wind Turbines', location: 'Zone 3, Node 14', energyType: 'Wind', amount: 310, pricePerKwh: 0.10 },
  ];

  const filteredListings = listings.filter((item) => {
    const matchesType = selectedType === 'All' || item.energyType === selectedType;
    const matchesSearch = item.sellerName.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleBuy = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Peer-to-Peer Energy Marketplace</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse and purchase verified renewable power directly from local community prosumers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <EnergyFilters
          search={search}
          setSearch={setSearch}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <MarketplaceCard key={listing.id} listing={listing} onBuyClick={handleBuy} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <p className="text-sm text-slate-400">No energy listings match your current criteria.</p>
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
