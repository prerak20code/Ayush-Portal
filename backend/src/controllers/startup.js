import startup from '../models/startup.js';

// user jobs post karega
export const poststartup = async (req, res) => {
    try {
        const { title, description, startuptype, Ask, startupage, UserId } =
            req.body;
        const userId = req.id;

        if (
            !title ||
            !description ||
            !startuptype ||
            !startupage ||
            !Ask ||
            !UserId
        ) {
            return res.status(400).json({
                message: 'Something is missing.',
                success: false,
            });
        }
        const startup = await startup.create({
            title,
            description,
            startuptype,
            startupage,
            Ask: Number(Ask),
            user: userId,
            created_by: userId,
        });
        return res.status(201).json({
            message: 'New startup created successfully',
            startup,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

// invester can see all startups
export const getAllStartups = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        };
        const startup = await startup
            .find(query)
            .populate({
                path: 'user',
            })
            .sort({ createdAt: -1 }); //to get all information about the user populate is used
        if (!startup) {
            return res.status(404).json({
                message: 'Startup not found',
                success: false,
            });
        }
        return res.status(200).json({
            startup,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

// investers ke lia
export const getStartupById = async (req, res) => {
    try {
        const startupId = req.params.id;
        const startup = await startup.findById(startupId);
        if (!job) {
            return res.status(404).json({
                message: 'Jobs not found.',
                success: false,
            });
        }
        return res.status(200).json({ startup, succcess: true });
    } catch (error) {
        console.log(error);
    }
};

// user kitne jobs create kra hai abhi tk
export const getuserstartup = async (req, res) => {
    try {
        const userId = req.id;
        const startup = await startup.find({ created_by: userId });
        if (!startup) {
            return res.status(404).json({
                message: 'Startups not found',
                succcess: false,
            });
        }
        return res.status(200).json({
            startup,
            success: true,
        });
    } catch (error) {}
};

// update user
export const updateStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;
        const updates = req.body;

        // Find the startup by ID
        const existingStartup = await startup.findById(id);

        // Check if the startup exists
        if (!existingStartup) {
            return res.status(404).json({
                message: 'Startup not found',
                success: false,
            });
        }

        // Check if the logged-in user is the creator of the startup
        if (existingStartup.created_by.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to update this startup',
                success: false,
            });
        }

        // Update the startup
        const updatedStartup = await startup.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        return res.status(200).json({
            message: 'Startup updated successfully',
            startup: updatedStartup,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while updating the startup',
            success: false,
        });
    }
};

// startup delete krne ke lia
export const deleteStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;

        // Find the startup by ID
        const existingStartup = await startup.findById(id);

        if (!existingStartup) {
            return res.status(404).json({
                message: 'Startup not found',
                success: false,
            });
        }

        // Check if the logged-in user is the creator of the startup
        if (existingStartup.created_by.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to delete this startup',
                success: false,
            });
        }

        // Delete the startup
        await startup.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Startup deleted successfully',
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while deleting the startup',
            success: false,
        });
    }
};
