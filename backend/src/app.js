import express from 'express';
import supabase from './config/databaseConfig.js';

async function main() {
    const app = express();
    const port = 3000;

    const supabaseClient = supabase;

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/profiles', async (req, res) => {
        const { data, error } = await supabaseClient.from('profiles').select('*');
        if (error) {
            return res.status(500).json({ message: 'erro ao buscar perfis', details: error.message });
        }
        res.status(200).json(data);
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

main()