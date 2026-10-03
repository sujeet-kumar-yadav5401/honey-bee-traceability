import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Lock, Mail, ArrowRight, CheckCircle2, Sparkles, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../data/mockData';

export const LoginPage = () => {
  const [email, setEmail] = useState('beekeeper@coorgapiary.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('beekeeper');
  const { switchRole, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    const user = MOCK_USERS.find(u => u.roleKey === roleKey);
    if (user) {
      setEmail(user.email);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.roleKey === selectedRole) || MOCK_USERS[1];
    setCurrentUser(user);
    if (selectedRole === 'admin') {
      navigate('/admin');
    } else if (selectedRole === 'customer') {
      navigate('/verification');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickDemoLogin = (roleKey) => {
    const user = MOCK_USERS.find(u => u.roleKey === roleKey) || MOCK_USERS[1];
    setCurrentUser(user);
    if (roleKey === 'admin') {
      navigate('/admin');
    } else if (roleKey === 'customer') {
      navigate('/verification');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-amber-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-2xl shadow-md">
            🐝
          </div>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          AgriTrace Authentication
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Blockchain Honey Traceability & Smart Beekeeping Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-3xl border border-slate-200">
          {/* Role selection tab */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Demo Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('beekeeper')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'beekeeper'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-base">🐝</span>
                <span>Beekeeper</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'admin'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-base">🛡️</span>
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('customer')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'customer'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-base">🔍</span>
                <span>Customer</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <span className="text-[11px] text-amber-600">Demo password pre-filled</span>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Login as {selectedRole === 'beekeeper' ? 'Beekeeper' : selectedRole === 'admin' ? 'Admin' : 'Customer'}</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin(selectedRole)}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={15} className="text-amber-500" />
                <span>1-Click Instant Demo Login</span>
              </button>
            </div>
          </form>

          {/* Quick role test presets */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 mb-2">Fast presentation shortcuts:</p>
            <div className="flex justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('beekeeper')}
                className="text-amber-600 hover:underline font-medium text-[11px]"
              >
                Enter Beekeeper
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="text-indigo-600 hover:underline font-medium text-[11px]"
              >
                Enter Admin
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('customer')}
                className="text-emerald-600 hover:underline font-medium text-[11px]"
              >
                Enter Customer
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          <span>Don't have an account? </span>
          <Link to="/register" className="font-semibold text-amber-600 hover:underline">
            Register as Beekeeper / Producer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
