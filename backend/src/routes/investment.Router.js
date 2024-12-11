import express from 'express';
export const investmentRouter = express.Router();

import { verifyJWT } from '../middlewares/index.js';

import {
    registerInvestor,
    applyStartup,
    getAppliedStartups,
    getInvesters,
} from '../controllers/investment.Controller.js';

investmentRouter
    .route('/:startupId')
    .post(verifyJWT, applyStartup)
    .get(verifyJWT, getInvesters);

investmentRouter.route('/').get(verifyJWT, getAppliedStartups);

investmentRouter.route('/become-a-investor').post(verifyJWT,registerInvestor);
