import express from 'express';
export const Messagerouter = express.Router();
import { allMessages, sendMessage } from '../controllers/messageControllers.js';

import { verifyJWT } from '../middlewares/index.js';

Messagerouter.route('/:chatId').get(verifyJWT, allMessages);
Messagerouter.route('/').post(verifyJWT, sendMessage);
