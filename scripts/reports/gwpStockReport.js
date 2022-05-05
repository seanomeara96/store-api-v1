require("../../config/config").config("bf");
const {
  getManyProductsBySKU,
} = require("../../functions/products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let skuArray = [
  { sku: "9053" },
  { sku: "11370" },
  { sku: "9764" },
  { sku: "11099c" },
  { sku: "11099a" },
  { sku: "11099e" },
  { sku: "10354" },
  { sku: "10354a" },
  { sku: "GWP36" },
  { sku: "8755" },
  { sku: "11178" },
  { sku: "11051" },
  { sku: "11100" },
  { sku: "11152" },
  { sku: "10662" },
  { sku: "10442" },
  { sku: "10403" },
  { sku: "6481A" },
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
