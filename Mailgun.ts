import mailgun = require('mailgun-js');
require('dotenv').config();

export class MailgunService {
  private mailgun: mailgun.Mailgun;
  constructor() {
    this.mailgun = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
  }

  send(recipient: string, content: { subject: string, html: string, attachments?: any }) {
    return this.mailgun.messages().send({
      from: process.env.MAILGUN_SENDER,
      to: recipient,
      subject: content.subject,
      html: content.html,
      attachments: content.attachments,
    });
  }
}
