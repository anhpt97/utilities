import sendgrid = require('@sendgrid/mail');
require('dotenv').config();
import { AttachmentData } from '@sendgrid/helpers/classes/attachment';

export class SendGridService {
  constructor() {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  send(recipient: string, content: { subject: string, html: string, attachments?: AttachmentData[] }) {
    return sendgrid.send({
      from: process.env.SENDGRID_SENDER,
      to: recipient,
      subject: content.subject,
      html: content.html,
      attachments: content.attachments,
    });
  }
}
