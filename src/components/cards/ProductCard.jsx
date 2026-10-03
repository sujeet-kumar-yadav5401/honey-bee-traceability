import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, MapPin, CheckCircle, ChevronRight, Award } from 'lucide-react';

export const ProductCard = ({ product }) => {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
        product.isPrimary
          ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-amber-300 ring-2 ring-amber-500/10'
          : 'bg-white border-slate-200/80'
      }`}
    >
      <div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-2 rounded-xl bg-slate-100 group-hover:scale-110 transition-transform">
              {product.icon}
            </span>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {product.category}
              </span>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {product.name}
              </h4>
            </div>
          </div>

          {product.badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                product.isPrimary
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Origin & Producer */}
        <div className="text-xs text-slate-500 space-y-1 mb-3">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">{product.origin}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Award size={13} className="text-amber-500 shrink-0" />
            <span className="truncate">{product.producer}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Standards Tags */}
        {product.standards && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.standards.map((std, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <CheckCircle size={10} />
                {std}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats and Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-500">
          <span><strong className="text-slate-800">{product.totalBatches}</strong> Batches</span>
          <span>•</span>
          <span><strong className="text-slate-800">{product.activeProducers}</strong> Farms</span>
        </div>

        <Link
          to={`/batches/create?category=${encodeURIComponent(product.category)}`}
          className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700 group-hover:translate-x-0.5 transition-all"
        >
          <span>Create Batch</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
