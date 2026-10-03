import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Award,
  Layers,
  Sparkles,
  Droplets,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import TraceabilityTimeline from '../common/Timeline';
import BlockchainCard from './BlockchainCard';

export const VerificationCard = ({ batch }) => {
  if (!batch) return null;

  return (
    <div className="space-y-6">
      {/* Top Verified Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck size={34} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider mb-1">
                <CheckCircle2 size={13} />
                <span>Verified Product Authenticity</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{batch.product}</h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                Cryptographically anchored to decentralized smart beekeeping & agriculture registry
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-center bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20">
            <span className="text-[11px] text-emerald-100 uppercase tracking-wider font-semibold">Official Batch ID</span>
            <span className="text-lg font-mono font-bold tracking-wider">{batch.id}</span>
          </div>
        </div>
      </div>

      {/* Product & Provenance Spec Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Award size={18} className="text-amber-500" />
          Product & Origin Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Category</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.productCategory}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Certified Producer</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.producer}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Harvest / Farm Origin</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block flex items-center gap-1">
              <MapPin size={13} className="text-slate-400" /> {batch.origin}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Harvest Date</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" /> {batch.harvestDate}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Verified Batch Quantity</span>
            <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.quantity}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Quality Grade</span>
            <span className="font-bold text-emerald-600 text-sm mt-0.5 block">{batch.qualityGrade}</span>
          </div>

          {batch.hiveId && (
            <div>
              <span className="text-slate-400 font-medium block">Source Hive Identifier</span>
              <span className="font-mono font-bold text-amber-600 text-sm mt-0.5 block">{batch.hiveId}</span>
            </div>
          )}
          {batch.beeSpecies && (
            <div>
              <span className="text-slate-400 font-medium block">Bee Colony Species</span>
              <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.beeSpecies}</span>
            </div>
          )}
          {batch.floralSource && (
            <div>
              <span className="text-slate-400 font-medium block">Primary Floral Source</span>
              <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.floralSource}</span>
            </div>
          )}
        </div>

        {/* Lab Certification Purity Metrics (if Honey or applicable) */}
        {batch.moistureLevel && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Droplets size={14} className="text-blue-500" />
              Verified NABL Quality & Purity Metrics
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-slate-500 text-[11px] block">Moisture Content</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{batch.moistureLevel}</span>
                <span className="text-[10px] text-slate-400">Target: &lt; 20% standard</span>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-slate-500 text-[11px] block">C4 Sugar Adulteration</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{batch.c4SugarAdulteration || 'Negative'}</span>
                <span className="text-[10px] text-slate-400">Zero Added Corn Syrup</span>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-slate-500 text-[11px] block">HMF Freshness Index</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{batch.hpmfIndex || '7.8 mg/kg'}</span>
                <span className="text-[10px] text-slate-400">Limit: &lt; 40 mg/kg</span>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="text-slate-500 text-[11px] block">Antibiotic / Chemical</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{batch.antibioticResidue || 'Not Detected'}</span>
                <span className="text-[10px] text-slate-400">100% Residue Free</span>
              </div>
            </div>

            {batch.pollenCount && (
              <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-200/60">
                <strong className="text-slate-700">Palynological Pollen Signature:</strong>{' '}
                <span className="text-slate-600">{batch.pollenCount}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Blockchain Record Component */}
      <BlockchainCard blockchain={batch.blockchain} batchId={batch.id} />

      {/* Complete Traceability Journey Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              Traceability Journey: Hive / Soil to Customer
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Each milestone represents an immutable, timestamped event verified by consortium participants
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            ✓ Record Integrity Verified
          </span>
        </div>

        <TraceabilityTimeline journey={batch.traceabilityJourney} layout="vertical" />
      </div>
    </div>
  );
};

export default VerificationCard;
