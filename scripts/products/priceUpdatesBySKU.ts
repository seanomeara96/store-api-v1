import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bsk"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "103605", sale_price: 84.99, exclude: "FALSE" },
  { sku: "110631", sale_price: 64.99, exclude: "FALSE" },
  { sku: "110630", sale_price: 42.99, exclude: "FALSE" },
  { sku: "110625", sale_price: 71.99, exclude: "FALSE" },
  { sku: "110624", sale_price: 43.99, exclude: "FALSE" },
  { sku: "110548", sale_price: 51.99, exclude: "FALSE" },
  { sku: "111598", sale_price: 64.99, exclude: "FALSE" },
  { sku: "110905", sale_price: 36.99, exclude: "FALSE" },
  { sku: "100851", sale_price: 22.99, exclude: "FALSE" },
  { sku: "6244", sale_price: 49.99, exclude: "FALSE" },
  { sku: "6341", sale_price: 84.99, exclude: "FALSE" },
  { sku: "111006", sale_price: 67.99, exclude: "FALSE" },
  { sku: "7453", sale_price: 66.99, exclude: "FALSE" },
  { sku: "7603", sale_price: 29.99, exclude: "FALSE" },
  { sku: "8069", sale_price: 51.99, exclude: "FALSE" },
  { sku: "9073", sale_price: 3.99, exclude: "FALSE" },
  { sku: "9310", sale_price: 24.99, exclude: "FALSE" },
  { sku: "9893", sale_price: 16.99, exclude: "FALSE" },
  { sku: "10378", sale_price: 64.99, exclude: "FALSE" },
  { sku: "102021", sale_price: 47.99, exclude: "FALSE" },
  { sku: "11141", sale_price: 59, exclude: "FALSE" },
  { sku: "11260", sale_price: 69.99, exclude: "FALSE" },
  { sku: "11259", sale_price: 80, exclude: "FALSE" },
  { sku: "11310", sale_price: 48.99, exclude: "FALSE" },
  { sku: "110597", sale_price: 42.03, exclude: "FALSE" },
  { sku: "12384", sale_price: 119.99, exclude: "FALSE" },
  { sku: "12738", sale_price: 92, exclude: "FALSE" },
  { sku: "12739", sale_price: 89.99, exclude: "FALSE" },
  { sku: "12740", sale_price: 89.99, exclude: "FALSE" },
  { sku: "13147", sale_price: 69.99, exclude: "FALSE" },
  { sku: "20389", sale_price: 39.99, exclude: "FALSE" },
  { sku: "20390", sale_price: 24.99, exclude: "FALSE" },
  { sku: "20756", sale_price: 144, exclude: "FALSE" },
  { sku: "20755", sale_price: 106, exclude: "FALSE" },
  { sku: "21057", sale_price: 95, exclude: "FALSE" },
  { sku: "21058", sale_price: 27, exclude: "FALSE" },
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
