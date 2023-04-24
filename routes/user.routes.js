import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/sign-in', userController.signIn);
router.get('/my-account', verifyJwt, userController.UserAccount);

export default router;
