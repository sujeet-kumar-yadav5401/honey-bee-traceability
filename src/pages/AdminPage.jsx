import React, { useState } from 'react';
import {
  Shield,
  Users,
  Layers,
  Package,
  Boxes,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Clock,
  CheckCircle2,
  RefreshCw,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../data/mockData';
import StatCard from '../components/common/StatCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';

export const AdminPage = () => {
  const { hives, products, batches, resetToDefaultData } = useApp();

  const totalUsers = MOCK_USERS.length;
  const totalProducers = MOCK_USERS.filter(u => u.roleKey === 'beekeeper').length;
  const totalHives = hives.length;
  const totalProducts = products.length;
  const totalBatches = batches.length;
  const verifiedBatches = batches.filter(b => b.status === 'Verified').length;
  const pendingRecords = batches.filter(b => b.status === 'Pending' || b.status === 'Processing').length;
  const invalidRecords = 1; // Simulated fraud attempt blocked

  // User Management Table Columns
  const userColumns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
          />
          <div>
            <span className="font-bold text-slate-900 block">{row.name}</span>
            <span className="text-[11px] text-slate-400">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (row) => (
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            row.roleKey === 'admin'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              : row.roleKey === 'beekeeper'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {row.role}
        </span>
      )
    },
    {
      header: 'Product Focus',
      accessor: 'product',
      render: (row) => <span className="text-slate-700 font-medium">{row.product}</span>
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (row) => <span className="text-slate-500">{row.location}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="xs" />
    }
  ];

  // Batch Monitoring Table Columns
  const batchColumns = [
    {
      header: 'Batch ID',
      accessor: 'id',
      render: (row) => (
        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
          {row.id}
        </span>
      )
    },
    {
      header: 'Product',
      accessor: 'product',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.product}</span>
          <span className="text-[11px] text-slate-400">{row.productCategory}</span>
        </div>
      )
    },
    {
      header: 'Producer',
      accessor: 'producer',
      render: (row) => <span className="text-slate-700 font-medium">{row.producer}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="xs" />
    },
    {
      header: 'Blockchain Status',
      accessor: 'blockchain',
      render: (row) => (
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-indigo-700">
          <ShieldCheck size={13} className="text-indigo-600 shrink-0" />
          <span>{row.blockchain?.blockNumber ? `Block #${row.blockchain.blockNumber}` : 'Uncommitted'}</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
              <Shield size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Admin Governance Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            System-wide consortium monitoring, user role management, and ledger integrity oversight
          </p>
        </div>

        <button
          onClick={resetToDefaultData}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
          title="Reset mock data to fresh state"
        >
          <RefreshCw size={14} />
          <span>Reset Demo Store</span>
        </button>
      </div>

      {/* 8 Statistics Cards Matching Requirement 17 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Users</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{totalUsers}</span>
          <span className="text-[10px] text-slate-400">Registered</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Producers</span>
          <span className="text-xl font-black text-amber-600 mt-1 block">{totalProducers}</span>
          <span className="text-[10px] text-slate-400">Beekeepers</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Hives</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{totalHives}</span>
          <span className="text-[10px] text-slate-400">Smart Nodes</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Products</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{totalProducts}</span>
          <span className="text-[10px] text-slate-400">Commodities</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Batches</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{totalBatches}</span>
          <span className="text-[10px] text-slate-400">Production</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified</span>
          <span className="text-xl font-black text-emerald-600 mt-1 block">{verifiedBatches}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Sealed</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending</span>
          <span className="text-xl font-black text-amber-600 mt-1 block">{pendingRecords}</span>
          <span className="text-[10px] text-slate-400">Review</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Invalid Records</span>
          <span className="text-xl font-black text-rose-600 mt-1 block">{invalidRecords}</span>
          <span className="text-[10px] text-rose-500 font-medium">Intercepted</span>
        </div>
      </div>

      {/* User Management Table */}
      <DataTable
        title="User Management"
        subtitle="Role privileges and producer certifications"
        data={MOCK_USERS}
        columns={userColumns}
        searchPlaceholder="Filter users by name, role, location..."
      />

      {/* Batch Monitoring Table */}
      <DataTable
        title="Consortium Batch Monitoring"
        subtitle="Live ledger integrity and blockchain block commitments"
        data={batches}
        columns={batchColumns}
        searchPlaceholder="Filter batch ID or blockchain status..."
      />
    </div>
  );
};

export default AdminPage;
