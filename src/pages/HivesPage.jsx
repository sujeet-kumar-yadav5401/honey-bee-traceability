import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Plus, Search, Filter, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HiveCard from '../components/cards/HiveCard';

export const HivesPage = () => {
  const { hives } = useApp();
  const [filterHealth, setFilterHealth] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHives = hives.filter(hive => {
    const matchesHealth = filterHealth === 'ALL' || hive.healthStatus === filterHealth;
    const matchesSearch =
      hive.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hive.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hive.beeSpecies.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHealth && matchesSearch;
  });

  const healthyCount = hives.filter(h => h.healthStatus === 'Healthy').length;
  const attentionCount = hives.filter(h => h.healthStatus === 'Attention Required').length;
  const dueCount = hives.filter(h => h.healthStatus === 'Inspection Due').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Layers size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">My Hives</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time IoT telemetry, colony health, and honey superframe monitoring across apiaries
          </p>
        </div>

        <Link
          to="/hives/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>+ Add New Hive</span>
        </Link>
      </div>

      {/* Filter and Stats Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Hive ID, Name, Location or Species..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:outline-hidden"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <button
            onClick={() => setFilterHealth('ALL')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
              filterHealth === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Hives ({hives.length})
          </button>
          <button
            onClick={() => setFilterHealth('Healthy')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
              filterHealth === 'Healthy'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 size={13} />
            <span>Healthy ({healthyCount})</span>
          </button>
          <button
            onClick={() => setFilterHealth('Attention Required')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
              filterHealth === 'Attention Required'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <AlertCircle size={13} />
            <span>Attention ({attentionCount})</span>
          </button>
          <button
            onClick={() => setFilterHealth('Inspection Due')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
              filterHealth === 'Inspection Due'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <Clock size={13} />
            <span>Due ({dueCount})</span>
          </button>
        </div>
      </div>

      {/* Hive Cards Grid */}
      {filteredHives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHives.map(hive => (
            <HiveCard key={hive.id} hive={hive} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">No hives found matching your search filter.</p>
          <button
            onClick={() => { setFilterHealth('ALL'); setSearchTerm(''); }}
            className="mt-3 text-xs font-semibold text-amber-600 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HivesPage;
