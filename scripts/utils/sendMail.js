const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = async (subject, message, to = "sean@beautyfeatures.ie") => {
  const msg = {
    to,
    from: "sean@beautyfeatures.ie",
    subject: subject,
    text: subject,
    html: message,
  };
  const res = await sgMail.send(msg).catch(console.log);
  console.log("email sent");
  return res;
};
exports.sendMail = sendMail;
