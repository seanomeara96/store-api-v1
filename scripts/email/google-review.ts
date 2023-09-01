import sgMail from "@sendgrid/mail";
import { Database } from "sqlite3";
import path from "path";

export function sendGooglReviewRequestEmail(
  data: {
    name: string;
    email: string;
    order_id: number;
    ordered_at: string;
    despatched_at: string;
    delivered_at: string | undefined;
    tracking_number: string;
  }[],
  store: "bf" | "ih"
) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const db = new Database(path.resolve(__dirname, "./emails.db"));

  console.log("emails to send", data.length);

  return new Promise(async function (resolve, reject) {
    if (!store) return reject("must supply store");
    if (!["bf", "ih"].includes(store)) return reject("valid store required");

    for (let { name, email } of data) {
      name = name.trim();
      email = email.toLowerCase();

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
        console.log("email exists");
        continue;
      }

      let msg;

      if (store === "bf") {
        msg = {
          to: email,
          from: "daryl@beautyfeatures.ie",
          subject: /*HTML*/ `Hi ${name}... How Did BeautyFeatures.ie Do?`,
          html: /*HTML*/ `<p>Dear ${name}</p>
          <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CXRQBST7AgQMEAI/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
          <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
          <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
          <p>Thanks again for shopping at BeautyFeatures.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
          <p>Best Regards,</p>
          <p>Daryl Divilly</p>
          <p>Managing Director</p>`,
        };
      }

      if (store === "ih") {
        msg = {
          to: email,
          from: "daryl@inhealth.ie",
          subject: /*HTML*/ `Hi ${name}... How Did InHealth.ie Do?`,
          html: /*HTML*/ `<p>Dear ${name}</p>
          <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CQS8r4vKTf_eEB0/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
          <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
          <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
          <p>Thanks again for shopping at InHealth.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
          <p>Best Regards,</p>
          <p>Daryl Divilly</p>
          <p>Managing Director</p>`,
        };
      }

      if (!msg) return reject("must supply a message");

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
      } catch (err: any) {
        console.log(err.response ? err.response.body : err);
        return reject("error sending email");
      }
    }
    resolve(undefined)
  });
}
