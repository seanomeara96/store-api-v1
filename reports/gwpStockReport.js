require("../config/config").config("bf");
const { getManyProductsBySKU } = require("../products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let skuArray = [
  { sku: "GWP33" }, // hydrating essentials
  { sku: "9448" }, // cashmere cream
  { sku: "10404" }, // Moroccanoil Re-Energizing Spray 50ml GWP
  { sku: "9357" }, // caudalie hand nail cream
  { sku: "8702" }, // clay cleanser
  { sku: "9013" }, // tummy rub butter
  { sku: "10356" }, // NUXE Reve De Miel Lip Balm 15g GWP
  {sku: "10402"} // carter beauty sponge
];

getManyProductsBySKU(skuArray)
  .then((res) => {
    const data = res
      .sort((a, b) => a.inventory_level - b.inventory_level)
      .map(
        ({ name, sku, inventory_level }) =>
          `<p>${name}<br>SKU: ${sku}<br>Inventory: <strong  ${inventory_level < 21 ? "style='color:red;'" : "" }>${inventory_level}</strong></p>`
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
