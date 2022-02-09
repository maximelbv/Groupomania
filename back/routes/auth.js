import express from "express";

const router = express.Router();

import * as authControllers from '../controllers/auth.js';

router.post('/signup', authControllers.signupPost);

export default router;