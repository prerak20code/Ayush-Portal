// import express from 'express';
// export const userRouter = express.Router();
// import {
//     register,
//     login,
//     logout,
//     deleteAccount,
//     verifyEmail,
//     getCurrentUser,
//     resetPassword,
//     requestResetPassword,
// } from '../controllers/user.Controller.js';

// import { verifyJWT } from '../middlewares/index.js';

// userRouter.route('/register').post(register);
// userRouter.route('/login').post(login);
// userRouter.route('/logout').patch(verifyJWT, logout);

// userRouter
//     .route('/request-reset-password')
//     .post(verifyJWT, requestResetPassword);

// userRouter.route('/reset-password').post(verifyJWT, resetPassword);
// userRouter.route('/verify-email/:userId/:uniqueString').get(verifyEmail);
// userRouter
//     .route('/')
//     .get(verifyJWT, getCurrentUser)
//     .delete(verifyJWT, deleteAccount);
