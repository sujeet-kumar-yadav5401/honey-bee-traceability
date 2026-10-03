import React, { useState } from 'react';
import { BarChart3, PieChart as PieIcon, Activity, TrendingUp } from 'lucide-react';

export const ProductionBarChart = ({ data = [] }) => {
  const [activeBar, setActiveBar] = useState(null);
  const maxVal = Math.max(...data.map(d => d.honeyKg || 0), 160);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 size={18} className="text-amber-500" />
            Honey Production Trends (KG)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">Monthly yield across registered smart apiary hives</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-amber-600 to-amber-400" />
            <span className="text-slate-600">Honey Yield</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-200" />
            <span className="text-slate-500">Benchmark Avg</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart with Hover Tooltip */}
      <div className="relative h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
        {data.map((item, idx) => {
          const heightPercent = Math.round((item.honeyKg / maxVal) * 100);
          const isHovered = activeBar === idx;

          return (
            <div
              key={item.month}
              className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setActiveBar(idx)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 z-10 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
                  {item.month}: {item.honeyKg} KG
                  <div className="text-[10px] text-amber-300 font-normal">IoT Superframe Log</div>
                </div>
              )}

              {/* Benchmark ghost bar */}
              <div
                className="w-full max-w-[36px] bg-slate-100 rounded-t-lg absolute bottom-0"
                style={{ height: '55%' }}
              />

              {/* Active honey bar */}
              <div
                className={`relative w-full max-w-[36px] rounded-t-lg transition-all duration-300 bg-gradient-to-t ${
                  isHovered ? 'from-amber-600 to-amber-400 shadow-md ring-2 ring-amber-400/50' : 'from-amber-500 to-amber-300'
                }`}
                style={{ height: `${Math.max(heightPercent, 12)}%` }}
              >
                <div className="w-full h-1.5 bg-amber-200/50 rounded-t-lg" />
              </div>

              {/* X Axis Label */}
              <span className={`mt-3 text-xs font-semibold ${isHovered ? 'text-amber-600' : 'text-slate-500'}`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <TrendingUp size={14} /> +24% increase in September peak floral flow
        </span>
        <span>Peak Season: Aug - Oct</span>
      </div>
    </div>
  );
};

export const HiveHealthDonutChart = ({ healthy = 10, attention = 1, inspectionDue = 1 }) => {
  const total = healthy + attention + inspectionDue;
  const healthyPct = Math.round((healthy / total) * 100);
  const attentionPct = Math.round((attention / total) * 100);
  const duePct = 100 - healthyPct - attentionPct;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Activity size={18} className="text-emerald-500" />
            Hive Colony Health
          </h4>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
            {healthyPct}% Healthy
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-6">Real-time IoT temperature, humidity & acoustical telemetry</p>
      </div>

      <div className="flex items-center justify-center py-2">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth="3.5"
            />
            {/* Healthy arc */}
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeDasharray={`${healthyPct} ${100 - healthyPct}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Attention arc */}
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeDasharray={`${attentionPct} ${100 - attentionPct}`}
              strokeDashoffset={`-${healthyPct}`}
              strokeLinecap="round"
            />
            {/* Due arc */}
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke="#a855f7"
              strokeWidth="3.5"
              strokeDasharray={`${duePct} ${100 - duePct}`}
              strokeDashoffset={`-${healthyPct + attentionPct}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{total}</span>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Hives</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 bg-emerald-50/50 rounded-xl border border-emerald-100">
          <div className="font-bold text-emerald-700">{healthy}</div>
          <div className="text-[11px] text-slate-600">Healthy</div>
        </div>
        <div className="p-2 bg-amber-50/50 rounded-xl border border-amber-100">
          <div className="font-bold text-amber-700">{attention}</div>
          <div className="text-[11px] text-slate-600">Attention</div>
        </div>
        <div className="p-2 bg-purple-50/50 rounded-xl border border-purple-100">
          <div className="font-bold text-purple-700">{inspectionDue}</div>
          <div className="text-[11px] text-slate-600">Due</div>
        </div>
      </div>
    </div>
  );
};

export const BatchStatusDonutChart = ({ verified = 25, processing = 2, pending = 1 }) => {
  const total = verified + processing + pending;
  const verifiedPct = Math.round((verified / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <PieIcon size={18} className="text-indigo-500" />
            Batch Verification Status
          </h4>
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
            {verifiedPct}% Anchored
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">Cryptographic proof records on consortium ledger</p>
      </div>

      <div className="space-y-3.5 my-2">
        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Verified & Sealed
            </span>
            <span className="text-slate-900 font-bold">{verified} batches ({verifiedPct}%)</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${verifiedPct}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              In Processing / Testing
            </span>
            <span className="text-slate-900 font-bold">{processing} batches</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(processing / total) * 100}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Pending Quality Clearance
            </span>
            <span className="text-slate-900 font-bold">{pending} batch</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${(pending / total) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
        <span>Total Registered: <strong className="text-slate-800">{total} Batches</strong></span>
        <span className="text-emerald-600 font-semibold">Zero Fraud Records</span>
      </div>
    </div>
  );
};
