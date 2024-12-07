import express from 'express';
export const startupOwnerRouter = express.Router();
import {
    register,
    login,
    logout,
    // deleteAccount,
    verifyEmail,
    getCurrentUser,
    resetPassword,
    requestResetPassword,
} from '../controllers/startupOwner.Controller.js';

// import { deleteStartups } from '../controllers/startup.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

startupOwnerRouter.route('/register').post(register);
startupOwnerRouter.route('/login').post(login);
startupOwnerRouter.route('/logout').patch(verifyJWT, logout);

startupOwnerRouter
    .route('/request-reset-password')
    .post(verifyJWT, requestResetPassword);

startupOwnerRouter.route('/reset-password').post(verifyJWT, resetPassword);
startupOwnerRouter
    .route('/verify-email/:userId/:uniqueString')
    .get(verifyEmail);
startupOwnerRouter.route('/').get(verifyJWT, getCurrentUser);

// .delete(verifyJWT, deleteAccount, deleteStartups, (req, res) => {
//     return res
//         .status(OK)
//         .clearCookie('accessToken', cookieOptions)
//         .clearCookie('refreshToken', cookieOptions)
//         .json({ message: 'user account deleted successfully' });
// });
