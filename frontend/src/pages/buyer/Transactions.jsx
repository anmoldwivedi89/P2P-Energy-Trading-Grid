import React, { useState, useEffect } from 'react';
import { formatCurrency, formatEnergy, formatDate } from '../../utils/formatters';
import { transactionService } from '../../services/transactionService';
import { ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTxs = async () => {
    setLoading(true);
    try {
      const res = await transactionService.getUserTransactions();
      const data = Array.isArray(res) ? res : res?.data || [];
      setTransactions(data);
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTxs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#12372A] dark:text-white">Settlement & Transactions</h1>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
            Decentralized ledger verification of energy purchases and smart contract settlements.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchTxs}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card text-foreground text-xs hover:bg-muted/50 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#475569] dark:text-slate-400">
          Loading settlement records...
        </div>
      ) : transactions.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-[#DDE8E1] dark:border-slate-800 text-center text-xs text-[#475569] dark:text-slate-400">
          No settlement transactions found yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900/60 border border-[#DDE8E1] dark:border-slate-800 rounded-2xl shadow-xs">
          <table className="w-full text-left text-xs text-[#12372A] dark:text-slate-300">
            <thead className="bg-[#F8FAFC] dark:bg-slate-950/60 text-[#475569] dark:text-slate-400 font-semibold border-b border-[#DDE8E1] dark:border-slate-800">
              <tr>
                <th className="p-4">Tx Reference</th>
                <th className="p-4">Transaction Type</th>
                <th className="p-4">Energy (kWh)</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60">
              {transactions.map((tx) => {
                const id = tx._id || tx.id || 'TX-N/A';
                const amount = Number(tx.amount) || 0;
                const total = Number(tx.totalPrice) || 0;
                const status = tx.status || 'Confirmed';
                const date = tx.createdAt ? formatDate(tx.createdAt) : 'Recent';

                return (
                  <tr key={id} className="hover:bg-[#F1F5F9] dark:hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono text-[#475569] dark:text-slate-400">
                      #{id.slice(-8).toUpperCase()}
                    </td>
                    <td className="p-4 text-[#12372A] dark:text-white font-medium">
                      P2P Energy Settlement
                    </td>
                    <td className="p-4 font-semibold text-[#12372A] dark:text-white">
                      {formatEnergy(amount)}
                    </td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(total)}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-[#475569] dark:text-slate-400">
                      {date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;