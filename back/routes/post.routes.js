import express from "express";

const router = express.Router();

import * as postControllers from '../controllers/post.controllers.js';
import multerConfig from '../middlewares/multerConfig.js';

router.post('/post', multerConfig, postControllers.post);

router.get('/getAll', postControllers.getAll);

router.delete('/:postId', postControllers.deletePost);

export default router; 