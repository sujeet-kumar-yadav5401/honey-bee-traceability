import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main container adjusted for fixed sidebar on lg screens */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top sticky Navbar */}
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-4 px-6 border-t border-slate-200/80 bg-white/70 text-center text-xs text-slate-500">
          <p>
            Blockchain-Based Honey Traceability and Smart Beekeeping Management System • Prototype & UI Demonstration
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
