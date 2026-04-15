import express from 'express';
import cors from 'cors';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import apiRoutes from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api', apiRoutes);

  app.get('/', (req, res) => {
    res.send('API do Projeto Horus rodando!');
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

const app = createApp();
const isDirectRun = import.meta.url === `file://${process.argv[1]}`;

if (isDirectRun) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
