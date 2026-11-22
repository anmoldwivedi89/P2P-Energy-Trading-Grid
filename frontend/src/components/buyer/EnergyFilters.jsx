import React from 'react';
import { Filter, Search } from 'lucide-react';
import { ENERGY_TYPES } from '../../utils/constants';

export const EnergyFilters = ({
  search,
  setSearch,
  selectedType,
  setSelectedType,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="p-4 bg-[#EAE6DE] dark:bg-[#242424] border border-[#DCD6CB] dark:border-[#383430] rounded-2xl space-y-4 neu-card">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#77736B] dark:text-[#B5A898]/60" />
          <input
            type="text"
            placeholder="Search seller, grid node, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-[#EAE6DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] rounded-lg text-xs text-[#292824] dark:text-[#F5E8D8] placeholder-[#77736B]/60 neu-inset-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
          />
        </div>

        {/* Energy Source Tags */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSelectedType('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedType === 'All'
                ? 'bg-[#FF6F61] text-white shadow-xs'
                : 'bg-[#EAE6DE] dark:bg-[#2A2A2A] text-[#77736B] dark:text-[#B5A898] hover:text-[#292824] dark:hover:text-[#F5E8D8] border border-[#DCD6CB] dark:border-[#383430] neu-btn shadow-none'
            }`}
          >
            All Sources
          </button>
          {Object.values(ENERGY_TYPES).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedType === type
                  ? 'bg-[#FF6F61] text-white shadow-xs'
                  : 'bg-[#EAE6DE] dark:bg-[#2A2A2A] text-[#77736B] dark:text-[#B5A898] hover:text-[#292824] dark:hover:text-[#F5E8D8] border border-[#DCD6CB] dark:border-[#383430] neu-btn shadow-none'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyFilters;
