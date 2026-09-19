import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Zap, LogIn, UserPlus, LogOut, Bell, User, Sun } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#060913]/85 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-400 shadow-sm group-hover:border-amber-400/50 transition-all duration-300">
            <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
              GridP2P
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-slate-400 -mt-1 font-semibold">
              Solar Microgrid
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-amber-400 transition-colors duration-200">Home</Link>
          <Link to="/marketplace" className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-1.5">
            <span>Marketplace</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </Link>
          {isAuthenticated && role === 'seller' && (
            <Link to="/seller/dashboard" className="hover:text-amber-400 transition-colors duration-200">Seller Hub</Link>
          )}
          {isAuthenticated && role === 'buyer' && (
            <Link to="/buyer/dashboard" className="hover:text-amber-400 transition-colors duration-200">Buyer Hub</Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin/dashboard" className="hover:text-amber-400 transition-colors duration-200">Admin Panel</Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/notifications"
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-200 hover:border-amber-500/40 transition"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span className="capitalize font-medium">{user?.name || role || 'Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800/60 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/60 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl shadow-md shadow-amber-500/20 transition-all active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-current" />
                <span>Join Grid</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
