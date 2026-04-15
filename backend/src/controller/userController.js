import { loginUser, registerUser } from '../service/userService.js';

export async function register(req, res) {
  const user = await registerUser(req.validatedBody);

  res.status(201).json({
    message: 'Usuario criado com sucesso!',
    user,
  });
}

export async function login(req, res) {
  const session = await loginUser(req.validatedBody);
  res.json(session);
}
