import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Scale,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Boxes,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import TraceabilityTimeline from '../components/common/Timeline';

export const HiveDetailPage = () => {
  const { id } = useParams();
  const { hives, batches, harvests } = useApp();
  const navigate = useNavigate();

  const hive = hives.find(h => h.id === id) || hives[0];

  // Related batches and harvests
  const relatedBatches = batches.filter(b => b.hiveId === hive.id || b.hiveId?.includes(hive.id));
  const relatedHarvests = harvests.filter(h => h.hiveId === hive.id);

  // Construct hive lifecycle timeline
  const hiveTimeline = [
    {
      step: 1,
      title: 'Hive Installed & Colonized',
      actor: 'Apiary Installation Team',
      location: hive.location,
      timestamp: `${hive.installationDate} 08:30 IST`,
      status: 'Completed',
      details: `Initialized with ${hive.framesCount || 10} frames, ${hive.beeSpecies}, and ${hive.queenStatus}.`
    },
    ...(hive.inspections || []).map((insp, idx) => ({
      step: idx + 2,
      title: `Routine Inspection (${insp.status})`,
      actor: insp.inspector,
      location: hive.location,
      timestamp: `${insp.date} 10:00 IST`,
      status: 'Completed',
      details: `Brood condition: ${insp.broodStatus}. Stores: ${insp.stores}. Parasite count: ${insp.parasiteCount}.`
    })),
    {
      step: (hive.inspections?.length || 0) + 2,
      title: 'Honey Super Harvest Record',
      actor: 'Certified Master Beekeeper',
      location: hive.location,
      timestamp: hive.lastInspection + ' 11:30 IST',
      status: 'Completed',
      details: `Harvested ${hive.honeyProducedKg || 95} KG raw honey. Sealed frames cold uncapped.`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back button & quick actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/hives"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Hives</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/harvest/create?hiveId=${hive.id}`}
            className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>Record Harvest for this Hive</span>
          </Link>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              {hive.id}
            </span>
            <h1 className="text-2xl font-bold text-slate-900">{hive.name}</h1>
            <StatusBadge status={hive.healthStatus} />
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span>{hive.location}</span>
          </p>
        </div>

        {/* Live IoT Telemetry Pill */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200/60 self-start md:self-auto text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Temperature</span>
            <span className="font-bold text-amber-600 flex items-center gap-1">
              <Thermometer size={14} /> {hive.temperature || '34.8°C'}
            </span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 text-[11px] block">Humidity</span>
            <span className="font-bold text-blue-600 flex items-center gap-1">
              <Droplets size={14} /> {hive.humidity || '58%'}
            </span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 text-[11px] block">Scale Weight</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <Scale size={14} /> {hive.hiveWeight || '42.5 KG'}
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column layout: Overview & Lifecycle Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hive Overview & Honey Production */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Hive Overview */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Layers size={18} className="text-amber-500" />
              Hive Overview & Colony Biology
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Bee Species</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{hive.beeSpecies}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Queen Status</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{hive.queenStatus}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Colony Strength</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{hive.colonyStrength}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Installation Date</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{hive.installationDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Frames Count</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{hive.framesCount || 10} Frames</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Last Inspection</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{hive.lastInspection}</span>
              </div>
            </div>

            {hive.notes && (
              <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs">
                <strong className="text-amber-900">Beekeeper Notes: </strong>
                <span className="text-slate-700">{hive.notes}</span>
              </div>
            )}
          </div>

          {/* Section 2: Honey Production & Cumulative Yield */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale size={18} className="text-emerald-500" />
                Honey Production Records
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Lifetime Yield: {hive.honeyProducedKg || 95} KG
              </span>
            </div>

            {relatedHarvests.length > 0 ? (
              <div className="space-y-3">
                {relatedHarvests.map(hrv => (
                  <div
                    key={hrv.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{hrv.honeyType}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          {hrv.quantity} {hrv.unit}
                        </span>
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Floral Source: {hrv.floralSource} • Moisture: {hrv.moistureLevel}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block">{hrv.harvestDate}</span>
                      <span className="font-mono text-emerald-600 font-semibold">{hrv.initialQuality}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3">No individual harvest record registered yet.</p>
            )}
          </div>

          {/* Section 3: Inspection History */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-indigo-500" />
              Inspection History
            </h3>

            <div className="divide-y divide-slate-100">
              {(hive.inspections || []).map((insp, idx) => (
                <div key={idx} className="py-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 block">{insp.date} • Inspector: {insp.inspector}</span>
                    <span className="text-slate-500">
                      Brood: {insp.broodStatus} | Stores: {insp.stores} | Parasites: {insp.parasiteCount}
                    </span>
                  </div>
                  <StatusBadge status={insp.status} size="xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hive Lifecycle Timeline & Related Batches */}
        <div className="space-y-6">
          {/* Timeline: Hive Installed -> Inspection -> Honey Harvest */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" />
              Hive Lifecycle Timeline
            </h3>

            <TraceabilityTimeline journey={hiveTimeline} layout="vertical" />
          </div>

          {/* Related Honey Batches */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Boxes size={18} className="text-amber-500" />
              Related Honey Batches
            </h3>

            {relatedBatches.length > 0 ? (
              <div className="space-y-3">
                {relatedBatches.map(b => (
                  <Link
                    key={b.id}
                    to={`/batches/${b.id}`}
                    className="block p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 transition-all text-xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-700">{b.id}</span>
                      <StatusBadge status={b.status} size="xs" />
                    </div>
                    <div className="text-slate-800 font-semibold mt-1 group-hover:text-amber-600 transition-colors">
                      {b.product}
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Quantity: {b.quantity} • Harvested {b.harvestDate}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No batches linked directly to this hive yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiveDetailPage;
