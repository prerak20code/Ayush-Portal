import express from 'express';
export const Chatrouter = express.Router();

import {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} from '../controllers/chatControllers.js';

import { verifyJWT } from '../middlewares/index.js';

Chatrouter.route('/').post(verifyJWT, accessChat);
Chatrouter.route('/').get(verifyJWT, fetchChats);
// router.route('/group').post(verifyJWT, createGroupChat);
// router.route('/rename').put(verifyJWT, renameGroup);
// router.route('/groupremove').put(verifyJWT, removeFromGroup);
// router.route('/groupadd').put(verifyJWT, addToGroup);
