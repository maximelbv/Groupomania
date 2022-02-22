import express from "express";

const router = express.Router();

import * as postControllers from '../controllers/post.controllers.js';
import { requireAuth } from "../controllers/auth.controllers.js";
import multerConfig from '../middlewares/multerConfig.js';

router.post('/post', multerConfig, postControllers.post);

router.get('/getAll', requireAuth, postControllers.getAll);

router.get('/:userId', requireAuth, postControllers.getAllFromUser);

router.put('/:postId', postControllers.modifyPost);

router.delete('/:postId', requireAuth, postControllers.deletePost);

export default router; 