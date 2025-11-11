import express from 'express';
import { getProfiles } from './controller/userController.js'
import { registerUser, loginUser } from './controller/authController.js';

async function main() {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/profiles', getProfiles);
    app.post('/register', registerUser);
    app.post('/login', loginUser);


    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

main()