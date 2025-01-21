import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "bf";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  { sku: "6466", sale_price: 19.9 },
  { sku: "6467", sale_price: 18.25 },
  { sku: "6468", sale_price: 25.5 },
  { sku: "6470", sale_price: 19.9 },
  { sku: "6471", sale_price: 15.9 },
  { sku: "6472", sale_price: 19.5 },
  { sku: "6473", sale_price: 16.5 },
  { sku: "6475", sale_price: 15.9 },
  { sku: "6476", sale_price: 19.9 },
  { sku: "6477", sale_price: 34.5 },
  { sku: "6479", sale_price: 19.5 },
  { sku: "6482", sale_price: 21.5 },
  { sku: "6483", sale_price: 22.25 },
  { sku: "7682", sale_price: 15.9 },
  { sku: "7683", sale_price: 15.9 },
  { sku: "7684", sale_price: 15.9 },
  { sku: "7685", sale_price: 18.25 },
  { sku: "7686", sale_price: 22.67 },
  { sku: "7687", sale_price: 15.9 },
  { sku: "7688", sale_price: 28.5 },
  { sku: "7689", sale_price: 29.9 },
  { sku: "7999", sale_price: 15.9 },
  { sku: "8000", sale_price: 17.9 },
  { sku: "8001", sale_price: 17.9 },
  { sku: "8713", sale_price: 15.9 },
  { sku: "8716", sale_price: 19.9 },
  { sku: "8715", sale_price: 15.9 },
  { sku: "8719", sale_price: 20.9 },
  { sku: "8718", sale_price: 19.5 },
  { sku: "8714", sale_price: 15.9 },
  { sku: "8757", sale_price: 50.25 },
  { sku: "9804", sale_price: 35.35 },
  { sku: "9805", sale_price: 37.65 },
  { sku: "9802", sale_price: 32.65 },
  { sku: "9806", sale_price: 42.4 },
  { sku: "9801", sale_price: 43.0 },
  { sku: "9894", sale_price: 15.9 },
  { sku: "9895", sale_price: 19.5 },
  { sku: "9897", sale_price: 19.9 },
  { sku: "9898", sale_price: 21.5 },
  { sku: "9899", sale_price: 15.9 },
  { sku: "9906", sale_price: 90.35 },
  { sku: "9907", sale_price: 50.7 },
  { sku: "9954", sale_price: 103.25 },
  { sku: "9955", sale_price: 98.5 },
  { sku: "10377", sale_price: 50.45 },
  { sku: "11038", sale_price: 18.9 },
  { sku: "11040", sale_price: 18.9 },
  { sku: "11041", sale_price: 18.9 },
  { sku: "11042", sale_price: 22.25 },
  { sku: "11074", sale_price: 36.5 },
  { sku: "11076", sale_price: 58.0 },
  { sku: "13038", sale_price: 50.6 },
  { sku: "14054", sale_price: 15.9 },
  { sku: "14052", sale_price: 25.5 },
  { sku: "14050", sale_price: 15.9 },
  { sku: "14051", sale_price: 15.9 },
  { sku: "14053", sale_price: 16.5 },
  { sku: "14686", sale_price: 25.5 },
  { sku: "14758", sale_price: 72.0 },
  { sku: "14759", sale_price: 76.3 },
  { sku: "14760", sale_price: 69.95 },
  { sku: "14761", sale_price: 64.75 },
  { sku: "14762", sale_price: 66.15 },
  { sku: "14763", sale_price: 77.5 },
  { sku: "14764", sale_price: 83.0 },
  { sku: "20109", sale_price: 15.9 },
  { sku: "20110", sale_price: 15.9 },
  { sku: "20111", sale_price: 20.6 },
  { sku: "20112", sale_price: 20.6 },
  { sku: "20214", sale_price: 15.9 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.None;

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i + 1} / ${data.length} Updating prices for sku ${row.sku}`);
    try {
      /**
       *priceupdate fields
       */
      let updates = {
        sale_price: row.sale_price,
      };

      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }

      const variantToUpdate = vars[0];
      await updateProductVariant(
        variantToUpdate.product_id,
        variantToUpdate.id,
        updates
      );
      if (addToNoDiscountCat !== ExcludeFromDiscountAction.None) {
        const product = await getProductBySku(row.sku);

        if (product) {
          let catID: number | undefined;

          console.log(product?.id, product.name);

          if (store === "bf") {
            catID = 640;
          }

          if (store === "ih") {
            catID = 1493;
          }

          if (store === "bsk") {
            catID = 108;
          }

          if (store === "ah") {
            catID = 233;
          }

          if (store === "pb") {
            catID = 187;
          }

          if (store === "hie") {
            catID = 41;
          }

          if (store === "px") {
            catID = 484;
          }

          if (!catID) {
            throw "No catId for nodiscountcat of current store " + store;
          }

          let updatedCategories = [...product.categories];
          if (addToNoDiscountCat == ExcludeFromDiscountAction.Add) {
            updatedCategories = [...product.categories, catID];
          } else if (addToNoDiscountCat == ExcludeFromDiscountAction.Remove) {
            updatedCategories = updatedCategories.filter((id) => id !== catID);
          }

          await updateProduct(product.id, {
            categories: updatedCategories,
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
