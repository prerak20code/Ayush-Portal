import { v4 as uuid } from 'uuid';
import { UserVerification } from '../models/index.js';
import bcrypt from 'bcrypt';
import { getTranporter } from './index.js';
import { PENDING } from '../constants/statusCodes.js';

export const sendVerificationEmail = async (user, res) => {
    try {
        const { _id, email } = user;
        const uniqueString = uuid() + _id;

        const url = `http://localhost:${process.env.PORT}/users/verify/${_id}/${uniqueString}`;

        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify your Email',
            html: `
                    <p>Verify your email address to complete the signup and login to your account.</p> 
                    <p>This link will <b>expire in an hour.</b></p> 
                    <p>Press <a href=${url}
                    > here </a> to proceed.</p>
                `,
        };

        //hash the unique string
        const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
        if (hashedUniqueString) {
            //create userVerification record
            const newVerificaion = await UserVerification.create({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            });
            if (newVerificaion) {
                const transporter = getTranporter();
                await transporter.sendMail(mailOptions);

                //email sent and verification record saved
                res.status(PENDING).json({
                    message: 'verification email sent!',
                });
            } else {
                throw new Error(`could not save verification record.`);
            }
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'An error occured while verifying email.',
            error: err.message,
        });
    }
};
