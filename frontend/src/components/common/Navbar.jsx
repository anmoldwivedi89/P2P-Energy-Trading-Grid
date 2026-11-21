import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Zap, LogOut, Bell, User, Sun, Menu, X, ShoppingBag, LayoutDashboard, ShieldCheck, Home } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const isLightGrid = themeMode === 'light-grid';
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col items-center pointer-events-none px-3 sm:px-6">
      <motion.header
        layout
        initial={false}
        animate={{
          maxWidth: scrolled ? '1020px' : '100%',
          borderRadius: scrolled ? '9999px' : '0px',
          marginTop: scrolled ? 14 : 0,
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
          paddingLeft: scrolled ? 20 : 24,
          paddingRight: scrolled ? 20 : 24,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }}
        className={`w-full pointer-events-auto flex items-center justify-between backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? isLightGrid
              ? 'bg-[#EEF2F6]/95 border border-white/90 shadow-[8px_8px_20px_#c8d3e2,-8px_-8px_20px_#ffffff] text-[#12372A]'
              : 'bg-[#060913]/90 border border-white/15 ring-1 ring-emerald-500/20 shadow-2xl shadow-emerald-950/40 text-slate-100'
            : isLightGrid
              ? 'bg-[#EEF2F6]/85 border-b border-[#D1D9E6]/60 shadow-[0_4px_16px_rgba(209,217,230,0.3)] text-[#12372A]'
              : 'bg-[#060913]/85 border-b border-white/10 text-slate-100'
        }`}
      >
        {/* Brand Logo & Interactive Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
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
            <span className={`font-semibold text-lg sm:text-xl transition-colors ${
              isLightGrid ? 'text-[#12372A]' : 'text-white'
            }`}>
              Grid<span className="text-emerald-500">P2P</span>
            </span>
            <span className={`text-[10px] sm:text-[11px] -mt-0.5 ${
              isLightGrid ? 'text-[#64748B]' : 'text-slate-400'
            }`}>
              Clean Energy Trading
            </span>
          </Link>
        </div>

        {/* Desktop Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] sm:text-base font-semibold">
          <Link
            to="/"
            className={`relative group py-1 transition-colors duration-200 ${
              isLightGrid ? 'text-[#1E293B] hover:text-[#16A34A]' : 'text-slate-200 hover:text-emerald-400'
            }`}
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
          <Link
            to="/marketplace"
            className={`relative group py-1 flex items-center gap-1.5 transition-colors duration-200 ${
              isLightGrid ? 'text-[#1E293B] hover:text-[#16A34A]' : 'text-slate-200 hover:text-emerald-400'
            }`}
          >
            <span>Marketplace</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
          {isAuthenticated && (role || user?.role || '').toLowerCase() === 'seller' && (
            <Link
              to="/seller/dashboard"
              className={`relative group py-1 transition-colors duration-200 ${
                isLightGrid ? 'text-[#1E293B] hover:text-[#16A34A]' : 'text-slate-200 hover:text-emerald-400'
              }`}
            >
              <span>Seller Hub</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          )}
          {isAuthenticated && (role || user?.role || '').toLowerCase() === 'buyer' && (
            <Link
              to="/buyer/dashboard"
              className={`relative group py-1 transition-colors duration-200 ${
                isLightGrid ? 'text-[#1E293B] hover:text-[#16A34A]' : 'text-slate-200 hover:text-emerald-400'
              }`}
            >
              <span>Buyer Hub</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          )}
          {isAuthenticated && (role || user?.role || '').toLowerCase() === 'admin' && (
            <Link
              to="/admin/dashboard"
              className={`relative group py-1 transition-colors duration-200 ${
                isLightGrid ? 'text-[#1E293B] hover:text-[#16A34A]' : 'text-slate-200 hover:text-emerald-400'
              }`}
            >
              <span>Admin Panel</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          )}
        </nav>

        {/* Right Desktop Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
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
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                  isLightGrid 
                    ? 'bg-[#EEF2F6] border border-white/80 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A] hover:text-[#16A34A]' 
                    : 'bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:border-emerald-500/40'
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-500" />
                <span className="capitalize">{user?.name || role || 'Account'}</span>
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
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                to="/login"
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isLightGrid 
                    ? 'bg-[#EEF2F6] border border-white/90 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A] hover:text-[#16A34A] active:shadow-[inset_2px_2px_4px_#c8d3e2,inset_-2px_-2px_4px_#ffffff]' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className={`inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 active:scale-[0.98] ${
                  isLightGrid
                    ? 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_4px_14px_rgba(22,163,74,0.3)] hover:shadow-[0_6px_18px_rgba(22,163,74,0.4)]'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-[0_4px_16px_rgba(16,185,129,0.35)]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all cursor-pointer ${
              isLightGrid
                ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#12372A] active:shadow-[inset_2px_2px_4px_#c8d3e2,inset_-2px_-2px_4px_#ffffff]'
                : 'bg-white/5 border border-white/10 text-slate-200 hover:text-white active:bg-white/10'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`w-full max-w-md pointer-events-auto mt-2 p-5 rounded-3xl backdrop-blur-2xl border transition-all md:hidden ${
              isLightGrid
                ? 'bg-[#EEF2F6]/98 border-white shadow-[12px_12px_28px_#c8d3e2,-12px_-12px_28px_#ffffff] text-[#12372A]'
                : 'bg-[#060913]/98 border-white/15 shadow-2xl shadow-black/80 text-slate-100'
            }`}
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${
                  isLightGrid
                    ? 'hover:bg-white/70 hover:shadow-sm text-[#12372A]'
                    : 'hover:bg-white/5 text-slate-200'
                }`}
              >
                <Home className="w-4.5 h-4.5 text-emerald-500" />
                <span>Home</span>
              </Link>

              <Link
                to="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-2xl text-base font-semibold transition ${
                  isLightGrid
                    ? 'hover:bg-white/70 hover:shadow-sm text-[#12372A]'
                    : 'hover:bg-white/5 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Marketplace</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </Link>

              {isAuthenticated && (role || user?.role || '').toLowerCase() === 'seller' && (
                <Link
                  to="/seller/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${
                    isLightGrid
                      ? 'hover:bg-white/70 hover:shadow-sm text-[#12372A]'
                      : 'hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Seller Hub</span>
                </Link>
              )}

              {isAuthenticated && (role || user?.role || '').toLowerCase() === 'buyer' && (
                <Link
                  to="/buyer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${
                    isLightGrid
                      ? 'hover:bg-white/70 hover:shadow-sm text-[#12372A]'
                      : 'hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Buyer Hub</span>
                </Link>
              )}

              {isAuthenticated && (role || user?.role || '').toLowerCase() === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${
                    isLightGrid
                      ? 'hover:bg-white/70 hover:shadow-sm text-[#12372A]'
                      : 'hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Admin Panel</span>
                </Link>
              )}

              <div className={`h-[1px] my-1 ${isLightGrid ? 'bg-slate-200' : 'bg-white/10'}`} />

              {isAuthenticated ? (
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between px-3 py-1 text-xs">
                    <span className={isLightGrid ? 'text-[#64748B]' : 'text-slate-400'}>Signed in as</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">{user?.name || role}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm font-semibold ${
                        isLightGrid
                          ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff] text-[#12372A]'
                          : 'bg-white/5 border border-white/10 text-slate-200'
                      }`}
                    >
                      <User className="w-4 h-4 text-emerald-500" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm font-semibold text-rose-500 ${
                        isLightGrid
                          ? 'bg-[#EEF2F6] border border-white/90 shadow-[3px_3px_8px_#c8d3e2,-3px_-3px_8px_#ffffff]'
                          : 'bg-rose-500/10 border border-rose-500/20'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center p-3 rounded-2xl text-sm font-semibold transition text-center ${
                      isLightGrid
                        ? 'bg-[#EEF2F6] border border-white/90 shadow-[4px_4px_10px_#c8d3e2,-4px_-4px_10px_#ffffff] text-[#12372A]'
                        : 'bg-white/5 border border-white/10 text-slate-200'
                    }`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center gap-1.5 p-3 rounded-2xl text-sm font-semibold text-white transition-all text-center ${
                      isLightGrid
                        ? 'bg-[#16A34A] shadow-[4px_4px_12px_rgba(22,163,74,0.35)]'
                        : 'bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/30'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
