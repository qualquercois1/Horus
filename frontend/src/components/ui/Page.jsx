import React from 'react';

export function Page({ children, className = '', size = 'lg' }) {
  const widths = {
    sm: 'max-w-xl',
    md: 'max-w-3xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  };

  return (
    <section className={`mx-auto w-full px-4 py-12 sm:px-6 ${widths[size]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  children,
  action,
  align = 'left',
  className = '',
}) {
  const centered = align === 'center';

  return (
    <header className={`mb-6 border-b border-gray-200 pb-4 py-2 lg:py-4 ${centered ? 'text-center' : ''} ${className}`}>
      <div className={`flex flex-col gap-4 ${centered ? 'items-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
        <div className={centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
          {eyebrow && (
            <p className="mb-3 text-sm font-medium text-gray-400 dark:text-gray-500">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-light leading-tight tracking-tight text-gray-700 dark:text-gray-300 sm:text-5xl">
            {title}
          </h1>
          {children && (
            <p className={`mt-4 text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400 ${centered ? 'mx-auto' : ''}`}>
              {children}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}

export function Panel({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-white/5 ${className}`}>
      {children}
    </div>
  );
}
