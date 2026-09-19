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
    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search seller, grid node, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Energy Source Tags */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSelectedType('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedType === 'All'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
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
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
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
