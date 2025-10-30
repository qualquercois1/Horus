import express from 'express';
import { getProfiles } from './controller/userController.js'

async function main() {
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/profiles', getProfiles);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

main()