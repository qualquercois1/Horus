import { Router } from 'express';

import gameRoutes from './gameRoutes.js';
import transactionRoutes from './transactionRoutes.js';
import userRoutes from './userRoutes.js';
import walletRoutes from './walletRoutes.js';

const router = Router();

router.use(userRoutes);
router.use(walletRoutes);
router.use(gameRoutes);
router.use(transactionRoutes);

export default router;
