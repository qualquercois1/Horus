import assert from 'node:assert/strict';
import test from 'node:test';

import AppError from '../src/utils/AppError.js';
import {
  getRouletteColor,
  isWinningRouletteBet,
  playRoulette,
} from '../src/service/rouletteService.js';

function createRouletteDb(initialBalanceCents = 1000) {
  let wallet = {
    id: 1,
    userId: 2,
    balanceCents: initialBalanceCents,
    currency: 'BRL',
  };
  const transactions = [];
  const rounds = [];
  const tx = {
    wallet: {
      updateMany: async ({ where, data }) => {
        if (
          wallet.id !== where.id
          || wallet.userId !== where.userId
          || wallet.balanceCents < where.balanceCents.gte
        ) {
          return { count: 0 };
        }

        wallet = {
          ...wallet,
          balanceCents: wallet.balanceCents - data.balanceCents.decrement,
        };
        return { count: 1 };
      },
      findUnique: async () => ({ ...wallet }),
      update: async ({ data }) => {
        wallet = {
          ...wallet,
          balanceCents: wallet.balanceCents + data.balanceCents.increment,
        };
        return { ...wallet };
      },
    },
    gameRound: {
      create: async ({ data }) => {
        const round = {
          id: rounds.length + 1,
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
          ...data,
        };
        rounds.push(round);
        return round;
      },
    },
    transaction: {
      create: async ({ data }) => {
        const transaction = {
          id: transactions.length + 1,
          ...data,
        };
        transactions.push(transaction);
        return transaction;
      },
    },
  };

  return {
    db: {
      $transaction: async (callback) => callback(tx),
    },
    getWallet: async () => ({ ...wallet }),
    getWalletState: () => ({ ...wallet }),
    transactions,
    rounds,
  };
}

test('roulette color rules keep zero green and split red/black numbers', () => {
  assert.equal(getRouletteColor(0), 'green');
  assert.equal(getRouletteColor(1), 'red');
  assert.equal(getRouletteColor(2), 'black');
});

test('roulette zero only wins on a direct zero bet', () => {
  assert.equal(isWinningRouletteBet({ betType: 'color', betValue: 'red' }, 0, 'green'), false);
  assert.equal(isWinningRouletteBet({ betType: 'parity', betValue: 'even' }, 0, 'green'), false);
  assert.equal(isWinningRouletteBet({ betType: 'range', betValue: 'low' }, 0, 'green'), false);
  assert.equal(isWinningRouletteBet({ betType: 'number', betValue: '0' }, 0, 'green'), true);
});

test('playRoulette debits the bet and credits payout on a winning color bet', async () => {
  const fake = createRouletteDb(1000);

  const result = await playRoulette({
    userId: 2,
    rawBet: { amountCents: 100, betType: 'color', betValue: 'red' },
    db: fake.db,
    rng: () => 1,
    getWallet: fake.getWallet,
  });

  assert.equal(result.wallet.balanceCents, 1100);
  assert.equal(result.round.won, true);
  assert.equal(result.round.payoutCents, 200);
  assert.equal(fake.transactions.length, 2);
  assert.equal(fake.transactions[0].type, 'BET');
  assert.equal(fake.transactions[0].balanceBeforeCents, 1000);
  assert.equal(fake.transactions[0].balanceAfterCents, 900);
  assert.equal(fake.transactions[1].type, 'WIN');
  assert.equal(fake.transactions[1].balanceAfterCents, 1100);
});

test('playRoulette rejects bets above the current wallet balance', async () => {
  const fake = createRouletteDb(50);

  await assert.rejects(
    () => playRoulette({
      userId: 2,
      rawBet: { amountCents: 100, betType: 'color', betValue: 'red' },
      db: fake.db,
      rng: () => 1,
      getWallet: fake.getWallet,
    }),
    (error) => error instanceof AppError && error.message === 'Saldo insuficiente.',
  );

  assert.equal(fake.transactions.length, 0);
  assert.equal(fake.rounds.length, 0);
  assert.equal(fake.getWalletState().balanceCents, 50);
});
