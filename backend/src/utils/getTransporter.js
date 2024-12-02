//node mailer logics
import nodemailer from 'nodemailer'; //email handler

export const getTranporter = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'preraknagpal276@gmail.com',
            pass: 'bqgrxpdjutjcyfnx',
        },
    });

    //testing success
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
            return;
        } else {
            console.log('Ready for messages.\n', 'success:', success);
            return transporter;
        }
    });
};
