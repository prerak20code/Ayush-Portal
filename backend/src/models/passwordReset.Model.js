import mongoose from 'mongoose';

const PasswordResetSchema = new mongoose.Schema({
    userId: String,
    Resetstring: String,
    createdAt: Date,
    expiresAt: Date,
});

export const PasswordReset = mongoose.model(
    'PasswordReset',
    PasswordResetSchema
);
