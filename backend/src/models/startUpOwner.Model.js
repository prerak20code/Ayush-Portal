import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const startupOwnerSchema = new mongoose.Schema(
    {
        // startupId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Startup',
        //     // required: true, // personal info k time pe nhi hogi
        //     unique: true,
        // },
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
        address: { type: String, required: true },
        refreshToken: {
            type: String,
            default: '',
        },
        nationality: { type: String, required: true, trim: true },
        linkedinURL: { type: String, default: '' },
    },
    { timestamps: true }
);

// pre hooks to hash password before save
startupOwnerSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = bcrypt.hashSync(this.password, 10);
        }
        next();
    } catch (err) {
        throw err;
    }
});

// export is done after defining the hooks
export const StartupOwner = mongoose.model('StartupOwner', startupOwnerSchema);
