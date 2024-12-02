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
            //user ka relation hoga startup or user ke sath
            type: mongoose.Schema.Types.ObjectID,
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
        createdAt: { type: Date, default: Date.now },
        investment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'investment',
            },
        ],
    },
    { timestamps: true }
);

export const Startup = mongoose.model('startup', startupSchema);
