import express from "express";
import fs from "fs";
import path from "path";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { ProductImage } from "../../functions/images/getProductImage";
import { getAllProductImages } from "../../functions/images/getAllProductImages";
import { deleteProductImage } from "../../functions/images/deleteProductImage";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { Product } from "../../functions/products/Product";
const store = "bf";
let imagery: ProductImage[];
let batchedImagery: { [key: number]: ProductImage[] } = {};
let skus = [
  "22877",
  "22886",
  "22892",
  "22880",
  "22912",
  "22879",
  "22899",
  "22911",
  "22893",
  "22884",
  "22889",
  "22908",
  "22914",
  "22890",
  "22878",
  "22887",
  "22894",
  "22910",
  "22882",
  "22909",
  "22902",
  "22913",
  "22885",
  "22900",
  "22905",
  "22895",
  "22906",
  "22786",
  "22784",
  "22783",
  "22785",
  "22782",
  "22901",
  "22898",
  "22888",
  "22883",
  "22915",
  "22896",
  "22847",
  "22844",
  "22843",
  "22839",
  "22723",
  "22235",
  "22233",
  "22541",
  "22718",
  "22717",
  "22722",
  "22721",
  "22720",
  "22238",
  "22719",
  "22897",
];
async function main() {
  try {
    require("../../config/config").config(store);

    try {
      imagery = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, `${store}-images.json`), {
          encoding: "utf-8",
        }),
      );
    } catch {
      const products: Product[] = [];
      for (const sku of skus) {
        const product = await getProductBySku(sku);
        if (product) products.push(product);
      }
      imagery = [];
      for (let i = 0; i < products.length; i++) {
        console.log(i, products.length);
        imagery.push(...(await getAllProductImages(products[i].id)));
      }
      fs.writeFileSync(
        path.resolve(__dirname, `${store}-images-original.json`),
        JSON.stringify(imagery),
        { encoding: "utf-8" },
      );
      fs.writeFileSync(
        path.resolve(__dirname, `${store}-images.json`),
        JSON.stringify(imagery),
        { encoding: "utf-8" },
      );
    }
    const app = express();

    imagery.sort(function (a, b) {
      return a.sort_order - b.sort_order;
    });
    for (const image of imagery) {
      if (!batchedImagery[image.product_id])
        batchedImagery[image.product_id] = [];
      batchedImagery[image.product_id].push(image);
    }

    let gallery: string = ``;
    for (const batch in batchedImagery) {
      let images = batchedImagery[batch]
        .map(function (img) {
          return /*HTML*/ `<img
            hx-trigger="click"
            hx-post="/delete/${img.product_id}/${img.id}"
            hx-swap="outerHTML"
            style="aspect-ratio:1/1; width: 250px;" src="${img.url_zoom}">`;
        })
        .join("");

      gallery += /*HTML*/ `
      <div style="display: flex; " >${images}</div>
      `;
    }

    app.get("/", function (req, res) {
      res.send(/*HTML*/ `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body >
            ${gallery}
            <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
        </body>
        </html>`);
    });

    app.post(`/delete/:product_id/:image_id`, async function (req, res) {
      const pID = parseInt(req.params.product_id);
      const ID = parseInt(req.params.image_id);
      await deleteProductImage(pID, ID);
      console.log(
        `deleted product ${req.params.product_id} image ${req.params.image_id}`,
      );
      imagery = imagery.filter(function (img) {
        return !(img.id === ID && img.product_id === pID);
      });
      fs.writeFileSync(
        path.resolve(__dirname, `${store}-images.json`),
        JSON.stringify(imagery),
        { encoding: "utf-8" },
      );
      res.send("");
    });

    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
}
main();
