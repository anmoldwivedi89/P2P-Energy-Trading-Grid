import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';
import {
  TopbarCalendarIcon,
  TopbarChevronIcon,
} from './icons';
import { useDashboardNavigation } from './navigation';
import { dashboardPeriods } from './shared';
import { Menu, Sun, Moon, User as UserIcon, Shield, ChevronDown, LogOut, Settings, LayoutDashboard, ShoppingCart, Bell, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

export function DashboardTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { period, setPeriod, toggleMobileSidebar } = useDashboardNavigation();
  const { themeMode, syncThemeToMode } = useTheme();
  const { user, role, logout } = useAuth();

  const isDark = themeMode === 'dark';

  const { ref: themeBtnRef, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 1400,
    easing: 'ease-in-out',
    globalClassName: 'dark',
    isDarkMode: isDark,
    onDarkModeChange: (nextIsDark) => {
      syncThemeToMode(nextIsDark ? 'dark' : 'light-grid');
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Close dropdowns on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const normalizedRole = (role || user?.role || '').toLowerCase();
  const isAdmin = normalizedRole === USER_ROLES.ADMIN;
  const isSeller = normalizedRole === USER_ROLES.SELLER;

  const getPageTitle = (pathname) => {
    if (pathname.includes('/buyer/dashboard')) return 'Buyer Energy Overview';
    if (pathname.includes('/buyer/orders')) return 'Purchased Energy Orders';
    if (pathname.includes('/buyer/transactions')) return 'Settlement & Ledger History';
    if (pathname.includes('/seller/dashboard')) return 'Prosumer Energy Overview';
    if (pathname.includes('/seller/create-listing')) return 'Create Energy Listing';
    if (pathname.includes('/seller/listings')) return 'My Energy Listings';
    if (pathname.includes('/seller/orders')) return 'Energy Sales & Dispatches';
    if (pathname.includes('/admin/dashboard')) return 'Grid Telemetry & Administration';
    if (pathname.includes('/admin/users')) return 'Grid Participants & Edge Nodes';
    if (pathname.includes('/admin/listings')) return 'All Marketplace Listings';
    if (pathname.includes('/admin/transactions')) return 'Consolidated Grid Ledger';
    if (pathname.includes('/profile')) return 'Participant Profile';
    if (pathname.includes('/notifications')) return 'System Notifications';
    return 'Energy Dashboard';
  };

  const title = getPageTitle(location.pathname);
  const selectedPeriod = dashboardPeriods.find((p) => p.value === period) || dashboardPeriods[2];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      navigate('/login');
    }
  };

  const roleBadgeConfig = isAdmin
    ? { label: 'ADMIN', color: 'bg-[#DAA520]/15 text-[#DAA520] border-[#DAA520]/30' }
    : isSeller
    ? { label: 'SELLER', color: 'bg-[#FF6F61]/15 text-[#FF6F61] border-[#FF6F61]/30' }
    : { label: 'BUYER', color: 'bg-[#DAA520]/15 text-[#DAA520] border-[#DAA520]/30' };

  return (
    <header className="flex shrink-0 flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8 border-b border-border bg-background transition-colors duration-200 relative z-40">
      {/* Left: Mobile Trigger + Title + Subtitle */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="md:hidden size-9 shrink-0 flex items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-2xs hover:bg-muted"
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="truncate font-sans text-base sm:text-lg font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <span className={`hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border uppercase ${roleBadgeConfig.color}`}>
              {roleBadgeConfig.label}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 font-sans text-xs text-foreground md:gap-2">
            <span className="whitespace-nowrap text-muted-foreground text-[11px]">
              Node Sync: <span className="text-emerald-600 dark:text-[#DAA520] font-medium">Realtime Active</span>
            </span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span className="shrink-0 font-medium text-muted-foreground text-[11px]">
              All values in <span className="font-semibold text-foreground">₹ INR</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Telemetry Period, Theme & Authenticated User Identity */}
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0 justify-end">
        {/* Calendar / Period Group */}
        <div className="relative flex items-center">
          <div className="flex h-9 min-w-0 items-center gap-2 rounded-l-xl border border-r-0 border-border bg-card px-2.5 sm:px-3 text-xs text-muted-foreground shadow-2xs">
            <TopbarCalendarIcon className="size-3.5 shrink-0 text-[#DAA520]" />
            <span className="truncate hidden sm:inline text-xs">Period:</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-9 shrink-0 inline-flex items-center gap-2 rounded-r-xl border border-border bg-card px-3 text-xs font-medium text-foreground hover:bg-muted/70 shadow-2xs cursor-pointer"
            >
              <span>{selectedPeriod.label}</span>
              <TopbarChevronIcon className="size-2.5 text-muted-foreground rotate-180" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-40 rounded-2xl border border-[#DCD6CB] dark:border-[#383430] bg-[#EAE6DE] dark:bg-[#242424] p-1.5 text-xs text-[#292824] dark:text-[#F5E8D8] shadow-[6px_6px_16px_rgba(186,178,166,0.45),-6px_-6px_16px_rgba(255,255,255,0.9)] dark:shadow-2xl dark:shadow-black/70 z-50 animate-in fade-in-50 zoom-in-95">
                  {dashboardPeriods.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => {
                        setPeriod(p.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        period === p.value
                          ? 'bg-[#FF6F61]/15 text-[#FF6F61] font-semibold'
                          : 'hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/10 text-[#292824] dark:text-[#F5E8D8] hover:text-[#FF6F61] dark:hover:text-[#FF4500]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notifications Button & Dropdown Panel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="h-9 px-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors shadow-2xs cursor-pointer relative"
            title="Notifications & Grid Alerts"
            aria-label="Toggle notifications panel"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-[#DAA520] rounded-full animate-pulse" />
          </button>

          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#DCD6CB] dark:border-[#383430] bg-[#EAE6DE] dark:bg-[#242424] p-3.5 text-xs text-[#292824] dark:text-[#F5E8D8] shadow-[8px_8px_24px_rgba(186,178,166,0.45),-8px_-8px_24px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-50 animate-in fade-in-50 zoom-in-95 space-y-2.5">
                {/* Header */}
                <div className="flex items-center justify-between px-1 pt-0.5">
                  <span className="font-bold text-sm text-[#292824] dark:text-[#F5E8D8]">Notifications</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DAA520]/15 border border-[#DAA520]/30 text-[#DAA520]">
                    3 Unread
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-[#F0E8DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#EAE6DE] dark:bg-[#2A2A2A] text-[#6B8F71] dark:text-[#6B8F71] shrink-0 mt-0.5">
                      <Zap className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-[#292824] dark:text-[#F5E8D8]">Energy Order Fulfilled</div>
                      <p className="text-[11px] text-[#77736B] dark:text-[#B5A898] leading-tight mt-0.5">25 kWh solar transfer to Bob Residential verified.</p>
                      <span className="text-[10px] text-[#77736B] dark:text-[#B5A898] font-mono mt-1 block">Just now</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F0E8DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#EAE6DE] dark:bg-[#2A2A2A] text-[#DAA520] shrink-0 mt-0.5">
                      <Bell className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-[#292824] dark:text-[#F5E8D8]">AI Price Surge Alert</div>
                      <p className="text-[11px] text-[#77736B] dark:text-[#B5A898] leading-tight mt-0.5">Peak demand at 18:00. Recommended: ₹14.50/kWh.</p>
                      <span className="text-[10px] text-[#77736B] dark:text-[#B5A898] font-mono mt-1 block">1 hr ago</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F0E8DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#EAE6DE] dark:bg-[#2A2A2A] text-[#FF6F61] shrink-0 mt-0.5">
                      <Shield className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-[#292824] dark:text-[#F5E8D8]">Smart Contract Settled</div>
                      <p className="text-[11px] text-[#77736B] dark:text-[#B5A898] leading-tight mt-0.5">Transaction TXN-98401 settled via escrow simulation.</p>
                      <span className="text-[10px] text-[#77736B] dark:text-[#B5A898] font-mono mt-1 block">2 hrs ago</span>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-1 border-t border-[#DCD6CB] dark:border-[#383430]">
                  <Link
                    to="/notifications"
                    onClick={() => setNotificationsOpen(false)}
                    className="w-full flex items-center justify-center py-2 rounded-xl text-xs font-semibold bg-[#EAE6DE] dark:bg-[#2A2A2A] border border-[#DCD6CB] dark:border-[#383430] hover:bg-[#F0E8DE] dark:hover:bg-[#333333] text-[#FF6F61] dark:text-[#DAA520] hover:text-[#E85D50] dark:hover:text-[#FF4500] transition"
                  >
                    View All Grid Alerts →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          ref={themeBtnRef}
          type="button"
          onClick={toggleSwitchTheme}
          className="h-9 px-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Warm Dark'} Mode`}
          aria-label="Toggle theme mode"
        >
          {themeMode === 'dark' ? <Sun className="size-4 text-[#DAA520] hover:text-[#FF4500]" /> : <Moon className="size-4 text-[#77736B] hover:text-[#FF6F61]" />}
        </button>

        {/* ========================================================================= */}
        {/* AUTHENTICATED USER IDENTITY PILL & PROFILE DROPDOWN                       */}
        {/* Displays: Name, Email, Role Badge, Avatar & Solid Opaque Dropdown Menu    */}
        {/* ========================================================================= */}
        <div className="relative ml-1">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-9 pl-1.5 pr-2.5 rounded-xl border border-border bg-card hover:bg-muted/80 text-foreground flex items-center gap-2 transition-all shadow-2xs cursor-pointer hover:border-[#FF6F61]/40"
          >
            {/* Avatar with role color indicator */}
            <div className={`size-6 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase shrink-0 ${
              isAdmin
                ? 'bg-[#DAA520]/20 text-[#DAA520] border border-[#DAA520]/40'
                : isSeller
                ? 'bg-[#FF6F61]/20 text-[#FF6F61] border border-[#FF6F61]/40'
                : 'bg-[#DAA520]/20 text-[#DAA520] border border-[#DAA520]/40'
            }`}>
              {user?.name ? user.name.slice(0, 2) : <UserIcon className="size-3" />}
            </div>

            {/* User Name & Role Pill */}
            <div className="hidden sm:flex flex-col text-left leading-tight min-w-0 max-w-[120px]">
              <span className="truncate text-xs font-semibold text-foreground">
                {user?.name || 'Grid Participant'}
              </span>
              <span className="truncate text-[10px] text-muted-foreground font-mono">
                {roleBadgeConfig.label}
              </span>
            </div>

            <ChevronDown className="size-3 text-muted-foreground shrink-0" />
          </button>

          {/* Profile Dropdown Menu with Solid Opaque Background */}
          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#DCD6CB] dark:border-[#383430] bg-[#EAE6DE] dark:bg-[#242424] p-3 text-xs text-[#292824] dark:text-[#F5E8D8] shadow-[8px_8px_24px_rgba(186,178,166,0.45),-8px_-8px_24px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-50 animate-in fade-in-50 zoom-in-95">
                {/* User Info Header */}
                <div className="p-3.5 rounded-xl bg-[#F0E8DE] dark:bg-[#1C1C1C] border border-[#DCD6CB] dark:border-[#383430] mb-2.5 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#292824] dark:text-[#F5E8D8] truncate">
                      {user?.name || 'Grid Participant'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase shrink-0 ${roleBadgeConfig.color}`}>
                      {roleBadgeConfig.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#77736B] dark:text-[#B5A898] truncate font-mono">
                    {user?.email || 'user@gridp2p.io'}
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1 py-1">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#292824] dark:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/15 hover:text-[#FF6F61] dark:hover:text-[#FF4500] transition-colors"
                  >
                    <UserIcon className="size-4 text-[#DAA520] shrink-0" />
                    <span>My Profile & Settings</span>
                  </Link>

                  <Link
                    to="/notifications"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#292824] dark:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/15 hover:text-[#FF6F61] dark:hover:text-[#FF4500] transition-colors"
                  >
                    <Bell className="size-4 text-[#DAA520] shrink-0" />
                    <span>Notifications & Alerts</span>
                  </Link>

                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#292824] dark:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/15 hover:text-[#FF6F61] dark:hover:text-[#FF4500] transition-colors"
                    >
                      <Shield className="size-4 text-[#DAA520] shrink-0" />
                      <span>Grid Administration Hub</span>
                    </Link>
                  ) : isSeller ? (
                    <Link
                      to="/seller/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#292824] dark:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/15 hover:text-[#FF6F61] dark:hover:text-[#FF4500] transition-colors"
                    >
                      <LayoutDashboard className="size-4 text-[#FF6F61] shrink-0" />
                      <span>Prosumer Overview</span>
                    </Link>
                  ) : (
                    <Link
                      to="/buyer/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#292824] dark:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/15 hover:text-[#FF6F61] dark:hover:text-[#FF4500] transition-colors"
                    >
                      <LayoutDashboard className="size-4 text-[#FF6F61] shrink-0" />
                      <span>Buyer Overview</span>
                    </Link>
                  )}

                  <Link
                    to="/marketplace"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#292824] dark:text-[#F5E8D8] hover:bg-[#F0E8DE] dark:hover:bg-[#FF6F61]/15 hover:text-[#FF6F61] dark:hover:text-[#FF4500] transition-colors"
                  >
                    <ShoppingCart className="size-4 text-[#DAA520] shrink-0" />
                    <span>Energy Marketplace</span>
                  </Link>
                </div>

                {/* Divider & Sign Out */}
                <div className="pt-2 border-t border-[#DCD6CB] dark:border-[#383430] mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 hover:text-[#FF4500] transition-colors cursor-pointer"
                  >
                    <LogOut className="size-4 shrink-0" />
                    <span>Disconnect / Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardTopbar;
