import sendgrid = require('@sendgrid/mail');
require('dotenv').config();
import { AttachmentData } from '@sendgrid/helpers/classes/attachment';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const send = (recipient: string, content: { subject: string, html: string, attachments?: AttachmentData[] }) => {
  return sendgrid.send({
    from: process.env.SENDGRID_SENDER,
    to: recipient,
    subject: content.subject,
    html: content.html,
    attachments: content.attachments,
  });
}
