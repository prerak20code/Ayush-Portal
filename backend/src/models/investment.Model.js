import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
    {
        startup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'startup', //generating relation between inverster and which startup they have applied
            required: true,
        },
        invester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
    },
    { timestamps: true }
);
export const Investment = mongoose.model('investment', investmentSchema);
