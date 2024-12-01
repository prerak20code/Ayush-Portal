import express from "express";
import isAuthenticated from '../middlewares/authMiddleware.js'
import {applystartup,getAppliedstartups,getinvesters  } from "../controllers/investment.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applystartup);
router.route("/get").get(isAuthenticated, getAppliedstartups);
router.route("/:id/invester").get(isAuthenticated, getinvesters);

export default router;