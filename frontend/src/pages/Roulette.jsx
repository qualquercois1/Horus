import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import { ListItem, ListPanel } from '../components/ui/List';
import Notice from '../components/ui/Notice';
import { Page, Panel, SectionHeader } from '../components/ui/Page';
import Stat from '../components/ui/Stat';
import TextField from '../components/ui/TextField';
import { API_URL } from '../config/api';
import { getAuthToken } from '../utils/auth';
import { formatCents, formatDateTime } from '../utils/formatters';

const redNumbers = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
const betTypeOptions = [
  { value: 'color', label: 'Cor' },
  { value: 'number', label: 'Numero' },
  { value: 'parity', label: 'Paridade' },
  { value: 'range', label: 'Faixa' },
];
const betOptions = {
  color: [
    { value: 'red', label: 'Vermelho' },
    { value: 'black', label: 'Preto' },
  ],
  parity: [
    { value: 'even', label: 'Par' },
    { value: 'odd', label: 'Impar' },
  ],
  range: [
    { value: 'low', label: '1 a 18' },
    { value: 'high', label: '19 a 36' },
  ],
  number: Array.from({ length: 37 }, (_, number) => ({
    value: String(number),
    label: String(number),
  })),
};

function getNumberTone(number) {
  if (number === 0) {
    return 'border-emerald-700 bg-emerald-700 text-white';
  }

  return redNumbers.has(number)
    ? 'border-red-700 bg-red-700 text-white'
    : 'border-gray-800 bg-gray-800 text-white dark:border-gray-700';
}

function getResultColorLabel(color) {
  if (color === 'red') {
    return 'vermelho';
  }

  if (color === 'black') {
    return 'preto';
  }

  return 'verde';
}

function getTransactionTone(type) {
  if (type === 'WIN' || type === 'CREDIT') {
    return 'positive';
  }

  return 'negative';
}

