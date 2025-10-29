import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600 flex items-center">
          <span>Horus Header</span>
        </div>
        <nav className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition">
            Login
          </Link>
          <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition font-medium">
            Criar Conta
          </Link>
        </nav>
      </div>
    </header>
); };

export default Header;