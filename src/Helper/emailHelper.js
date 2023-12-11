import nodemailer from 'nodemailer'

//email configuration  and send email 

//email template

const emailProcessor = async (emailBody) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        let info = await transporter.sendMail(emailBody);
        console.log("Message sent: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error)
    }
}

//Make sure the eamil data has fName, email and Url
export const verificationEmail = (emailData) => {
    const emailBody = {
        from: '"Shivamani Sore" <myEmail@shivamani.com>', // Sender's email address
        to: emailData.email, // Recipient's email address
        subject: "Email Verification Instructions ✔", // Email subject line
        text: `Hi ${emailData.fName},\n\nPlease verify your email by clicking the following link: ${emailData.url}\n\nBest regards,\nShivamani Store`, // Plain text body
        html: `
            <p>Hi ${emailData.fName},</p>
            <br/>
            <br/>
            <p><a href='${emailData.url}'>Verify Email</a></p>
            <p></p>
            <br/>
            <p>Best regards,<br/>Shivamani Store</p>
        ` // HTML body
    };
    emailProcessor(emailBody)
}
export const userVerifiedNotification = (emailData) => {
    const emailBody = {
        from: '"Shivamani Store" <myEmail@shivamani.com>',
        to: emailData.email,
        subject: "Email Verification Success ✔",
        text: `Hi ${emailData.fName},\n\nYour account has been successfully verified. You may now log in to your account on ${process.env.ROOT_DOMAIN}.\n\nBest regards,\nShivamani Store`,
        html: `
            <p>Hi ${emailData.fName},</p>
            <p>Your account has been successfully verified. You may now log in to your account now <a href="${process.env.ROOT_DOMAIN}">${process.env.ROOT_DOMAIN}"</a></p>
            <br/>
            <p>Best regards,<br/>Shivamani Store</p>
        `
    };
    emailProcessor(emailBody);
}

//send otp to the user email
export const otpNotification = (emailData) => {
    const emailBody = {
        from: '"Shivamani Store" <myEmail@shivamani.com>',
        to: emailData.email,
        subject: "OTP for password reset",
        text: `Hi ${emailData.fName},\n\nplease use the follow otp to reset your password ${emailData.otp}.\n\nBest regards,\nShivamani Store`,
        html: `
            <p>Hi ${emailData.fName},</p>
            <p>Please use the following OTP to reset your new password</p>
            <p>${emailData.otp}</p>
            <br/>
            <p>Best regards,<br/>Shivamani Store</p>
        `
    };
    emailProcessor(emailBody);
}
