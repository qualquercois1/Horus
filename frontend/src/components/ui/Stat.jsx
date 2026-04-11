import React from 'react';

export default function Stat({ label, value, helper, className = '' }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-white/5 ${className}`}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-light tracking-tight text-gray-700 dark:text-gray-200">{value}</p>
      {helper && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
      )}
    </div>
  );
}
