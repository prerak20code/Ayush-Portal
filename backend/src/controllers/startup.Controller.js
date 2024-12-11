import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CREATED,
    SERVER_ERROR,
    FORBIDDEN,
} from '../constants/statusCodes.js';
import { Startup, FinancialInfo, BankInfo, Dpiit } from '../models/index.js';

// pending
const getAllStartups = async (req, res) => {
    try {
        const { keyword = '' } = req.query;
        const query = {
            $or: [
                { startupName: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        };
        const startups = await Startup.find(query)
            .populate({
                path: 'owner',
            })
            .sort({ createdAt: -1 });

        console.log(startups);

        if (!startups.length) {
            return res.status(NOT_FOUND).json({
                message: 'no startup found',
            });
        }
        return res.status(OK).json(startups);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startups.',
            error: err.message,
        });
    }
};

const registerStartupUsingDPIITid = async (req, res) => {
    try {
        const { DPIITid } = req.params;
        const { password } = req.body;

        // get data from dpiit website and create its record in db and send the data to the frontend
        const data = await Dpiit.findOne({
            DPIITid,
        });
        if (!data) {
            return res.status(NOT_FOUND).json({
                message: 'startup not found',
            });
        }
        if (data.DPIITpassword !== password) {
            return res
                .status(BAD_REQUEST)
                .json({ message: 'invalid password' });
        }

        return res.status(OK).json(data);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'Error occurred while registering the startup using DPIIT.',
            error: err.message,
        });
    }
};

const addStartup = async (req, res) => {
    try {
        const {
            startupName,
            description,
            businessType,
            industry,
            address,
            country,
            website,
            valuation,
            dateOfEstablishment,
            // pdf,
        } = req.body;
        valuation = Number(valuation);
        const userId = req.user._id;

        if (
            !startupName ||
            !description ||
            !businessType ||
            !industry ||
            !address ||
            !country ||
            !website ||
            !valuation ||
            !dateOfEstablishment ||
            !userId
        ) {
            return res.status(BAD_REQUEST).json({
                message: 'missing fields',
            });
        }
        const startup = await Startup.create({
            startupName,
            description,
            businessType,
            industry,
            address,
            country,
            website,
            valuation,
            dateOfEstablishment,
            // pdf,
            owner: userId,
        });
        if (startup) {
            return res.status(CREATED).json({
                message: 'startup created successfully',
                startup,
            });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while adding the startup.',
            error: err.message,
        });
    }
};

const getStartupById = async (req, res) => {
    try {
        const { startupId } = req.params;
        const startup = await Startup.findById(startupId);
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'startup not found.',
            });
        }
        return res.status(OK).json(startup);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startup.',
            error: err.message,
        });
    }
};

const getStartupsByOwnerId = async (req, res) => {
    try {
        const { userId } = req.params;
        const startups = await Startup.find({ owner: userId });
        if (!startups.length) {
            return res.status(NOT_FOUND).json({
                message: 'no startups found',
            });
        }
        return res.status(OK).json(startups);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the user startups.',
            error: err.message,
        });
    }
};

const updateStartup = async (req, res) => {
    try {
        const { startupId } = req.params;
        const userId = req.user._id;
        const { updates } = req.body;

        const existingStartup = await Startup.findById(startupId);

        if (!existingStartup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        // Check if the logged-in user is the owner of the startup
        if (!existingStartup.owner.equals(userId)) {
            return res.status(FORBIDDEN).json({
                message: 'You are not authorized to update this startup',
            });
        }

        // Update the startup
        const updatedStartup = await Startup.findByIdAndUpdate(
            startupId,
            { $set: { updates } },
            {
                new: true, // Return the updated document
                runValidators: true,
            }
        );

        return res.status(OK).json(updatedStartup);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while updating the startup',
            error: err.message,
        });
    }
};

const deleteStartup = async (req, res) => {
    try {
        const { startupId } = req.params;
        const userId = req.user._id;

        // Find the startup by ID
        const existingStartup = await Startup.findById(startupId);

        if (!existingStartup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        // Check if the logged-in user is the creator of the startup
        if (!existingStartup.owner.equals(userId)) {
            return res.status(FORBIDDEN).json({
                message: 'You are not authorized to delete this startup',
            });
        }

        // Delete the startup
        await Startup.findByIdAndDelete(startupId);

        return res.status(OK).json({
            message: 'Startup deleted successfully',
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while deleting the startup',
            error: err.message,
        });
    }
};

const addBankInfo = async (req, res) => {
    try {
        const { startupId } = req.params;
        const {
            bankName,
            accountNumber,
            accountType,
            IFSC,
            branchName,
            swiftCode,
            balanceStatement,
        } = req.body;
        if (
            !bankName ||
            !accountNumber ||
            !accountType ||
            !IFSC ||
            !branchName ||
            !swiftCode
        ) {
            return res.status(BAD_REQUEST).json({ message: 'missing fields' });
        }

        const addedBankInfo = await BankInfo.create({
            bankName,
            accountNumber,
            accountType,
            IFSC,
            branchName,
            swiftCode,
            balanceStatement,
            startupId,
        });
        if (addedBankInfo) {
            return res.status(OK).json(addedBankInfo);
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "An error occurred while adding the startup's bank info",
            error: err.message,
        });
    }
};

const addFinancialInfo = async (req, res) => {
    try {
        const { startupId } = req.params;
        const {
            revenue,
            profitMargin,
            fundingReceived,
            valuation,
            financialYear,
            balanceSheet,
        } = req.body;
        if (
            !revenue ||
            !profitMargin ||
            !fundingReceived ||
            !valuation ||
            !financialYear
        ) {
            return res.status(BAD_REQUEST).json({ message: 'missing fields' });
        }

        const addedFinancialInfo = await FinancialInfo.create({
            revenue,
            profitMargin,
            fundingReceived,
            valuation,
            financialYear,
            balanceSheet,
            startupId,
        });
        if (addedFinancialInfo) {
            return res.status(OK).json(addedFinancialInfo);
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "An error occurred while adding the startup's bank info",
            error: err.message,
        });
    }
};

const deleteBankInfo = async (req, res) => {
    try {
        const { startupId } = req.params;
        const userId = req.user._id;
        const startup = await Startup.findById(startupId);
        if (!startup.owner.equals(userId)) {
            return res.status(BAD_REQUEST).json({
                message:
                    'you are not authorized to delete bank info for this startup',
            });
        }

        await BankInfo.findByIdAndDelete(startupId);

        return res
            .status(OK)
            .json({ message: 'bank info has been deleted successfully' });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "An error occurred while deleting the startup's bank info",
            error: err.message,
        });
    }
};

const deleteFinancialInfo = async (req, res) => {
    try {
        const { startupId } = req.params;
        const userId = req.user._id;
        const startup = await Startup.findById(startupId);
        if (!startup.owner.equals(userId)) {
            return res.status(BAD_REQUEST).json({
                message:
                    'you are not authorized to delete financial info for this startup',
            });
        }

        await FinancialInfo.findByIdAndDelete(startupId);

        return res
            .status(OK)
            .json({ message: 'financial info has been deleted successfully' });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                "An error occurred while deleting the startup's financial info",
            error: err.message,
        });
    }
};

export {
    addStartup,
    updateStartup,
    deleteStartup,
    getStartupById,
    getAllStartups,
    getStartupsByOwnerId,
    addBankInfo,
    addFinancialInfo,
    deleteBankInfo,
    deleteFinancialInfo,
    registerStartupUsingDPIITid,
};
