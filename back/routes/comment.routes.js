import express from "express";

const router = express.Router();

import * as commentControllers from '../controllers/comment.controllers.js';
import { requireAuth } from "../controllers/auth.controllers.js";

router.post('/post', commentControllers.post);

router.get('/getAll/:postId', commentControllers.getAll);

router.put('/:commentId', commentControllers.modifyComment);

router.delete('/:commentId', commentControllers.deleteComment);

export default router; 