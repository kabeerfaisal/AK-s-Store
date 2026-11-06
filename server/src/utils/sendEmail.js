import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: `AK STORE <${process.env.EMAIL}>`,
        to: email,
        subject: subject,
        html: message
    }

    await transporter.sendMail(mailOptions);


}