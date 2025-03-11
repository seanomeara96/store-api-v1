import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["hie"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "5388", sale_price: 7.5 },
  { sku: "6103", sale_price: 7.5 },
  { sku: "6102", sale_price: 7.5 },
  { sku: "6227", sale_price: 7.5 },
  { sku: "7141", sale_price: 3.99 },
  { sku: "7139", sale_price: 9.35 },
  { sku: "5383", sale_price: 10.5 },
  { sku: "7131", sale_price: 4.99 },
  { sku: "5304", sale_price: 4.99 },
  { sku: "5306", sale_price: 4.99 },
  { sku: "6215", sale_price: 9.75 },
  { sku: "5355", sale_price: 15 },
  { sku: "7129", sale_price: 38.99 },
  { sku: "7127", sale_price: 4.99 },
  { sku: "7126", sale_price: 4.99 },
  { sku: "7125", sale_price: 4.99 },
  { sku: "7116", sale_price: 7.5 },
  { sku: "6100", sale_price: 6.99 },
  { sku: "5303", sale_price: 5.25 },
  { sku: "6432", sale_price: 11.25 },
  { sku: "7249", sale_price: 26.25 },
  { sku: "7119", sale_price: 14.25 },
  { sku: "7120", sale_price: 15.75 },
  { sku: "7242", sale_price: 14.25 },
  { sku: "7121", sale_price: 15.75 },
  { sku: "7237", sale_price: 8.6 },
  { sku: "7236", sale_price: 7.5 },
  { sku: "7235", sale_price: 7.5 },
  { sku: "6435", sale_price: 10.5 },
  { sku: "7109", sale_price: 7.5 },
  { sku: "7112", sale_price: 13.5 },
  { sku: "7113", sale_price: 18.75 },
  { sku: "7244", sale_price: 66.99 },
  { sku: "7245", sale_price: 37.99 },
  { sku: "7118", sale_price: 6 },
  { sku: "7460", sale_price: 19.5 },
  { sku: "7461", sale_price: 19.5 },
  { sku: "7240", sale_price: 18.75 },
  { sku: "7241", sale_price: 20.25 },
  { sku: "7462", sale_price: 18 },
  { sku: "7100", sale_price: 22.5 },
  { sku: "6435A", sale_price: 4.99 },
  { sku: "6435B", sale_price: 10.5 },
  { sku: "7250", sale_price: 30 },
  { sku: "7649", sale_price: 12 },
  { sku: "8299", sale_price: 12.75 },
  { sku: "12729", sale_price: 18.75 },
  { sku: "8707", sale_price: 6.75 },
  { sku: "8706", sale_price: 8.99 },
  { sku: "8711", sale_price: 8.99 },
  { sku: "8712", sale_price: 11.25 },
  { sku: "8709", sale_price: 7.5 },
  { sku: "8705", sale_price: 13.5 },
  { sku: "8704", sale_price: 13.5 },
  { sku: "8798", sale_price: 9 },
  { sku: "5384", sale_price: 28.5 },
  { sku: "5381", sale_price: 25.99 },
  { sku: "6216", sale_price: 23.25 },
  { sku: "8710", sale_price: 8.99 },
  { sku: "7103", sale_price: 7.5 },
  { sku: "7104", sale_price: 7.5 },
  { sku: "7105", sale_price: 7.5 },
  { sku: "6812", sale_price: 15.75 },
  { sku: "6813", sale_price: 15.75 },
  { sku: "9611", sale_price: 6.75 },
  { sku: "9580", sale_price: 22.99 },
  { sku: "9590", sale_price: 2.99 },
  { sku: "9607", sale_price: 16.5 },
  { sku: "9608", sale_price: 16.5 },
  { sku: "9609", sale_price: 16.5 },
  { sku: "9610", sale_price: 16.5 },
  { sku: "9618", sale_price: 9.75 },
  { sku: "9619", sale_price: 9.75 },
  { sku: "9620", sale_price: 9.75 },
  { sku: "9626", sale_price: 12.75 },
  { sku: "9627", sale_price: 4.99 },
  { sku: "9628", sale_price: 12.75 },
  { sku: "9629", sale_price: 4.99 },
  { sku: "9630", sale_price: 12.75 },
  { sku: "6335", sale_price: 3.75 },
  { sku: "6438", sale_price: 15 },
  { sku: "6446", sale_price: 9.75 },
  { sku: "6447", sale_price: 9.75 },
  { sku: "9596", sale_price: 12 },
  { sku: "9597", sale_price: 12 },
  { sku: "9598", sale_price: 12 },
  { sku: "9599", sale_price: 12 },
  { sku: "9600", sale_price: 12 },
  { sku: "7130", sale_price: 16.5 },
  { sku: "9584", sale_price: 15.75 },
  { sku: "9585", sale_price: 15.75 },
  { sku: "9586", sale_price: 15.75 },
  { sku: "9583", sale_price: 15.75 },
  { sku: "9588", sale_price: 15.75 },
  { sku: "9587", sale_price: 15.75 },
  { sku: "9582", sale_price: 9 },
  { sku: "9581", sale_price: 12.99 },
  { sku: "9655", sale_price: 36 },
  { sku: "9591", sale_price: 10.5 },
  { sku: "9592", sale_price: 10.5 },
  { sku: "9593", sale_price: 10.5 },
  { sku: "9594", sale_price: 10.5 },
  { sku: "9601", sale_price: 12 },
  { sku: "9602", sale_price: 12 },
  { sku: "9603", sale_price: 12 },
  { sku: "9604", sale_price: 6.99 },
  { sku: "9605", sale_price: 12 },
  { sku: "9613", sale_price: 9 },
  { sku: "9614", sale_price: 9 },
  { sku: "9615", sale_price: 9 },
  { sku: "9612", sale_price: 9 },
  { sku: "9617", sale_price: 9 },
  { sku: "9621", sale_price: 9.75 },
  { sku: "9622", sale_price: 22.5 },
  { sku: "9623", sale_price: 22.5 },
  { sku: "9624", sale_price: 22.5 },
  { sku: "9625", sale_price: 22.5 },
  { sku: "9576", sale_price: 15.75 },
  { sku: "9577", sale_price: 15.75 },
  { sku: "9578", sale_price: 15.75 },
  { sku: "9579", sale_price: 15.75 },
  { sku: "9589", sale_price: 16.5 },
  { sku: "9616", sale_price: 27 },
  { sku: "9568", sale_price: 15.75 },
  { sku: "9569", sale_price: 15.75 },
  { sku: "9570", sale_price: 15.75 },
  { sku: "9571", sale_price: 15.75 },
  { sku: "9572", sale_price: 15.75 },
  { sku: "9573", sale_price: 15.75 },
  { sku: "9574", sale_price: 15.75 },
  { sku: "9575", sale_price: 15.75 },
  { sku: "9006A", sale_price: 15 },
  { sku: "7243", sale_price: 47.25 },
  { sku: "10759", sale_price: 15 },
  { sku: "10760", sale_price: 15 },
  { sku: "10761", sale_price: 15 },
  { sku: "10762", sale_price: 15 },
  { sku: "10546", sale_price: 16.5 },
  { sku: "10547", sale_price: 9 },
  { sku: "11954", sale_price: 47.99 },
  { sku: "11971", sale_price: 24.45 },
  { sku: "11972", sale_price: 10.5 },
  { sku: "11973", sale_price: 13.5 },
  { sku: "12725", sale_price: 8.25 },
  { sku: "12726", sale_price: 8.25 },
  { sku: "12727", sale_price: 8.25 },
  { sku: "12728", sale_price: 8.25 },
  { sku: "13155", sale_price: 10.5 },
  { sku: "13159", sale_price: 27 },
  { sku: "13160", sale_price: 11.99 },
  { sku: "13161", sale_price: 13.5 },
  { sku: "13162", sale_price: 13.5 },
  { sku: "13163", sale_price: 13.5 },
  { sku: "13164", sale_price: 13.5 },
  { sku: "13165", sale_price: 13.5 },
  { sku: "13166", sale_price: 10.99 },
  { sku: "7246", sale_price: 52.5 },
  { sku: "7247", sale_price: 52.5 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.None;

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
