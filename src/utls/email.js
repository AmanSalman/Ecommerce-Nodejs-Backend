import nodemailer from "nodemailer"


export async function sendEmail ({to,subject,html}) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:  process.env.email,
            pass: process.env.password,
        }
    });


    const info = await transporter.sendMail({
        from: `Aman Store ${process.env.email}`,
        to:process.env.email,
        subject,
        text: 'Welcome to our store',
        html,
    }); 
}