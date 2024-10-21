import nodemailer, { Transporter } from 'nodemailer';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "d6c2f21e9d8cc4",
        pass: "a6d60866dccf02",
      },
    });
  }

  public async sendEmail({
    email,
    text,
    html,
    subject,
  }: {
    email: string;
    text: string;
    html: string;
    subject: string;
  }): Promise<string> {
    const info = await this.transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject,
      text,
      html,
    });

    return 'Email enviado com sucesso!';
  }
}

export default EmailService;
