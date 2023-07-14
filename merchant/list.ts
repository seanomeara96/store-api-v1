import { login } from "./login";
import { getAllProducts } from "./getAllProducts";
import dotenv from "dotenv";
dotenv.config();

const merchantId = process.env.BF_MERCHANT_ID!;
//const credentials = require("./service-account.json");

async function main() {
  try {
    await login();
    // Do the magic
    const products = await getAllProducts(merchantId);
    console.log("loggin this!!!!!!!!!!!!!!!!!!!!!!1111", products);
  } catch (err) {
    console.log(err);
  }
}

main();
