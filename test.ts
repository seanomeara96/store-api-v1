import { createProductImageFromFile } from "./functions/images/createProductImage";
import { getAllProducts } from "./functions/products/getAllProducts";
import fs from "fs";
import FormData  from "form-data";

async function main() {
  try {
    const imagePaths = [
      'C:/Users/User/store-api-v1/boar.jpg',
      'C:/Users/User/store-api-v1/detangle.jpg'
    ];

    require("./config/config").config("bf");
    const params: any = {};
    params[`categories:in`] = 1084;
    const products = await getAllProducts(params);

    for (let i = 0; i < products.length; i++) {
      console.log(`Processing product ${i} of ${products.length}`);
      for (let j = 0; j < imagePaths.length; j++) {
        console.log(`Processing image ${j} of ${imagePaths.length}`);
        console.log(`Product name: ${products[i].name}`);        
        await createProductImageFromFile(products[i].id, imagePaths[j], `beautyfeatures brush ${j+1}`, false, 10+j);
      }
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

main();