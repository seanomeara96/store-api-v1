import sgMail from "@sendgrid/mail";
import { Database } from "sqlite3";
import path from "path";

require("../../../config/config");

function recordEmailAddress(db: Database, email: string) {
  return new Promise((resolve, reject) =>
    db.run(`INSERT INTO emails(email) VALUES(?)`, [email], (err) =>
      err ? reject(err) : resolve(undefined),
    ),
  );
}

function doesEmailExist(db: Database, email: string): Promise<number> {
  return new Promise(function (resolve, reject) {
    db.get(
      `SELECT count(email) as count FROM emails WHERE email = ?`,
      [email],
      (err: any, row: { count: number }) =>
        err ? reject(err) : resolve(row.count),
    );
  });
}

type RequiredFields = {
  name: string;
  email: string;
};

const testRecipient = { name: "Sean", email: "sean@beautyfeatures.ie" };

let data: RequiredFields[] = [
  { name: "", email: "sineadmcnally@yahoo.ie" },
  { name: "", email: "kenjakobawedding@gmail.com" },
  { name: "", email: "caoimhe.mulhall@linesight.com" },
  { name: "", email: "saibh@thecircular.ie" },
];

for (const d of data) {
  d.email = d.email.toLowerCase();
}

function properCase(inputString: string) {
  return inputString.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
}

async function sendGoogleReviewRequest() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const db = new Database(path.resolve(__dirname, "./emails.db"));

  for (let { name, email } of data) {
    name = name.trim();
    name = name.split(" ")[0];
    name = properCase(name);

    if (name === "") {
      name = "there";
    }
    email = email.toLowerCase();

    const emailExists = await doesEmailExist(db, email);
    if (emailExists && email !== testRecipient.email) {
      console.log("email exists");
      continue;
    }
    const { subject, html } = hireallEmailVersion2(name);
    let msg = {
      to: email,
      from: "leona@hireall.ie",
      subject,
      html,
    };

    try {
      await sgMail.send(msg);
      if (email !== testRecipient.email) await recordEmailAddress(db, email);
      console.log(`google review request email sent to ${name} => ${email}`);
    } catch (err: any) {
      console.log(err.response ? err.response.body : err);
      throw err;
    }
  }
}

sendGoogleReviewRequest();

type EmailContent = {
  subject: string;
  html: string;
};

function hireallEmailVersion1(name: string): EmailContent {
  return {
    subject: /*HTML*/ `Hi ${name}! How Did HireAll.ie Do?`,
    html: /*HTML*/ `<p>Hi ${name}</p>
        <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CShEfnD--rquEB0/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
        <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
        <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
        <p>Thanks again for shopping at HireAll.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
        <p>Best Regards,</p>
        <p>Leona Rothwell</p>
        <p>Commercial Director</p>`,
  };
}

function hireallEmailVersion2(name: string): EmailContent {
  return {
    subject: `Hi ${name}! How Did Hireall.ie Do?`,
    html: `<p>Dear ${name}</p>
    <p>We hope our hire items helped bring your event together beautifully.
    If you have a moment, we'd really appreciate a Google review - it helps future hosts and event planners choose with confidence.
    </p>
    <p>Please click on the stars icons below</p>
    <a href="https://g.page/r/CShEfnD--rquEB0/review" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:block;">
      <span style="font-size:24px; color:#FFC107;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
    </a>
    <p>Best Regards</p>
    <p>Leona Rothwell<br> Commercial Director</p>
    <p style="margin-top:16px;">
      <img
        src="https://cdn11.bigcommerce.com/s-jqwssthhhd/images/stencil/original/image-manager/hireall-email-signature.png?t=1770891720"
        alt="Hireall.ie email signature"
        style="max-width:600px; height:auto; display:block;" />
    </p>
    `,
  };
}
