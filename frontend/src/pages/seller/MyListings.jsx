import React from 'react';
import MyListingsComponent from '../../components/seller/MyListings';

export const MyListings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Energy Listings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, update, or cancel your active renewable energy offers.
        </p>
      </div>

      <MyListingsComponent />
    </div>
  );
};

export default MyListings;
