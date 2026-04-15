import { Router } from 'express';

import { getWallet } from '../controller/walletController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me/wallet', requireAuth, asyncHandler(getWallet));

export default router;
