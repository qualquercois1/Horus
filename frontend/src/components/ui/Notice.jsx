import React from 'react';

const tones = {
  error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
  info: 'border-gray-200 bg-white/70 text-gray-600 dark:border-gray-600 dark:bg-white/5 dark:text-gray-300',
  warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100',
};

export default function Notice({ tone = 'info', children, className = '' }) {
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${tones[tone]} ${className}`}>
      {children}
    </div>
  );
}
