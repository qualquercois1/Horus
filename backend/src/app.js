import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'senha_super_secreta';

app.post('api/register', async (req, res) => {
    try {
        const { name, email, password} = req.body;

        // verificar se usuário existe pelo e-mail
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail já cadastrado!' });
        }
        
        // criptografar senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create ({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

app.post('/api/login', async (res, req) => {
    try {
        const { email, password } = req.body;

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

        res.json({ token, user: { id:user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: " " });
    }
});

app.get('/', (req, res) => {
    res.send('API do Projeto Horus rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});