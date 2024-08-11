import "dotenv/config";

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

export const GMAIL_HOST = process.env.GMAIL_HOST;
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_PASS = process.env.GMAIL_PASS;

export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
export const MAILGUN_SENDER = process.env.MAILGUN_SENDER;

export const ONESIGNAL_APP_KEY = process.env.ONESIGNAL_APP_KEY;
export const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID as string;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = Number(process.env.REDIS_PORT);

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
export const SENDGRID_SENDER = process.env.SENDGRID_SENDER as string;
