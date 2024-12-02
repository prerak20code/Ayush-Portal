import express from 'express';
export const userRouter = express.Router();
import {
    register,
    login,
    resetPassword,
    requestResetPassword,
    sendPasswordResetEmail,
} from '../controllers/user.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post(
    '/reset-password',
    verifyJWT,
    requestResetPassword,
    resetPassword
);
