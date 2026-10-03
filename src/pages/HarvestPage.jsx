import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Plus, Scale, Layers, Calendar, MapPin, Droplets, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import DataTable from '../components/common/DataTable';

export const HarvestPage = () => {
  const { harvests, hives } = useApp();
  const navigate = useNavigate();

  const totalHarvestKg = harvests.reduce((sum, h) => sum + (Number(h.quantity) || 0), 0);
  const avgMoisture = '18.1%';

  const columns = [
    {
      header: 'Harvest ID',
      accessor: 'id',
      render: (row) => (
        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          {row.id}
        </span>
      )
    },
    {
      header: 'Honey Type',
      accessor: 'honeyType',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.honeyType}</span>
          <span className="text-[11px] text-slate-500">{row.floralSource}</span>
        </div>
      )
    },
    {
      header: 'Source Hive',
      accessor: 'hiveId',
      render: (row) => (
        <Link
          to={`/hives/${row.hiveId}`}
          className="font-mono text-amber-600 font-semibold hover:underline"
        >
          {row.hiveId}
        </Link>
      )
    },
    {
      header: 'Quantity',
      accessor: 'quantity',
      render: (row) => (
        <span className="font-bold text-slate-800 text-sm">
          {row.quantity} {row.unit}
        </span>
      )
    },
    {
      header: 'Harvest Date',
      accessor: 'harvestDate',
      render: (row) => <span className="text-slate-600">{row.harvestDate}</span>
    },
    {
      header: 'Moisture',
      accessor: 'moistureLevel',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          {row.moistureLevel}
        </span>
      )
    },
    {
      header: 'Initial Quality',
      accessor: 'initialQuality',
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
          {row.initialQuality}
        </span>
      )
    },
    {
      header: 'Linked Batch',
      accessor: 'batchId',
      render: (row) => row.batchId ? (
        <Link
          to={`/batches/${row.batchId}`}
          className="font-mono text-xs text-indigo-600 font-bold hover:underline"
        >
          {row.batchId}
        </Link>
      ) : (
        <Link
          to={`/batches/create?harvestId=${row.id}`}
          className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
        >
          + Create Batch
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Sparkles size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Honey Harvest Logs</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Raw apiary extraction data, floral source botanical logs, and moisture checks
          </p>
        </div>

        <Link
          to="/harvest/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Record Honey Harvest</span>
        </Link>
      </div>

      {/* KPI highlight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Total Logged Extraction</span>
            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalHarvestKg} KG</span>
            <span className="text-[11px] text-emerald-600 font-medium">100% Unadulterated Raw Honey</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
            <Scale size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Average Moisture</span>
            <span className="text-2xl font-bold text-blue-600 mt-1 block">{avgMoisture}</span>
            <span className="text-[11px] text-slate-500 font-medium">Well below 20% spoilage ceiling</span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
            <Droplets size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Active Apiaries</span>
            <span className="text-2xl font-bold text-purple-600 mt-1 block">{hives.length} Hives</span>
            <span className="text-[11px] text-slate-500 font-medium">Coorg & Western Ghats Reserve</span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* Harvest Data Table */}
      <DataTable
        title="Harvest Extractions History"
        subtitle="Unprocessed honey harvests ready for settling, filtration, and blockchain batch registration"
        data={harvests}
        columns={columns}
        searchPlaceholder="Search harvest by type, hive, floral source..."
      />
    </div>
  );
};

export default HarvestPage;
