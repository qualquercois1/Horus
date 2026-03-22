import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/about', label: 'Sobre' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#d2d5db] dark:bg-[#474554] border-b border-gray-400 dark:border-gray-500">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center space-x-3 group"
          onClick={closeMenu}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
            <svg
              className="w-12 h-12"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#474554" />
                  <stop offset="100%" stopColor="#282634" />
                </radialGradient>

                <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bfbfbf" />
                  <stop offset="100%" stopColor="#8b8b8b" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" />

              <path
                d="
                  M60 20
                  A30 30 0 1 0 60 80
                  A22 22 0 1 1 60 20
                "
                fill="url(#moonGradient)"
                filter="url(#glow)"
              />

              <circle cx="70" cy="30" r="2" fill="#fff" opacity="0.8" />
              <circle cx="30" cy="70" r="1.5" fill="#fff" opacity="0.6" />
            </svg>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300 ${
                  isActive ? 'text-gray-700 dark:text-gray-100 border-b-1 border-gray-700 dark:border-gray-100' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-400/50 dark:border-gray-400/20">
            <ThemeToggle />

            <NavLink
              to="/login"
              className="bg-gray-400 hover:bg-gray-500 font-display text-white px-6 py-1 rounded-full transition-all duration-300 transform"
            >
              Entrar
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
); };

export default Header;