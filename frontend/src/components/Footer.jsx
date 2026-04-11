import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-8 text-gray-300">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-12 w-full text-[#d2d5db] dark:text-[#474554]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center justify-between pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Horus. Iniciativa{' '}
            <a
              href="https://github.com/qualquercois1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-500 transition-colors duration-300 hover:text-gray-400"
            >
              Cássio Rodrigues
            </a>{' '}
            e{' '}
            <a
              href="https://github.com/efdourado"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-500 transition-colors duration-300 hover:text-gray-400"
            >
              Eduardo Dourado
            </a>.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link to="/privacy" className="transition-colors duration-300 hover:text-gray-400">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="transition-colors duration-300 hover:text-gray-400">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-8 bottom-8 z-50 rounded-lg bg-gray-500 p-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Voltar ao topo"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;
