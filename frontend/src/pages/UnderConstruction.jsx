import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="max-w-2xl w-full text-center">

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <svg
              className="w-24 h-24 text-gray-500 dark:text-gray-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 3h7l3 3v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                opacity="0.4"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5h7l3 3v11a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z"
              />

              <path
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M11 11h6M11 14h4"
              />
            </svg>  
          </div>
        </div>

        <h1 className="text-4xl font-display font-semibold mb-6 text-gray-500 dark:text-gray-300 tracking-wider">
          Sob construção...
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Oops! Estamos, ainda, em andamento com esta página, com todo o cuidado. Por favor, retorne em breve, logo tudo estará pronto.
        </p>
        
      </div>
    </div>
); };

export default UnderConstruction;