import React, { createContext, useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultDashboardPeriod } from './shared';

const DashboardNavigationContext = createContext(null);

export function DashboardNavigationProvider({ children }) {
  const location = useLocation();
  const [period, setPeriod] = useState(defaultDashboardPeriod);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  const value = useMemo(
    () => ({
      pathname: location.pathname,
      period,
      setPeriod,
      isMobileOpen,
      setIsMobileOpen,
      toggleMobileSidebar,
      closeMobileSidebar,
    }),
    [location.pathname, period, isMobileOpen]
  );

  return (
    <DashboardNavigationContext.Provider value={value}>
      {children}
    </DashboardNavigationContext.Provider>
  );
}

export function useDashboardNavigation() {
  const context = useContext(DashboardNavigationContext);
  if (!context) {
    return {
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
      period: defaultDashboardPeriod,
      setPeriod: () => {},
      isMobileOpen: false,
      setIsMobileOpen: () => {},
      toggleMobileSidebar: () => {},
      closeMobileSidebar: () => {},
    };
  }
  return context;
}
