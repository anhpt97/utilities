declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_REGION?: string;
      AWS_S3_BUCKET?: string;

      GMAIL_HOST?: string;
      GMAIL_USER?: string;
      GMAIL_PASS?: string;

      MAILGUN_API_KEY?: string;
      MAILGUN_DOMAIN?: string;
      MAILGUN_SENDER?: string;

      ONESIGNAL_APP_KEY?: string;
      ONESIGNAL_APP_ID?: string;

      REDIS_HOST?: string;
      REDIS_PORT?: string;

      SENDGRID_API_KEY?: string;
      SENDGRID_SENDER?: string;
    }
  }
}

export {};
