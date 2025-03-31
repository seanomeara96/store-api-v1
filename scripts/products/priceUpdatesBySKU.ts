import { retail } from "googleapis/build/src/apis/retail";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "5702", sale_price: 14.8, exclude: "TRUE" },
  { sku: "5703", sale_price: 14.8, exclude: "TRUE" },
  { sku: "9921", sale_price: 16.4, exclude: "TRUE" },
  { sku: "6465", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6466", sale_price: 15.9, exclude: "TRUE" },
  { sku: "6467", sale_price: 14.6, exclude: "TRUE" },
  { sku: "6468", sale_price: 20.4, exclude: "TRUE" },
  { sku: "6469", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6470", sale_price: 15.9, exclude: "TRUE" },
  { sku: "6471", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6472", sale_price: 15.6, exclude: "TRUE" },
  { sku: "6473", sale_price: 13.2, exclude: "TRUE" },
  { sku: "6474", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6475", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6476", sale_price: 15.9, exclude: "TRUE" },
  { sku: "6477", sale_price: 27.6, exclude: "TRUE" },
  { sku: "6478", sale_price: 27.6, exclude: "TRUE" },
  { sku: "6479", sale_price: 15.6, exclude: "TRUE" },
  { sku: "6481A", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6481", sale_price: 13.2, exclude: "TRUE" },
  { sku: "6482", sale_price: 17.2, exclude: "TRUE" },
  { sku: "6483", sale_price: 17.8, exclude: "TRUE" },
  { sku: "6743", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6744", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6745", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6746", sale_price: 12.7, exclude: "TRUE" },
  { sku: "6747", sale_price: 12.7, exclude: "TRUE" },
  { sku: "8758", sale_price: 40.05, exclude: "TRUE" },
  { sku: "8759", sale_price: 38.15, exclude: "TRUE" },
  { sku: "8760", sale_price: 38.15, exclude: "TRUE" },
  { sku: "7682", sale_price: 12.7, exclude: "TRUE" },
  { sku: "7683", sale_price: 12.7, exclude: "TRUE" },
  { sku: "7684", sale_price: 12.7, exclude: "TRUE" },
  { sku: "7685", sale_price: 14.6, exclude: "TRUE" },
  { sku: "7686", sale_price: 18.15, exclude: "TRUE" },
  { sku: "7687", sale_price: 12.7, exclude: "TRUE" },
  { sku: "7688", sale_price: 22.8, exclude: "TRUE" },
  { sku: "7689", sale_price: 23.9, exclude: "TRUE" },
  { sku: "7786", sale_price: 16, exclude: "TRUE" },
  { sku: "7999", sale_price: 12.7, exclude: "TRUE" },
  { sku: "8000", sale_price: 14.3, exclude: "TRUE" },
  { sku: "8001", sale_price: 14.3, exclude: "TRUE" },
  { sku: "8063", sale_price: 30.8, exclude: "TRUE" },
  { sku: "8192", sale_price: 16, exclude: "TRUE" },
  { sku: "8193", sale_price: 16, exclude: "TRUE" },
  { sku: "8204", sale_price: 34.99, exclude: "TRUE" },
  { sku: "8205", sale_price: 34.99, exclude: "TRUE" },
  { sku: "8206", sale_price: 36, exclude: "TRUE" },
  { sku: "8713", sale_price: 12.7, exclude: "TRUE" },
  { sku: "8716", sale_price: 15.9, exclude: "TRUE" },
  { sku: "8717", sale_price: 15.6, exclude: "TRUE" },
  { sku: "8715", sale_price: 12.7, exclude: "TRUE" },
  { sku: "8719", sale_price: 16.7, exclude: "TRUE" },
  { sku: "8718", sale_price: 15.6, exclude: "TRUE" },
  { sku: "8714", sale_price: 12.7, exclude: "TRUE" },
  { sku: "8756", sale_price: 41.6, exclude: "TRUE" },
  { sku: "8757", sale_price: 41.35, exclude: "TRUE" },
  { sku: "9078", sale_price: 43.8, exclude: "TRUE" },
  { sku: "9087", sale_price: 44.8, exclude: "TRUE" },
  { sku: "9229", sale_price: 36.65, exclude: "TRUE" },
  { sku: "9786", sale_price: 9.5, exclude: "TRUE" },
  { sku: "9804", sale_price: 28.65, exclude: "TRUE" },
  { sku: "9805", sale_price: 31.2, exclude: "TRUE" },
  { sku: "9803", sale_price: 25.45, exclude: "TRUE" },
  { sku: "9802", sale_price: 27.2, exclude: "TRUE" },
  { sku: "9806", sale_price: 35.2, exclude: "TRUE" },
  { sku: "9801", sale_price: 35.5, exclude: "TRUE" },
  { sku: "9894", sale_price: 12.7, exclude: "TRUE" },
  { sku: "9895", sale_price: 15.6, exclude: "TRUE" },
  { sku: "9897", sale_price: 15.9, exclude: "TRUE" },
  { sku: "9898", sale_price: 17.2, exclude: "TRUE" },
  { sku: "9899", sale_price: 12.7, exclude: "TRUE" },
  { sku: "9906", sale_price: 74.15, exclude: "TRUE" },
  { sku: "9907", sale_price: 41.35, exclude: "TRUE" },
  { sku: "9908", sale_price: 33.1, exclude: "TRUE" },
  { sku: "9954", sale_price: 87.5, exclude: "TRUE" },
  { sku: "9955", sale_price: 82.9, exclude: "TRUE" },
  { sku: "9956", sale_price: 76.35, exclude: "TRUE" },
  { sku: "10377", sale_price: 41.35, exclude: "TRUE" },
  { sku: "10411", sale_price: 11.9, exclude: "TRUE" },
  { sku: "10412", sale_price: 11.9, exclude: "TRUE" },
  { sku: "10414", sale_price: 11.9, exclude: "TRUE" },
  { sku: "10415", sale_price: 11.6, exclude: "TRUE" },
  { sku: "10413", sale_price: 11.6, exclude: "TRUE" },
  { sku: "10416", sale_price: 19.6, exclude: "TRUE" },
  { sku: "10417", sale_price: 19.6, exclude: "TRUE" },
  { sku: "10419", sale_price: 19.6, exclude: "TRUE" },
  { sku: "10418", sale_price: 17.1, exclude: "TRUE" },
  { sku: "10364a", sale_price: 37.35, exclude: "TRUE" },
  { sku: "10361a", sale_price: 39.8, exclude: "TRUE" },
  { sku: "10365a", sale_price: 35.99, exclude: "TRUE" },
  { sku: "10364b", sale_price: 36.9, exclude: "TRUE" },
  { sku: "11038", sale_price: 15.1, exclude: "TRUE" },
  { sku: "11039", sale_price: 15.1, exclude: "TRUE" },
  { sku: "11040", sale_price: 15.1, exclude: "TRUE" },
  { sku: "11041", sale_price: 15.1, exclude: "TRUE" },
  { sku: "11042", sale_price: 17.8, exclude: "TRUE" },
  { sku: "11043", sale_price: 8, exclude: "TRUE" },
  { sku: "11044", sale_price: 5.9, exclude: "TRUE" },
  { sku: "11074", sale_price: 30.25, exclude: "TRUE" },
  { sku: "11075", sale_price: 30.25, exclude: "TRUE" },
  { sku: "11076", sale_price: 48, exclude: "TRUE" },
  { sku: "12351", sale_price: 19.2, exclude: "TRUE" },
  { sku: "12352", sale_price: 19.2, exclude: "TRUE" },
  { sku: "12353", sale_price: 17.6, exclude: "TRUE" },
  { sku: "12756", sale_price: 104.99, exclude: "TRUE" },
  { sku: "12757", sale_price: 78.99, exclude: "TRUE" },
  { sku: "12758", sale_price: 55.4, exclude: "TRUE" },
  { sku: "13038", sale_price: 41.85, exclude: "TRUE" },
  { sku: "13248", sale_price: 32.99, exclude: "TRUE" },
  { sku: "13249", sale_price: 39.99, exclude: "TRUE" },
  { sku: "13253", sale_price: 33.99, exclude: "TRUE" },
  { sku: "8192A", sale_price: 16, exclude: "TRUE" },
  { sku: "14054", sale_price: 12.7, exclude: "TRUE" },
  { sku: "14052", sale_price: 20.4, exclude: "TRUE" },
  { sku: "14050", sale_price: 12.7, exclude: "TRUE" },
  { sku: "14051", sale_price: 12.7, exclude: "TRUE" },
  { sku: "14053", sale_price: 13.2, exclude: "TRUE" },
  { sku: "14136", sale_price: 25.45, exclude: "TRUE" },
  { sku: "14137", sale_price: 65.6, exclude: "TRUE" },
  { sku: "14408", sale_price: 51.99, exclude: "TRUE" },
  { sku: "14686", sale_price: 20.4, exclude: "TRUE" },
  { sku: "14758", sale_price: 59.05, exclude: "TRUE" },
  { sku: "14759", sale_price: 62.55, exclude: "TRUE" },
  { sku: "14760", sale_price: 58.55, exclude: "TRUE" },
  { sku: "14761", sale_price: 53.05, exclude: "TRUE" },
  { sku: "14762", sale_price: 54.55, exclude: "TRUE" },
  { sku: "14763", sale_price: 63.85, exclude: "TRUE" },
  { sku: "14764", sale_price: 66.4, exclude: "TRUE" },
  { sku: "20109", sale_price: 12.7, exclude: "TRUE" },
  { sku: "20110", sale_price: 12.7, exclude: "TRUE" },
  { sku: "20111", sale_price: 16.5, exclude: "TRUE" },
  { sku: "20112", sale_price: 16.5, exclude: "TRUE" },
  { sku: "20230", sale_price: 39.99, exclude: "TRUE" },
  { sku: "20231", sale_price: 39.99, exclude: "TRUE" },
  { sku: "20232", sale_price: 38.7, exclude: "TRUE" },
  { sku: "20233", sale_price: 50.8, exclude: "TRUE" },
  { sku: "20198", sale_price: 15, exclude: "TRUE" },
  { sku: "20199", sale_price: 25.45, exclude: "TRUE" },
  { sku: "20200", sale_price: 58.4, exclude: "TRUE" },
  { sku: "20208", sale_price: 7.99, exclude: "TRUE" },
  { sku: "20209", sale_price: 7.99, exclude: "TRUE" },
  { sku: "20210", sale_price: 7.99, exclude: "TRUE" },
  { sku: "20211", sale_price: 7.99, exclude: "TRUE" },
  { sku: "20212", sale_price: 7.99, exclude: "TRUE" },
  { sku: "20213", sale_price: 7.99, exclude: "TRUE" },
  { sku: "14057", sale_price: 23.55, exclude: "TRUE" },
  { sku: "20649", sale_price: 39.99, exclude: "TRUE" },
  { sku: "20646", sale_price: 35.9, exclude: "TRUE" },
  { sku: "20647", sale_price: 35.9, exclude: "TRUE" },
  { sku: "20648", sale_price: 35.9, exclude: "TRUE" },
  { sku: "20650", sale_price: 25.45, exclude: "TRUE" },
  { sku: "20651", sale_price: 25.45, exclude: "TRUE" },
  { sku: "20652", sale_price: 28.8, exclude: "TRUE" },
  { sku: "20656", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20657", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20658", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20659", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20660", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20661", sale_price: 37.99, exclude: "TRUE" },
  { sku: "20662", sale_price: 37.99, exclude: "TRUE" },
  { sku: "20663", sale_price: 35.99, exclude: "TRUE" },
  { sku: "20672", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20673", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20674", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20675", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20676", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20677", sale_price: 37.99, exclude: "TRUE" },
  { sku: "20678", sale_price: 37.99, exclude: "TRUE" },
  { sku: "20679", sale_price: 35.99, exclude: "TRUE" },
  { sku: "20720", sale_price: 11.9, exclude: "TRUE" },
  { sku: "20721", sale_price: 10.8, exclude: "TRUE" },
  { sku: "20722", sale_price: 15.8, exclude: "TRUE" },
  { sku: "20723", sale_price: 12.7, exclude: "TRUE" },
  { sku: "20724", sale_price: 11, exclude: "TRUE" },
  { sku: "20767", sale_price: 39.1, exclude: "TRUE" },
  { sku: "20759", sale_price: 11.1, exclude: "TRUE" },
  { sku: "20761", sale_price: 11.9, exclude: "TRUE" },
  { sku: "20766", sale_price: 20.4, exclude: "TRUE" },
  { sku: "20762", sale_price: 13.2, exclude: "TRUE" },
  { sku: "20764", sale_price: 15.8, exclude: "TRUE" },
  { sku: "20765", sale_price: 15.9, exclude: "TRUE" },
  { sku: "20760", sale_price: 11.1, exclude: "TRUE" },
  { sku: "20763", sale_price: 13.4, exclude: "TRUE" },
  { sku: "20841", sale_price: 52.55, exclude: "TRUE" },
  { sku: "20838", sale_price: 48.99, exclude: "TRUE" },
  { sku: "20839", sale_price: 48.99, exclude: "TRUE" },
  { sku: "20840", sale_price: 48.99, exclude: "TRUE" },
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
