//node mailer logics
import nodemailer from 'nodemailer'; //email handler

export const getTranporter = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'preraknagpal276@gmail.com',
                pass: 'bqgrxpdjutjcyfnx',
            },
        });

        //testing success
        await transporter.verify();
        console.log('Ready for messages.');

        return transporter;
    } catch (err) {
        console.error('Error in generating transporter:', err.message);
        throw new Error(`Error in generating transporter: ${err.message}`);
    }
};
