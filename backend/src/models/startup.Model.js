import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StartupOwner',
            required: true,
        },
        startupName: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        businessType: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        // pdf: {
        //     type: String,
        // },
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        valuation: {
            type: Number,
            required: true,
        },
        dateOfEstablishment: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        investors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Investment',
            },
        ],
    },
    { timestamps: true }
);

export const Startup = mongoose.model('Startup', startupSchema);
