import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, AlertCircle, ShieldCheck, XCircle } from 'lucide-react';

const statusConfig = {
  // Batch & Verification Statuses
  'Verified': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    icon: ShieldCheck,
    label: 'Blockchain Verified'
  },
  'Processing': {
    bg: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20',
    icon: Clock,
    label: 'Processing'
  },
  'Pending': {
    bg: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    icon: Clock,
    label: 'Pending'
  },
  'Failed': {
    bg: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
    icon: XCircle,
    label: 'Verification Failed'
  },

  // Hive Statuses
  'Healthy': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    icon: CheckCircle2,
    label: 'Healthy Colony'
  },
  'Attention Required': {
    bg: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    icon: AlertTriangle,
    label: 'Attention Required'
  },
  'Inspection Due': {
    bg: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20',
    icon: AlertCircle,
    label: 'Inspection Due'
  },

  // General Statuses
  'Active': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
    icon: CheckCircle2,
    label: 'Active'
  },
  'Strong': {
    bg: 'bg-green-50 text-green-700 border-green-200 ring-green-500/20',
    icon: CheckCircle2,
    label: 'Strong'
  },
  'Moderate': {
    bg: 'bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-500/20',
    icon: AlertTriangle,
    label: 'Moderate'
  }
};

export const StatusBadge = ({ status, customLabel, size = 'sm', showIcon = true }) => {
  const config = statusConfig[status] || {
    bg: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20',
    icon: CheckCircle2,
    label: status
  };

  const Icon = config.icon;
  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-sm' : size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  const iconSize = size === 'lg' ? 16 : size === 'xs' ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ring-1 ${config.bg} ${sizeClasses}`}
    >
      {showIcon && <Icon size={iconSize} className="shrink-0" />}
      <span>{customLabel || config.label || status}</span>
    </span>
  );
};

export default StatusBadge;
