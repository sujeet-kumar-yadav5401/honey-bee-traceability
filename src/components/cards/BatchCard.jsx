import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, QrCode, Route, ChevronRight, Scale, ShieldCheck } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const BatchCard = ({ batch }) => {
  const isHoney = batch.productCategory === 'Honey';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {batch.id}
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {isHoney ? '🍯 Honey' : batch.productCategory}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-amber-600 transition-colors">
              {batch.product}
            </h4>
          </div>

          <StatusBadge status={batch.status} />
        </div>

        {/* Origin & Producer */}
        <div className="text-xs text-slate-500 space-y-1 my-3">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{batch.origin}</span>
          </div>
          <div className="text-slate-700 font-medium">
            Producer: <span className="font-semibold">{batch.producer}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs mb-3">
          <div>
            <span className="text-slate-400 text-[11px] block">Batch Quantity</span>
            <span className="font-bold text-slate-800">{batch.quantity}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Quality Grade</span>
            <span className="font-bold text-emerald-700">{batch.qualityGrade}</span>
          </div>
          {batch.moistureLevel && (
            <div>
              <span className="text-slate-400 text-[11px] block">Moisture Content</span>
              <span className="font-semibold text-slate-700">{batch.moistureLevel}</span>
            </div>
          )}
          {batch.hiveId && (
            <div>
              <span className="text-slate-400 text-[11px] block">Source Hive</span>
              <span className="font-semibold text-amber-600">{batch.hiveId}</span>
            </div>
          )}
        </div>

        {/* Blockchain micro tag */}
        {batch.blockchain && batch.status === 'Verified' && (
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-700 bg-indigo-50/70 border border-indigo-100 rounded-lg p-2 font-mono">
            <ShieldCheck size={13} className="shrink-0 text-indigo-600" />
            <span className="truncate">Tx: {batch.blockchain.transactionId?.substring(0, 18)}...</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link
            to={`/traceability?batch=${batch.id}`}
            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title="Inspect Supply Chain Journey"
          >
            <Route size={16} />
          </Link>
          <Link
            to={`/qr?batch=${batch.id}`}
            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title="View QR Code"
          >
            <QrCode size={16} />
          </Link>
        </div>

        <Link
          to={`/batches/${batch.id}`}
          className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>Batch Details</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default BatchCard;
