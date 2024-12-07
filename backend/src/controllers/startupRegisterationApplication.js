import { StartupRegistrationApplication } from '../models/index.js';
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from '../constants/statusCodes.js';
import cron from 'node-cron';
import { getTransporter } from '../utils/getTransporter.js';

const startApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const startedApplication = await StartupRegistrationApplication.create({
            owner: userId,
        });

        if (startedApplication) {
            return res.status(OK).json({
                message: 'startup registeration application has been started',
            });
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'error occured while starting the startup registeration application',
            error: err.message,
        });
    }
};

const completeApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        const { startupId } = req.params;
        const application =
            await StartupRegistrationApplication.findById(startupId);

        if (!application.owner.equals(userId)) {
            return res
                .status(BAD_REQUEST)
                .json({ message: 'you are not the owner of this startup' });
        } else {
            application.status = 'complete';
            await application.save();
        }

        return res.status(OK).json(application);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'error occured while starting the startup registeration application',
            error: err.message,
        });
    }
};

const getApplication = async (req, res) => {
    try {
        const userId = req.user._id;
        // const apps = await StartupRegistrationApplication.find({
        //     owner: userId,
        // });

        //aggregation pipeline to populate the owner field
        const apps = await StartupRegistrationApplication.aggregate([
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'startupOwners',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner',
                },
            },
            {
                $lookup: {
                    from: 'startups',
                    localField: 'startupId',
                    foreignField: '_id',
                    as: 'startupInfo',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'bankinfos',
                                localField: 'startupId',
                                foreignField: 'startupId',
                                as: 'bankInfo',
                            },
                        },
                        {
                            $lookup: {
                                from: 'financialinfos',
                                localField: 'startupId',
                                foreignField: 'startupId',
                                as: 'financialInfo',
                            },
                        },
                    ],
                },
            },
            {
                $addFields: {
                    views: { $size: '$views' },
                    owner: { $first: '$owner' },
                },
            },
        ]);

        if (apps.length > 0) {
            return res
                .status(NOT_FOUND)
                .json({ message: 'no applications found' });
        } else {
            return res.status(OK).json(apps);
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message:
                'error occured while getting the startup registeration application',
            error: err.message,
        });
    }
};
// Run the job every hour to check for expired applications
cron.schedule('0 * * * *', async () => {
    console.log('Running the conditional expiration job...');

    const now = new Date();

    try {
        // Find documents where `expireAt` is in the past and status is still pending
        const expiredApplications = await StartupRegistrationApplication.find({
            expireAt: { $lte: now },
            status: 'pending', // Only delete pending applications
        });

        if (expiredApplications.length > 0) {
            console.log(
                `Found ${expiredApplications.length} expired application.`
            );

            for (const app of expiredApplications) {
                // Send a notification email before deleting
                const transporter = await getTransporter();
                await transporter.sendMail({
                    from: process.env.AUTH_EMAIL,
                    to: app.owner.email,
                    subject: 'Your Application Has Expired',
                    text: `Your application has expired and will be deleted soon.`,
                });

                // Delete the expired application
                console.log(`Deleting application ${app._id}...`);
                await app.deleteOne();
            }
        } else {
            console.log('No applications to delete.');
        }
    } catch (error) {
        console.error('Error running the expiration job:', error);
    }
});

export { completeApplication, startApplication, getApplication };
