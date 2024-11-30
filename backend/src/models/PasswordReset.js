import mongoose from 'mongoose';
const { Schema } = mongoose;

const PasswordResetSchema = new Schema({
    userId: String,
    Resetstring: String,
    createdAt: Date,
    expiresAt: Date,
});

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);

export default PasswordReset;
