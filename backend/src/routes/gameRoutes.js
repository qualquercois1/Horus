import { Router } from 'express';

import { playRouletteRound } from '../controller/gameController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import { roulettePlaySchema } from '../validation/schemas.js';

const router = Router();

router.post(
  '/games/roulette/play',
  requireAuth,
  validateBody(roulettePlaySchema),
  asyncHandler(playRouletteRound),
);

export default router;
