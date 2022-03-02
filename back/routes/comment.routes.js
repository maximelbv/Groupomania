import express from "express";

const router = express.Router();

import * as commentControllers from '../controllers/comment.controllers.js';
import { requireAuth } from "../controllers/auth.controllers.js";

router.post('/post', requireAuth, commentControllers.post);

router.get('/getAll/:postId', requireAuth, commentControllers.getAll);

router.put('/:commentId', requireAuth, commentControllers.modifyComment);

router.delete('/:commentId', requireAuth, commentControllers.deleteComment);

export default router; 