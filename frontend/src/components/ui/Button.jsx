import React from 'react';
import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-emerald-600 text-white hover:opacity-90',
  header: 'bg-gray-400 text-white hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600',
  secondary: 'border border-gray-300 bg-white/70 text-gray-600 hover:bg-white dark:border-gray-600 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10',
  danger: 'bg-red-700 text-white hover:bg-red-800',
  ghost: 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-500/20 dark:hover:text-gray-100',
};

const sizes = {
  sm: 'px-5 py-1.5 text-sm',
  md: 'px-6 py-2 text-sm',
  lg: 'px-7 py-2.5 text-base',
};

export default function Button({
  as = 'button',
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const resolvedClassName = [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  ].join(' ');

  if (to) {
    return (
      <Link to={to} className={resolvedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return React.createElement(as, { className: resolvedClassName, ...props }, children);
}
