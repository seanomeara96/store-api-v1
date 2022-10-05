const site = "bs";
const { stringify } = require("csv-stringify");
const { getAllLiveUrls } = require("../urls/getAllLiveUrls");
/**
 * Exports urls for brands, categories,
 */
async function main() {
  const cleansedData = await getAllLiveUrls(site).catch(console.log)

  stringify(cleansedData, (err, csvFile) => {
    if (err) throw "Something went wrong";

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const attachment = Buffer.from(csvFile).toString("base64");
    const subj = `All Urls for ${site.toUpperCase()}`;
    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: subj,
      text: subj,
      attachments: [
        {
          content: attachment,
          filename: `${site.toUpperCase()}-URLS.csv`,
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };
    function logErrResponseBody(err) {
      return console.log(err.response.body);
    }
    sgMail.send(msg).catch(logErrResponseBody);
  });
}

main();
