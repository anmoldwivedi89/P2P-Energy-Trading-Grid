import React from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';

export const ListingTable = ({ listings = [], loading = false }) => {
  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground">
        Loading marketplace listings...
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="py-12 px-4 text-center bg-card border border-border rounded-2xl shadow-custom">
        <p className="text-xs text-muted-foreground">No marketplace listings found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-card border border-border rounded-2xl shadow-custom">
      <table className="w-full text-left text-xs text-foreground">
        <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
          <tr>
            <th className="p-4">Listing ID</th>
            <th className="p-4">Seller / Node</th>
            <th className="p-4">Energy Source</th>
            <th className="p-4">Available Energy</th>
            <th className="p-4">Unit Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {listings.map((l) => {
            const id = l._id || l.id;
            const sellerName =
              typeof l.seller === 'object' && l.seller?.name
                ? l.seller.name
                : typeof l.seller === 'string'
                ? l.seller
                : 'Prosumer Seller';
            const energyType = l.energyType || l.type || 'Solar';
            const amount = Number(l.amount) || Number(l.availableAmount) || 0;
            const price = Number(l.pricePerKwh) || Number(l.price) || 0;
            const status = l.status || 'Active';
            const date = l.createdAt ? formatDate(l.createdAt) : l.date || 'Recent';

            return (
              <tr key={id} className="hover:bg-muted/30 transition">
                <td className="p-4 font-mono text-muted-foreground">
                  #{id.slice(-6).toUpperCase()}
                </td>
                <td className="p-4 font-medium text-foreground">{sellerName}</td>
                <td className="p-4">{energyType}</td>
                <td className="p-4 font-medium text-foreground">{formatEnergy(amount)}</td>
                <td className="p-4 text-primary font-semibold">₹{price.toFixed(2)}/kWh</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      status === 'Active'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;