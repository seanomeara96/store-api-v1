const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = (subject, message, to = "sean@beautyfeatures.ie") => {
  const msg = {
    to,
    from: "sean@beautyfeatures.ie",
    subject: subject,
    text: subject,
    html: message,
  };
  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
exports.sendMail = sendMail;
