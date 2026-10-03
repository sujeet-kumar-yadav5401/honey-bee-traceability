import React from 'react';

export const FormInput = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  error,
  disabled = false,
  className = '',
  icon: Icon
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full text-xs py-2.5 rounded-xl border transition-all duration-200 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-400 ${
            Icon ? 'pl-9 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 bg-rose-50/20'
              : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 text-slate-800 bg-white hover:border-slate-300'
          }`}
        />
      </div>

      {helperText && !error && <p className="text-[11px] text-slate-400">{helperText}</p>}
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};

export const SelectInput = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  helperText,
  error,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border bg-white transition-all duration-200 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-400 ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900'
            : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 text-slate-800 hover:border-slate-300'
        }`}
      >
        {options.map((opt, i) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={i} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>

      {helperText && !error && <p className="text-[11px] text-slate-400">{helperText}</p>}
      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
};

export default FormInput;
