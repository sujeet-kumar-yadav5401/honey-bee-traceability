import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

export const DataTable = ({
  columns = [],
  data = [],
  title,
  subtitle,
  searchPlaceholder = 'Search records...',
  searchKey = 'id',
  actions,
  onRowClick,
  emptyMessage = 'No records found'
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return Object.values(item).some(val => {
      if (typeof val === 'string' || typeof val === 'number') {
        return String(val).toLowerCase().includes(term);
      }
      return false;
    });
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header and Search toolbar */}
      {(title || searchPlaceholder || actions) && (
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-bold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {searchPlaceholder && (
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full sm:w-64 pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                />
              </div>
            )}
            {actions}
          </div>
        </div>
      )}

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className={`py-3.5 px-4 sm:px-6 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              {onRowClick && <th className="py-3.5 px-4 w-10"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-amber-50/30 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`py-3.5 px-4 sm:px-6 ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {onRowClick && (
                    <td className="py-3.5 px-4 text-right text-slate-400">
                      <ChevronRight size={16} />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onRowClick ? 1 : 0)}
                  className="py-12 text-center text-slate-400 text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong>{filteredData.length}</strong> of <strong>{data.length}</strong> entries</span>
        <span className="text-[11px] text-slate-400">All data synchronized with local mock store</span>
      </div>
    </div>
  );
};

export default DataTable;
