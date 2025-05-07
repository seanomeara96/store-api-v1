import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "8757", sale_price: 37.0, exclude: "TRUE" },
  { sku: "9907", sale_price: 34.0, exclude: "TRUE" },
  { sku: "13253", sale_price: 30.0, exclude: "TRUE" },
  { sku: "8758", sale_price: 35.0, exclude: "TRUE" },
  { sku: "20649", sale_price: 35.0, exclude: "TRUE" },
  { sku: "8759", sale_price: 32.0, exclude: "TRUE" },
  { sku: "20230", sale_price: 32.0, exclude: "TRUE" },
  { sku: "20646", sale_price: 33.65, exclude: "TRUE" },
  { sku: "8760", sale_price: 32.0, exclude: "TRUE" },
  { sku: "20231", sale_price: 32.0, exclude: "TRUE" },
  { sku: "20647", sale_price: 33.65, exclude: "TRUE" },
  { sku: "13248", sale_price: 32.0, exclude: "TRUE" },
  { sku: "14137", sale_price: 50.0, exclude: "TRUE" },
  { sku: "20648", sale_price: 33.65, exclude: "TRUE" },
  { sku: "8756", sale_price: 35.0, exclude: "TRUE" },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

let retries = 0;
async function main() {
  for (let j = 0; j < stores.length; j++) {
    const store = stores[j];
    require("../../config/config").config(store);
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      console.log(
        `${store} ${i + 1} / ${data.length} Updating prices for sku ${row.sku}`
      );
      try {
        let addToNoDiscountCat: ExcludeFromDiscountAction =
          ExcludeFromDiscountAction.None;
        if (row.exclude === "TRUE") {
          addToNoDiscountCat = ExcludeFromDiscountAction.Add;
        }
        if (row.exclude === "FALSE") {
          addToNoDiscountCat = ExcludeFromDiscountAction.Remove;
        }

        /**
         *priceupdate fields
         */
        let updates: any = {
          sale_price: row.sale_price,
        };

        const vars = await getAllProductVariants({ sku: row.sku });
        const expect = 1;
        if (vars.length !== expect) {
          console.log(
            `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`
          );
          continue;
        }

        const variantToUpdate = vars[0];
        await updateProductVariant(
          variantToUpdate.product_id,
          variantToUpdate.id,
          updates
        );
        if (
          addToNoDiscountCat == ExcludeFromDiscountAction.Add ||
          addToNoDiscountCat == ExcludeFromDiscountAction.Remove
        ) {
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

            if (store === "bs") {
              catID = 90;
            }

            if (!catID) {
              throw "No catId for no discount cat of current store";
            }

            let updatedCategories = [...product.categories];
            if (addToNoDiscountCat == ExcludeFromDiscountAction.Add) {
              updatedCategories = [...product.categories, catID];
            } else if (addToNoDiscountCat == ExcludeFromDiscountAction.Remove) {
              updatedCategories = updatedCategories.filter(
                (id) => id !== catID
              );
            }

            await updateProduct(product.id, {
              categories: updatedCategories,
            });
          }
        }
      } catch (err: any) {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err);
        }

        if (JSON.stringify(err).includes("nodiscountcat")) {
          console.log("fatal err");
          return;
        }

        if (retries < 3) {
          i--;
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        continue;
      }
      /**
       * wait 1.5s
       */
      await new Promise((resolve) => setTimeout(resolve, 500));
      retries = 0;
    }
  }
  console.log("done");
}
main();
