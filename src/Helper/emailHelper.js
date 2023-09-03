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