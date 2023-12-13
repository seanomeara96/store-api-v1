import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
export async function sendMail(
  subject: string,
  message: string,
  to: string | string[] = "sean@beautyfeatures.ie" 
) {
  try {
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
  } catch (err) {
    throw err;
  }
}
