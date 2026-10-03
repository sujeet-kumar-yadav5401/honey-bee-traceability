import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  QrCode,
  Flame,
  FileCheck
} from 'lucide-react';

const getStepIcon = (title = '') => {
  const lower = title.toLowerCase();
  if (lower.includes('hive') || lower.includes('source') || lower.includes('origin')) return Layers;
  if (lower.includes('harvest') || lower.includes('plucked')) return Sparkles;
  if (lower.includes('processing') || lower.includes('settling') || lower.includes('drying')) return Flame;
  if (lower.includes('quality') || lower.includes('testing') || lower.includes('lab') || lower.includes('inspection')) return FileCheck;
  if (lower.includes('pack') || lower.includes('bottl')) return Package;
  if (lower.includes('blockchain') || lower.includes('ledger') || lower.includes('anchor')) return ShieldCheck;
  if (lower.includes('qr') || lower.includes('customer') || lower.includes('verif')) return QrCode;
  return CheckCircle2;
};

export const TraceabilityTimeline = ({
  journey = [],
  layout = 'vertical', // 'vertical' or 'horizontal'
  interactive = true
}) => {
  const [activeStep, setActiveStep] = useState(null);

  if (!journey || journey.length === 0) {
    return <div className="text-center text-sm text-slate-500 py-6">No traceability events recorded yet.</div>;
  }

  if (layout === 'horizontal') {
    return (
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[760px] flex items-start justify-between relative px-4 pt-6">
          {/* Connecting line */}
          <div className="absolute top-11 left-10 right-10 h-0.5 bg-slate-200 -z-0" />
          
          {journey.map((item, index) => {
            const Icon = getStepIcon(item.title);
            const isCompleted = item.status === 'Completed';
            const isActive = item.status === 'Active' || item.status === 'In Progress';
            const isSelected = activeStep === index;

            return (
              <div
                key={index}
                onClick={() => interactive && setActiveStep(isSelected ? null : index)}
                className={`relative z-10 flex flex-col items-center text-center max-w-[120px] group ${
                  interactive ? 'cursor-pointer' : ''
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 border-2 ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm ring-4 ring-emerald-50'
                      : isActive
                      ? 'bg-amber-500 border-amber-600 text-white shadow-sm animate-pulse ring-4 ring-amber-50'
                      : 'bg-white border-slate-300 text-slate-400'
                  } ${isSelected ? 'scale-110 ring-4 ring-indigo-400' : ''}`}
                >
                  <Icon size={18} />
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.timestamp?.split(' ')[0] || ''}</div>
                  <span
                    className={`mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : isActive
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected step details banner */}
        {activeStep !== null && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 animate-fade-in">
            <div className="font-bold text-slate-900 text-sm">{journey[activeStep].title}</div>
            <div className="text-slate-600 flex items-center gap-2">
              <MapPin size={13} className="text-slate-400" /> {journey[activeStep].location}
            </div>
            <div className="text-slate-600 flex items-center gap-2">
              <User size={13} className="text-slate-400" /> {journey[activeStep].actor}
            </div>
            <p className="text-slate-700 pt-1 font-medium">{journey[activeStep].details}</p>
          </div>
        )}
      </div>
    );
  }

  // Vertical timeline
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {journey.map((item, index) => {
        const Icon = getStepIcon(item.title);
        const isCompleted = item.status === 'Completed';
        const isActive = item.status === 'Active' || item.status === 'In Progress';

        return (
          <div key={index} className="relative group">
            {/* Timeline node icon */}
            <div
              className={`absolute -left-6 top-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform duration-200 group-hover:scale-110 ${
                isCompleted
                  ? 'bg-emerald-500 border-white text-white shadow-xs'
                  : isActive
                  ? 'bg-amber-500 border-white text-white shadow-xs ring-4 ring-amber-100'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              <Icon size={13} />
            </div>

            {/* Event Box */}
            <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all duration-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{item.step ? `Step ${item.step}: ` : ''}{item.title}</span>
                </h5>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit ${
                    isCompleted
                      ? 'bg-emerald-100/70 text-emerald-800'
                      : isActive
                      ? 'bg-amber-100/70 text-amber-800'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                {item.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}
                {item.actor && (
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{item.actor}</span>
                  </div>
                )}
              </div>

              {item.details && (
                <p className="text-xs text-slate-700 font-medium bg-white/70 p-2.5 rounded-lg border border-slate-200/50">
                  {item.details}
                </p>
              )}

              {item.timestamp && (
                <div className="mt-2 text-[10px] text-slate-600 font-mono flex items-center gap-1">
                  <Clock size={10} />
                  <span>Recorded: {item.timestamp}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TraceabilityTimeline;
