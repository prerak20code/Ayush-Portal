import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
    {
        startupName: {
            type: String,
            required: true,
            unique: true,
        },
        businessType: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        pdf: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        website: {
            type: Number,
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
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'startupOwner',
            required: true,
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
