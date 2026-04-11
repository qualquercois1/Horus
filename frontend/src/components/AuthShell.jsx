import React from 'react';
import BrandMark from './BrandMark';
import { Page, Panel, SectionHeader } from './ui/Page';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <Page size="sm" className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full">
        <div className="mb-6 flex justify-center">
          <BrandMark to={null} />
        </div>
        <SectionHeader align="center" title={title}>
          {subtitle}
        </SectionHeader>
        <Panel>{children}</Panel>
        {footer && (
          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
            {footer}
          </p>
        )}
      </div>
    </Page>
  );
}
