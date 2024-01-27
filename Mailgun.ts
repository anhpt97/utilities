import formData from "form-data";
import Mailgun from "mailgun.js";
import { IMailgunClient } from "mailgun.js/Interfaces";
import { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_SENDER } from "./common/env";

export class MailgunService {
  private client: IMailgunClient;

  constructor() {
    this.client = new Mailgun(formData).client({
      username: "api",
      key: MAILGUN_API_KEY,
    });
  }

  async send(
    recipients: string | string[],
    // {
    //   id,
    //   data,
    //   attachments,
    // }: {
    //   id: string;
    //   data: Record<string, any>;
    //   attachments?: { filename: string; data: Buffer }[];
    // }
    {
      subject,
      content,
      attachments,
    }: {
      subject: string;
      content: string;
      attachments?: { filename: string; data: Buffer }[];
    }
  ) {
    await this.client.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_SENDER,
      to: recipients,
      subject,
      html: content, // must be disabled if template is used
      attachment: attachments, // [{ filename: file.originalname, data: file.buffer }],
      // template: id,
      // "t:variables": JSON.stringify(data),
    });
  }
}
