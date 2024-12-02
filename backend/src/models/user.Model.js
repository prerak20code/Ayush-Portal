import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);

// pre hook to hash password before save & update
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.pre('updateOne', async function (next) {
    try {
        const update = this.getUpdate(); // Get the update object
        if (update.password) {
            update.password = await bcrypt.hash(update.password, 10);
        }
        next();
    } catch (err) {
        next(err);
    }
});
