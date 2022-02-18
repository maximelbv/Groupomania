import express from "express";

const router = express.Router();

import * as postControllers from '../controllers/post.controllers.js';

router.post('/post', postControllers.post);

router.get('/getAll', postControllers.getAll);

export default router; 