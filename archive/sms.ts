import dotenv from "dotenv";
dotenv.config();

import twilio, { Twilio as TwilioClient } from "twilio";

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const accountSid = requireEnv(
  "TWILIO_ACCOUNT_SID",
  process.env.TWILIO_ACCOUNT_SID,
);
const authToken = requireEnv(
  "TWILIO_AUTH_TOKEN",
  process.env.TWILIO_AUTH_TOKEN,
);

const client: TwilioClient = twilio(accountSid, authToken);

// Configurable via env; defaults provided for local usage
const DEFAULT_FROM = "+16506403437";
const DEFAULT_RECIPIENTS = ["+353857195619", "+353851066003", "+353851675518"];
const DEFAULT_TEXT =
  "Hello, this is a bulk test message from Sean@beautyfeatures";

const FROM = (process.env.TWILIO_FROM || DEFAULT_FROM).trim();
const RECIPIENTS: string[] = (
  process.env.TWILIO_RECIPIENTS
    ? process.env.TWILIO_RECIPIENTS.split(",")
    : DEFAULT_RECIPIENTS
)
  .map((n) => n.trim())
  .filter(Boolean);
const TEXT = (process.env.TWILIO_TEXT || DEFAULT_TEXT).trim();

const E164_REGEX = /^\+\d{10,15}$/;

function assertE164(number: string, label: string): void {
  if (!E164_REGEX.test(number)) {
    throw new Error(
      `Invalid ${label} phone number (must be E.164 format): ${number}`,
    );
  }
}

function assertNonEmptyMessage(body: string): void {
  if (!body || body.trim().length === 0) {
    throw new Error("Message body must not be empty");
  }
}

async function sendBulkSms(
  from: string,
  recipients: string[],
  body: string,
  concurrency: number = 10,
): Promise<string[]> {
  assertE164(from, "from");
  assertNonEmptyMessage(body);

  if (!Array.isArray(recipients) || recipients.length === 0) {
    throw new Error("Recipients must be a non-empty array");
  }

  const invalidRecipients = recipients.filter((r) => !E164_REGEX.test(r));
  if (invalidRecipients.length > 0) {
    throw new Error(
      `Invalid recipient phone numbers (must be E.164): ${invalidRecipients.join(", ")}`,
    );
  }

  const sids: string[] = [];
  const errors: Array<{ to: string; error: unknown }> = [];

  let index = 0;
  const workerCount = Math.max(1, Math.min(concurrency, recipients.length));

  const worker = async () => {
    while (true) {
      const current = index++;
      if (current >= recipients.length) break;
      const to = recipients[current];
      try {
        const message = await client.messages.create({ body, from, to });
        sids.push(message.sid);
      } catch (error) {
        errors.push({ to, error });
        // Keep going; don't fail entire batch due to a single recipient error
        // In production, integrate with your logger/alerting here
        console.error(`Failed to send to ${to}:`, error);
      }
    }
  };

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return sids;
}

(async () => {
  try {
    const sentMessageSids = await sendBulkSms(FROM, RECIPIENTS, TEXT);
    console.log("Successfully sent message SIDs:", sentMessageSids);
  } catch (error) {
    console.error("Unexpected error while sending messages:", error);
    process.exitCode = 1;
  }
})();
