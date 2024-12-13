import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "bf";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  { sku: "6834", sale_price: 45.05 },
  { sku: "9448", sale_price: 10.5 },
  { sku: "10590", sale_price: 24.99 },
  { sku: "11091", sale_price: 19.7 },
  { sku: "11356", sale_price: 50 },
  { sku: "11355", sale_price: 50 },
  { sku: "11580", sale_price: 30 },
  { sku: "11581", sale_price: 20.75 },
  { sku: "11583", sale_price: 41.25 },
  { sku: "11853", sale_price: 16 },
  { sku: "11898", sale_price: 29.99 },
  { sku: "12056", sale_price: 25.99 },
  { sku: "12087", sale_price: 14.65 },
  { sku: "12088", sale_price: 13.3 },
  { sku: "12090", sale_price: 25 },
  { sku: "12162", sale_price: 18.99 },
  { sku: "13647", sale_price: 41.99 },
  { sku: "13776", sale_price: 26.8 },
  { sku: "13793", sale_price: 32 },
  { sku: "13800", sale_price: 28.8 },
  { sku: "20296", sale_price: 160 },
  { sku: "13793A", sale_price: 27.99 },
  { sku: "20457", sale_price: 81.2 },
  { sku: "20451", sale_price: 124 },
  { sku: "20456", sale_price: 56 },
  { sku: "20453", sale_price: 121.8 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.Remove;

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
