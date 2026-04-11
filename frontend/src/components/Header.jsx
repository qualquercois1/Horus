import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BrandMark from './BrandMark';
import ThemeToggle from './ThemeToggle';
import Button from './ui/Button';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/games/roulette', label: 'Roleta' },
  { to: '/dashboard', label: 'Carteira' },
  { to: '/about', label: 'Sobre' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-400 bg-[#d2d5db] dark:border-gray-500 dark:bg-[#474554]">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <BrandMark to="/" />

        <button
          type="button"
          className="rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white/30 dark:text-gray-200 dark:hover:bg-white/10 md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-label="Abrir menu"
        >
          Menu
        </button>

        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `text-gray-500 transition-colors duration-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 ${
                isActive ? 'border-b border-gray-700 text-gray-700 dark:border-gray-100 dark:text-gray-100' : ''
              }`}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center space-x-4 border-l border-gray-400/50 pl-4 dark:border-gray-400/20">
            <ThemeToggle />
            <Button to="/login" variant="header" size="sm">
              Entrar
            </Button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-gray-400/50 px-6 py-4 dark:border-gray-400/20 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) => `rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/40 text-gray-700 dark:bg-white/10 dark:text-gray-100'
                    : 'text-gray-500 hover:bg-white/30 dark:text-gray-300 dark:hover:bg-white/10'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/login" variant="header" size="sm" className="mt-2" onClick={closeMenu}>
              Entrar
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
