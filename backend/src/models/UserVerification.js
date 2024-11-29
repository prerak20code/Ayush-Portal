import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserVerificationSchema = new Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
});

const UserVerification = mongoose.model(
    'UserVerifcation',
    UserVerificationSchema
);

export default UserVerification;
