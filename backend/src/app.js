import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API do Projeto Horus rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});