import express from 'express';
import {
    getAllStartupsForGov,
    getAllInvestorsForGov,
    approveOrRejectStartup,
} from '../controllers/government.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js'; // Middleware for government authentication

const router = express.Router();

// Government Routes
router
    .route('/api/government/startups')
    .get(isAuthenticated, getAllStartupsForGov);
router
    .route('/api/government/investors')
    .get(isAuthenticated, getAllInvestorsForGov);
router
    .route('/api/government/startups/:id')
    .put(isAuthenticated, approveOrRejectStartup);

export default router;
