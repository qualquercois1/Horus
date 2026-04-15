import assert from 'node:assert/strict';
import test from 'node:test';

import {
  INITIAL_BALANCE_CENTS,
  createWalletWithInitialBalance,
  getOrCreateWallet,
} from '../src/service/walletService.js';

test('createWalletWithInitialBalance creates wallet and initial credit ledger entry', async () => {
  const createdTransactions = [];
  const db = {
    wallet: {
      create: async ({ data }) => ({ id: 10, ...data }),
    },
    transaction: {
      create: async ({ data }) => {
        createdTransactions.push(data);
        return { id: 20, ...data };
      },
    },
  };

  const wallet = await createWalletWithInitialBalance(db, 5);

  assert.equal(wallet.userId, 5);
  assert.equal(wallet.balanceCents, INITIAL_BALANCE_CENTS);
  assert.equal(createdTransactions.length, 1);
  assert.deepEqual(createdTransactions[0], {
    userId: 5,
    walletId: 10,
    type: 'CREDIT',
    amountCents: INITIAL_BALANCE_CENTS,
    balanceBeforeCents: 0,
    balanceAfterCents: INITIAL_BALANCE_CENTS,
    description: 'Saldo inicial local',
    referenceType: 'WALLET',
    referenceId: 10,
  });
});

test('getOrCreateWallet returns an existing wallet without creating a transaction', async () => {
  let createCalled = false;
  const existingWallet = { id: 11, userId: 7, balanceCents: 5000, currency: 'BRL' };
  const db = {
    wallet: {
      findUnique: async () => existingWallet,
      create: async () => {
        createCalled = true;
      },
    },
    transaction: {
      create: async () => {
        throw new Error('transaction should not be created');
      },
    },
  };

  const wallet = await getOrCreateWallet(7, db);

  assert.deepEqual(wallet, existingWallet);
  assert.equal(createCalled, false);
});
