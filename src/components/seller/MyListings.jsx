import React from 'react';
import ListingCard from './ListingCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyListings = ({ listings = [], onEdit, onDelete }) => {
  const dummyListings = listings.length > 0 ? listings : [
    { id: 'LST-001', energyType: 'Solar', amount: 150, pricePerKwh: 0.12, status: 'Active', createdAt: new Date() },
    { id: 'LST-002', energyType: 'Wind', amount: 300, pricePerKwh: 0.10, status: 'Active', createdAt: new Date() },
    { id: 'LST-003', energyType: 'Hydro', amount: 80, pricePerKwh: 0.15, status: 'Pending', createdAt: new Date() },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Your Active Energy Listings</h3>
        <Link
          to="/seller/create-listing"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Listing</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyListings.map((item) => (
          <ListingCard
            key={item.id}
            listing={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyListings;
