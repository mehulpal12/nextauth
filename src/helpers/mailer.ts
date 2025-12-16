import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";


export async function sendVerificationEmail({ userId, email, emailType }: { userId: string, email: string, emailType: string }) {
    try{
        const hashToken =  await bcrypt.hash(userId.toString(), 10)

        if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,
            {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour

            },
            {new: true, runValidators:true}
        )
    }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,
            {
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
            },
            {new: true, runValidators:true}
        )
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!



const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sender = {
  address: "mehulpal7@gmail.com",
};

const recipients = [email];

await transport.sendMail({
  from: sender.address,
  to: recipients,
  subject: emailType === "VERIFY"
    ? "Verify your email"
    : "Reset your password",

  text: "Congrats for sending test email with Nodemailer!",

  html: `
    <p>
      Click
      <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">
        here
      </a>
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
    </p>
    <br/>
    ${process.env.DOMAIN}/verifyemail?token=${hashToken}
  `,
});



    }catch(error:any){
        throw new Error(error)
    }
}
