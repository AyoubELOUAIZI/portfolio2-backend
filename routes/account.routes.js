import { Router } from 'express';
import accountController from '../controllers/account.controller.js';
import { verifyJwt } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', accountController.createAccount);
router.patch('/', verifyJwt, accountController.updateAccount);

export default router;
