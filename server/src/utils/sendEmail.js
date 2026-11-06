import nodemailer from "nodemailer";

export const sendEmail = async ({email, subject, message}) => {
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        connectionTimeout: 10000,
        socketTimeout: 10000
    })

    const mailOptions = {
        from: `AK Store <${process.env.EMAIL}>`,
        to: email,
        subject: subject,
        html: message
    }

    await transporter.sendMail(mailOptions);
}