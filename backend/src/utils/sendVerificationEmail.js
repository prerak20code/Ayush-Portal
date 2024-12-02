import { v4 as uuid } from 'uuid';
import { UserVerification } from '../models';
import bcrypt from 'bcrypt';
import { getTranporter } from '.';
import { BAD_REQUEST, PENDING } from '../constants/statusCodes';

export const sendVerificationEmail = async ({ _id, email }, res) => {
    try {
        // url
        const currentUrl = 'http://localhost:4000/';

        const uniqueString = uuid() + _id;

        //mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify your Email',
            html: `
                <p>Verify your email address to complete the signup and login into your account.</p> 
                <p>This link will <b>expire in an hour.</b></p> 
                <p>Press <a href=${currentUrl + 'user/verify/' + _id + '/' + uniqueString}
                > here </a> to proceed.</p>
            `,
        };

        //hash the unique string
        const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
        if (hashedUniqueString) {
            //set values in Userverification collection
            const newVerificaion = await UserVerification.create({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            });
            if (newVerificaion) {
                const transporter = getTranporter();
                transporter
                    .sendMail(mailOptions)
                    .then(() => {
                        //email sent and verification record saved
                        res.status(PENDING).json({
                            message: 'EMAIL VERIFICATION SENT!',
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(BAD_REQUEST).json({
                            message: 'Verification email failed!',
                        });
                    });
            } else {
                console.log(error);
                throw new Error(
                    `colud not save verification email data!, error:${error}`
                );
            }
        }
    } catch (err) {
        res.status(SERVER_ERROR).json({
            message: 'An error occured while hashing email data !',
            error: err.message,
        });
    }
};
