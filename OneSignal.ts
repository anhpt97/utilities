import {
  DefaultApi,
  LanguageStringMap,
  createConfiguration,
} from "@onesignal/node-onesignal";
import { ONESIGNAL_APP_ID, ONESIGNAL_APP_KEY } from "./common/env";

export class OneSignalService {
  private client: DefaultApi;

  constructor() {
    this.client = new DefaultApi(
      createConfiguration({ restApiKey: ONESIGNAL_APP_KEY })
    );
  }

  async send(
    language: keyof LanguageStringMap,
    {
      content,
      heading,
      subtitle,
    }: { content: string; heading?: string; subtitle?: string },
    recipient: string
  ) {
    await this.client.createNotification({
      app_id: ONESIGNAL_APP_ID,
      contents: { [language]: content },
      headings: { [language]: heading },
      subtitle: { [language]: subtitle },
      filters: [
        { field: "tag", key: "email", value: recipient, relation: "=" },
      ],
    });
  }
}
