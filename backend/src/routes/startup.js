import express from 'express';
import isAuthenticated from '../middlewares/authMiddleware.js';
import {
    poststartup,
    getAllStartups,
    getuserstartup,
    getStartupById,
    updateStartup,
    deleteStartup,
} from '../controllers/startup.js';

const router = express.Router();

router.route('/post').post(isAuthenticated, poststartup);
router.route('/get').get(isAuthenticated, getAllStartups);
router.route('/getuserstartup').get(isAuthenticated, getuserstartup);
router.route('/get/:id').get(isAuthenticated, getStartupById);
router.route('/api/startups/:id/update').put(isAuthenticated, updateStartup);
router.route('/api/startups/:id/delete').delete(isAuthenticated, deleteStartup);

export default router;
