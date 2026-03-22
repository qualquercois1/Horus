import React, { useState, useEffect } from 'react';

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
    <footer className="relative text-gray-300 pt-16 pb-8">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 text-[#d2d5db] dark:text-[#474554]"
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Horus. Iniciativa{' '} 
            <a
              href="https://github.com/qualquercois1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-500 hover:text-gray-400 transition-colors duration-300"
            >
              Cássio Rodrigues
            </a>{' '}
            e{' '}
            <a
              href="https://github.com/efdourado"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-500 hover:text-gray-400 transition-colors duration-300"
            >
              Eduardo Dourado
            </a>.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-gray-400 transition-colors duration-300">Política de Privacidade</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors duration-300">Termos de Uso</a>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 z-50"
          aria-label="Voltar ao topo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
); };

export default Footer;