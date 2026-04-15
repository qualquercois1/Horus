import bcrypt from 'bcrypt';

import prisma from '../config/databaseConfig.js';
import { signAuthToken } from '../middleware/authMiddleware.js';
import AppError from '../utils/AppError.js';
import { createWalletWithInitialBalance, getOrCreateWallet } from './walletService.js';

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function registerUser({ name, email, password }, db = prisma) {
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError('E-mail ja cadastrado!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await createWalletWithInitialBalance(tx, newUser.id);

    return newUser;
  });

  return publicUser(user);
}

export async function loginUser({ email, password }, db = prisma) {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('Credenciais invalidas.', 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AppError('Credenciais invalidas.', 401);
  }

  await getOrCreateWallet(user.id, db);

  return {
    token: signAuthToken(user.id),
    user: publicUser(user),
  };
}
