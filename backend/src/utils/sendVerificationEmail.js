import { v4 as uuid } from 'uuid';
import { UserVerification } from '../models/index.js';
import bcrypt from 'bcrypt';
import { getTranporter } from './index.js';
import { PENDING, SERVER_ERROR } from '../constants/statusCodes.js';
import { getEmailVerificationMailLayout } from '../constants/mails.js';

export const sendVerificationEmail = async (user, redirectURL, res) => {
    try {
        const { _id, email } = user;
        const uniqueString = uuid() + _id;

        // const url = `http://localhost:5173/user/verify/${_id}/${uniqueString}`; // frontend page
        const url = `${redirectURL}/${_id}/${uniqueString}`; // frontend page

        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify your Email',
            html: getEmailVerificationMailLayout(url),
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
                const transporter = await getTranporter();
                await transporter.sendMail(mailOptions);

                //email sent & verification record saved
                res.status(PENDING).json({
                    message: 'verification email sent',
                });
            }
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'An error occured while sending verification email.',
            error: err.message,
        });
    }
};
