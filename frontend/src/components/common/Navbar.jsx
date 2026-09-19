import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Zap, LogIn, UserPlus, LogOut, Bell, User, Sun, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const isLightGrid = themeMode === 'light-grid';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-all duration-300 ${
      isLightGrid 
        ? 'bg-white/85 border-b border-[#DDE8E1] text-[#12372A]' 
        : 'bg-[#060913]/85 border-b border-white/10 text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Interactive Theme Switcher Icon */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${isLightGrid ? 'Dark Mesh Gradient' : 'Light Linear Grid'} theme`}
            className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer group shadow-sm active:scale-95 ${
              isLightGrid 
                ? 'bg-[#ECFDF3] border-[#16A34A]/30 text-[#16A34A] hover:bg-[#dcfce7] hover:border-[#16A34A]' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <Link to="/" className="flex flex-col group">
            <span className={`font-display font-bold text-lg tracking-tight transition-colors ${
              isLightGrid ? 'text-[#12372A]' : 'text-white'
            }`}>
              Grid<span className="text-emerald-500">P2P</span>
            </span>
            <span className={`text-[9px] font-mono tracking-widest uppercase -mt-1 font-semibold ${
              isLightGrid ? 'text-[#475569]' : 'text-slate-400'
            }`}>
              Clean Energy Trading
            </span>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className={`hidden md:flex items-center gap-7 text-sm font-medium transition-colors ${
          isLightGrid ? 'text-[#475569]' : 'text-slate-300'
        }`}>
          <Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link>
          <Link to="/marketplace" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
            <span>Marketplace</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </Link>
          {isAuthenticated && role === 'seller' && (
            <Link to="/seller/dashboard" className="hover:text-emerald-500 transition-colors">Seller Hub</Link>
          )}
          {isAuthenticated && role === 'buyer' && (
            <Link to="/buyer/dashboard" className="hover:text-emerald-500 transition-colors">Buyer Hub</Link>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin/dashboard" className="hover:text-emerald-500 transition-colors">Admin Panel</Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/notifications"
                className={`p-2 rounded-xl transition relative ${
                  isLightGrid ? 'text-[#475569] hover:text-[#12372A] hover:bg-[#ECFDF3]' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs transition ${
                  isLightGrid 
                    ? 'bg-white border-[#DDE8E1] text-[#12372A] hover:border-emerald-500' 
                    : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:border-emerald-500/40'
                }`}
              >
                <User className="w-4 h-4 text-emerald-500" />
                <span className="capitalize font-medium">{user?.name || role || 'Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-500/10 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition ${
                  isLightGrid ? 'text-[#475569] hover:text-[#12372A] hover:bg-[#ECFDF3]' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98]"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
