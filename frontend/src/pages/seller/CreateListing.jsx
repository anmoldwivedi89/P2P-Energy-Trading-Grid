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
        <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">Create New Energy Listing</h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
          List your renewable surplus energy on the decentralized marketplace.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900/60 border border-[#DDE8E1] dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <EnergyListingForm onSubmitSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CreateListing;
