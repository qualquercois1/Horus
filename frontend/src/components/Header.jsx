import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
          <span>Horus Header</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <nav className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 font-medium transition ml-10">
              Login
            </Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition font-medium">
              Criar Conta
            </Link>
          </nav>
        </div>
      </div>
    </header>
); };

export default Header;