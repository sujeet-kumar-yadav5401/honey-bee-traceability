import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  Layers,
  Sparkles,
  QrCode,
  ShieldCheck,
  Package,
  Route,
  Droplets,
  ExternalLink,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import BlockchainCard from '../components/cards/BlockchainCard';
import TraceabilityTimeline from '../components/common/Timeline';
import QRCodeDisplay from '../components/common/QRCodeDisplay';

export const BatchDetailPage = () => {
  const { id } = useParams();
  const { batches } = useApp();
  const navigate = useNavigate();

  const batch = batches.find(b => b.id === id) || batches[0];
  const isHoney = batch.productCategory === 'Honey';

  return (
    <div className="space-y-6">
      {/* Navigation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          to="/batches"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Batches</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/traceability?batch=${batch.id}`}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Route size={14} />
            <span>Traceability View</span>
          </Link>
          <Link
            to={`/qr?batch=${batch.id}`}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <QrCode size={14} />
            <span>View QR Code</span>
          </Link>
          <Link
            to={`/verify/${batch.id}`}
            className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <ShieldCheck size={14} />
            <span>Customer Verify</span>
          </Link>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              Batch {batch.id}
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {isHoney ? '🍯 Honey Primary' : batch.productCategory}
            </span>
            <StatusBadge status={batch.status} />
          </div>

          <h1 className="text-2xl font-black text-slate-900 mt-2">{batch.product}</h1>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
            <MapPin size={13} className="text-slate-400" />
            <span>{batch.origin}</span>
          </p>
        </div>

        {/* Quantity and Grade Highlight */}
        <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100 self-start md:self-auto text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Batch Quantity</span>
            <span className="text-lg font-bold text-slate-900">{batch.quantity}</span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 text-[11px] block">Quality Grade</span>
            <span className="text-lg font-bold text-emerald-600">{batch.qualityGrade}</span>
          </div>
        </div>
      </div>

      {/* 2-Column layout: Details & Blockchain */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Traceability */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed attributes table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              Batch Specifications & Chronology
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Product</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.product}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Product Category</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.productCategory}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Producer</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.producer}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Origin</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.origin}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Quantity</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{batch.quantity}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Quality Grade</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">{batch.qualityGrade}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Harvest Date</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" /> {batch.harvestDate}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Processing Date</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.processingDate || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Packaging Date</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{batch.packagingDate || 'N/A'}</span>
              </div>
            </div>

            {/* Honey biology parameters if Honey */}
            {isHoney && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Layers size={14} className="text-amber-500" />
                  Beekeeping & Palynological Profile
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-amber-50/40 p-3.5 rounded-xl border border-amber-200/50">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Source Hive</span>
                    <Link to={`/hives/${batch.hiveId}`} className="font-mono font-bold text-amber-700 hover:underline">
                      {batch.hiveId}
                    </Link>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Bee Colony Species</span>
                    <span className="font-semibold text-slate-800">{batch.beeSpecies}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Floral Nectar Source</span>
                    <span className="font-semibold text-slate-800">{batch.floralSource}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Moisture Content</span>
                    <span className="font-bold text-blue-700">{batch.moistureLevel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">C4 Sugar Adulteration</span>
                    <span className="font-bold text-emerald-700">{batch.c4SugarAdulteration || 'Negative'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">HMF Freshness Index</span>
                    <span className="font-bold text-emerald-700">{batch.hpmfIndex || '7.8 mg/kg'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blockchain Record Card (Requirement: Data Hash, Tx ID, Status, Prototype banner) */}
          <BlockchainCard blockchain={batch.blockchain} batchId={batch.id} />

          {/* Traceability Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Route size={18} className="text-amber-500" />
                Visual Traceability Timeline
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                Hive → Harvest → Processing → Quality Check → Packaging → Blockchain → QR
              </span>
            </div>

            <TraceabilityTimeline journey={batch.traceabilityJourney} layout="vertical" />
          </div>
        </div>

        {/* Right 1 Col: Quick QR Preview & Direct Link */}
        <div className="space-y-6">
          <QRCodeDisplay
            batchId={batch.id}
            productName={batch.product}
            size={180}
            showActions={true}
            showBorder={true}
          />

          {/* Packaging Details */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-xs space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Package size={16} className="text-indigo-500" />
              Packaging & Retail Logistics
            </h4>
            <div className="text-slate-600 space-y-1.5">
              <div><strong>Container:</strong> {batch.packagingType}</div>
              <div><strong>Batch Date:</strong> {batch.packagingDate}</div>
              <div><strong>Security:</strong> Tamper-evident holographic QR security band</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetailPage;
