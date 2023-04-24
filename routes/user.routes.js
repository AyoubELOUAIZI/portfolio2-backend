import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/my-account', verifyJwt, userController.UserAccount);
router.post('/sign-in', userController.signIn);
router.post('/sign-up', userController.signUp);
router.get('/sign-out', userController.signOut);

export default router;
