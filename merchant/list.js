const login = require("./login");
const { getAllProducts } = require("./getAllProducts");
const dotenv = require("dotenv");
dotenv.config();
const merchantId = process.env.BF_MERCHANT_ID;
//const credentials = require("./service-account.json");
async function main() {
  await login();
  // Do the magic
  const products = await getAllProducts(merchantId);
  console.log("loggin this!!!!!!!!!!!!!!!!!!!!!!1111", products);
}

main().catch((e) => {
  console.error(e);
  throw e;
});
