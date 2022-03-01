import express from "express";

const router = express.Router();

import * as authControllers from '../controllers/auth.controllers.js';
import * as authDataValidation from '../middlewares/authDataValidation.js';

router.post('/signup', authDataValidation.signupCheck, authControllers.signupPost);

router.post('/login', authDataValidation.loginCheck, authControllers.loginPost);

router.put('/modify/:userId', authControllers.modifyAccount);

router.delete('/delete/:userId', authControllers.deleteUser);

export default router;