import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "11214", sale_price: 12.7, exclude: "TRUE" },
  { sku: "11215", sale_price: 14.95, exclude: "TRUE" },
  { sku: "11216", sale_price: 14.99, exclude: "TRUE" },
  { sku: "12948", sale_price: 7.5, exclude: "TRUE" },
  { sku: "12949", sale_price: 6.65, exclude: "TRUE" },
  { sku: "12950", sale_price: 8.2, exclude: "TRUE" },
  { sku: "13643", sale_price: 27.75, exclude: "TRUE" },
  { sku: "13644", sale_price: 2.25, exclude: "TRUE" },
  { sku: "20113", sale_price: 15.0, exclude: "TRUE" },
  { sku: "20114", sale_price: 21.4, exclude: "TRUE" },
  { sku: "20115", sale_price: 5.25, exclude: "TRUE" },
  { sku: "20116", sale_price: 9.75, exclude: "TRUE" },
  { sku: "20117", sale_price: 15.75, exclude: "TRUE" },
  { sku: "20118", sale_price: 17.25, exclude: "TRUE" },
  { sku: "20119", sale_price: 13.15, exclude: "TRUE" },
  { sku: "20120", sale_price: 17.25, exclude: "TRUE" },
  { sku: "20121", sale_price: 13.15, exclude: "TRUE" },
  { sku: "20122", sale_price: 10.9, exclude: "TRUE" },
  { sku: "20123", sale_price: 4.5, exclude: "TRUE" },
  { sku: "20124", sale_price: 13.99, exclude: "TRUE" },
  { sku: "20506", sale_price: 9.7, exclude: "TRUE" },
  { sku: "20507", sale_price: 11.95, exclude: "TRUE" },
  { sku: "20508", sale_price: 13.45, exclude: "TRUE" },
  { sku: "20509", sale_price: 16.45, exclude: "TRUE" },
  { sku: "20523", sale_price: 16.5, exclude: "TRUE" },
  { sku: "20524", sale_price: 30.75, exclude: "TRUE" },
  { sku: "20525", sale_price: 27.99, exclude: "TRUE" },
  { sku: "20611", sale_price: 15.99, exclude: "TRUE" },
  { sku: "20614", sale_price: 18.99, exclude: "TRUE" },
  { sku: "20612", sale_price: 15.99, exclude: "TRUE" },
  { sku: "20615", sale_price: 18.99, exclude: "TRUE" },
  { sku: "20613", sale_price: 15.99, exclude: "TRUE" },
  { sku: "20616", sale_price: 18.99, exclude: "TRUE" },
  { sku: "20617", sale_price: 12.99, exclude: "TRUE" },
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
        const addToNoDiscountCat: ExcludeFromDiscountAction =
          row.exclude === "FALSE"
            ? ExcludeFromDiscountAction.Remove
            : ExcludeFromDiscountAction.Add;

        /**
         *priceupdate fields
         */
        let updates = {
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
              throw "No catId for nodiscountcat of current store";
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
      } catch (err) {
        console.log(err);

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
