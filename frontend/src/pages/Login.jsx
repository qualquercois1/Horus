import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import Button from '../components/ui/Button';
import Notice from '../components/ui/Notice';
import TextField from '../components/ui/TextField';
import { API_URL } from '../config/api';
import { saveSession } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Erro ao entrar.');
        return;
      }

      saveSession(data);
      navigate('/dashboard');
    } catch {
      setError('Erro de conexao com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse sua carteira local."
      footer={(
        <>
          Sem conta?{' '}
          <Link to="/register" className="font-medium text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            Criar conta
          </Link>
        </>
      )}
    >
      {error && <Notice tone="error" className="mb-5">{error}</Notice>}

      <form onSubmit={handleLogin} className="space-y-5">
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu@email.com"
          required
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Sua senha"
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </AuthShell>
  );
}
