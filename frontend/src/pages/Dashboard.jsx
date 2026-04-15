import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Notice from '../components/ui/Notice';
import { Page, Panel, SectionHeader } from '../components/ui/Page';
import Stat from '../components/ui/Stat';
import { API_URL } from '../config/api';
import { clearSession, getAuthToken, getStoredUser } from '../utils/auth';
import { formatCents } from '../utils/formatters';

const Dashboard = () => {
  const token = getAuthToken();
  const user = getStoredUser() || { name: 'Visitante' };
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(Boolean(token));

  const handleLogout = () => {
    clearSession();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    async function loadWallet() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/me/wallet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || data.message || 'Erro ao carregar carteira.');
          return;
        }

        setWallet(data.wallet);
      } catch {
        setError('Erro de conexao com o servidor.');
      } finally {
        setLoading(false);
      }
    }

    loadWallet();
  }, [token]);

  return (
    <Page>
      <SectionHeader
        eyebrow={`Ola, ${user.name}`}
        title="Carteira"
        action={(
          <Button type="button" variant="ghost" onClick={handleLogout}>
            Sair
          </Button>
        )}
      >
        Saldo ficticio local, pronto para jogos e historico auditavel.
      </SectionHeader>

      {error && <Notice tone="error" className="mb-6">{error}</Notice>}
      {!token && (
        <Notice tone="warning" className="mb-6">
          Entre para acessar sua carteira local.
        </Notice>
      )}

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Stat
          label="Saldo"
          value={loading ? 'Carregando...' : formatCents(wallet?.balanceCents)}
          helper={wallet?.currency || 'BRL'}
        />

        <Panel className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Primeiro jogo</p>
            <h2 className="mt-2 text-2xl font-light tracking-tight text-gray-700 dark:text-gray-300">
              Roleta
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Aposte com saldo local. Cada rodada gera transacoes e historico.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button to="/transactions" variant="secondary">
              Ver extrato
            </Button>
            <Button to="/games/roulette">
              Abrir mesa
            </Button>
          </div>
        </Panel>
      </div>
    </Page>
  );
};

export default Dashboard;
