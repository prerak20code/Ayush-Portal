import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const startupRegisterationApplicationSchema = new mongoose.Schema(
    {
        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup',
            // required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StartupOwner',
            required: true,
        },
        completedSteps: {
            type: [String],
            required: true,
            default: [],
        },
        status: {
            type: String,
            enum: ['pending', 'complete'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

// pre hooks to hash password before save
startupRegisterationApplicationSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        throw err;
    }
});

// export is done after defining the hooks
export const StartupRegisterationApplication = mongoose.model(
    'StartupRegisterationApplication',
    startupRegisterationApplicationSchema
);
