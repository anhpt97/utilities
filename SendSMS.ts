const Nexmo = require('nexmo');
require('dotenv').config();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

const send = (sender: string, recipient: string, message: string) => {
  return nexmo.message.sendSms(sender, recipient, message);
}
