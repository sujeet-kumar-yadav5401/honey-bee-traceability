import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  User,
  Shield,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = ({ onToggleSidebar }) => {
  const {
    currentUser,
    switchRole,
    logout,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/verification?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden"
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xl">🍯</span>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
            AgriTrace Platform
          </span>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full hidden md:inline-block">
            Smart Beekeeping & Multi-Crop Blockchain
          </span>
        </div>
      </div>

      {/* Middle: Quick search bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Batch ID (e.g. HNY-2026-001, RICE-2026-001)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/80 border border-transparent rounded-xl focus:bg-white focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </form>

      {/* Right: Role Switcher, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher for College Project Demo */}
        <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <span className="text-slate-400 text-[11px] px-2">Role:</span>
          <button
            onClick={() => switchRole('beekeeper')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              currentUser?.roleKey === 'beekeeper'
                ? 'bg-white text-amber-700 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Beekeeper
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              currentUser?.roleKey === 'admin'
                ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => switchRole('customer')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              currentUser?.roleKey === 'customer'
                ? 'bg-white text-emerald-700 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer
          </button>
        </div>

        {/* Verify Shortcut */}
        <Link
          to="/verification"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
        >
          <Shield size={14} />
          <span>Verify QR</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-scale-in">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.link) navigate(notif.link);
                        setShowNotifications(false);
                      }}
                      className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                        !notif.read ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-800">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-amber-500/20"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">{currentUser?.name}</div>
              <div className="text-[10px] text-amber-600 font-medium">{currentUser?.role}</div>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden lg:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                <span className="mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  {currentUser?.role}
                </span>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <User size={15} />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Shield size={15} />
                  <span>Admin Console</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
