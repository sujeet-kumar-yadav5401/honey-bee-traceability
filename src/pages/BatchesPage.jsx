import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Boxes, Plus, Search, Filter, ShieldCheck, QrCode, Route, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BatchCard from '../components/cards/BatchCard';
import StatusBadge from '../components/common/StatusBadge';

export const BatchesPage = () => {
  const { batches } = useApp();
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBatches = batches.filter(batch => {
    const matchesCategory =
      categoryFilter === 'ALL' ||
      (categoryFilter === 'Honey' && batch.productCategory === 'Honey') ||
      (categoryFilter !== 'Honey' && batch.productCategory?.toLowerCase() === categoryFilter.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || batch.status === statusFilter;

    const matchesSearch =
      batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.origin.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const honeyCount = batches.filter(b => b.productCategory === 'Honey').length;
  const verifiedCount = batches.filter(b => b.status === 'Verified').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Boxes size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Traceable Batches</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Certified commodity batches registered on the consortium traceability ledger
          </p>
        </div>

        <Link
          to="/batches/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>+ Create New Batch</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Batch ID (e.g. HNY-2026-001), Product, Origin..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Statuses ({batches.length})
            </button>
            <button
              onClick={() => setStatusFilter('Verified')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                statusFilter === 'Verified'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Verified ({verifiedCount})
            </button>
            <button
              onClick={() => setStatusFilter('Processing')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                statusFilter === 'Processing'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Processing
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'ALL'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setCategoryFilter('Honey')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'Honey'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🍯 Honey ({honeyCount})
          </button>
          <button
            onClick={() => setCategoryFilter('Rice')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'Rice'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🌾 Rice
          </button>
          <button
            onClick={() => setCategoryFilter('Coffee')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'Coffee'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ☕ Coffee
          </button>
          <button
            onClick={() => setCategoryFilter('Spices')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'Spices'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🌶 Spices
          </button>
          <button
            onClick={() => setCategoryFilter('Fruits')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'Fruits'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🥭 Mango / Fruits
          </button>
        </div>
      </div>

      {/* Batches Grid */}
      {filteredBatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map(batch => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">No batches match the selected criteria.</p>
          <button
            onClick={() => { setCategoryFilter('ALL'); setStatusFilter('ALL'); setSearchTerm(''); }}
            className="mt-3 text-xs font-semibold text-amber-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BatchesPage;
