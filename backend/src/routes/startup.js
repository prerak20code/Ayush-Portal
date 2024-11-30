import express from 'express';
import {
    poststartup,
    getAllStartups,
    getuserstartup,
    getStartupById,
} from '../controllers/startup.controller.js';

const router = express.Router();

router.route('/post').post(isAuthenticated, poststartup);
router.route('/get').get(isAuthenticated, getAllStartups);
router.route('/getuserstartup').get(isAuthenticated, getuserstartup);
router.route('/get/:id').get(isAuthenticated, getStartupById);

export default router;
