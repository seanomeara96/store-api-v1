require("../../config/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const data = [
  { name: "Courtney", email: "courtneyjmh98@gmail.com" },
  { name: "Margaret", email: "mgtjking@gmail.com" },
  { name: "Elaine", email: "elaine.duff1234@gmail.com" },
  { name: "Helena", email: "hfoley462@gmail.com" },
  { name: "Laura", email: "lauramaryallen@gmail.com" },
  { name: "Yvonne", email: "yvonnebergin3@gmail.com" },
  { name: "Anne", email: "annescully1@gmail.com" },
  { name: "Donna", email: "donna.boland4412@gmail.com" },
  { name: "Julie", email: "juliecleary71@gmail.com" },
  { name: "Hannah", email: "hannahbolger131@gmail.com" },
  { name: "Lily", email: "lilymathews001@gmail.com" },
  { name: "Siobhan", email: "siobhanmc.smd@gmail.com" },
  { name: "Eibhleann", email: "evelynmcc1@gmail.com" },
  { name: "Chloe", email: "chloehos97@gmail.com" },
  { name: "Niamh", email: "nc2898@gmail.com" },
  { name: "Morgan", email: "wildersmorgan@gmail.com" },
  { name: "Jill", email: "jillbeecherdesign@gmail.com" },
  { name: "Sorcha", email: "sbracken16@gmail.com" },
  { name: "Jessica", email: "mccarthyjessica71@gmail.com" },
  { name: "Susan", email: "iannelliangelo365@gmail.com" },
  { name: "Valerie", email: "valerie.hammond11@gmail.com" },
  { name: "Emma", email: "garreth.emma@gmail.com" },
  { name: "Lisa", email: "lbrandon87@gmail.com" },
];
async function main() {
  for (const { name, email } of data) {
    const msg = {
      to: email,
      from: "daryl@beautyfeatures.ie",
      subject: `Hi ${name}... How Did BeautyFeatures.ie Do?`,
      html: /*HTML*/ `
            <p>Dear ${name}</p>
            <p>I hope this email finds you well. I wanted to reach out and thank you for your recent order on BeautyFeatures.ie. Your satisfaction as a customer is incredibly important to us, and we&rsquo;re passionate about providing an excellent service.&nbsp;</p>
            <p>Getting feedback from our customers is of great value to us to continually improve our customer service. We would really appreciate your assistance in leaving a Google review for our business, which will help us to improve our service and customer experience. It will also help potential customers in their choice to shop with us.</p>
            <p>Writing a review is quick and easy. Simply click&nbsp;<a href="https://g.page/r/CXRQBST7AgQMEAI/review" target="_blank" rel="noopener noreferrer">here</a> to leave your review.</p>
            <p>We truly value your feedback and your time, which helps us to continue to provide exceptional service to all our customers.</p>
            <p>If you have any questions or need further assistance, please don&apos;t hesitate to reach out to our customer support team. We are here to help!</p>
            <p>Thanks again for shopping at BeautyFeatures.ie and supporting an Irish company. Your satisfaction is our top priority, and we hope to see you again soon!</p>
            <p>Best regards,</p>
            <p>Daryl Divilly</p>
            <p>Managing Director</p>`,
    };
    try {
      await sgMail.send(msg);
      console.log(`email sent to ${name} => ${email}`);
    } catch (err) {
      console.log(err);
      break;
    }
  }
}
main();
