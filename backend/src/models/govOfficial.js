import mongoose from 'mongoose';

const govOfficialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'GovernmentOfficial',
    },
}, { timestamps: true });

export const GovOfficial = mongoose.model('GovOfficial', govOfficialSchema);
