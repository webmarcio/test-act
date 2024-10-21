import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "d6c2f21e9d8cc4",
    pass: "a6d60866dccf02",
  },
});

export default async function main(
  {
    email,
    text,
    html,
    subject,
  }: {
    email: string,
    text: string,
    html: string,
    subject: string,
  }) {
    
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: email,
    subject,
    text,
    html,
  });
  
  console.log("Message sent: %s", info.messageId);
}

