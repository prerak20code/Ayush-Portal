import { getTransporter } from './index.js';
import { SERVER_ERROR, OK } from '../constants/statusCodes.js';

export const sendQueryEmail = async (req, res) => {
    try {
        console.log("1")
        const { subject, userEmail, query } = req.body;
console.log(subject, userEmail, query);
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: process.env.MINISTRY_OF_AYUSH_EMAIL,
            subject: `Query: ${subject}`,
            html: `
                <p><strong>Issue:</strong> ${issue}</p>
                <p><strong>Details:</strong></p>
                <p>${query}</p>
                <p>Sent by: ${userEmail}</p>
            `,
        };

        const transporter = await getTransporter();
        await transporter.sendMail(mailOptions);

        return res.status(OK).json({
            message: 'Query email sent OKfully to the Ministry of Ayush.',
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while sending the query email.',
            error: err.message,
        });
    }
};
