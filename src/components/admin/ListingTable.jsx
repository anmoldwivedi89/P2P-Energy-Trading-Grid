import React from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';

export const ListingTable = ({ listings = [] }) => {
  const dummyListings = listings.length > 0 ? listings : [
    { id: 'LST-101', seller: 'Alice Solar Farm', type: 'Solar', amount: 500, price: 0.12, status: 'Active', date: '2026-09-19' },
    { id: 'LST-102', seller: 'Apex Wind Power', type: 'Wind', amount: 1200, price: 0.10, status: 'Active', date: '2026-09-18' },
    { id: 'LST-103', seller: 'GreenHydro Node', type: 'Hydro', amount: 300, price: 0.15, status: 'Sold', date: '2026-09-17' },
  ];

  return (
    <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
          <tr>
            <th className="p-4">Listing ID</th>
            <th className="p-4">Seller / Node</th>
            <th className="p-4">Source</th>
            <th className="p-4">Available Energy</th>
            <th className="p-4">Unit Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {dummyListings.map((l) => (
            <tr key={l.id} className="hover:bg-slate-800/40 transition">
              <td className="p-4 font-mono text-slate-400">{l.id}</td>
              <td className="p-4 font-medium text-white">{l.seller}</td>
              <td className="p-4">{l.type}</td>
              <td className="p-4 font-medium text-slate-200">{formatEnergy(l.amount)}</td>
              <td className="p-4 text-emerald-400 font-semibold">{formatCurrency(l.price)}/kWh</td>
              <td className="p-4">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  l.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-300'
                }`}>
                  {l.status}
                </span>
              </td>
              <td className="p-4 text-slate-400">{l.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
