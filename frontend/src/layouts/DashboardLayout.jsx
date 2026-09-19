import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  ShoppingBag,
  TrendingUp,
  Receipt,
  User,
} from 'lucide-react';

export const DashboardLayout = () => {
  const { role } = useAuth();
  const isSeller = role === 'seller';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl mb-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Active Mode
            </span>
            <span className="text-sm font-bold text-emerald-400 capitalize">
              {isSeller ? '⚡ Prosumer / Seller Portal' : '🔋 Consumer / Buyer Portal'}
            </span>
          </div>

          <nav className="space-y-1">
            {isSeller ? (
              <>
                <NavLink
                  to="/seller/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Seller Overview</span>
                </NavLink>

                <NavLink
                  to="/seller/create-listing"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Listing</span>
                </NavLink>

                <NavLink
                  to="/seller/listings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <ListOrdered className="w-4 h-4" />
                  <span>My Listings</span>
                </NavLink>

                <NavLink
                  to="/seller/orders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <Receipt className="w-4 h-4" />
                  <span>Energy Sales / Orders</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/buyer/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Buyer Overview</span>
                </NavLink>

                <NavLink
                  to="/marketplace"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Marketplace</span>
                </NavLink>

                <NavLink
                  to="/buyer/orders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <Receipt className="w-4 h-4" />
                  <span>Purchased Energy</span>
                </NavLink>

                <NavLink
                  to="/buyer/transactions"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Settlement History</span>
                </NavLink>
              </>
            )}

            <div className="pt-4 border-t border-slate-800">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${
                    isActive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <User className="w-4 h-4" />
                <span>Account Profile</span>
              </NavLink>
            </div>
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

export default DashboardLayout;
