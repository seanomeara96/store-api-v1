import fs from "fs";
import path from "path";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { output } from "./scripts/utils/output";

let  skus = [
  "10419",
  "10418",
  "12873",
  "6947",
  "9699",
  "9171",
  "9177",
  "9159",
  "40528",
  "6327",
  "13913",
  "13914",
  "13064",
  "9485",
  "7125",
  "12728",
  "9602",
  "7125",
  "6102",
  "6103",
  "9610",
  "10759",
  "10761",
  "9608",
  "9594",
  "9568",
  "6102",
  "6103",
  "7104",
  "9627",
  "7119",
  "9626",
  "9605",
  "9600",
  "9628",
  "7460",
  "7126",
  "7460",
  "12727",
  "9604",
  "7126",
  "9581",
  "7241",
  "7103",
  "12726",
  "12725",
  "9582",
  "7242",
  "7461",
  "9629",
  "12981",
  "11113",
  "11112",
  "11544",
  "11111",
  "11114",
  "20410",
  "10666",
  "7553",
  "20026",
  "8054",
  "8055",
  "10248",
  "10243",
  "10246",
  "10253",
  "10241",
  "10244",
  "10240",
  "14189",
  "20415",
  "10672",
  "20414",
  "11443",
  "14188",
  "11405",
  "11444",
  "8799a",
  "9279",
  "9288",
  "9297",
  "9270",
  "10183",
  "9269",
  "13184",
  "13205",
  "14461",
  "11344",
  "11439",
  "10051",
  "12785",
  "12775",
  "12769",
  "12768",
  "14192",
  "14191",
  "14193",
];

async function test() {
  try {
    const outer = [];

    for (const store of ["bf", "ih"]) {
      require("./config/config").config(store);

      for (const sku of skus) {
        const product = await getProductBySku(sku);
        if (!product) {
          console.log("no product for " + sku);
          continue;
        }
        outer.push({ sku, url: (store === "bf" ? "https://beautyfeatures.ie" : "https://inhealth.ie")+product.custom_url.url });
        skus = skus.filter(s => s !== sku)
      }
    }

    if(skus.length) {
        console.log("there are still remaining skus")
        await output(path.resolve(__dirname, "remaining-skus.csv"), skus.map(s => ({sku:s})), true);
    }
    await output(path.resolve(__dirname, "sku-urls.csv"), outer, true);
  } catch (err) {
    console.log(err);
  }
}

test();
