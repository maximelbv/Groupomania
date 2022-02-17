import express from "express";

const router = express.Router();

import * as authControllers from '../controllers/auth.controllers.js';

router.post('/signup', authControllers.signupPost);

// router.post('/login', authControllers.loginPost);

export default router;