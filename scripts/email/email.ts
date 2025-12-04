import sgMail from "@sendgrid/mail";

type GenericEmailOptions = {
  from: string;
  subject: string;
  html: string;
};

const emailList = [
  // Define your emails here, for example:
  "example1@example.com",
  "example2@example.com",
];

function sendGenericEmails(emails: string[], options: GenericEmailOptions) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  return new Promise(async function (resolve, reject) {
    if (!Array.isArray(emails) || emails.length === 0) {
      return reject("must supply a non-empty array of emails");
    }
    if (!options?.from || !options?.subject || !options?.html) {
      return reject("must supply from, subject and html");
    }

    for (const rawEmail of emails) {
      const email = String(rawEmail || "")
        .trim()
        .toLowerCase();
      if (!email) {
        console.log("skipping empty/invalid email");
        continue;
      }

      const msg = {
        to: email,
        from: options.from,
        subject: options.subject,
        html: options.html,
      };

      try {
        await sgMail.send(msg);
        console.log(`generic email sent => ${email}`);
      } catch (err: any) {
        console.log(err?.response ? err.response.body : err);
        return reject("error sending email");
      }
    }
    resolve(undefined);
  });
}
