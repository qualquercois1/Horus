import { randomInt } from 'node:crypto';

import prisma from '../config/databaseConfig.js';
import AppError from '../utils/AppError.js';
import { getOrCreateWallet } from './walletService.js';

const RED_ROULETTE_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

const BET_LABELS = {
  red: 'vermelho',
  black: 'preto',
  even: 'par',
  odd: 'impar',
  low: '1 a 18',
  high: '19 a 36',
};

export function getRouletteColor(value) {
  if (value === 0) {
    return 'green';
  }

  return RED_ROULETTE_NUMBERS.has(value) ? 'red' : 'black';
}

export function buildRouletteBet({ amountCents, betType, betValue }) {
  if (betType === 'number') {
    return {
      amountCents,
      betType,
      betValue,
      payoutMultiplier: 36,
      label: `numero ${betValue}`,
    };
  }

  return {
    amountCents,
    betType,
    betValue,
    payoutMultiplier: 2,
    label: BET_LABELS[betValue],
  };
}

export function isWinningRouletteBet(bet, resultValue, resultColor) {
  if (bet.betType === 'color') {
    return bet.betValue === resultColor;
  }

  if (bet.betType === 'number') {
    return Number(bet.betValue) === resultValue;
  }

  if (bet.betType === 'parity') {
    if (resultValue === 0) {
      return false;
    }

    return bet.betValue === 'even' ? resultValue % 2 === 0 : resultValue % 2 !== 0;
  }

  if (bet.betType === 'range') {
    return bet.betValue === 'low'
      ? resultValue >= 1 && resultValue <= 18
      : resultValue >= 19 && resultValue <= 36;
  }

  return false;
}

export async function playRoulette({
  userId,
  rawBet,
  db = prisma,
  rng = randomInt,
  getWallet = getOrCreateWallet,
}) {
  const bet = buildRouletteBet(rawBet);
  const wallet = await getWallet(userId, db);

  return db.$transaction(async (tx) => {
    const debit = await tx.wallet.updateMany({
      where: {
        id: wallet.id,
        userId,
        balanceCents: { gte: bet.amountCents },
      },
      data: {
        balanceCents: { decrement: bet.amountCents },
      },
    });

    if (debit.count !== 1) {
      throw new AppError('Saldo insuficiente.');
    }

    const walletAfterBet = await tx.wallet.findUnique({
      where: { id: wallet.id },
    });
    const balanceBeforeBet = walletAfterBet.balanceCents + bet.amountCents;
    const resultValue = rng(37);
    const resultColor = getRouletteColor(resultValue);
    const won = isWinningRouletteBet(bet, resultValue, resultColor);
    const payoutCents = won ? bet.amountCents * bet.payoutMultiplier : 0;
    const finalBalanceCents = walletAfterBet.balanceCents + payoutCents;

    const round = await tx.gameRound.create({
      data: {
        userId,
        game: 'ROULETTE',
        betType: bet.betType,
        betValue: bet.betValue,
        betAmountCents: bet.amountCents,
        resultValue,
        resultColor,
        payoutCents,
        netCents: payoutCents - bet.amountCents,
      },
    });

    await tx.transaction.create({
      data: {
        userId,
        walletId: wallet.id,
        type: 'BET',
        amountCents: -bet.amountCents,
        balanceBeforeCents: balanceBeforeBet,
        balanceAfterCents: walletAfterBet.balanceCents,
        description: `Roleta: aposta em ${bet.label}`,
        referenceType: 'GAME_ROUND',
        referenceId: round.id,
      },
    });

    let finalWallet = walletAfterBet;
    if (payoutCents > 0) {
      finalWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balanceCents: { increment: payoutCents },
        },
      });

      await tx.transaction.create({
        data: {
          userId,
          walletId: wallet.id,
          type: 'WIN',
          amountCents: payoutCents,
          balanceBeforeCents: walletAfterBet.balanceCents,
          balanceAfterCents: finalWallet.balanceCents,
          description: `Roleta: premio em ${bet.label}`,
          referenceType: 'GAME_ROUND',
          referenceId: round.id,
        },
      });
    }

    return {
      wallet: finalWallet,
      round: {
        ...round,
        won,
        finalBalanceCents,
      },
    };
  });
}
