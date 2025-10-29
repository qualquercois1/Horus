import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = { name: 'Visitante', email: 'visitante@exemplo.com' };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Dashboard</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Oi, {user.name}</span>
              <Link to="/" className="text-sm text-red-600 hover:text-red-800">Sair</Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center text-gray-500">
              Área restrita para usuários autenticados.
            </div>
          </div>
        </div>
      </main>
    </div>
); };

export default Dashboard;