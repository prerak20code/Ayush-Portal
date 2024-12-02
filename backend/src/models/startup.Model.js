import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        startuptype: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        startupage: {
            type: Number,
            required: true,
        },
        Ask: {
            type: Number,
            required: true,
        },
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        investment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Investment',
            },
        ],
    },
    { timestamps: true }
);

export const Startup = mongoose.model('Startup', startupSchema);
