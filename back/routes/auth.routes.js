import express from "express";

const router = express.Router();

import * as authControllers from '../controllers/auth.controllers.js';

router.post('/signup', authControllers.signupPost);

router.post('/login', authControllers.loginPost);

router.get('/jwt', authControllers.requireAuth);

export default router; 