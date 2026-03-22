import React from 'react';

const Hero = () => {
  return (
    <section className="flex items-center justify-center p-12">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-display font-bold text-gray-500 dark:text-gray-300 tracking-wider">
          HORUS
        </h1>
        <p className="text-gray-400 mt-3 text-md font-sans">
          Estudo e aprimoramento técnico de arquitetura, segurança, concorrência e engenharia de software full-stack.
        </p>

        <p className="text-lg mt-6 text-gray-400 leading-relaxed">
          Segurança | Infraestrutura | Consistência | Insights | Modelagem | Otimização
        </p>

      </div>
    </section>
); };

export default Hero;