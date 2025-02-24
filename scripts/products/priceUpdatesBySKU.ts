import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "8246", sale_price: 12.55 },
  { sku: "8247", sale_price: 12.55 },
  { sku: "8248", sale_price: 14.35 },
  { sku: "8249", sale_price: 14.35 },
  { sku: "8250", sale_price: 14.35 },
  { sku: "8251", sale_price: 14.35 },
  { sku: "8252", sale_price: 15.3 },
  { sku: "9067", sale_price: 24 },
  { sku: "9299", sale_price: 25.3 },
  { sku: "9300", sale_price: 30.5 },
  { sku: "9638", sale_price: 15.6 },
  { sku: "10102", sale_price: 30.35 },
  { sku: "10125", sale_price: 20 },
  { sku: "10126", sale_price: 20 },
  { sku: "10299", sale_price: 30.3 },
  { sku: "10300", sale_price: 12.6 },
  { sku: "10301", sale_price: 30.3 },
  { sku: "10302", sale_price: 17.25 },
  { sku: "11740", sale_price: 12.55 },
  { sku: "11743", sale_price: 30.4 },
  { sku: "11741", sale_price: 14.35 },
  { sku: "11742", sale_price: 19.5 },
  { sku: "11744", sale_price: 30.5 },
  { sku: "11991", sale_price: 18.5 },
  { sku: "11992", sale_price: 12.55 },
  { sku: "11993", sale_price: 18.5 },
  { sku: "11994", sale_price: 31.85 },
  { sku: "12105", sale_price: 2.4 },
  { sku: "12106", sale_price: 2.4 },
  { sku: "12107", sale_price: 2.4 },
  { sku: "12108", sale_price: 1.6 },
  { sku: "12233", sale_price: 15.1 },
  { sku: "12234", sale_price: 15.1 },
  { sku: "12244", sale_price: 30.5 },
  { sku: "12247", sale_price: 25.3 },
  { sku: "12248", sale_price: 25.3 },
  { sku: "12249", sale_price: 25.3 },
  { sku: "12250", sale_price: 25.3 },
  { sku: "12251", sale_price: 25.3 },
  { sku: "12254", sale_price: 30.5 },
  { sku: "10484", sale_price: 26.6 },
  { sku: "21059", sale_price: 28.3 },
  { sku: "21060", sale_price: 33.4 },
  { sku: "21061", sale_price: 47.85 },
  { sku: "21062", sale_price: 31.05 },
  { sku: "21063", sale_price: 38.8 },
  { sku: "21064", sale_price: 28.7 },
  { sku: "21065", sale_price: 31.9 },
  { sku: "21066", sale_price: 83.15 },
  { sku: "21067", sale_price: 25.1 },
  { sku: "21068", sale_price: 25.1 },
  { sku: "21069", sale_price: 25.1 },
  { sku: "21070", sale_price: 28.7 },
  { sku: "21071", sale_price: 28.7 },
  { sku: "21073", sale_price: 28.7 },
  { sku: "21074", sale_price: 28.7 },
  { sku: "21075", sale_price: 31.9 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.Add;

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
        continue;
      }
      /**
       * wait 1.5s
       */
      //await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  console.log("done");
}
main();
