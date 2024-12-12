import { getTransporter } from './index.js'; // Assuming this returns a configured nodemailer transporter
import { SERVER_ERROR, SUCCESS } from '../constants/statusCodes.js';

export const sendQueryEmail = async (req, res) => {
    try {
        const { userEmail, issue, description } = req.body;

        const ministryEmail = process.env.MINISTRY_OF_AYUSH_EMAIL; // Set the Ministry of Ayush's email in env
        const mailOptions = {
            from: userEmail,
            to: ministryEmail,
            subject: `Query: ${issue}`,
            html: `
                <p><strong>Issue:</strong> ${issue}</p>
                <p><strong>Details:</strong></p>
                <p>${description}</p>
                <p>Sent by: ${userEmail}</p>
            `,
        };

        const transporter = await getTransporter();
        await transporter.sendMail(mailOptions);

        // Email sent successfully
        return res.status(SUCCESS).json({
            message: 'Query email sent successfully to the Ministry of Ayush.',
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: 'An error occurred while sending the query email.',
            error: err.message,
        });
    }
};