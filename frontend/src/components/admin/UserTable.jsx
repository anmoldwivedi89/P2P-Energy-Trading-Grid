import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { truncateAddress } from '../../utils/formatters';

export const UserTable = ({ users = [], loading = false }) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground">
        Loading network prosumers...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="py-12 px-4 text-center bg-card border border-border rounded-2xl shadow-custom">
        <p className="text-xs text-muted-foreground">No registered users found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-card border border-border rounded-2xl shadow-custom">
      <table className="w-full text-left text-xs text-foreground">
        <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Role</th>
            <th className="p-4">Wallet Address</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Copy Wallet</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((u) => {
            const id = u._id || u.id;
            const wallet = u.walletAddress || u.wallet || `0x${id.slice(-8)}`;
            const status = u.status || 'Active';

            return (
              <tr key={id} className="hover:bg-muted/30 transition">
                <td className="p-4">
                  <div className="font-semibold text-foreground">{u.name || 'Prosumer'}</div>
                  <div className="text-[11px] text-muted-foreground">{u.email}</div>
                </td>
                <td className="p-4 capitalize">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      u.role === 'admin'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                        : u.role === 'seller'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}
                  >
                    {u.role || 'buyer'}
                  </span>
                </td>
                <td className="p-4 font-mono text-muted-foreground">{truncateAddress(wallet)}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 text-primary font-medium text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(wallet, id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
                    title="Copy wallet address to clipboard"
                  >
                    {copiedId === id ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;