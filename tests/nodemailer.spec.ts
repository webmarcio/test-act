import EmailService from '../src/infrastructure/nodemailer';
import nodemailer from '../src/infrastructure/nodemailer';
import 'jest';

describe("Teste Nodemailer", () => {

  it("deve enviar um email", async () => {
    const data = {
      email: "arte.marciobarbosa@gmail.com",
      text: 'Agradecemos o preenchimento da Pesquisa de satisfação',
      html: '<h1>Agradecemos o preenchimento da ${result.title} </h1>',
      subject: 'Agradecimento',
    };

    const serviceMail = new EmailService();

    const send = await serviceMail.sendEmail({ ...data });

    expect(send).toBe('Email enviado com sucesso!');
  });
});