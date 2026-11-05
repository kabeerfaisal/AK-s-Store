import nodemailer from "nodemailer";

export const sendEmail = async ({email, subject, message}) => {
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: `AK Store <${process.env.EMAIL}>`,
        to: email,
        subject: subject,
        html: message
    }

    await transporter.sendMail(mailOptions);
}