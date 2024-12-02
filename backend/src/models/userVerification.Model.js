import mongoose from 'mongoose';

const userVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
});

export const UserVerification = mongoose.model(
    'UserVerifcation',
    userVerificationSchema
);
