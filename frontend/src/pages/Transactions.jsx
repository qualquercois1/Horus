import React, { useEffect, useState } from 'react';

import Button from '../components/ui/Button';
import { ListItem, ListPanel } from '../components/ui/List';
import Notice from '../components/ui/Notice';
import { Page, SectionHeader } from '../components/ui/Page';
import { API_URL } from '../config/api';
import { authHeaders } from '../utils/auth';
import { formatCents, formatDateTime } from '../utils/formatters';

const PAGE_SIZE = 10;
const EMPTY_PAGINATION = {
  page: 1,
  pageSize: PAGE_SIZE,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

function getTransactionTone(type) {
  if (type === 'WIN' || type === 'CREDIT') {
    return 'positive';
  }

  return 'negative';
}

function getTransactionMeta(transaction) {
  const date = formatDateTime(transaction.createdAt);

  if (transaction.balanceAfterCents === undefined || transaction.balanceAfterCents === null) {
    return date;
  }

  return `${date} - Saldo: ${formatCents(transaction.balanceAfterCents)}`;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadTransactions() {
      setLoading(true);
      setError('');

      try {
        const search = new URLSearchParams({
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });
        const response = await fetch(`${API_URL}/me/transactions?${search}`, {
          headers: authHeaders(),
        });
        const data = await response.json();

        if (!active) {
          return;
        }

        if (!response.ok) {
          setError(data.error || data.message || 'Nao foi possivel carregar o extrato.');
          return;
        }

        setTransactions(data.items || []);
        setPagination(data.pagination || EMPTY_PAGINATION);
      } catch {
        if (active) {
          setError('Erro de conexao com o servidor.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTransactions();

    return () => {
      active = false;
    };
  }, [page]);

  return (
    <Page>
      <SectionHeader
        eyebrow="Extrato"
        title="Historico da carteira."
        action={<Button to="/dashboard" variant="secondary">Carteira</Button>}
      >
        Transacoes paginadas, saldo apos cada movimento e origem do lancamento.
      </SectionHeader>

      {error && <Notice tone="error" className="mb-6">{error}</Notice>}

      <ListPanel title="Transacoes" empty={loading ? 'Carregando transacoes...' : 'Nenhuma transacao registrada.'}>
        {!loading && transactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            title={transaction.description || transaction.type}
            meta={getTransactionMeta(transaction)}
            value={formatCents(transaction.amountCents)}
            tone={getTransactionTone(transaction.type)}
          />
        ))}
      </ListPanel>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Pagina {pagination.page} de {pagination.totalPages} - {pagination.totalItems} transacoes
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={loading || !pagination.hasPreviousPage}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Anterior
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={loading || !pagination.hasNextPage}
            onClick={() => setPage((current) => current + 1)}
          >
            Proxima
          </Button>
        </div>
      </div>
    </Page>
  );
}
