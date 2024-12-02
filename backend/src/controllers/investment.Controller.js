import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constants/statusCodes';
import { Investment } from '../models';

// apply to be a investor in a startup
const applyStartup = async (req, res) => {
    try {
        const companyId = req.id;
        const { startupId } = req.params;

        if (!startupId) {
            return res.status(BAD_REQUEST).json({
                message: 'Startup Id is required.',
            });
        }
        // check if the company has already applied of that same startup
        const existingInvestment = await Investment.findOne({
            startup: startupId,
            invester: companyId,
        });
        if (existingInvestment) {
            return res.status(BAD_REQUEST).json({
                message: 'You have already applied for this startup',
            });
        }

        // check if the startups exist
        const startup = await startup.findById(startupId);
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }
        // create a new investment
        const newinvestment = await Investment.create({
            startup: startupId,
            invester: companyId,
        });
        startup.investments.push(newinvestment._id);
        await job.save();
        return res.status(CREATED).json({
            message: 'Job applied successfully.',
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while applying for stakeholder.',
            error: err.message,
        });
    }
};

// get all invested startuops by a company
const getAppliedStartups = async (req, res) => {
    try {
        const companyId = req.id;
        const investment = await Investment.find({ invester: companyId })
            .sort({ createdAt: -1 })
            .populated({
                path: 'startup',
                option: { sort: { createdAt: -1 } },
                populate: {
                    path: 'user',
                    option: { sort: { createdAt: -1 } },
                },
            });
        if (!investment) {
            return res.status(NOT_FOUND).json({
                message: 'No investment',
            });
        }
        return res.status(OK).json({
            investment,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting invested startups.',
            error: err.message,
        });
    }
};

// get investors of a particular startup
const getInvesters = async (req, res) => {
    try {
        const { startupId } = req.params;
        const startup = await Startup.findById(startupId).populated({
            path: 'investment',
            option: { sort: { createdAt: -1 } },
            populated: {
                path: 'invester',
            },
        });
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'Job not found.',
            });
        }
        return res.status(OK).json({
            startup,
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting investors.',
            error: err.message,
        });
    }
};

export { applyStartup, getAppliedStartups, getInvesters };
