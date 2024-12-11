import mongoose from 'mongoose';
import { stringify } from 'uuid';
const InvestorDocumentschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createddate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
    },

    updatedate: {
        type: Date,
    },
    isapproved: {
        type: Boolean,
        require: true,
        default: false,
    },
});

Documentschema.pre('save', function (next) {
    if (!this.isNew) {
        this.updatedate = Date.now();
    }
    next();
});

export const InvestorDocumentData = mongoose.model(
    'InvestorDocument',
    InvestorDocumentschema
);
