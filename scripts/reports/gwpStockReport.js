require("../../config/config").config("bf");
const {
  getManyProductsBySKU,
} = require("../../functions/products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let skuArray = [
  { sku: "GWP31" }, // intensive moisture trio
  //{ sku: "GWP35" }, // hydrating essentials
  { sku: "9448" }, // cashmere cream
  { sku: "10403" }, // gym bottle blue cap
  { sku: "9357" }, // caudalie hand nail cream
  { sku: "8702" }, // clay cleanser
  { sku: "9013" }, // tummy rub butter
  { sku: "10442" }, // NUXE Very Rose 3-in-1 Soothing Micellar Water 100ml GWP
  { sku: "10402" }, // carter beauty sponge
  { sku: "5011" }, // redken one united
];
const ascendingInventory = (a, b) => a.inventory_level - b.inventory_level;
const emailFormat = ({ name, sku, inventory_level }) =>
  `<p>${name}<br>SKU: ${sku}<br>Inventory: <strong  ${
    inventory_level < 21 ? "style='color:red;'" : ""
  }>${inventory_level}</strong></p>`;
const confirmEmailDespatch = () => console.log("Email sent");
const flagEmailError = (error) => console.error(error);

getManyProductsBySKU(skuArray)
  .then((res) => {
    const data = res.sort(ascendingInventory).map(emailFormat).join("\n");
    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: "GWP Stock Report",
      text: "GWP Stock Report",
      html: data,
    };
    sgMail.send(msg).then(confirmEmailDespatch).catch(flagEmailError);
  })
  .catch((err) => console.log(err));
