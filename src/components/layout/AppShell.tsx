import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomTabBar } from './BottomTabBar';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const isKiosk = location.pathname.startsWith('/kiosk');

  if (isKiosk) {
    return (
      <div className="min-h-screen bg-bg text-ink flex flex-col">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopBar />
        <main key={location.pathname} className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto page-transition">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomTabBar />
    </div>
  );
};
