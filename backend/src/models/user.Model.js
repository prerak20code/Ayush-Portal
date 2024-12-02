import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    phone: Number,
    verified: Boolean,
});

export const User = mongoose.model('User', UserSchema);
