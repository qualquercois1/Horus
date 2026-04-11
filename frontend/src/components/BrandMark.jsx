import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  const svgId = React.useId().replace(/:/g, '');
  const bgId = `brandBgGradient${svgId}`;
  const moonId = `brandMoonGradient${svgId}`;
  const glowId = `brandGlow${svgId}`;

  return (
    <svg
      className="h-12 w-12"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#474554" />
          <stop offset="100%" stopColor="#282634" />
        </radialGradient>
        <linearGradient id={moonId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bfbfbf" />
          <stop offset="100%" stopColor="#8b8b8b" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${bgId})`} />
      <path
        d="M60 20 A30 30 0 1 0 60 80 A22 22 0 1 1 60 20"
        fill={`url(#${moonId})`}
        filter={`url(#${glowId})`}
      />
      <circle cx="70" cy="30" r="2" fill="#fff" opacity="0.8" />
      <circle cx="30" cy="70" r="1.5" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export default function BrandMark({ to = '/', showName = false }) {
  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:rotate-180">
        <Logo />
      </span>
      {showName && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Horus
        </span>
      )}
    </>
  );

  if (!to) {
    return <div className="inline-flex items-center gap-3">{content}</div>;
  }

  return (
    <Link to={to} className="group inline-flex items-center gap-3">
      {content}
    </Link>
  );
}
