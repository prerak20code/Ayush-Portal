import express from 'express';
import {
    getAllStartups,
    getStartupById,
    createStartup,
} from '../controllers/startupController.js';

const router = express.Router();

router.get('/', getAllStartups);

router.get('/:id', getStartupById);

router.post('/', createStartup);

export default router;
