import { Router } from 'express';
import accountController from '../controllers/account.controller.js';

const router = Router();

router.post('/', accountController.createAccount);

export default router;
