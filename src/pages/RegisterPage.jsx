import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Beekeeper / Producer',
    location: 'Coorg, Karnataka',
    product: 'Raw Forest Honey',
    password: ''
  });
  const { setCurrentUser, addNotification } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: formData.name || 'New Producer',
      email: formData.email,
      role: formData.role,
      roleKey: formData.role.includes('Admin') ? 'admin' : formData.role.includes('Customer') ? 'customer' : 'beekeeper',
      product: formData.product,
      location: formData.location,
      phone: '+91 98000 00000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      status: 'Active',
      joined: 'Just now'
    };

    setCurrentUser(newUser);
    addNotification({
      title: 'Registration Successful',
      message: `Welcome ${newUser.name}! Your producer account is ready.`,
      type: 'success'
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-2xl shadow-md">
            🐝
          </div>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Register Producer / Beekeeper Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Join the AgriTrace Consortium for tamper-evident supply chain tracking
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-xl rounded-3xl border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sujeet Kumar Yadav"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="beekeeper@apiary.org"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-amber-500"
              >
                <option value="Beekeeper / Producer">Beekeeper / Producer</option>
                <option value="Agricultural Farmer">Agricultural Grain / Spice Farmer</option>
                <option value="Quality Inspector">Quality Inspector / Lab Analyst</option>
                <option value="Customer">Customer / Buyer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Apiary / Farm Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Madikeri, Coorg, Karnataka"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Produce</label>
              <input
                type="text"
                required
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="Raw Wildflower Honey"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Create Demo Account</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <Link to="/login" className="font-semibold text-amber-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
