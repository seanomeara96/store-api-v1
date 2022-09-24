require("./config/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

(async function () {
  const msg = {
    to: "david@dcphysiotherapy.ie",
    from: "info@dcphysiotherapy.ie",
    cc: "sean@beautyfeatures.ie",
    subject: "Site Updates",
    text: "Hi David, I'm doing some site updates over the next few days. I'm currently testing out this new email client to make sure this reaches you without being filtered out by anti-spam tools.",
    // html: data,
  };
  sgMail.send(msg).then(console.log).catch(console.log);
})();
