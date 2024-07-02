import nodemailer from "nodemailer";
import { emailTemplate } from "./EmailTemp.js";

export async function sendEmail({to,subject,userName='',token}) {
    try {
        if (!to) {
            throw new Error("No recipients defined");
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password,
            }
        });

        const info = await transporter.sendMail({
            from: `Aman Store ${process.env.email}`,
            to,
            subject,
            html:emailTemplate(userName, token),
        });

        console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error; // Re-throw the error for handling in the calling function
    }
}
