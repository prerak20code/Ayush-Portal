import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;
const InvestorSchema = new Schema({
    Name: {
        type: String,
    Name: {
        type: String,
        required: true,
    },
    organisationName: {
        type: String,
    organisationName: {
        type: String,
        required: true,
    },
    Interest: {
        type: String,
    Interest: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
    PhoneNumber: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
    email: {
        type: String,
        required: true,
    },

    connectedStartups: [
    connectedStartups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Startups',
        },
            ref: 'Startups',
        },
    ],
    likedStartups: [
    likedStartups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Startups',
        },
            ref: 'Startups',
        },
    ],
    applicationStatus: [
    applicationStatus: [
        {
            type: Schema.Types.ObjectId,
            ref: 'notification',
        },
    ],
            ref: 'notification',
        },
    ],
});

InvestorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Investor', InvestorSchema);

