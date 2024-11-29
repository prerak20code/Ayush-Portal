import express from "express";
import router from express.Router();
import passport from "passport";
import wrapAsync from "../utils/wrapAsync";
import { saveRedirectUrl } from "../middlewares/investorMiddleware";
import StakeholderControl from "../controllers/stakeholder"

router.
route("/Stakeholder/signup")
.get((req,res)=>{
    res.render("Investor/signup.jsx'");
})
.post(wrapAsync(StakeholderControl.logout));

router.
route("/Stakeholder/login")
.get((req,res)=>{
    res.render("");
})
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect: "/login", failureFlash: true}), wrapAsync(StakeholderControl.login));

router.get('/Stakeholder/logout',StakeholderControl.logout);
