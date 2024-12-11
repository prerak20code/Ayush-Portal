import {
    BAD_REQUEST,
    CREATED,
    NOT_FOUND,
    OK,
} from '../constants/statusCodes.js';
import { Investment } from '../models/index.js';
import { Investor } from '../models/investorPersonal.Model.js';
import { User } from '../models/index.js';
import { InvestorBankInfo } from '../models/investorBankingInformation.js';


const registerInvestor = async (req,res) => {
    try {
        let { investorType,organisationName,
             dateOfBirth, address,
              nationality, linkedInURL,
              revenue,netWorth,businessLicenseNumber,
              taxId,govtIdtype,
              govtIdValue,bankName,
            accountNumber,
            accountType,
            ifscCode,
            branchName,
            swiftCode, } = req.body;


        const { _id } = req.user;
        dateOfBirth = dateOfBirth.trim();
        nationality = nationality.trim();
        revenue= revenue.trim();
        netWorth= netWorth.trim();
              taxId=taxId.trim();
              govtIdtype = govtIdtype.trim();

              govtIdValue=govtIdValue.trim();
              bankName = bankName.trim();
            accountNumber = accountNumber.trim();

            accountType = accountType.trim();
            ifscCode = ifscCode.trim();
            branchName= branchName.trim();
            swiftCode=swiftCode.trim();

        if (!investorType || !dateOfBirth || !address || !nationality  || !revenue || !netWorth||
            !taxId || !govtIdtype ||
            !govtIdValue || !bankName ||
         !accountNumber||
          !accountType||
          !ifscCode||
          !branchName||
          !swiftCode) {
            return res.status(BAD_REQUEST).json({
                message: 'Empty input fields!',
            });
        }

        const isValid = validateRegex('dateOfBirth', dateOfBirth);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: 'Invalid DOB entered',
            });
        }

        // check if user is present in users table
        const user = await User.findById(_id);
        if (!user.verified) {
            return res.status(BAD_REQUEST).json({
                message:
                    'your email is not verified yet, please login or sign up',
            });
        }
        //create new user
        //password hashing ( auto done using pre hook )
        const newInvestor = await Investor.create({
            userId: user._id,
            dateOfBirth,
            address,
            nationality,
            linkedInURL,
            investorType,
            organisationName,
            revenue,
            netWorth,
            taxId,
            businessLicenseNumber,
        });

        const addedBankInfo = await InvestorBankInfo.create({
            bankName,
            accountNumber,
            accountType,
            IFSC,
            branchName,
            swiftCode,
            investorId:user._id
        });
        if (addedBankInfo) {
            return res.status(OK).json(addedBankInfo);
        }
        // send mail
        if (newInvestor) {
            return res
                .status(OK)
                .json({ message: 'personal info saved successfully' });
        }
        
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while applying for stakeholder.',
            error: err.message,
        });
    }
}

const addInvestorBankInfo = async () => {

}

const deleteInvestorBankInfo = async () => {

}

const addInvestorFinancialInfo = async () => {

}
 
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

export {registerInvestor, applyStartup, getAppliedStartups, getInvesters };
