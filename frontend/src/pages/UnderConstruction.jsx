import React from 'react';
import Button from '../components/ui/Button';
import { Page } from '../components/ui/Page';

const UnderConstruction = () => {
  return (
    <Page size="md" className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full text-center">
        <div className="mb-8 flex justify-center">
          <svg
            className="relative z-10 h-24 w-24 text-gray-500 dark:text-gray-300"
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

        <h1 className="mb-6 text-4xl font-light tracking-tight text-gray-500 dark:text-gray-300">
          Sob construcao...
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
          Estamos preparando esta pagina com calma. Volte em breve.
        </p>
        <Button to="/" variant="secondary" className="mt-8">
          Voltar ao inicio
        </Button>
      </div>
    </Page>
  );
};

export default UnderConstruction;
