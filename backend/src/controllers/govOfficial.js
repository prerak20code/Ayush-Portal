import startup from '../models/startup.js';

export const getAllStartupsForGov = async (req, res) => {
    try {
        const startups = await startup
            .find()
            .populate('user')
            .sort({ createdAt: -1 });
        return res.status(200).json({
            startups,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while fetching startups',
            success: false,
        });
    }
};

// get all invester
export const getAllInvestorsForGov = async (req, res) => {
    try {
        const investors = await investment
            .find()
            .populate({
                path: 'startup',
                populate: { path: 'user' },
            })
            .populate('invester')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            investors,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while fetching investors',
            success: false,
        });
    }
};

export const approveOrRejectStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // New status: 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status. Use "approved" or "rejected".',
                success: false,
            });
        }

        const startupToUpdate = await startup.findById(id);
        if (!startupToUpdate) {
            return res.status(404).json({
                message: 'Startup not found',
                success: false,
            });
        }

        startupToUpdate.status = status;
        await startupToUpdate.save();

        return res.status(200).json({
            message: `Startup ${status} successfully`,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while updating startup status',
            success: false,
        });
    }
};
