import { Router } from 'express';

import { login, register } from '../controller/userController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import { loginSchema, registerSchema } from '../validation/schemas.js';

const router = Router();

router.post('/register', validateBody(registerSchema), asyncHandler(register));
router.post('/login', validateBody(loginSchema), asyncHandler(login));

export default router;
