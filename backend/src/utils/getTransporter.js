import nodemailer from 'nodemailer';

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
        throw new Error(`Error in generating transporter: ${err.message}`);
    }
};
