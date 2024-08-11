import { Transporter, createTransport } from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";
import { GMAIL_HOST, GMAIL_PASS, GMAIL_USER } from "./common/env";

export class GmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: GMAIL_HOST,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
  }

  async send(
    recipients: string | string[],
    {
      subject,
      content,
      attachments,
    }: { subject: string; content: string; attachments?: Attachment[] }
  ) {
    try {
      await this.transporter.sendMail({
        to: recipients,
        subject,
        html: content,
        attachments: attachments, // [{ content: file.buffer, filename: file.originalname }],
      });
    } catch (error) {
      if (error.message === "No recipients defined") {
        throw new Error("Invalid email address");
      }
      throw error;
    }
  }
}
