require("../../config/config");
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
import { Database } from "sqlite3";
import path from "path";
const db = new Database(path.resolve(__dirname, "./emails.db"));
const data = [];
async function main() {
  for (const { name, email } of data) {
    const emailExists = await (function doesEmailExist(): Promise<number> {
      return new Promise(function (resolve, reject) {
        db.get(
          `SELECT count(email) as count FROM emails WHERE email = ?`,
          [email],
          function (err: any, row: { count: number }) {
            return err ? reject(err) : resolve(row.count);
          }
        );
      });
    })();

    if (emailExists) {
      console.log("email exists")
      continue;
    }

    const msg = {
      to: email,
      from: "daryl@beautyfeatures.ie",
      subject: `Hi ${name}... How Did BeautyFeatures.ie Do?`,
      html: /*HTML*/ `<p>Dear ${name}</p>
      <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CXRQBST7AgQMEAI/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
      <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
      <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
      <p>Thanks again for shopping at BeautyFeatures.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
      <p>Best regards,</p>
      <p>Daryl Divilly</p>
      <p>Managing Director</p>`,
    };

    try {
      await sgMail.send(msg);
      await (function recordEmailAddress() {
        return new Promise((resolve, reject) =>
          db.run(`INSERT INTO emails(email) VALUES(?)`, [email], (err) =>
            err ? reject(err) : resolve(undefined)
          )
        );
      })();
      console.log(`email sent to ${name} => ${email}`);
    } catch (err) {
      console.log(err);
      break;
    }
  }
}
main();
