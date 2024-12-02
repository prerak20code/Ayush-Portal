import express from 'express';
export const userRouter = express.Router();
import {
    register,
    login,
    verifyEmail,
    getCurrentUser,
    resetPassword,
    requestResetPassword,
} from '../controllers/user.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);

userRouter
    .route('/request-reset-password')
    .post(verifyJWT, requestResetPassword);

userRouter.route('/reset-password').post(resetPassword);

userRouter
    .route('/verify-email/:userId/:uniqueString')
    .get(verifyEmail, (req, res) => {
        res.sendFile(path.join(__dirname, '../views/verified.html'));
    });

userRouter.route('/').get(getCurrentUser);
