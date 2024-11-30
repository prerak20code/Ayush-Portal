import {investment} from "../models/investment.model.js";
import startup, {startup} from "../models/startup.js";

export const applystartup = async(req,res)=>{
    try{
        const companyId = req.id;
        const startupId = req.params.id;
        if(!startupId){
            return res.status(400).json({
                message:"Startup Id is required.",
                success:false
            })
        };
        // check if the company has already applied of that same startup
        const existingInvestment = await investment.findOne({startup:startupId, invester:companyId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this startup",
                success:false
            });
        }

        // check if the startups exist
        const startup = await startup.findById(startupId);
        if(!startup){
            return res.status(404).json({
                message: "Startup not found",
                success: false
            })
        }
        // create a new investment
        const newinvestment = await investment.create({
            startup:startupId,
            invester:companyId,
        });
        startup.investments.push(newinvestment._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success:true
        })
    }catch(error){
        console.log(error);
    }
};

// company will get all its applied startups 
export const getAppliedstartups = async(req,res)=>{
    try{
        const companyId = req.id;
        const investment = await investment.find({invester:companyId}).sort({createdAt:-1}).populated({
            path:'startup',
            option:{sort:{createdAt:-1}},
            populate:{
                path:'user',
                option:{sort:{createdAt:-1}},
            }
        });
        if(!investment){
            return res.status(404).json({
                message:"No investment",
                success:false
            })
        };
        return res.status(200).json({
            investment,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

// user dekhega ki kitne logo ne interest dikhaya hai request ki hai 
export const getinvesters = async(req,res)=>{
    try{
        const startupId = req.params.id;
        const startup = await startup.findById(startupId).populated({
            path:'investment',
            option:{sort:{createdAt:-1}},
            populated:{
                path:'invester'
                }
        });
        if(!startup){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            startup,
            success:true
        });
    }catch(error){
        console.log(error);
    }
} 