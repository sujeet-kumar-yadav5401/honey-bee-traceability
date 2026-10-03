import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Boxes,
  Scale,
  ShieldCheck,
  PlusCircle,
  QrCode,
  ArrowRight,
  TrendingUp,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import { ProductionBarChart, HiveHealthDonutChart, BatchStatusDonutChart } from '../components/common/ChartCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';

export const DashboardPage = () => {
  const { hives, batches, harvests, monthlyProduction, currentUser } = useApp();
  const navigate = useNavigate();

  // Honey batches specifically for the beekeeper view
  const honeyBatches = batches.filter(b => b.productCategory === 'Honey');

  // Stats calculation
  const totalHives = hives.length;
  const activeHives = hives.filter(h => h.healthStatus === 'Healthy' || h.healthStatus === 'Inspection Due').length;
  const honeyBatchesCount = honeyBatches.length;
  const totalHoneyProduced = harvests.reduce((acc, h) => acc + (Number(h.quantity) || 0), 0) + 235; // realistic benchmark
  const verifiedBatchesCount = batches.filter(b => b.status === 'Verified').length;

  const healthyHives = hives.filter(h => h.healthStatus === 'Healthy').length;
  const attentionHives = hives.filter(h => h.healthStatus === 'Attention Required').length;
  const dueHives = hives.filter(h => h.healthStatus === 'Inspection Due').length;

  const verifiedBatches = batches.filter(b => b.status === 'Verified').length;
  const processingBatches = batches.filter(b => b.status === 'Processing').length;
  const pendingBatches = batches.filter(b => b.status === 'Pending').length;

  // Table columns for Recent Honey Batches
  const columns = [
    {
      header: 'Batch ID',
      accessor: 'id',
      render: (row) => (
        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          {row.id}
        </span>
      )
    },
    {
      header: 'Honey Type',
      accessor: 'product',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.product}</span>
          <span className="text-[11px] text-slate-400">{row.floralSource || 'Natural Flora'}</span>
        </div>
      )
    },
    {
      header: 'Hive',
      accessor: 'hiveId',
      render: (row) => (
        <span className="font-mono text-slate-700 font-semibold">{row.hiveId || 'HIVE-001'}</span>
      )
    },
    {
      header: 'Quantity',
      accessor: 'quantity',
      render: (row) => <span className="font-bold text-slate-800">{row.quantity}</span>
    },
    {
      header: 'Harvest Date',
      accessor: 'harvestDate',
      render: (row) => <span className="text-slate-600">{row.harvestDate}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-2xl p-6 text-slate-950 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/10 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🐝</span>
            <span>Apiary Director & Beekeeper Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Welcome back, {currentUser?.name || 'Sujeet Kumar'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
            Coorg High-Altitude Apiaries • {activeHives} active hives operational • Next inspection in 2 days
          </p>
        </div>

        {/* Quick action buttons matching requirement */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <Link
            to="/hives/create"
            className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <PlusCircle size={15} className="text-amber-600" />
            <span>Add Hive</span>
          </Link>

          <Link
            to="/harvest/create"
            className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Sparkles size={15} className="text-yellow-600" />
            <span>Record Harvest</span>
          </Link>

          <Link
            to="/batches/create"
            className="px-3.5 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Boxes size={15} />
            <span>Create Batch</span>
          </Link>

          <Link
            to="/qr"
            className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <QrCode size={15} className="text-indigo-600" />
            <span>Generate QR</span>
          </Link>
        </div>
      </div>

      {/* Top 5 Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Hives"
          value="12"
          subtext="Smart monitored"
          icon={Layers}
          trend="+2"
          trendDirection="up"
          color="amber"
          onClick={() => navigate('/hives')}
        />
        <StatCard
          title="Active Hives"
          value="10"
          subtext="Producing honey"
          icon={Activity}
          trend="83% active"
          trendDirection="up"
          color="emerald"
          onClick={() => navigate('/hives')}
        />
        <StatCard
          title="Honey Batches"
          value="28"
          subtext="Season total"
          icon={Boxes}
          trend="+4 this mo"
          trendDirection="up"
          color="blue"
          onClick={() => navigate('/batches')}
        />
        <StatCard
          title="Total Honey Produced"
          value="385 KG"
          subtext="Avg 32 kg/hive"
          icon={Scale}
          trend="+18% YoY"
          trendDirection="up"
          color="purple"
          onClick={() => navigate('/harvest')}
        />
        <StatCard
          title="Verified Batches"
          value="25"
          subtext="Ledger anchored"
          icon={ShieldCheck}
          trend="100% pure"
          trendDirection="up"
          color="emerald"
          onClick={() => navigate('/verification')}
        />
      </div>

      {/* Charts Section: 3 requested charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Honey Production Trends */}
        <div className="lg:col-span-2">
          <ProductionBarChart data={monthlyProduction} />
        </div>

        {/* Hive Colony Health breakdown */}
        <div className="lg:col-span-1">
          <HiveHealthDonutChart
            healthy={healthyHives}
            attention={attentionHives}
            inspectionDue={dueHives}
          />
        </div>
      </div>

      {/* Secondary row: Batch Status Chart + Quick Inspection Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BatchStatusDonutChart
            verified={verifiedBatches}
            processing={processingBatches}
            pending={pendingBatches}
          />
        </div>

        {/* Recent Honey Batches Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="Recent Honey Batches"
            subtitle="Tracked with IoT provenance and cryptographic ledger hashes"
            data={honeyBatches}
            columns={columns}
            searchPlaceholder="Filter batch or type..."
            onRowClick={(row) => navigate(`/batches/${row.id}`)}
            actions={
              <Link
                to="/batches"
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>View All Batches</span>
                <ArrowRight size={13} />
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
