import React from 'react';

const Roadmap = () => {
  const steps = [
    { title: 'Fase 1: Autenticação Básica', description: 'Login, Registro e Proteção de Rotas (Agora)', status: 'current' },
  ];

  return (
    <section id="roadmap" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Roadmap do Projeto</h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-8 last:mb-0">
              <div className="flex flex-col items-center mr-6">
                <div className={`w-4 h-4 rounded-full ${step.status === 'current' ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                {index < steps.length - 1 && <div className="w-1 h-full bg-gray-200 mt-1"></div>}
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${step.status === 'current' ? 'text-indigo-600' : 'text-gray-700'}`}>
                  {step.title} {step.status === 'current' && <span className="text-sm font-normal text-indigo-500">(Em desenvolvimento)</span>}
                </h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
); };

export default Roadmap;