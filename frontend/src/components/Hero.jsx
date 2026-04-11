import React from 'react';
import BrandMark from './BrandMark';
import Button from './ui/Button';
import { Page } from './ui/Page';

const Hero = () => {
  return (
    <Page className="flex min-h-[calc(100vh-9rem)] items-center justify-center">
      <div className="max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <BrandMark to={null} />
        </div>
        <p className="mb-3 text-sm font-medium text-gray-400">
          Local-first
        </p>
        <h1 className="text-4xl font-light leading-tight tracking-tight text-gray-700 dark:text-gray-300 sm:text-5xl">
          Saldo local. Jogo auditavel. Interface pronta para crescer.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
          Carteira, transacoes e roleta em uma base simples para evoluir com seguranca.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/games/roulette" size="lg">
            Roleta
          </Button>
          <Button to="/dashboard" variant="secondary" size="lg">
            Carteira
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default Hero;
