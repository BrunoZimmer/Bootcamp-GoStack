import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe';


import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import mailConfig from '@config/mail';


import IMailTemplateProvider from '@shared/container/provider/MailTemplateProvider/models/IMailTemplateProvider';
import { addWeeks } from 'date-fns';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({apiVersion: '2010-12-01'})
    })
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'Equipe@GoBarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  };
}
