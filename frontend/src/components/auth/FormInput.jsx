// import React from "react";

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  icon: Icon
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-white">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full py-2.5 text-xs sm:text-sm bg-transparent placeholder-slate-400 focus:outline-none ${
            Icon ? "pl-9 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
}