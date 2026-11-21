import React, { useState, useEffect } from 'react';
import ListingTable from '../../components/admin/ListingTable';
import { listingService } from '../../services/listingService';

export const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await listingService.getAllListings();
        const data = Array.isArray(res) ? res : res?.data || [];
        setListings(data);
      } catch {
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">All Marketplace Listings</h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
          Monitor all active, pending, and fulfilled energy listings across grid zones.
        </p>
      </div>

      <ListingTable listings={listings} loading={loading} />
    </div>
  );
};

export default Listings;