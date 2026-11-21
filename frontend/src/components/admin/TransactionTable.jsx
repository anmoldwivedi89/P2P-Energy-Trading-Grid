import React from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';

export const TransactionTable = ({ transactions = [], loading = false }) => {
  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground">
        Loading transaction ledger...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-12 px-4 text-center bg-card border border-border rounded-2xl shadow-custom">
        <p className="text-xs text-muted-foreground">No transaction records found on the ledger.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-card border border-border rounded-2xl shadow-custom">
      <table className="w-full text-left text-xs text-foreground">
        <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
          <tr>
            <th className="p-4">Tx ID</th>
            <th className="p-4">Buyer</th>
            <th className="p-4">Seller</th>
            <th className="p-4">Energy</th>
            <th className="p-4">Total Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((t) => {
            const id = t._id || t.id;
            const buyerName =
              typeof t.buyer === 'object' && t.buyer?.name
                ? t.buyer.name
                : typeof t.buyer === 'string'
                  ? t.buyer
                  : 'Buyer Node';
            const sellerName =
              typeof t.seller === 'object' && t.seller?.name
                ? t.seller.name
                : typeof t.seller === 'string'
                  ? t.seller
                  : 'Seller Node';
            const amount = Number(t.amount) || 0;
            const total = Number(t.totalPrice) || Number(t.total) || 0;
            const status = t.status || 'Completed';
            const date = t.createdAt ? formatDate(t.createdAt) : t.date || 'Recent';

            return (
              <tr key={id} className="hover:bg-muted/30 transition">
                <td className="p-4 font-mono text-muted-foreground">
                  #{id.slice(-6).toUpperCase()}
                </td>
                <td className="p-4 font-medium text-foreground">{buyerName}</td>
                <td className="p-4 text-muted-foreground">{sellerName}</td>
                <td className="p-4 font-semibold text-foreground">{formatEnergy(amount)}</td>
                <td className="p-4 font-bold text-primary">₹{total.toFixed(2)}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${status === 'Completed' || status === 'Settled'
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground whitespace-nowrap">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;