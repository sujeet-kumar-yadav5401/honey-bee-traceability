import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Thermometer, Droplets, Scale, Calendar, ChevronRight, Activity } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const HiveCard = ({ hive }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {hive.id}
              </span>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {hive.name}
              </h4>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
              <MapPin size={13} className="text-slate-400 shrink-0" />
              <span className="truncate">{hive.location}</span>
            </p>
          </div>

          <StatusBadge status={hive.healthStatus} />
        </div>

        {/* Bee Species & Colony Strength */}
        <div className="py-2.5 px-3 bg-slate-50/80 rounded-xl my-3 text-xs space-y-1.5 border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Bee Species:</span>
            <span className="font-semibold text-slate-800">{hive.beeSpecies}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Queen Status:</span>
            <span className="font-semibold text-slate-800">{hive.queenStatus}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Colony Strength:</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
              {hive.colonyStrength}
            </span>
          </div>
        </div>

        {/* IoT Telemetry Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-slate-100">
          <div className="p-1.5">
            <div className="flex items-center justify-center text-amber-500 mb-0.5">
              <Thermometer size={14} />
            </div>
            <div className="font-bold text-slate-800">{hive.temperature}</div>
            <div className="text-[10px] text-slate-400">Brood Temp</div>
          </div>
          <div className="p-1.5 border-x border-slate-100">
            <div className="flex items-center justify-center text-blue-500 mb-0.5">
              <Droplets size={14} />
            </div>
            <div className="font-bold text-slate-800">{hive.humidity}</div>
            <div className="text-[10px] text-slate-400">Humidity</div>
          </div>
          <div className="p-1.5">
            <div className="flex items-center justify-center text-emerald-500 mb-0.5">
              <Scale size={14} />
            </div>
            <div className="font-bold text-slate-800">{hive.hiveWeight}</div>
            <div className="text-[10px] text-slate-400">Weight Scale</div>
          </div>
        </div>
      </div>

      {/* Footer & Link */}
      <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar size={13} className="text-slate-400" />
          Inspected: <strong className="text-slate-700">{hive.lastInspection}</strong>
        </span>

        <Link
          to={`/hives/${hive.id}`}
          className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Details</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default HiveCard;
