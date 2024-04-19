import sgMail from "@sendgrid/mail";
import { Database } from "sqlite3";
import path from "path";

require("../../../config/config");

function recordEmailAddress(db: Database, email: string) {
  return new Promise((resolve, reject) =>
    db.run(`INSERT INTO emails(email) VALUES(?)`, [email], (err) =>
      err ? reject(err) : resolve(undefined)
    )
  );
}

function doesEmailExist(db: Database, email: string): Promise<number> {
  return new Promise(function (resolve, reject) {
    db.get(
      `SELECT count(email) as count FROM emails WHERE email = ?`,
      [email],
      function (err: any, row: { count: number }) {
        return err ? reject(err) : resolve(row.count);
      }
    );
  });
}

type RequiredFields = {
  name: string;
  email: string;
};

let data: RequiredFields[] = [
  { name: "", email: "carman.gerena@gmail.com" },
  { name: "Graham Byrne", email: "BYRNE.GRAHAM@GMAIL.COM" },
  { name: "", email: "clionabre@gmail.com" },
  { name: "Claire McDermott", email: "clrmcdrmtt@gmail.com" },
  { name: "", email: "michelledarcy16@gmail.com" },
  { name: "", email: "orlaharper@gmail.com" },
  { name: "Edel  Barrett", email: "edelarthur@gmail.com" },
  { name: "", email: "Lea.Devitt2009@gmail.com" },
  { name: "", email: "edelmtighe80@gmail.com" },
  { name: "", email: "odonohoeci@gmail.com" },
  { name: "", email: "ireneosullivan1@gmail.com" },
  { name: "Lamide Kalonzo", email: "Lamiskitchen@gmail.com" },
  { name: "", email: "bettina.curran4@gmail.com" },
  { name: "Tanya McCabe", email: "tanya1mccabe@gmail.com" },
  { name: "", email: "jeanettedunne12@gmail.com" },
  { name: "", email: "omoorefamily@gmail.com" },
  { name: "", email: "clionabre@gmail.com" },
  { name: "", email: "elva.mulchrone@gmail.com" },
  { name: "", email: "sophia.simmonds96@gmail.com" },
  { name: "", email: "conordshaw@gmail.com" },
  { name: "", email: "pineford@gmail.com" },
  { name: "", email: "jillcallanan1@gmail.com" },
  { name: "", email: "urscelano@gmail.com" },
  { name: "", email: "sandyovenserh@gmail.com" },
  { name: "Justin Sherriff", email: "ajsherriff@gmail.com" },
  { name: "", email: "issie06@gmail.com" },
  { name: "", email: "emilywardmcguire@gmail.com" },
  { name: "", email: "clionabre@gmail.com" },
  { name: "Zoe Blah", email: "zoeblah@gmail.com" },
  { name: "Leah Peachey", email: "peachey2026@gmail.com" },
  { name: "", email: "nicolearesmoore@gmail.com" },
  { name: "", email: "lsmyth61@gmail.com" },
  { name: "", email: "clionabre@gmail.com" },
];

for(const d of data){
  d.email = d.email.toLowerCase()
}

data = data.filter((d) => d.email.includes("gmail.com"));

console.log("number of gmail addresses");

console.log("data length", data.length);

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
    if (emailExists) {
      console.log("email exists");
      continue;
    }

    let msg = {
      to: email,
      from: "gavin@caterhire.ie",
      subject: /*HTML*/ `Hi ${name}! How Did CaterHire.ie Do?`,
      html: /*HTML*/ `<p>Hi ${name}</p>
            <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business. It will also help potential customers in their choice to shop with us. Simply <a href="https://g.page/r/CeLvcGIx3fvgEB0/review" target="_blank" rel="noopener noreferrer">click here</a> to leave your review.</p>
            <p>Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service. We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
            <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
            <p>Thanks again for shopping at CaterHire.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
            <p>Best Regards,</p>
            <p>Gavin Divilly</p>
            <p>Managing Director</p>`,
    };

    try {
      await sgMail.send(msg);
      await recordEmailAddress(db, email);
      console.log(`google review request email sent to ${name} => ${email}`);
    } catch (err: any) {
      console.log(err.response ? err.response.body : err);
      throw err;
    }
  }
}

sendGoogleReviewRequest();
