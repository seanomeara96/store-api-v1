require("../config/config").config("bf");
const { getManyProductsBySKU } = require("../products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let skuArray = [
  { sku: "GWP32" }, // pollution protection
  { sku: "9448" }, // cashmere cream
  { sku: "6504a" }, // Moroccanoil Travel Essentials Repair GWP
  { sku: "9357" }, // caudalie hand nail cream
  { sku: "8702" }, // clay cleanser
  { sku: "9013" }, // tummy rub butter
  { sku: "10356" },
];

getManyProductsBySKU(skuArray)
  .then((res) => {
    console.log(res);
    const data = res
      .map(
        ({ name, sku, inventory_level }) =>
          `<p>${name} (${sku}) => Inventory Level: <strong>${inventory_level}</strong></p>`
      )
      .join("\n");
    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: "GWP Stock Report",
      text: "GWP Stock Report",
      html: data,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((err) => console.log(err));
