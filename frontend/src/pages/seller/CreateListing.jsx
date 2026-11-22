import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnergyListingForm from '../../components/seller/EnergyListingForm';

export const CreateListing = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/seller/listings');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#292824] dark:text-[#F5E8D8]">Create New Energy Listing</h1>
        <p className="text-xs text-[#77736B] dark:text-[#B5A898] mt-1">
          List your renewable surplus energy on the decentralized marketplace.
        </p>
      </div>

      <div className="bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-3xl p-6 sm:p-8 neu-card">
        <EnergyListingForm onSubmitSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CreateListing;
