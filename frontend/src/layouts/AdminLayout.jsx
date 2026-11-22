import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardNavigationProvider } from '../components/capitalio/navigation';
import { DashboardSidebar } from '../components/capitalio/sidebar';
import { DashboardTopbar } from '../components/capitalio/topbar';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import '../components/capitalio/dashboard.css';

export const AdminLayout = () => {
  const { themeMode } = useTheme();

  return (
    <DashboardNavigationProvider>
      <div className={cn(
        "capitalio-dashboard flex h-screen w-full overflow-hidden no-scrollbar bg-background text-foreground transition-colors duration-200",
        themeMode === 'dark' ? 'dark' : 'light-grid'
      )}>
        {/* Capitalio Sidebar */}
        <DashboardSidebar />

        {/* Main Content Pane */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background shadow-custom">
            {/* Capitalio Topbar */}
            <DashboardTopbar />

            {/* Scrollable Dashboard View */}
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </DashboardNavigationProvider>
  );
};

export default AdminLayout;
