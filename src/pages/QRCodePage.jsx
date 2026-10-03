import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { QrCode, Search, ShieldCheck, Download, Printer, ExternalLink, Sparkles, Boxes } from 'lucide-react';
import { useApp } from '../context/AppContext';
import QRCodeDisplay from '../components/common/QRCodeDisplay';
import StatusBadge from '../components/common/StatusBadge';

export const QRCodePage = () => {
  const { batches } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedFromUrl = searchParams.get('batch');
  const [selectedBatchId, setSelectedBatchId] = useState(
    selectedFromUrl || (batches[0]?.id || 'HNY-2026-001')
  );

  useEffect(() => {
    if (selectedFromUrl) {
      setSelectedBatchId(selectedFromUrl);
    }
  }, [selectedFromUrl]);

  const currentBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const handleSelectBatch = (id) => {
    setSelectedBatchId(id);
    setSearchParams({ batch: id });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <QrCode size={20} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">QR Code Generator</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate consumer verification QR labels for retail packaging & tamper-evident jars
          </p>
        </div>

        <Link
          to={`/verify/${currentBatch.id}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs"
        >
          <ShieldCheck size={16} />
          <span>Simulate Scan on Mobile</span>
        </Link>
      </div>

      {/* Select Batch Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Select Batch to Generate QR Label
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {batches.map(b => {
            const isSelected = b.id === currentBatch?.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBatch(b.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="font-mono text-xs font-bold text-slate-900">{b.id}</div>
                <div className="text-[11px] text-slate-600 truncate mt-0.5">{b.product}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main QR Showcase Card */}
      {currentBatch && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: QR Code Display Component */}
            <div className="flex flex-col items-center">
              <QRCodeDisplay
                batchId={currentBatch.id}
                productName={currentBatch.product}
                size={220}
                showActions={true}
                showBorder={false}
                subtitle="Scan with smartphone camera to verify blockchain origin"
              />
            </div>

            {/* Right: Batch Metadata & Printing Instructions */}
            <div className="space-y-5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Active Batch ID</span>
                <div className="font-mono text-2xl font-black text-slate-900 mt-0.5">{currentBatch.id}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {currentBatch.productCategory}
                  </span>
                  <StatusBadge status={currentBatch.status} />
                </div>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Product:</span>
                  <span className="font-bold text-slate-800">{currentBatch.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Producer:</span>
                  <span className="font-semibold text-slate-800">{currentBatch.producer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Origin:</span>
                  <span className="font-semibold text-slate-800">{currentBatch.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Batch Quantity:</span>
                  <span className="font-bold text-slate-800">{currentBatch.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Harvest Date:</span>
                  <span className="font-semibold text-slate-800">{currentBatch.harvestDate}</span>
                </div>
                {currentBatch.moistureLevel && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Moisture Content:</span>
                    <span className="font-bold text-blue-600">{currentBatch.moistureLevel}</span>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-[11px] text-slate-500 leading-relaxed">
                <strong>Retail Packaging Guideline:</strong> Print this QR code on waterproof honey jar labels or adhesive batch bands. When customers scan it in grocery stores, they bypass intermediaries and view immutable origin data.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
