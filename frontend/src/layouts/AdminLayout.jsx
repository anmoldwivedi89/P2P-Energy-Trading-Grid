import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  ShieldAlert,
  Users,
  Layers,
  ArrowLeftRight,
  BarChart3,
  Server,
} from 'lucide-react';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="p-4 bg-purple-950/20 border border-purple-800/40 rounded-2xl mb-4">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Grid Controller</span>
            </div>
            <span className="text-sm font-bold text-white">System Admin Hub</span>
          </div>

          <nav className="space-y-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <BarChart3 className="w-4 h-4" />
              <span>Telemetry & Overview</span>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <Users className="w-4 h-4" />
              <span>Prosumers & Buyers</span>
            </NavLink>

            <NavLink
              to="/admin/listings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <Layers className="w-4 h-4" />
              <span>All Energy Listings</span>
            </NavLink>

            <NavLink
              to="/admin/transactions"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Ledger & Transactions</span>
            </NavLink>
          </nav>
        </aside>

        {/* Dynamic Outlet */}
        <main className="flex-1 w-full overflow-hidden">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
