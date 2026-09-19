import React from 'react';
import ListingTable from '../../components/admin/ListingTable';

export const Listings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">All Marketplace Listings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor all active, pending, and fulfilled energy listings across grid zones.
        </p>
      </div>

      <ListingTable />
    </div>
  );
};

export default Listings;
