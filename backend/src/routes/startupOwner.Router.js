import express from 'express';
export const startupOwnerRouter = express.Router();
import {
    register,
    // login,
    // logout,
    // deleteAccount,
    // verifyEmail,
    getOwnerById,
    // resetPassword,
    // requestResetPassword,
} from '../controllers/startupOwner.Controller.js';
import { updateRole } from '../controllers/user.Controller.js';

// import { deleteStartups } from '../controllers/startup.Controller.js';

import { verifyJWT } from '../middlewares/index.js';

startupOwnerRouter.use(verifyJWT);

startupOwnerRouter.route('/register').post(updateRole, register);
// startupOwnerRouter.route('/login').post(login);
// startupOwnerRouter.route('/logout').patch(verifyJWT, logout);

// startupOwnerRouter
//     .route('/request-reset-password')
//     .post(verifyJWT, requestResetPassword);

// startupOwnerRouter.route('/reset-password').post(verifyJWT, resetPassword);
// startupOwnerRouter
//     .route('/verify-email/:userId/:uniqueString')
//     .get(verifyEmail);
startupOwnerRouter.route('/:ownerId').get(getOwnerById);

// .delete(verifyJWT, deleteAccount, deleteStartups, (req, res) => {
//     return res
//         .status(OK)
//         .clearCookie('accessToken', cookieOptions)
//         .clearCookie('refreshToken', cookieOptions)
//         .json({ message: 'user account deleted successfully' });
// });
