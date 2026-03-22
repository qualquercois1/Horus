import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, verifique.');
      return;
    } if (password.length < 6) {
      setError('A senha deve conter no mínimo 6 caracteres.');
      return;
  } };

  return (
    <div className="flex items-center justify-center p-3 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl w-full p-9">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-display font-bold text-gray-500 dark:text-gray-300 tracking-wider">
            CRIAR CONTA
          </h2>
          <p className="text-gray-400 mt-3 text-md font-sans">Entre ou crie sua conta para continuar, com e-mail e senha.</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Como quer ser chamado?
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder-gray-500"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                E-mail
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder-gray-500"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Senha
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder-gray-500"
                placeholder="Pelo menos 6 chars"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Confirmar Senha
              </label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder-gray-500"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-300 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-gray-500/80 dark:text-gray-300/80 font-medium mt-5 py-2 rounded-lg transition duration-300 tracking-wide font-display text-sm"
          >
            Crie sua conta Horus
          </button>
        </form>

        <p className="mt-5 text-center text-gray-400 text-sm font-sans">
          Já possui uma conta? <a href="/login" className="text-gray-400 hover:text-gray-500 font-medium transition-colors border-b">Entre aqui</a>
        </p>
      </div>
    </div>
); }