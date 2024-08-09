import {
  getAllProductImages,
  ProductImage,
} from "./functions/images/getAllProductImages";
import { getAllProducts } from "./functions/products/getAllProducts";
import { Product } from "./functions/products/Product";
import path from "path";
import fs from "fs";
import express from "express";

interface ProductWithImages extends Product {
  images: ProductImage[];
}
const store = "ch";

async function test() {
  try {
    const products = await getPlateProducts();

    products.sort((a,b) => b.sort_order - a.sort_order)

    const app = express();
    app.get("/", function (req, res) {
      let content = products
        .map(function (p) {
          p.images.sort((a, b) => a.sort_order - b.sort_order);
          const src = p.images[0].url_standard;
          return /*HTML*/ `
            <img src="${src}" style="flex-shrink: 0; display: block; border-bottom: 1px solid red;">
          `;
        })
        .join("");
      res.send(pageBody(content));
    });
    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  } catch (err) {
    console.log(err);
  }
}

test();

function pageBody(content: string): string {
  return /*HTML*/ `<!DOCTYPE html>
<html lang="en" style="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="display: flex; align-items: end;">
    ${content}
    <hr style="border: 1px solid blue; position: absolute; top: 20px; z-index: 1000; width: 10000%;">
    <hr style="border: 1px solid red; position: absolute; top: 460px; z-index: 1000; width: 10000%;">
</body>
</html>`;
}

async function getPlateProducts(): Promise<ProductWithImages[]> {
  let cachePath = path.resolve(__dirname, "ch-plates-cache.json");

  try {
    if (fs.existsSync(cachePath)) {
      const productString = fs.readFileSync(cachePath, { encoding: "utf-8" });
      const products = JSON.parse(productString);
      return products;
    } else {
      require("./config/config").config(store);
      let products = (await getAllProducts()) as ProductWithImages[];
      products = products.filter((product) =>
        product.name.toLocaleLowerCase().includes("plate")
      );
      for (const product of products) {
        product.images = await getAllProductImages(product.id);
      }
      fs.writeFileSync(cachePath, JSON.stringify(products), {
        encoding: "utf-8",
      });
      return products;
    }
  } catch (err) {
    throw err;
  }
}