function ChoiceButton({ selected, children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={[
        'min-h-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
        selected
          ? 'border-gray-500 bg-gray-400 text-white dark:border-gray-500 dark:bg-gray-500 dark:text-gray-100'
          : 'border-gray-300 bg-white/70 text-gray-600 hover:border-gray-500 dark:border-gray-600 dark:bg-white/5 dark:text-gray-300 dark:hover:border-gray-400',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Roulette() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [betType, setBetType] = useState('color');
  const [betValue, setBetValue] = useState('red');
  const [amount, setAmount] = useState('10');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const token = useMemo(() => getAuthToken(), []);

  const loadWallet = useCallback(async () => {
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
        setError(data.error || data.message || 'Nao foi possivel carregar a carteira.');
        return;
      }

      setWallet(data.wallet);
      setTransactions(data.transactions || []);
      setRounds(data.rounds || []);
      setError('');
    } catch {
      setError('Erro de conexao com o servidor.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  const currentOptions = betOptions[betType];
  const selectedNumber = Number(result?.resultValue || 0);
  const wheelRotation = result ? 720 + selectedNumber * 37 : 0;

  const changeBetType = (nextType) => {
    setBetType(nextType);
    setBetValue(betOptions[nextType][0].value);
    setResult(null);
  };

  const handlePlay = async (event) => {
    event.preventDefault();
    setError('');
    setResult(null);

    const amountCents = Math.round(Number(String(amount).replace(',', '.')) * 100);

    if (!Number.isInteger(amountCents) || amountCents < 100) {
      setError('A aposta minima e R$ 1,00.');
      return;
    }

    setSpinning(true);

    try {
      const response = await fetch(`${API_URL}/games/roulette/play`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ betType, betValue, amountCents }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'A roleta nao aceitou essa aposta.');
        return;
      }

      setWallet(data.wallet);
      setResult(data.round);
      await loadWallet();
    } catch {
      setError('Erro de conexao com o servidor.');
    } finally {
      setSpinning(false);
    }
  };

  if (!token) {
    return (
      <Page className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
        <SectionHeader
          align="center"
          eyebrow="Roleta"
          title="Entre para jogar."
          action={<Button to="/login">Entrar</Button>}
        >
          A carteira local nasce junto com a conta.
        </SectionHeader>
      </Page>
    );
  }

  return (
    <Page>
      <SectionHeader
        eyebrow="Roleta"
        title="Faca sua aposta."
        action={(
          <div className="flex flex-col gap-2">
            <Stat
              label="Saldo"
              value={loading ? 'Carregando...' : formatCents(wallet?.balanceCents)}
              helper={wallet?.currency || 'BRL'}
              className="min-w-56"
            />
            <Button to="/transactions" variant="secondary" className="w-full">
              Ver extrato
            </Button>
          </div>
        )}
      >
        Uma mesa simples: escolha, gire, registre.
      </SectionHeader>

      {error && <Notice tone="error" className="mb-6">{error}</Notice>}

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="relative mx-auto h-56 w-56">
              <div className="absolute -top-2 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-gray-700 dark:border-t-gray-300" />
              <div
                className={`h-full w-full rounded-full border-8 border-gray-700 transition-transform duration-700 dark:border-gray-300 ${spinning ? 'animate-spin' : ''}`}
                style={{
                  background:
                    'conic-gradient(#047857 0deg 10deg, transparent 10deg), repeating-conic-gradient(from 10deg, #b91c1c 0deg 9.73deg, #111111 9.73deg 19.46deg)',
                  transform: `rotate(${wheelRotation}deg)`,
                }}
              >
                <div className="absolute inset-14 flex items-center justify-center rounded-full border-4 border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0e0e0e]">
                  <span className="text-4xl font-light text-gray-700 dark:text-gray-300">
                    {result?.resultValue ?? '?'}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePlay} className="space-y-5">
              <TextField
                label="Valor da aposta"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {betTypeOptions.map((option) => (
                  <ChoiceButton
                    key={option.value}
                    selected={betType === option.value}
                    onClick={() => changeBetType(option.value)}
                  >
                    {option.label}
                  </ChoiceButton>
                ))}
              </div>

              <div className={betType === 'number' ? 'grid grid-cols-6 gap-2 sm:grid-cols-9' : 'grid grid-cols-2 gap-2'}>
                {currentOptions.map((option) => {
                  const number = Number(option.value);
                  const selected = betValue === option.value;

                  return (
                    <ChoiceButton
                      key={option.value}
                      selected={selected}
                      onClick={() => setBetValue(option.value)}
                      className={betType === 'number' && !selected ? getNumberTone(number) : ''}
                    >
                      {option.label}
                    </ChoiceButton>
                  );
                })}
              </div>

              <Button type="submit" variant="danger" className="w-full" disabled={spinning || loading}>
                {spinning ? 'Girando...' : 'Girar'}
              </Button>
            </form>
          </div>

          {result && (
            <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Resultado</p>
              <p className="mt-1 text-xl font-light tracking-tight text-gray-700 dark:text-gray-300">
                {result.resultValue} {getResultColorLabel(result.resultColor)}
              </p>
              <p className={result.won ? 'mt-1 text-emerald-700 dark:text-emerald-300' : 'mt-1 text-red-700 dark:text-red-300'}>
                {result.won
                  ? `Vitoria de ${formatCents(result.payoutCents)}`
                  : `Perda de ${formatCents(result.betAmountCents)}`}
              </p>
            </div>
          )}
        </Panel>

        <aside className="space-y-4">
          <ListPanel title="Transacoes" empty="Nenhuma transacao ainda.">
            {transactions.map((transaction) => (
              <ListItem
                key={transaction.id}
                title={transaction.description || transaction.type}
                meta={formatDateTime(transaction.createdAt)}
                value={formatCents(transaction.amountCents)}
                tone={getTransactionTone(transaction.type)}
              />
            ))}
          </ListPanel>

          <ListPanel title="Rodadas" empty="Sem rodadas ainda.">
            {rounds.map((round) => (
              <ListItem
                key={round.id}
                title={`${round.resultValue} ${getResultColorLabel(round.resultColor)}`}
                meta={`Aposta: ${formatCents(round.betAmountCents)}`}
                value={formatCents(round.netCents)}
                tone={round.netCents >= 0 ? 'positive' : 'negative'}
              />
            ))}
          </ListPanel>
        </aside>
      </div>
    </Page>
  );
}
