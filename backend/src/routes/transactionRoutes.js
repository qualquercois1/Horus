import { Router } from 'express';

import { getTransactions } from '../controller/transactionController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validateQuery } from '../middleware/validationMiddleware.js';
import { transactionPaginationSchema } from '../validation/schemas.js';

const router = Router();

router.get(
  '/me/transactions',
  requireAuth,
  validateQuery(transactionPaginationSchema),
  asyncHandler(getTransactions),
);

export default router;
