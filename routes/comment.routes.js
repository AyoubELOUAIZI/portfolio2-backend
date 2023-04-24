import { Router } from 'express';
import commentController from '../controllers/comment.controller.js';
import { verifyJwt } from '../middleware/authMiddleware.js';

const router = Router();

// router.post('/', commentController.createComment);
router.post('/add-comment', verifyJwt,commentController.addUserComment);
router.get('/', commentController.getAllComments);

export default router;
