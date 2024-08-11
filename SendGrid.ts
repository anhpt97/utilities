import { AttachmentData } from "@sendgrid/helpers/classes/attachment";
import mail from "@sendgrid/mail";
import { SENDGRID_API_KEY, SENDGRID_SENDER } from "./common/env";

export class SendGridService {
  constructor() {
    mail.setApiKey(SENDGRID_API_KEY);
  }

  async send(
    recipients: string | string[],
    // {
    //   id,
    //   data,
    //   attachments,
    // }: { id: string; data: Record<string, any>; attachments?: AttachmentData[] }
    {
      subject,
      content,
      attachments,
    }: { subject: string; content: string; attachments?: AttachmentData[] }
  ) {
    await mail.send({
      to: recipients,
      from: SENDGRID_SENDER,
      subject,
      html: content, // invalid if template is used
      // templateId: id,
      attachments: attachments, // [{ content: file.buffer.toString("base64"), filename: file.originalname }],
      // dynamicTemplateData: data,
    });
  }
}
