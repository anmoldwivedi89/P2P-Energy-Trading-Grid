import React from 'react';
import { Shield, UserCheck, MoreVertical } from 'lucide-react';
import { truncateAddress } from '../../utils/formatters';

export const UserTable = ({ users = [] }) => {
  const dummyUsers = users.length > 0 ? users : [
    { id: 'USR-01', name: 'Alice Solar Farm', email: 'alice@solargrid.io', role: 'seller', status: 'Active', wallet: '0x1a82f...39b4' },
    { id: 'USR-02', name: 'Bob Residential', email: 'bob@gmail.com', role: 'buyer', status: 'Active', wallet: '0x49c12...8e21' },
    { id: 'USR-03', name: 'GreenHydro Node', email: 'admin@hydrogrid.net', role: 'seller', status: 'Active', wallet: '0x99a41...11cb' },
    { id: 'USR-04', name: 'Grid Master Hub', email: 'master@grid.org', role: 'admin', status: 'Active', wallet: '0x77d24...909a' },
  ];

  return (
    <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-2xl">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Role</th>
            <th className="p-4">Wallet Address</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {dummyUsers.map((u) => (
            <tr key={u.id} className="hover:bg-slate-800/40 transition">
              <td className="p-4">
                <div className="font-medium text-white">{u.name}</div>
                <div className="text-[11px] text-slate-500">{u.email}</div>
              </td>
              <td className="p-4 capitalize">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  u.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                  u.role === 'seller' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {u.role}
                </span>
              </td>
              <td className="p-4 font-mono text-slate-400">{u.wallet}</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {u.status}
                </span>
              </td>
              <td className="p-4 text-right">
                <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
