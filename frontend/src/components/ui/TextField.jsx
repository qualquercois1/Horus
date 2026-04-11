import React from 'react';

export default function TextField({ label, className = '', ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-500 dark:text-gray-300">
        {label}
      </span>
      <input
        className={[
          'mt-2 w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-gray-600 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 dark:border-gray-500 dark:bg-white/5 dark:text-gray-300 dark:placeholder:text-gray-500 dark:focus:border-gray-300',
          className,
        ].join(' ')}
        {...props}
      />
    </label>
  );
}
