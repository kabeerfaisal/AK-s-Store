
import axios from 'axios';

export const sendEmail = async ({ email, subject, message }) => {
    try {
        await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: {
                    name: "AK'S STORE",
                    email: process.env.EMAIL
                },
                to: [{ email: email }],
                subject: subject,
                htmlContent: message
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY,
                    'content-type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error("Brevo API Email Error:", error.response?.data || error.message);
        throw new Error("Could not send email.");
    }
};