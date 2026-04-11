import React from 'react';
import { Panel } from './Page';

export function ListPanel({ title, empty, children }) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <Panel>
      <h2 className="text-lg font-light tracking-tight text-gray-700 dark:text-gray-300">
        {title}
      </h2>
      <div className="mt-4 space-y-3">
        {hasChildren ? children : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {empty}
          </p>
        )}
      </div>
    </Panel>
  );
}

export function ListItem({ title, meta, value, tone = 'default' }) {
  const tones = {
    default: 'text-gray-600 dark:text-gray-300',
    positive: 'text-emerald-700 dark:text-emerald-300',
    negative: 'text-red-700 dark:text-red-300',
  };

  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-200 pb-3 last:border-b-0 last:pb-0 dark:border-gray-700">
      <div className="min-w-0">
        <p className="truncate font-medium text-gray-600 dark:text-gray-300">{title}</p>
        {meta && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{meta}</p>
        )}
      </div>
      {value && (
        <p className={`whitespace-nowrap font-medium ${tones[tone]}`}>
          {value}
        </p>
      )}
    </div>
  );
}
