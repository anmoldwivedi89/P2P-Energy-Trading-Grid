import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { GridLogo } from './logo';
import {
  HomeIcon,
  SidebarAnalyticsIcon,
  SidebarHoldingsIcon,
  SidebarFixedIncomeIcon,
  SidebarFolderIcon,
  SidebarSettingsIcon,
  SidebarNotificationsIcon,
  SidebarLogoutIcon,
} from './icons';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardNavigation } from './navigation';
import { USER_ROLES } from '../../utils/constants';
import { Zap, Sun, ShieldCheck, User as UserIcon, X, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

export function DashboardSidebar() {
  const { user, role, logout } = useAuth();
  const { isMobileOpen, closeMobileSidebar } = useDashboardNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const normalizedRole = (role || user?.role || '').toLowerCase();
  const isSeller = normalizedRole === USER_ROLES.SELLER;
  const isAdmin = normalizedRole === USER_ROLES.ADMIN;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      navigate('/login');
    }
  };

  // Define role-specific navigation sections
  const getNavSections = () => {
    if (isAdmin) {
      return [
        {
          title: 'GRID ADMINISTRATION',
          items: [
            { label: 'Overview & Telemetry', href: '/admin/dashboard', icon: HomeIcon },
            { label: 'Participants & Nodes', href: '/admin/users', icon: SidebarHoldingsIcon },
            { label: 'All Energy Listings', href: '/admin/listings', icon: SidebarFolderIcon },
            { label: 'Ledger & Transactions', href: '/admin/transactions', icon: SidebarAnalyticsIcon },
          ],
        },
      ];
    }

    if (isSeller) {
      return [
        {
          title: 'PROSUMER TRADING',
          items: [
            { label: 'Seller Overview', href: '/seller/dashboard', icon: HomeIcon },
            { label: 'Publish New Listing', href: '/seller/create-listing', icon: SidebarFixedIncomeIcon },
            { label: 'My Energy Listings', href: '/seller/listings', icon: SidebarFolderIcon },
            { label: 'Sales & Dispatches', href: '/seller/orders', icon: SidebarHoldingsIcon },
          ],
        },
      ];
    }

    // Default: Buyer
    return [
      {
        title: 'CONSUMER MARKETPLACE',
        items: [
          { label: 'Buyer Overview', href: '/buyer/dashboard', icon: HomeIcon },
          { label: 'Energy Marketplace', href: '/marketplace', icon: SidebarHoldingsIcon },
          { label: 'Purchased Energy', href: '/buyer/orders', icon: SidebarFolderIcon },
          { label: 'Settlement History', href: '/buyer/transactions', icon: SidebarAnalyticsIcon },
        ],
      },
    ];
  };

  const navSections = getNavSections();

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-3 sm:p-4 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-colors duration-200">
      {/* Top: Brand Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-3 min-w-0">
            <GridLogo className="size-10 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-base font-bold tracking-tight text-foreground font-sans">
                  GRID<span className="text-[#6B8F71] dark:text-[#DAA520] font-light ml-0.5">P2P</span>
                </span>
              </div>
              <p className="truncate text-[10px] text-muted-foreground font-mono tracking-wider">
                {isAdmin ? 'ADMINISTRATOR HUB' : isSeller ? 'PROSUMER PORTAL' : 'CONSUMER PORTAL'}
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Status Pill */}
        <div className="mx-1 px-3 py-2 rounded-xl bg-muted/50 border border-border flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 dark:bg-[#DAA520] animate-pulse" />
            Node Status
          </span>
          <span className="font-semibold text-emerald-600 dark:text-[#DAA520]">Connected</span>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6 pt-2">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-2 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                {section.title}
              </div>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/marketplace'
                      ? location.pathname === '/marketplace'
                      : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);

                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={closeMobileSidebar}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150',
                        isActive
                          ? 'active-sidebar-item bg-sidebar-accent text-[#FF6F61] font-semibold shadow-xs'
                          : 'text-sidebar-foreground/80 hover:text-foreground hover:bg-sidebar-accent/60 hover:text-[#FF4500]'
                      )}
                    >
                      <Icon className={cn('size-4 shrink-0', isActive ? 'text-[#FF6F61]' : 'text-muted-foreground')} />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* Account Profile Section */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              SETTINGS & PREFERENCES
            </div>
            <NavLink
              to="/profile"
              onClick={closeMobileSidebar}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150',
                location.pathname === '/profile'
                  ? 'active-sidebar-item bg-sidebar-accent text-[#FF6F61] font-semibold shadow-xs'
                  : 'text-sidebar-foreground/80 hover:text-foreground hover:bg-sidebar-accent/60 hover:text-[#FF4500]'
              )}
            >
              <SidebarSettingsIcon className={cn('size-4 shrink-0', location.pathname === '/profile' ? 'text-[#FF6F61]' : 'text-muted-foreground')} />
              <span>Account Profile</span>
            </NavLink>

            <NavLink
              to="/notifications"
              onClick={closeMobileSidebar}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150',
                location.pathname === '/notifications'
                  ? 'active-sidebar-item bg-sidebar-accent text-[#FF6F61] font-semibold shadow-xs'
                  : 'text-sidebar-foreground/80 hover:text-foreground hover:bg-sidebar-accent/60 hover:text-[#FF4500]'
              )}
            >
              <SidebarNotificationsIcon className={cn('size-4 shrink-0', location.pathname === '/notifications' ? 'text-[#FF6F61]' : 'text-muted-foreground')} />
              <span>Notifications & Alerts</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom: Current User Card & Logout */}
      <div className="pt-4 border-t border-sidebar-divider space-y-2">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-card border border-border shadow-custom">
          <div className="size-9 rounded-full bg-[#DAA520]/15 border border-[#DAA520]/30 flex items-center justify-center text-[#DAA520] font-bold text-xs uppercase shrink-0">
            {user?.name ? user.name.slice(0, 2) : <UserIcon className="size-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-foreground">
              {user?.name || 'Grid Participant'}
            </div>
            <div className="truncate text-[11px] text-muted-foreground">
              {user?.email || 'node@energygrid.org'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:text-[#FF4500] hover:bg-[#FF4500]/10 transition-colors cursor-pointer"
        >
          <SidebarLogoutIcon className="size-4" />
          <span>Disconnect / Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (Visible md and up) */}
      <aside className="hidden md:flex w-[15.625rem] shrink-0 h-screen sticky top-0 flex-col z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={closeMobileSidebar}
          />
          <div className="relative w-[16rem] max-w-[80vw] h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardSidebar;
