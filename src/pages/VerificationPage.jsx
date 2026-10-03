import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Camera,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  RefreshCw,
  QrCode,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  Layers,
  Info,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import VerificationCard from '../components/cards/VerificationCard';
import { verifyBatchFromAPI } from '../services/verificationService';

export const VerificationPage = () => {
  const { batchId: paramBatchId } = useParams();
  const [searchParams] = useSearchParams();
  const queryBatch = searchParams.get('batch') || searchParams.get('query');

  const { batches } = useApp();

  const [inputBatchId, setInputBatchId] = useState(paramBatchId || queryBatch || 'HNY-2026-001');
  const [activeVerification, setActiveVerification] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'failed'
  const [isScanning, setIsScanning] = useState(false);
  const [apiSource, setApiSource] = useState(null); // 'api' | 'mock' | null

  // Auto-verify if param or query is present
  useEffect(() => {
    const idToVerify = paramBatchId || queryBatch;
    if (idToVerify) {
      setInputBatchId(idToVerify);
      verifyBatch(idToVerify);
    } else {
      // Default to HNY-2026-001 on initial load for instant demo review
      verifyBatch('HNY-2026-001');
    }
  }, [paramBatchId, queryBatch]);

  /** Mock-data fallback — used when backend is not reachable */
  const fallbackToMock = (cleanId) => {
    if (cleanId === 'INVALID-001' || cleanId.startsWith('FAIL') || cleanId.startsWith('INVALID')) {
      setActiveVerification({ id: cleanId });
      setVerificationStatus('failed');
      setApiSource('mock');
      return;
    }
    const found = batches.find(b => b.id.toUpperCase() === cleanId);
    if (found) {
      setActiveVerification(found);
      setVerificationStatus('success');
      setApiSource('mock');
    } else {
      setActiveVerification({ id: cleanId });
      setVerificationStatus('failed');
      setApiSource('mock');
    }
  };

  const verifyBatch = async (id) => {
    const cleanId = id.trim().toUpperCase();
    setVerificationStatus('loading');
    setApiSource(null);

    try {
      // ── 1. Try backend API first ───────────────────────────────────────────
      const apiResult = await verifyBatchFromAPI(cleanId);

      if (apiResult === null) {
        // Backend unreachable — fall back to mock data silently
        fallbackToMock(cleanId);
        return;
      }

      // API returned a verified record
      setActiveVerification(apiResult.batch);
      setVerificationStatus('success');
      setApiSource('api');
    } catch (error) {
      if (error.verificationFailed) {
        // Backend explicitly says not verified (404)
        setActiveVerification({ id: cleanId });
        setVerificationStatus('failed');
        setApiSource('api');
      } else {
        // Unexpected error — fall back to mock
        fallbackToMock(cleanId);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputBatchId.trim()) {
      verifyBatch(inputBatchId);
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setInputBatchId('HNY-2026-001');
      verifyBatch('HNY-2026-001');
    }, 1200);
  };

  const handleReset = () => {
    setInputBatchId('');
    setActiveVerification(null);
    setVerificationStatus('idle');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title & Subtitle matching prompt */}
      <div className="text-center max-w-2xl mx-auto py-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck size={14} />
          <span>Decentralized Consumer Authenticity Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Product Authenticity & Traceability
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Verify the origin and journey of your agricultural product.
        </p>
      </div>

      {/* Input or QR Scanner Area */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={inputBatchId}
                onChange={(e) => setInputBatchId(e.target.value)}
                placeholder="Enter Batch ID (e.g. HNY-2026-001, RICE-2026-001)..."
                required
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-mono font-semibold rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <ShieldCheck size={16} />
              <span>Verify Product</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="px-4 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors flex items-center justify-center gap-2 shrink-0"
              title="Simulate Camera Scanner"
            >
              <Camera size={16} className={isScanning ? 'animate-spin text-amber-600' : 'text-slate-500'} />
              <span>{isScanning ? 'Scanning QR...' : 'QR Camera'}</span>
            </button>
          </div>

          {/* Quick Demo Buttons for presentation */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Demo Presets:</span>
            <button
              type="button"
              onClick={() => { setInputBatchId('HNY-2026-001'); verifyBatch('HNY-2026-001'); }}
              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[11px] font-semibold hover:bg-amber-100"
            >
              ✓ HNY-2026-001 (Raw Honey)
            </button>
            <button
              type="button"
              onClick={() => { setInputBatchId('HNY-2026-002'); verifyBatch('HNY-2026-002'); }}
              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[11px] font-semibold hover:bg-amber-100"
            >
              ✓ HNY-2026-002 (Forest Honey)
            </button>
            <button
              type="button"
              onClick={() => { setInputBatchId('RICE-2026-001'); verifyBatch('RICE-2026-001'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[11px] font-semibold hover:bg-slate-200"
            >
              ✓ RICE-2026-001 (Organic Rice)
            </button>
            <button
              type="button"
              onClick={() => { setInputBatchId('INVALID-001'); verifyBatch('INVALID-001'); }}
              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-mono text-[11px] font-semibold hover:bg-rose-100"
            >
              ✗ INVALID-001 (Failure Demo)
            </button>
          </div>
        </form>
      </div>

      {/* LOADING STATE */}
      {verificationStatus === 'loading' && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-amber-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700">Querying AgriTrace Ledger…</p>
            <p className="text-xs text-slate-400 mt-0.5">Verifying cryptographic hash integrity</p>
          </div>
        </div>
      )}

      {/* SUCCESS STATE */}
      {verificationStatus === 'success' && activeVerification && (
        <div className="space-y-4 animate-fade-in">
          <VerificationCard batch={activeVerification} />
          {/* Data source indicator */}
          <div className="flex justify-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              apiSource === 'api'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${apiSource === 'api' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              {apiSource === 'api' ? '🔴 Live API Data' : '📋 Demo Mode (Backend offline)'}
            </span>
          </div>
        </div>
      )}

      {/* FAILURE STATE (Requirement Section 16: Verification Failure Screen) */}
      {verificationStatus === 'failed' && (
        <div className="bg-white rounded-3xl border-2 border-rose-200 p-8 shadow-md text-center max-w-2xl mx-auto space-y-6 animate-scale-in">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <XCircle size={40} />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              ✗ Verification Failed
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3">
              Product record could not be verified.
            </h2>
            <div className="mt-2 inline-block font-mono text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
              Batch ID: {activeVerification?.id || inputBatchId}
            </div>
          </div>

          {/* Possible Reasons */}
          <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 text-left text-xs space-y-2">
            <h4 className="font-bold text-rose-900">Possible reasons for verification failure:</h4>
            <ul className="list-disc pl-5 text-rose-800 space-y-1">
              <li><strong>Invalid Batch ID:</strong> The identifier does not exist in the official AgriTrace consortium ledger.</li>
              <li><strong>Record Not Found:</strong> The batch has not been authorized or sealed by a registered producer.</li>
              <li><strong>Data Integrity Mismatch:</strong> SHA-256 cryptographic hash state could not be reconstructed from transaction Merkle roots.</li>
            </ul>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <RefreshCw size={14} />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => { setInputBatchId('HNY-2026-001'); verifyBatch('HNY-2026-001'); }}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 rounded-xl transition-all shadow-xs"
            >
              Load Verified Honey Sample
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
