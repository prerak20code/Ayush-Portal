import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CREATED,
    SERVER_ERROR,
    FORBIDDEN,
} from '../constants/statusCodes.js';
import { Startup } from '../models';

const addStartup = async (req, res) => {
    try {
        const { title, description, startuptype, Ask, startupage, UserId } =
            req.body;
        const userId = req.user;

        if (
            !title ||
            !description ||
            !startuptype ||
            !startupage ||
            !Ask ||
            !UserId
        ) {
            return res.status(BAD_REQUEST).json({
                message: 'Some fields are missing.',
            });
        }
        const startup = await Startup.create({
            title,
            description,
            startuptype,
            startupage,
            Ask: Number(Ask),
            user: userId,
            created_by: userId,
        });
        if (startup) {
            return res.status(CREATED).json({
                message: 'New startup created successfully',
                startup,
            });
        } else {
            throw new Error(`startup creation error, error:${error}`);
        }
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while posting the startup.',
            error: err.message,
        });
    }
};

const getAllStartups = async (req, res) => {
    try {
        const { keyword = '' } = req.query;
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ],
        };
        const startups = await Startup.find(query)
            .populate({
                path: 'user', //to get all information about the user, populate is used
            })
            .sort({ createdAt: -1 });
        if (!startups.length) {
            return res.status(NOT_FOUND).json({
                message: 'no startup found',
            });
        }
        return res.status(OK).json({
            startups,
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startups.',
            error: err.message,
        });
    }
};

const getStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const startup = await Startup.findById(id);
        if (!startup) {
            return res.status(NOT_FOUND).json({
                message: 'startup not found.',
            });
        }
        return res.status(OK).json({ startup });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the startup.',
            error: err.message,
        });
    }
};

const getUserStartups = async (req, res) => {
    try {
        const { userId } = req.user;
        const startups = await Startup.find({ created_by: userId });
        if (!startups.length) {
            return res.status(NOT_FOUND).json({
                message: 'Startups not found',
            });
        }
        return res.status(OK).json({
            startups,
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'error occured while getting the user startups.',
            error: err.message,
        });
    }
};

const updateStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;
        const updates = req.body;

        const existingStartup = await Startup.findById(id);

        if (!existingStartup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        // Check if the logged-in user is the owner of the startup
        if (existingStartup.created_by.toString() !== userId) {
            return res.status(FORBIDDEN).json({
                message: 'You are not authorized to update this startup',
            });
        }

        // Update the startup
        const updatedStartup = await Startup.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true,
        });

        return res.status(OK).json({
            message: 'Startup updated successfully',
            startup: updatedStartup,
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while updating the startup',
            error: err.message,
        });
    }
};

const deleteStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        // Find the startup by ID
        const existingStartup = await Startup.findById(id);

        if (!existingStartup) {
            return res.status(NOT_FOUND).json({
                message: 'Startup not found',
            });
        }

        // Check if the logged-in user is the creator of the startup
        if (existingStartup.created_by.toString() !== userId) {
            return res.status(FORBIDDEN).json({
                message: 'You are not authorized to delete this startup',
            });
        }

        // Delete the startup
        await Startup.findByIdAndDelete(id);

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

export {
    addStartup,
    updateStartup,
    deleteStartup,
    getStartup,
    getAllStartups,
    getUserStartups,
};
