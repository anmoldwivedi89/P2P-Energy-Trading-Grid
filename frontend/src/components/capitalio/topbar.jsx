import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  TopbarCalendarIcon,
  TopbarChevronIcon,
} from './icons';
import { useDashboardNavigation } from './navigation';
import { dashboardPeriods } from './shared';
import { Menu, Sun, Moon, User as UserIcon, Shield, ChevronDown, LogOut, Settings, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

export function DashboardTopbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { period, setPeriod, toggleMobileSidebar } = useDashboardNavigation();
  const { themeMode, toggleTheme } = useTheme();
  const { user, role, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
    ? { label: 'ADMIN', color: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30' }
    : isSeller
    ? { label: 'SELLER', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' }
    : { label: 'BUYER', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };

  return (
    <header className="flex shrink-0 flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8 border-b border-border bg-background transition-colors duration-200">
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
              Node Sync: <span className="text-emerald-600 dark:text-emerald-400 font-medium">Realtime Active</span>
            </span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span className="shrink-0 font-medium text-muted-foreground text-[11px]">
              All values in <span className="font-semibold text-foreground">₹ INR</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Telemetry Period, Theme, Export & Authenticated User Identity */}
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0 justify-end">
        {/* Calendar / Period Group */}
        <div className="relative flex items-center">
          <div className="flex h-9 min-w-0 items-center gap-2 rounded-l-xl border border-r-0 border-border bg-card px-2.5 sm:px-3 text-xs text-muted-foreground shadow-2xs">
            <TopbarCalendarIcon className="size-3.5 shrink-0 text-emerald-500" />
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
                <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-border bg-popover p-1 text-xs text-popover-foreground shadow-lg shadow-black/20 z-50 animate-in fade-in-50 zoom-in-95">
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
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : 'hover:bg-muted text-foreground/80'
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

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="h-9 px-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {themeMode === 'dark' ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-slate-700" />}
        </button>

        {/* ========================================================================= */}
        {/* AUTHENTICATED USER IDENTITY PILL & PROFILE DROPDOWN (PART 3 REQUIREMENT)   */}
        {/* Displays: Name, Email, Account Role Badge, Avatar, and Profile Dropdown   */}
        {/* ========================================================================= */}
        <div className="relative ml-1">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-9 pl-1.5 pr-2.5 rounded-xl border border-border bg-card hover:bg-muted/80 text-foreground flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          >
            {/* Avatar with role color indicator */}
            <div className={`size-6 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase shrink-0 ${
              isAdmin
                ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/40'
                : isSeller
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40'
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

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-popover p-2 text-xs text-popover-foreground shadow-2xl z-50 animate-in fade-in-50 zoom-in-95">
                {/* User Info Header */}
                <div className="p-3 rounded-xl bg-muted/60 border border-border/80 mb-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {user?.name || 'Grid Participant'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${roleBadgeConfig.color}`}>
                      {roleBadgeConfig.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate font-mono">
                    {user?.email || 'user@gridp2p.io'}
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1 py-1">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <Settings className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Account Profile Settings</span>
                  </Link>

                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Shield className="size-3.5 text-purple-500 shrink-0" />
                      <span>Grid Administration Hub</span>
                    </Link>
                  ) : isSeller ? (
                    <Link
                      to="/seller/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LayoutDashboard className="size-3.5 text-amber-500 shrink-0" />
                      <span>Prosumer Overview</span>
                    </Link>
                  ) : (
                    <Link
                      to="/buyer/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LayoutDashboard className="size-3.5 text-emerald-500 shrink-0" />
                      <span>Buyer Overview</span>
                    </Link>
                  )}

                  <Link
                    to="/marketplace"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <ShoppingCart className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Energy Marketplace</span>
                  </Link>
                </div>

                {/* Divider & Sign Out */}
                <div className="pt-2 border-t border-border mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-3.5 shrink-0" />
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
