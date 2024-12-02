import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
    userId: String,
    resetString: String,
    createdAt: Date,
    expiresAt: Date,
});

export const PasswordReset = mongoose.model(
    'PasswordReset',
    passwordResetSchema
);

// pre hook to hash resetString before save
passwordResetSchema.pre('save', async function (next) {
    try {
        if (this.isModified('resetString')) {
            this.resetString = await bcrypt.hash(this.resetString, 10);
        }
        next();
    } catch (err) {
        next(err);
    }
});
