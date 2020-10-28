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

  send(recipient: string, content: { subject: string, html: string, attachments?: mailgun.AttachmentParams[] }) {
    return this.mailgun.messages().send({
      from: process.env.MAILGUN_SENDER,
      to: recipient,
      subject: content.subject,
      html: content.html,
      attachment: content.attachments ? content.attachments.map(
        ({ data, filename }) => new this.mailgun.Attachment({ data, filename }),
      ) : undefined,
      // attachments: [
      //   {
      //     data: file.buffer,
      //     filename: file.originalname,
      //   },
      // ],
    });
  }
}
