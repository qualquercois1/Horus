import AppError from '../utils/AppError.js';

export function notFound(req, res) {
  res.status(404).json({ error: 'Rota nao encontrada.' });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError || error.statusCode) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Erro interno no servidor.' });
}
