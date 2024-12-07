import express from 'express';
export const startupRegistrationApplicationRouter = express.Router();
import {
    completeApplication,
    startApplication,
    getApplication,
} from '../controllers/startupRegisterationApplication.js';

import { verifyJWT } from '../middlewares/index.js';

startupRegistrationApplicationRouter.use(verifyJWT);
startupRegistrationApplicationRouter.route('/start').get(startApplication);
startupRegistrationApplicationRouter
    .route('/complete')
    .get(completeApplication);
startupRegistrationApplicationRouter.route('/').get(getApplication);
