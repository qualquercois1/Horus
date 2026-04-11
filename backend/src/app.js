import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomInt } from 'node:crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'senha_super_secreta';
const INITIAL_BALANCE_CENTS = 100000;
const RED_ROULETTE_NUMBERS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

function publicUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}

function getBearerToken(req) {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    return scheme === 'Bearer' ? token : null;
}

function requireAuth(req, res, next) {
    const token = getBearerToken(req);

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não informado.' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Sessão inválida ou expirada.' });
    }
}

async function createWalletWithInitialBalance(db, userId) {
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

async function getOrCreateWallet(userId) {
    const existingWallet = await prisma.wallet.findUnique({ where: { userId } });
    if (existingWallet) {
        return existingWallet;
    }

    return prisma.$transaction(async (tx) => {
        const wallet = await tx.wallet.findUnique({ where: { userId } });
        return wallet || createWalletWithInitialBalance(tx, userId);
    });
}

function getRouletteColor(value) {
    if (value === 0) {
        return 'green';
    }

    return RED_ROULETTE_NUMBERS.has(value) ? 'red' : 'black';
}

function normalizeRouletteBet(body) {
    const amountCents = Number(body.amountCents);
    const betType = String(body.betType ?? '').trim().toLowerCase();
    const rawBetValue = String(body.betValue ?? '').trim().toLowerCase();

    if (!Number.isInteger(amountCents) || amountCents < 100) {
        return { error: 'A aposta mínima é R$ 1,00.' };
    }

    if (amountCents > 100000) {
        return { error: 'A aposta máxima local é R$ 1.000,00.' };
    }

    if (betType === 'color') {
        if (!['red', 'black'].includes(rawBetValue)) {
            return { error: 'Escolha vermelho ou preto.' };
        }

        return {
            amountCents,
            betType,
            betValue: rawBetValue,
            payoutMultiplier: 2,
            label: rawBetValue === 'red' ? 'vermelho' : 'preto',
        };
    }

    if (betType === 'number') {
        const number = Number(rawBetValue);
        if (!Number.isInteger(number) || number < 0 || number > 36) {
            return { error: 'Escolha um número entre 0 e 36.' };
        }

        return {
            amountCents,
            betType,
            betValue: String(number),
            payoutMultiplier: 36,
            label: `número ${number}`,
        };
    }

    if (betType === 'parity') {
        if (!['even', 'odd'].includes(rawBetValue)) {
            return { error: 'Escolha par ou ímpar.' };
        }

        return {
            amountCents,
            betType,
            betValue: rawBetValue,
            payoutMultiplier: 2,
            label: rawBetValue === 'even' ? 'par' : 'ímpar',
        };
    }

    if (betType === 'range') {
        if (!['low', 'high'].includes(rawBetValue)) {
            return { error: 'Escolha baixo ou alto.' };
        }

        return {
            amountCents,
            betType,
            betValue: rawBetValue,
            payoutMultiplier: 2,
            label: rawBetValue === 'low' ? '1 a 18' : '19 a 36',
        };
    }

    return { error: 'Tipo de aposta inválido.' };
}

function isWinningRouletteBet(bet, resultValue, resultColor) {
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

app.post('/api/register', async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const email = String(req.body.email || '').trim().toLowerCase();
        const password = String(req.body.password || '');

        if (!name || !email || password.length < 6) {
            return res.status(400).json({ error: 'Informe nome, e-mail e senha com no mínimo 6 caracteres.' });
        }

        // verificar se usuário existe pelo e-mail
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail já cadastrado!' });
        }
        
        // criptografar senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            await createWalletWithInitialBalance(tx, user.id);

            return user;
        });

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: publicUser(newUser),
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const email = String(req.body.email || '').trim().toLowerCase();
        const password = String(req.body.password || '');

        // e-mail existe?
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json ({ error: 'Credenciais inválidas.' });
        }

        // senha confere?
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json ({ error: 'Credenciais inválidas.' });
        }

        // gerar token de autenticação
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

        await getOrCreateWallet(user.id);

        res.json({ token, user: publicUser(user) });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.get('/api/me/wallet', requireAuth, async (req, res) => {
    try {
        const wallet = await getOrCreateWallet(req.userId);
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' },
            take: 12,
        });
        const rounds = await prisma.gameRound.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' },
            take: 8,
        });

        res.json({ wallet, transactions, rounds });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar carteira.' });
    }
});

app.post('/api/games/roulette/play', requireAuth, async (req, res) => {
    const bet = normalizeRouletteBet(req.body);

    if (bet.error) {
        return res.status(400).json({ error: bet.error });
    }

    try {
        const wallet = await getOrCreateWallet(req.userId);
        const result = await prisma.$transaction(async (tx) => {
            const debit = await tx.wallet.updateMany({
                where: {
                    id: wallet.id,
                    userId: req.userId,
                    balanceCents: { gte: bet.amountCents },
                },
                data: {
                    balanceCents: { decrement: bet.amountCents },
                },
            });

            if (debit.count !== 1) {
                const error = new Error('Saldo insuficiente.');
                error.statusCode = 400;
                throw error;
            }

            const walletAfterBet = await tx.wallet.findUnique({
                where: { id: wallet.id },
            });
            const balanceBeforeBet = walletAfterBet.balanceCents + bet.amountCents;
            const resultValue = randomInt(37);
            const resultColor = getRouletteColor(resultValue);
            const won = isWinningRouletteBet(bet, resultValue, resultColor);
            const payoutCents = won ? bet.amountCents * bet.payoutMultiplier : 0;
            const finalBalanceCents = walletAfterBet.balanceCents + payoutCents;

            const round = await tx.gameRound.create({
                data: {
                    userId: req.userId,
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
                    userId: req.userId,
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
                        userId: req.userId,
                        walletId: wallet.id,
                        type: 'WIN',
                        amountCents: payoutCents,
                        balanceBeforeCents: walletAfterBet.balanceCents,
                        balanceAfterCents: finalWallet.balanceCents,
                        description: `Roleta: prêmio em ${bet.label}`,
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

        res.json(result);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        res.status(500).json({ message: 'Erro ao jogar roleta.' });
    }
});

app.get('/', (req, res) => {
    res.send('API do Projeto Horus rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
