import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Hero Provisório Horus
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Horus oferece blablsmkasds wei e ewqo we reqw riewqjiorew jqiorwqr ejwqoi rjeqwio rewq
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
            Começar Agora
          </Link>
          <a href="#roadmap" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border border-indigo-600 hover:bg-indigo-50 transition">
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
); };

export default Hero;