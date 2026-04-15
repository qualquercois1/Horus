import prisma from '../config/databaseConfig.js';

export const INITIAL_BALANCE_CENTS = 100000;

export async function createWalletWithInitialBalance(db, userId) {
  const wallet = await db.wallet.create({
    data: {
      userId,
      balanceCents: INITIAL_BALANCE_CENTS,
      currency: 'BRL',
    },
  });

  await db.transaction.create({
    data: {
      userId,
      walletId: wallet.id,
      type: 'CREDIT',
      amountCents: INITIAL_BALANCE_CENTS,
      balanceBeforeCents: 0,
      balanceAfterCents: INITIAL_BALANCE_CENTS,
      description: 'Saldo inicial local',
      referenceType: 'WALLET',
      referenceId: wallet.id,
    },
  });

  return wallet;
}

export async function getOrCreateWallet(userId, db = prisma) {
  const existingWallet = await db.wallet.findUnique({ where: { userId } });

  if (existingWallet) {
    return existingWallet;
  }

  if (db.$transaction) {
    return db.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({ where: { userId } });
      return wallet || createWalletWithInitialBalance(tx, userId);
    });
  }

  return createWalletWithInitialBalance(db, userId);
}

export async function getWalletOverview(userId, db = prisma) {
  const wallet = await getOrCreateWallet(userId, db);
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 12,
  });
  const rounds = await db.gameRound.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 8,
  });

  return { wallet, transactions, rounds };
}
