import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "WOW_CW0002", sale_price: 32.95, exclude: " FALSE " },
  { sku: "WOW_CW0003", sale_price: 32.95, exclude: " FALSE " },
  { sku: "WOW_CW0004", sale_price: 32.95, exclude: " FALSE " },
  { sku: "WOW_CW0005", sale_price: 32.95, exclude: " FALSE " },
  { sku: "100703", sale_price: 32.95, exclude: " FALSE " },
  { sku: "4976", sale_price: 25.0, exclude: " FALSE " },
  { sku: "5032", sale_price: 28.0, exclude: " FALSE " },
  { sku: "7489", sale_price: 25.0, exclude: " FALSE " },
  { sku: "7492", sale_price: 27.5, exclude: " FALSE " },
  { sku: "7656", sale_price: 29.0, exclude: " FALSE " },
  { sku: "7494", sale_price: 27.99, exclude: " FALSE " },
  { sku: "7495", sale_price: 30.0, exclude: " FALSE " },
  { sku: "7654", sale_price: 25.0, exclude: " FALSE " },
  { sku: "7655", sale_price: 25.0, exclude: " FALSE " },
  { sku: "7657", sale_price: 26.99, exclude: " FALSE " },
  { sku: "7820", sale_price: 80.0, exclude: " FALSE " },
  { sku: "7822", sale_price: 99.99, exclude: " FALSE " },
  { sku: "7823", sale_price: 97.0, exclude: " TRUE " },
  { sku: "7833", sale_price: 12.5, exclude: " FALSE " },
  { sku: "7834", sale_price: 12.5, exclude: " FALSE " },
  { sku: "7836", sale_price: 79.5, exclude: " FALSE " },
  { sku: "7837", sale_price: 79.5, exclude: " FALSE " },
  { sku: "7838", sale_price: 79.5, exclude: " FALSE " },
  { sku: "7839", sale_price: 32.95, exclude: " FALSE " },
  { sku: "7840", sale_price: 64.0, exclude: " FALSE " },
  { sku: "7841", sale_price: 61.0, exclude: " FALSE " },
  { sku: "7919", sale_price: 52.0, exclude: " TRUE " },
  { sku: "7920", sale_price: 55.5, exclude: " TRUE " },
  { sku: "7986", sale_price: 14.5, exclude: " TRUE " },
  { sku: "7988", sale_price: 29.0, exclude: " FALSE " },
  { sku: "9230", sale_price: 78.99, exclude: " FALSE " },
  { sku: "9890", sale_price: 22.0, exclude: " FALSE " },
  { sku: "8787", sale_price: 50.0, exclude: " FALSE " },
  { sku: "11046", sale_price: 14.0, exclude: " FALSE " },
  { sku: "11047", sale_price: 22.4, exclude: " FALSE " },
  { sku: "11393", sale_price: 45.0, exclude: " FALSE " },
  { sku: "11497", sale_price: 75.0, exclude: " FALSE " },
  { sku: "11498", sale_price: 74.0, exclude: " FALSE " },
  { sku: "11499", sale_price: 89.99, exclude: " FALSE " },
  { sku: "11500", sale_price: 123.99, exclude: " FALSE " },
  { sku: "12411", sale_price: 29.0, exclude: " FALSE " },
  { sku: "12412", sale_price: 29.0, exclude: " FALSE " },
  { sku: "12413", sale_price: 30.0, exclude: " FALSE " },
  { sku: "12414", sale_price: 28.0, exclude: " FALSE " },
  { sku: "12415", sale_price: 38.0, exclude: " FALSE " },
  { sku: "13037", sale_price: 59.0, exclude: " FALSE " },
  { sku: "13140", sale_price: 34.99, exclude: " FALSE " },
  { sku: "13921", sale_price: 25.0, exclude: " FALSE " },
  { sku: "13922", sale_price: 29.0, exclude: " FALSE " },
  { sku: "13923", sale_price: 10.5, exclude: " FALSE " },
  { sku: "13924", sale_price: 12.5, exclude: " FALSE " },
  { sku: "13925", sale_price: 12.5, exclude: " FALSE " },
  { sku: "13927", sale_price: 16.0, exclude: " FALSE " },
  { sku: "13930", sale_price: 14.5, exclude: " FALSE " },
  { sku: "13931", sale_price: 13.5, exclude: " FALSE " },
  { sku: "13932", sale_price: 16.0, exclude: " FALSE " },
  { sku: "14027", sale_price: 30.5, exclude: " FALSE " },
  { sku: "14028", sale_price: 29.0, exclude: " FALSE " },
  { sku: "14029", sale_price: 30.5, exclude: " FALSE " },
  { sku: "14030", sale_price: 30.5, exclude: " FALSE " },
  { sku: "14031", sale_price: 86.0, exclude: " FALSE " },
  { sku: "14747", sale_price: 32.95, exclude: " FALSE " },
  { sku: "4975", sale_price: 17.55, exclude: " TRUE " },
  { sku: "20481", sale_price: 44.99, exclude: " FALSE " },
  { sku: "20466", sale_price: 50.0, exclude: " FALSE " },
  { sku: "21355", sale_price: 42.0, exclude: " FALSE " },
  { sku: "21356", sale_price: 70.0, exclude: " FALSE " },
  { sku: "21354", sale_price: 32.99, exclude: " FALSE " },
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
