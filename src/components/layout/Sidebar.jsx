import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Package,
  Boxes,
  Route,
  QrCode,
  User,
  Shield,
  Home,
  CheckCircle,
  PlusCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, hives, batches } = useApp();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Hive Management',
      path: '/hives',
      icon: Layers,
      badge: `${hives.length}`
    },
    {
      name: 'Honey Harvest',
      path: '/harvest',
      icon: Sparkles,
      badge: null
    },
    {
      name: 'Products',
      path: '/products',
      icon: Package,
      badge: 'Multi-Crop'
    },
    {
      name: 'Batches',
      path: '/batches',
      icon: Boxes,
      badge: `${batches.length}`
    },
    {
      name: 'Traceability',
      path: '/traceability',
      icon: Route,
      badge: null
    },
    {
      name: 'QR Verification',
      path: '/qr',
      icon: QrCode,
      badge: null
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
      badge: null
    },
    {
      name: 'Admin',
      path: '/admin',
      icon: Shield,
      badge: 'Console'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-800 shadow-xl lg:shadow-none`}
      >
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold text-lg shadow-sm">
                🐝
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  AgriTrace <span className="text-amber-400">Ledger</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase block">
                  Smart Honey & Agro
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Create Batch Action */}
          <div className="px-4 py-3">
            <Link
              to="/batches/create"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-all shadow-md"
            >
              <PlusCircle size={15} />
              <span>Create New Batch</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-2 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Platform Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badge === 'Multi-Crop'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : item.badge === 'Console'
                          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer info & public portal link */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home size={15} className="text-amber-400" />
              <span>Public Landing Page</span>
            </div>
            <ExternalLink size={13} className="text-slate-400" />
          </Link>

          <div className="px-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>AgriTrace v1.0 Prototype</span>
            <span className="text-amber-400/80 font-mono">Demo Mode</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
