import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 dark:text-white">
          Horus Hero Provisório
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto dark:text-gray-300">
          dweoqdn ewioqrew ewq ewqdefweq ewqodweq e fdewqfew fewqfe ewqfweqfewq few fewqfew.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
            Começar Agora
          </Link>
          <a href="#roadmap" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border border-indigo-200 dark:border-indigo-600 hover:bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 transition">
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
); };

export default Hero;