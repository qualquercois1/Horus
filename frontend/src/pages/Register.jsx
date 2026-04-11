import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import Button from '../components/ui/Button';
import Notice from '../components/ui/Notice';
import TextField from '../components/ui/TextField';
import { API_URL } from '../config/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas nao coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha precisa ter no minimo 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Erro ao criar conta.');
        return;
      }

      navigate('/login');
    } catch {
      setError('Erro de conexao com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Comece com uma carteira ficticia local."
      footer={(
        <>
          Ja possui uma conta?{' '}
          <Link to="/login" className="font-medium text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            Entrar
          </Link>
        </>
      )}
    >
      {error && <Notice tone="error" className="mb-5">{error}</Notice>}

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Nome"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            required
          />
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimo 6 caracteres"
            required
          />
          <TextField
            label="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repita a senha"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Criando...' : 'Criar conta'}
        </Button>
      </form>
    </AuthShell>
  );
}
