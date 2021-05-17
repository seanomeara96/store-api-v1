const { getManyProductsBySKU } = require("../products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let skuArray = [
  { sku: "GWP32" }, // pollution protection
  { sku: "9448" }, // cashmere cream
  { sku: "10122" }, // reshaping spray
  { sku: "10151" }, // detangling comb
  { sku: "9357" }, // caudalie hand nail cream
  { sku: "9414" }, // one united 30ml
  { sku: "8702" }, // clay cleanser
  { sku: "9023" }, // tummy rub butter
];

getManyProductsBySKU(skuArray)
  .then((res) => {
    console.log(res)
    const data = res
      .map(
        ({ name, sku, inventory_level }) =>
          `<p>Name: ${name}, SKU: ${sku}, Inventory Level: ${inventory_level}</p>`
      )
      .join("\n");
    const msg = {
      to: ["sean@beautyfeatures.ie", "brendan@beautyfeatures.ie"],
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
