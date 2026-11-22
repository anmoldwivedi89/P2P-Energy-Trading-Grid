import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Zap, LogOut, Bell, User, Sun, Menu, X, ShoppingBag, LayoutDashboard, ShieldCheck, Home } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const { themeMode, syncThemeToMode } = useTheme();
  const isLightGrid = themeMode === 'light-grid';
  const isDark = themeMode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  const { ref: navThemeBtnRef, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 1100,
    easing: 'ease-in-out',
    globalClassName: 'dark',
    isDarkMode: isDark,
    onDarkModeChange: (nextIsDark) => {
      syncThemeToMode(nextIsDark ? 'dark' : 'light-grid');
    },
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 25;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col items-center pointer-events-none px-3.5 sm:px-6 lg:px-8">
      <motion.header
        initial={false}
        animate={{
          width: scrolled ? '94%' : '100%',
          maxWidth: scrolled ? 1040 : 1240,
          borderRadius: scrolled ? 50 : 14,
          marginTop: scrolled ? 14 : 10,
          paddingTop: scrolled ? 10 : 12,
          paddingBottom: scrolled ? 10 : 12,
          paddingLeft: scrolled ? 20 : 26,
          paddingRight: scrolled ? 20 : 26,
          boxShadow: scrolled
            ? isLightGrid
              ? '0 12px 30px -4px rgba(186, 178, 166, 0.55), 0 4px 10px rgba(186, 178, 166, 0.3)'
              : '0 16px 36px -4px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)'
            : isLightGrid
              ? '0 2px 8px rgba(186, 178, 166, 0.35)'
              : '0 2px 8px rgba(0, 0, 0, 0.25)',
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`pointer-events-auto flex items-center justify-between backdrop-blur-2xl border transition-[color,background-color,border-color] duration-300 ${isLightGrid
          ? 'bg-[#EAE6DE]/92 border-[#DCD6CB] text-[#292824]'
          : 'bg-[#1C1C1C]/90 border-[#383430] text-[#F5E8D8]'
          }`}
      >
        {/* Brand Logo & Interactive Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            ref={navThemeBtnRef}
            type="button"
            onClick={toggleSwitchTheme}
            title={`Switch to ${isLightGrid ? 'Custom Warm Dark' : 'Neumorphic Light'} theme`}
            aria-label="Toggle theme mode"
            className={`p-2 rounded-full transition-all duration-300 cursor-pointer group active:scale-95 ${isLightGrid
              ? 'bg-[#EAE6DE] border border-[#DCD6CB] shadow-[3px_3px_8px_rgba(186,178,166,0.4),-3px_-3px_8px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(186,178,166,0.4)] text-[#FF6F61]'
              : 'bg-[#2A2A2A] border border-[#383430] text-[#DAA520] hover:border-[#DAA520] hover:text-[#FF4500]'
              }`}
          >
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <Link to="/" className="flex flex-col group">
            <span className={`font-semibold text-lg sm:text-xl transition-colors ${
              isLightGrid ? 'text-[#292824]' : 'text-[#F5E8D8]'
            }`}>
              Grid<span className={isLightGrid ? 'text-[#6B8F71]' : 'text-[#DAA520]'}>P2P</span>
            </span>
            <span className={`text-[10px] sm:text-[11px] -mt-0.5 ${
              isLightGrid ? 'text-[#77736B]' : 'text-[#B5A898]'
            }`}>
              Clean Energy Trading
            </span>
          </Link>
        </div>

        {/* Desktop Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] sm:text-base font-semibold">
          <Link
            to="/"
            className={`relative group py-1 transition-colors duration-200 ${isLightGrid ? 'text-[#292824] hover:text-[#FF6F61]' : 'text-[#F5E8D8] hover:text-[#FF6F61]'
              }`}
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6F61] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
          <Link
            to="/marketplace"
            className={`relative group py-1 flex items-center gap-1.5 transition-colors duration-200 ${isLightGrid ? 'text-[#292824] hover:text-[#FF6F61]' : 'text-[#F5E8D8] hover:text-[#FF6F61]'
              }`}
          >
            <span>Marketplace</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DAA520] animate-pulse"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6F61] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
          {isAuthenticated && (role || user?.role || '').toLowerCase() === 'seller' && (
            <Link
              to="/seller/dashboard"
              className={`relative group py-1 transition-colors duration-200 ${isLightGrid ? 'text-[#292824] hover:text-[#FF6F61]' : 'text-[#F5E8D8] hover:text-[#FF6F61]'
                }`}
            >
              <span>Seller Hub</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6F61] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          )}
          {isAuthenticated && (role || user?.role || '').toLowerCase() === 'buyer' && (
            <Link
              to="/buyer/dashboard"
              className={`relative group py-1 transition-colors duration-200 ${isLightGrid ? 'text-[#292824] hover:text-[#FF6F61]' : 'text-[#F5E8D8] hover:text-[#FF6F61]'
                }`}
            >
              <span>Buyer Hub</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6F61] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          )}
          {isAuthenticated && (role || user?.role || '').toLowerCase() === 'admin' && (
            <Link
              to="/admin/dashboard"
              className={`relative group py-1 transition-colors duration-200 ${isLightGrid ? 'text-[#292824] hover:text-[#FF6F61]' : 'text-[#F5E8D8] hover:text-[#FF6F61]'
                }`}
            >
              <span>Admin Panel</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6F61] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          )}
        </nav>

        {/* Right Desktop Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <Link
                to="/notifications"
                className={`p-2 rounded-full transition relative ${isLightGrid
                  ? 'bg-[#EAE6DE] border border-[#DCD6CB] shadow-[3px_3px_7px_rgba(186,178,166,0.4),-3px_-3px_7px_rgba(255,255,255,0.9)] text-[#77736B] hover:text-[#292824]'
                  : 'text-[#B5A898] hover:text-[#F5E8D8] hover:bg-[#2A2A2A]'
                  }`}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DAA520] rounded-full"></span>
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${isLightGrid
                  ? 'bg-[#EAE6DE] border border-[#DCD6CB] shadow-[3px_3px_8px_rgba(186,178,166,0.38),-3px_-3px_8px_rgba(255,255,255,0.9)] text-[#292824] hover:text-[#FF6F61]'
                  : 'bg-[#242424] border border-[#383430] text-[#F5E8D8] hover:border-[#DAA520]'
                  }`}
              >
                <User className="w-3.5 h-3.5 text-[#DAA520]" />
                <span className="capitalize">{user?.name || role || 'Account'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-full transition ${isLightGrid
                  ? 'bg-[#EAE6DE] border border-[#DCD6CB] shadow-[2px_2px_6px_rgba(186,178,166,0.35),-2px_-2px_6px_rgba(255,255,255,0.85)] text-[#77736B] hover:text-rose-500'
                  : 'text-[#B5A898] hover:text-[#FF4500] hover:bg-rose-500/10'
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
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${isLightGrid
                  ? 'bg-[#EAE6DE] border border-[#DCD6CB] shadow-[3px_3px_8px_rgba(186,178,166,0.4),-3px_-3px_8px_rgba(255,255,255,0.9)] text-[#292824] hover:text-[#FF6F61] active:shadow-[inset_2px_2px_4px_rgba(186,178,166,0.4)]'
                  : 'text-[#F5E8D8] hover:text-[#FF6F61] hover:bg-[#2A2A2A]'
                  }`}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className={`inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 active:scale-[0.98] ${isLightGrid
                  ? 'bg-[#FF6F61] hover:bg-[#E85D50] text-white shadow-[4px_4px_12px_rgba(232,93,80,0.35),-3px_-3px_8px_rgba(255,255,255,0.7)]'
                  : 'bg-[#FF6F61] hover:bg-[#FF4500] text-white font-semibold shadow-[0_4px_16px_rgba(255,111,97,0.35)]'
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
            className={`md:hidden p-2 rounded-xl transition-all cursor-pointer ${isLightGrid
              ? 'bg-[#EAE6DE] border border-[#DCD6CB] shadow-[3px_3px_7px_rgba(186,178,166,0.4),-3px_-3px_7px_rgba(255,255,255,0.9)] text-[#292824] active:shadow-[inset_2px_2px_4px_rgba(186,178,166,0.4)]'
              : 'bg-[#2A2A2A] border border-[#383430] text-[#F5E8D8] hover:text-[#FF6F61] active:bg-[#333333]'
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
            className={`w-full max-w-md pointer-events-auto mt-2 p-5 rounded-3xl backdrop-blur-2xl border transition-all md:hidden ${isLightGrid
              ? 'bg-[#EAE6DE]/98 border-[#DCD6CB] shadow-[12px_12px_28px_rgba(186,178,166,0.5),-12px_-12px_28px_rgba(255,255,255,0.95)] text-[#292824]'
              : 'bg-[#1C1C1C]/98 border-[#383430] shadow-2xl shadow-black/80 text-[#F5E8D8]'
              }`}
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${isLightGrid
                  ? 'hover:bg-white/70 hover:shadow-sm text-[#292824]'
                  : 'hover:bg-[#2A2A2A] text-[#F5E8D8]'
                  }`}
              >
                <Home className="w-4.5 h-4.5 text-[#6B8F71] dark:text-[#4ADE80]" />
                <span>Home</span>
              </Link>

              <Link
                to="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-2xl text-base font-semibold transition ${isLightGrid
                  ? 'hover:bg-white/70 hover:shadow-sm text-[#292824]'
                  : 'hover:bg-[#2A2A2A] text-[#F5E8D8]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4.5 h-4.5 text-[#DAA520]" />
                  <span>Marketplace</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#DAA520] animate-pulse"></span>
              </Link>

              {isAuthenticated && (role || user?.role || '').toLowerCase() === 'seller' && (
                <Link
                  to="/seller/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${isLightGrid
                    ? 'hover:bg-white/70 hover:shadow-sm text-[#292824]'
                    : 'hover:bg-[#2A2A2A] text-[#F5E8D8]'
                    }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5 text-[#FF6F61]" />
                  <span>Seller Hub</span>
                </Link>
              )}

              {isAuthenticated && (role || user?.role || '').toLowerCase() === 'buyer' && (
                <Link
                  to="/buyer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${isLightGrid
                    ? 'hover:bg-white/70 hover:shadow-sm text-[#292824]'
                    : 'hover:bg-[#2A2A2A] text-[#F5E8D8]'
                    }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5 text-[#FF6F61]" />
                  <span>Buyer Hub</span>
                </Link>
              )}

              {isAuthenticated && (role || user?.role || '').toLowerCase() === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-base font-semibold transition ${isLightGrid
                    ? 'hover:bg-white/70 hover:shadow-sm text-[#292824]'
                    : 'hover:bg-[#2A2A2A] text-[#F5E8D8]'
                    }`}
                >
                  <ShieldCheck className="w-4.5 h-4.5 text-[#DAA520]" />
                  <span>Admin Panel</span>
                </Link>
              )}

              <div className={`h-[1px] my-1 ${isLightGrid ? 'bg-[#DCD6CB]' : 'bg-[#383430]'}`} />

              {isAuthenticated ? (
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between px-3 py-1 text-xs">
                    <span className={isLightGrid ? 'text-[#77736B]' : 'text-[#B5A898]'}>Signed in as</span>
                    <span className="font-semibold text-[#FF6F61] dark:text-[#DAA520] capitalize">{user?.name || role}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm font-semibold ${isLightGrid
                        ? 'bg-[#EAE6DE] border border-white/80 shadow-[3px_3px_8px_rgba(186,178,166,0.38),-3px_-3px_8px_rgba(255,255,255,0.9)] text-[#292824]'
                        : 'bg-[#242424] border border-[#383430] text-[#F5E8D8]'
                        }`}
                    >
                      <User className="w-4 h-4 text-[#DAA520]" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm font-semibold text-rose-500 ${isLightGrid
                        ? 'bg-[#EAE6DE] border border-white/80 shadow-[3px_3px_8px_rgba(186,178,166,0.38),-3px_-3px_8px_rgba(255,255,255,0.9)]'
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
                    className={`flex items-center justify-center p-3 rounded-2xl text-sm font-semibold transition text-center ${isLightGrid
                      ? 'bg-[#EAE6DE] border border-white/80 shadow-[3px_3px_8px_rgba(186,178,166,0.38),-3px_-3px_8px_rgba(255,255,255,0.9)] text-[#292824]'
                      : 'bg-[#242424] border border-[#383430] text-[#F5E8D8]'
                      }`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center gap-1.5 p-3 rounded-2xl text-sm font-semibold text-white transition-all text-center ${isLightGrid
                      ? 'bg-[#FF6F61] shadow-[4px_4px_12px_rgba(255,111,97,0.35)]'
                      : 'bg-[#FF6F61] hover:bg-[#FF4500] shadow-md shadow-[#FF6F61]/30'
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
