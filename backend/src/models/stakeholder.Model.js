import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const InvestorSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },

    organisationName: {
        type: String,
        required: true,
    },

    Interest: {
        type: String,
        required: true,
    },

    PhoneNumber: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    connectedStartups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Startups',
        },
    ],

    likedStartups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Startups',
        },
    ],

    applicationStatus: [
        {
            type: Schema.Types.ObjectId,
            ref: 'notification',
        },
    ],
});

InvestorSchema.plugin(passportLocalMongoose);

export const Investor = mongoose.model('Investor', InvestorSchema);
