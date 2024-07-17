import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "bf";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  { sku: "REDK_P042560", sale_price: 19.9 },
  { sku: "5022", sale_price: 16.1 },
  { sku: "5023", sale_price: 16.1 },
  { sku: "6193", sale_price: 16.15 },
  { sku: "6465", sale_price: 11.8 },
  { sku: "6469", sale_price: 11.65 },
  { sku: "6470", sale_price: 14.4 },
  { sku: "6471", sale_price: 11.8 },
  { sku: "6474", sale_price: 11.8 },
  { sku: "6475", sale_price: 11.8 },
  { sku: "7494", sale_price: 22.5 },
  { sku: "7657", sale_price: 21.75 },
  { sku: "7682", sale_price: 11.8 },
  { sku: "7683", sale_price: 11.8 },
  { sku: "7684", sale_price: 11.8 },
  { sku: "101602", sale_price: 40.5 },
  { sku: "110542", sale_price: 55.5 },
  { sku: "110631", sale_price: 63.0 },
  { sku: "110625", sale_price: 63.0 },
  { sku: "111006", sale_price: 66.75 },
  { sku: "9500", sale_price: 16.5 },
  { sku: "9894", sale_price: 11.8 },
  { sku: "9899", sale_price: 11.8 },
  { sku: "11038", sale_price: 13.7 },
  { sku: "11040", sale_price: 13.7 },
  { sku: "13140", sale_price: 27.75 },
  { sku: "13297", sale_price: 32.25 },
  { sku: "14054", sale_price: 11.8 },
  { sku: "14050", sale_price: 11.8 },
  { sku: "14051", sale_price: 11.8 },
  { sku: "REDK_P042480", sale_price: 18.0 },
  { sku: "REDK_P027970", sale_price: 18.0 },
  { sku: "14136", sale_price: 23.65 },
  { sku: "20109", sale_price: 11.8 },
  { sku: "20110", sale_price: 11.8 },
];

const addToNoDiscountCat = true;

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i + 1} / ${data.length} Updating prices for sku ${row.sku}`);
    try {
      /**
       * price update fields
       */
      let updates = {
        sale_price: row.sale_price,
      };

      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }

      const toUpdate = vars[0];
      await updateProductVariant(toUpdate.product_id, toUpdate.id, updates);
      if (addToNoDiscountCat) {
        const product = await getProductBySku(row.sku);
        if (product) {
          let catID: number | undefined;
          if (store === "bf") {
            catID = 640;
          }
          if (!catID) {
            throw new Error(
              "No catId for nodiscountcat of current store " + store
            );
          }
          // temporary for prime beauty event
          product.categories.push(1039)
          product.categories.push(catID)
          await updateProduct(product.id, {
            categories: product.categories,
          });
        }
      }
    } catch (err) {
      console.log(err);
      continue;
    }
    /**
     * wait 1.5s
     */
    //await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  console.log("done");
}
main();
