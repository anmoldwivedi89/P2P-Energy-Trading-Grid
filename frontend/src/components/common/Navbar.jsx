import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Zap, LogIn, UserPlus, LogOut, Bell, User, Sun } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const isLightGrid = themeMode === 'light-grid';
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`sticky top-0 z-50 w-full transition-all duration-500 flex justify-center ${
      scrolled ? 'pt-3 sm:pt-4 px-4 sm:px-6' : 'pt-0 px-0'
    }`}>
      <header className={`transition-all duration-500 flex items-center justify-between ${
        scrolled
          ? `w-full max-w-5xl rounded-full px-5 sm:px-7 py-2.5 backdrop-blur-2xl ${
              isLightGrid
                ? 'bg-[#EEF2F6]/95 border border-white/80 shadow-[8px_8px_20px_#c8d3e2,-8px_-8px_20px_#ffffff] text-[#12372A]'
                : 'bg-[#060913]/90 border border-white/15 ring-1 ring-emerald-500/20 shadow-emerald-950/40 text-slate-100'
            }`
          : `w-full px-4 sm:px-6 lg:px-8 py-3.5 backdrop-blur-xl ${
              isLightGrid
                ? 'bg-[#EEF2F6]/85 border-b border-[#D1D9E6]/60 shadow-[0_4px_16px_rgba(209,217,230,0.3)] text-[#12372A]'
                : 'bg-[#060913]/85 border-b border-white/10 text-slate-100'
            }`
      }`}>
        {/* Brand Logo & Interactive Theme Switcher Icon */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${isLightGrid ? 'Dark Mesh Gradient' : 'Neumorphic Light'} theme`}
            className={`p-2 rounded-full transition-all duration-300 cursor-pointer group active:scale-95 ${
              isLightGrid 
                ? 'bg-[#EEF2F6] border border-white/90 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] active:shadow-[inset_3px_3px_6px_#c8d3e2,inset_-3px_-3px_6px_#ffffff] text-[#16A34A]' 
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <Link to="/" className="flex flex-col group">
            <span className={`font-display font-bold text-base sm:text-lg tracking-tight transition-colors ${
              isLightGrid ? 'text-[#12372A]' : 'text-white'
            }`}>
              Grid<span className="text-emerald-500">P2P</span>
            </span>
            <span className={`text-[8.5px] font-mono tracking-widest uppercase -mt-1 font-semibold ${
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
                className={`p-2 rounded-full transition relative ${
                  isLightGrid 
                    ? 'bg-[#EEF2F6] shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#475569] hover:text-[#12372A]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs transition ${
                  isLightGrid 
                    ? 'bg-[#EEF2F6] border border-white/80 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A] hover:text-[#16A34A]' 
                    : 'bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:border-emerald-500/40'
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-500" />
                <span className="capitalize font-medium">{user?.name || role || 'Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-full transition ${
                  isLightGrid 
                    ? 'bg-[#EEF2F6] shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#475569] hover:text-rose-500' 
                    : 'text-slate-400 hover:text-rose-500 hover:bg-rose-500/10'
                }`}
                title="Logout"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Link
                to="/login"
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-full transition ${
                  isLightGrid 
                    ? 'bg-[#EEF2F6] border border-white/80 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A] hover:text-[#16A34A]' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className={`flex items-center gap-1.5 px-4 sm:px-4.5 py-1.5 sm:py-2 text-xs font-bold rounded-full transition-all active:scale-[0.98] ${
                  isLightGrid
                    ? 'bg-[#16A34A] text-white shadow-[4px_4px_12px_rgba(22,163,74,0.35),-2px_-2px_8px_#ffffff] hover:bg-[#15803D]'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;


