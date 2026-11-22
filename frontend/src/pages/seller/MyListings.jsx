import React from 'react';
import MyListingsComponent from '../../components/seller/MyListings';

export const MyListings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8]">Manage Energy Listings</h1>
        <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1">
          Review, update, or cancel your active renewable energy offers.
        </p>
      </div>

      <MyListingsComponent />
    </div>
  );
};

export default MyListings;
