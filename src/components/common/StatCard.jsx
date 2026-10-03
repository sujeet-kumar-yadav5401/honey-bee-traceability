import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendDirection = 'up',
  color = 'amber',
  onClick
}) => {
  const colorStyles = {
    amber: {
      bg: 'bg-amber-500/10 text-amber-600',
      border: 'hover:border-amber-400',
      highlight: 'from-amber-500/5 to-transparent'
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-600',
      border: 'hover:border-emerald-400',
      highlight: 'from-emerald-500/5 to-transparent'
    },
    blue: {
      bg: 'bg-blue-500/10 text-blue-600',
      border: 'hover:border-blue-400',
      highlight: 'from-blue-500/5 to-transparent'
    },
    purple: {
      bg: 'bg-purple-500/10 text-purple-600',
      border: 'hover:border-purple-400',
      highlight: 'from-purple-500/5 to-transparent'
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-600',
      border: 'hover:border-rose-400',
      highlight: 'from-rose-500/5 to-transparent'
    }
  };

  const currentTheme = colorStyles[color] || colorStyles.amber;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs transition-all duration-200 hover:shadow-md ${
        currentTheme.border
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.highlight} pointer-events-none`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{title}</p>
          <h3 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
          
          <div className="mt-2.5 flex items-center gap-2">
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-semibold ${
                  trendDirection === 'up' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trendDirection === 'up' ? (
                  <ArrowUpRight size={14} className="mr-0.5" />
                ) : (
                  <ArrowDownRight size={14} className="mr-0.5" />
                )}
                {trend}
              </span>
            )}
            {subtext && <span className="text-xs text-slate-500">{subtext}</span>}
          </div>
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl ${currentTheme.bg} shrink-0`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
