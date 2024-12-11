import express from 'express';
export const startupRouter = express.Router();

import { verifyJWT } from '../middlewares/index.js';

import {
    addStartup,
    updateStartup,
    deleteStartup,
    getStartupById,
    getAllStartups,
    getStartupsByOwnerId,
    addBankInfo,
    addFinancialInfo,
    deleteBankInfo,
    deleteFinancialInfo,
    registerStartupUsingDPIITid,
} from '../controllers/startup.Controller.js';

startupRouter.use(verifyJWT); // will be applied to all startup routes

startupRouter.route('/add').post(addStartup);
startupRouter.route('/:userId').get(getStartupsByOwnerId);

startupRouter.route('/bank-info').post(addBankInfo).delete(deleteBankInfo);
startupRouter
    .route('/financial-info')
    .post(addFinancialInfo)
    .delete(deleteFinancialInfo);
startupRouter
    .route('/:startupId')
    .get(getStartupById)
    .patch(updateStartup)
    .delete(deleteStartup);

startupRouter
    .route('/register-DPIIT/:DPIITid')
    .post(registerStartupUsingDPIITid);

startupRouter.route('/').get(getAllStartups);
