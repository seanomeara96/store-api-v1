const api = require("../config/config")
const { getManyProductsBySKU } = require("../products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let skuArrays = {
  bf: [
    { sku: "GWP32" }, // pollution protection
    { sku: "9448" }, // cashmere cream
    { sku: "10122" }, // reshaping spray
    { sku: "10151" }, // detangling comb
    { sku: "9357" }, // caudalie hand nail cream
    { sku: "9414" }, // one united 30ml
    { sku: "8702" }, // clay cleanser
    { sku: "9013" }, // tummy rub butter
  ],
  ih: [{ sku: "10195" }], // basq 30ml cooling lotion
};
let stores = Object.keys(skuArrays)
stores.forEach(store => {
  console.log(store)
  api.config(store)
  console.log((skuArrays[store]))
  getManyProductsBySKU(skuArrays[store])
  .then((res) => {
   console.log(res)
  })
  .catch((err) => console.log(err));
})

/**
 * 
 * 
 * 
 * 
 * const data = res
      .map(
        ({ name, sku, inventory_level }) =>
          `<p>${name} (${sku}) => Inventory Level: <strong>${inventory_level}</strong></p>`
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
 */