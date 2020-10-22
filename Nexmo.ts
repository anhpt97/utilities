const Nexmo = require('nexmo');
require('dotenv').config();

export class NexmoService {
  private nexmo: any;
  constructor() {
    this.nexmo = new Nexmo({
      apiKey: process.env.NEXMO_API_KEY,
      apiSecret: process.env.NEXMO_API_SECRET,
    });
  }

  send(sender: string, recipient: string, message: string) {
    return this.nexmo.message.sendSms(sender, recipient, message);
  }
}
