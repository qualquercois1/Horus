import { createAuthUser, signInAuthUser } from "../service/authService.js";

export async function registerUser(req, res) {
    try {
        const {email, password, displayName} = req.body;
        const data = await createAuthUser(email, password, displayName);
        console.log('Usuario criado! ', data);
        res.status(200);
    } catch (error) {
        console.log('Erro no cadastro! ', error.message);
        res.status(500).json({
            message: 'Erro ao cadastrar Usuário',
            details: error.message
        })
    }
}

export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        const data = await signInAuthUser(email,password);
        console.log('Usuario Logado!\n', data);
        res.status(200);
    } catch(error) {
        console.log('Erro no login!\n', error.message);
        res.status(500).json({
            message: 'Erro ao logar',
            details: error.message
        })
    }
}