import express from 'express';
export const govOfficialrouter = express.Router();

import {
    getAllInvestorsForGov,
    getAllStartupsForGov,
    approveOrRejectStartup,
} from '../controllers/government.controller.js';

import { verifyJWT } from '../middlewares';

govOfficialrouter.route('/startups').get(verifyJWT, getAllStartupsForGov);
govOfficialrouter.route('/investors').get(verifyJWT, getAllInvestorsForGov);
govOfficialrouter.route('/:startupId').put(verifyJWT, approveOrRejectStartup);
