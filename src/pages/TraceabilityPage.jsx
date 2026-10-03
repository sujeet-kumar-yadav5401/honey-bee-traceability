import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Route,
  Search,
  Filter,
  Layers,
  MapPin,
  Calendar,
  ShieldCheck,
  QrCode,
  LayoutGrid,
  List
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import TraceabilityTimeline from '../components/common/Timeline';
import StatusBadge from '../components/common/StatusBadge';
import BlockchainCard from '../components/cards/BlockchainCard';

export const TraceabilityPage = () => {
  const { batches } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedBatchIdFromUrl = searchParams.get('batch');
  const [selectedBatchId, setSelectedBatchId] = useState(
    selectedBatchIdFromUrl || (batches[0]?.id || 'HNY-2026-001')
  );
  const [timelineLayout, setTimelineLayout] = useState('horizontal'); // 'horizontal' or 'vertical'

  useEffect(() => {
    if (selectedBatchIdFromUrl) {
      setSelectedBatchId(selectedBatchIdFromUrl);
    }
  }, [selectedBatchIdFromUrl]);

  const handleSelectBatch = (id) => {
    setSelectedBatchId(id);
    setSearchParams({ batch: id });
  };

  const currentBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Route size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Product Traceability</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete cryptographic journey — from source hive/soil to final customer verification
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setTimelineLayout('horizontal')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              timelineLayout === 'horizontal'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Workflow View</span>
          </button>
          <button
            onClick={() => setTimelineLayout('vertical')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              timelineLayout === 'vertical'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List size={14} />
            <span>Detailed Log</span>
          </button>
        </div>
      </div>

      {/* Batch Selector Carousel / Chips */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Select Commodity Batch to Inspect
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {batches.map((b) => {
            const isSelected = b.id === currentBatch?.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBatch(b.id)}
                className={`p-3 rounded-xl border text-left shrink-0 transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/20 shadow-2xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-slate-900">{b.id}</span>
                  <StatusBadge status={b.status} size="xs" />
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">{b.product}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{b.quantity} • {b.origin?.split(',')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Batch Summary Header */}
      {currentBatch && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                {currentBatch.id}
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {currentBatch.productCategory}
              </span>
              <StatusBadge status={currentBatch.status} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{currentBatch.product}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-slate-400" /> Origin: {currentBatch.origin}
              </span>
              <span>•</span>
              <span>Producer: {currentBatch.producer}</span>
              <span>•</span>
              <span>Quantity: {currentBatch.quantity}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/batches/${currentBatch.id}`}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Batch Specs
            </Link>
            <Link
              to={`/qr?batch=${currentBatch.id}`}
              className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <QrCode size={14} />
              <span>Generate QR</span>
            </Link>
          </div>
        </div>
      )}

      {/* Traceability Journey Visual Card */}
      {currentBatch && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Immutable Journey: SOURCE → HARVEST → PROCESSING → QUALITY → PACKAGING → BLOCKCHAIN → CUSTOMER
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any milestone node to view operator timestamp, GPS coordinate, and digital signature
              </p>
            </div>
          </div>

          <TraceabilityTimeline
            journey={currentBatch.traceabilityJourney}
            layout={timelineLayout}
            interactive={true}
          />
        </div>
      )}

      {/* Blockchain ledger proof */}
      {currentBatch && currentBatch.blockchain && (
        <BlockchainCard blockchain={currentBatch.blockchain} batchId={currentBatch.id} />
      )}
    </div>
  );
};

export default TraceabilityPage;
