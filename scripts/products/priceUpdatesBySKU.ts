import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "5702", sale_price: 14.8 },
  { sku: "5703", sale_price: 14.8 },
  { sku: "9921", sale_price: 16.4 },
  { sku: "6465", sale_price: 12.7 },
  { sku: "6466", sale_price: 15.9 },
  { sku: "6467", sale_price: 14.6 },
  { sku: "6468", sale_price: 20.4 },
  { sku: "6469", sale_price: 12.5 },
  { sku: "6470", sale_price: 15.9 },
  { sku: "6471", sale_price: 12.7 },
  { sku: "6472", sale_price: 15.6 },
  { sku: "6473", sale_price: 13.2 },
  { sku: "6474", sale_price: 12.5 },
  { sku: "6475", sale_price: 12.7 },
  { sku: "6476", sale_price: 15.9 },
  { sku: "6477", sale_price: 27.6 },
  { sku: "6478", sale_price: 27.6 },
  { sku: "6479", sale_price: 15.6 },
  { sku: "6481A", sale_price: 12.7 },
  { sku: "6481", sale_price: 13.2 },
  { sku: "6482", sale_price: 17.2 },
  { sku: "6483", sale_price: 17.8 },
  { sku: "6736", sale_price: 10.8 },
  { sku: "6737", sale_price: 10.8 },
  { sku: "6738", sale_price: 12.7 },
  { sku: "6739", sale_price: 12.7 },
  { sku: "6740", sale_price: 10 },
  { sku: "6741", sale_price: 11.6 },
  { sku: "6742", sale_price: 12.7 },
  { sku: "6743", sale_price: 12.7 },
  { sku: "6744", sale_price: 12.7 },
  { sku: "6745", sale_price: 12.7 },
  { sku: "6746", sale_price: 12.7 },
  { sku: "6747", sale_price: 12.7 },
  { sku: "8758", sale_price: 40.05 },
  { sku: "8759", sale_price: 37.7 },
  { sku: "8760", sale_price: 37.7 },
  { sku: "7682", sale_price: 12.7 },
  { sku: "7683", sale_price: 12.7 },
  { sku: "7684", sale_price: 12.7 },
  { sku: "7685", sale_price: 14.6 },
  { sku: "7686", sale_price: 18.15 },
  { sku: "7687", sale_price: 12.7 },
  { sku: "7688", sale_price: 22.8 },
  { sku: "7689", sale_price: 23.9 },
  { sku: "7786", sale_price: 16 },
  { sku: "7999", sale_price: 12.7 },
  { sku: "8000", sale_price: 14.3 },
  { sku: "8001", sale_price: 14.3 },
  { sku: "8063", sale_price: 30.8 },
  { sku: "8066", sale_price: 11.1 },
  { sku: "8192", sale_price: 16 },
  { sku: "8193", sale_price: 16 },
  { sku: "8204", sale_price: 28 },
  { sku: "8205", sale_price: 28 },
  { sku: "8206", sale_price: 28 },
  { sku: "8713", sale_price: 12.7 },
  { sku: "8716", sale_price: 15.9 },
  { sku: "8717", sale_price: 15.6 },
  { sku: "8715", sale_price: 12.7 },
  { sku: "8719", sale_price: 16.7 },
  { sku: "8718", sale_price: 15.6 },
  { sku: "8714", sale_price: 12.7 },
  { sku: "8749", sale_price: 14.35 },
  { sku: "8756", sale_price: 41.6 },
  { sku: "8757", sale_price: 41.35 },
  { sku: "9078", sale_price: 43.8 },
  { sku: "9087", sale_price: 44.8 },
  { sku: "9229", sale_price: 36.65 },
  { sku: "9786", sale_price: 7.99 },
  { sku: "9804", sale_price: 28.65 },
  { sku: "9805", sale_price: 31.2 },
  { sku: "9803", sale_price: 25.45 },
  { sku: "9802", sale_price: 27.2 },
  { sku: "9806", sale_price: 35.2 },
  { sku: "9801", sale_price: 35.5 },
  { sku: "9894", sale_price: 12.7 },
  { sku: "9895", sale_price: 15.6 },
  { sku: "9897", sale_price: 15.9 },
  { sku: "9898", sale_price: 17.2 },
  { sku: "9899", sale_price: 12.7 },
  { sku: "9906", sale_price: 74.15 },
  { sku: "9907", sale_price: 41.35 },
  { sku: "9908", sale_price: 33.1 },
  { sku: "9916", sale_price: 12.7 },
  { sku: "9917", sale_price: 12.7 },
  { sku: "9919", sale_price: 12.7 },
  { sku: "9920", sale_price: 12.7 },
  { sku: "9954", sale_price: 87.5 },
  { sku: "9955", sale_price: 82.9 },
  { sku: "9956", sale_price: 76.35 },
  { sku: "10377", sale_price: 41.35 },
  { sku: "10411", sale_price: 11.9 },
  { sku: "10412", sale_price: 11.9 },
  { sku: "10414", sale_price: 11.9 },
  { sku: "10415", sale_price: 11.6 },
  { sku: "10413", sale_price: 11.6 },
  { sku: "10416", sale_price: 19.6 },
  { sku: "10417", sale_price: 19.6 },
  { sku: "10419", sale_price: 19.6 },
  { sku: "10418", sale_price: 17.1 },
  { sku: "10364a", sale_price: 37.35 },
  { sku: "10361a", sale_price: 39.8 },
  { sku: "10365a", sale_price: 36 },
  { sku: "10364b", sale_price: 36.9 },
  { sku: "11038", sale_price: 15.1 },
  { sku: "11039", sale_price: 15.1 },
  { sku: "11040", sale_price: 15.1 },
  { sku: "11041", sale_price: 15.1 },
  { sku: "11042", sale_price: 17.8 },
  { sku: "11043", sale_price: 4.7 },
  { sku: "11044", sale_price: 4.7 },
  { sku: "11074", sale_price: 30.25 },
  { sku: "11075", sale_price: 30.25 },
  { sku: "11076", sale_price: 48 },
  { sku: "12351", sale_price: 19.2 },
  { sku: "12352", sale_price: 19.2 },
  { sku: "12353", sale_price: 17.6 },
  { sku: "12756", sale_price: 105 },
  { sku: "12757", sale_price: 79 },
  { sku: "12758", sale_price: 55.4 },
  { sku: "13038", sale_price: 41.85 },
  { sku: "13248", sale_price: 32.99 },
  { sku: "13249", sale_price: 39.99 },
  { sku: "13250", sale_price: 29.4 },
  { sku: "13253", sale_price: 33.5 },
  { sku: "8192A", sale_price: 16 },
  { sku: "14054", sale_price: 12.7 },
  { sku: "14052", sale_price: 20.4 },
  { sku: "14050", sale_price: 12.7 },
  { sku: "14051", sale_price: 12.7 },
  { sku: "14053", sale_price: 13.2 },
  { sku: "14136", sale_price: 25.45 },
  { sku: "14137", sale_price: 65.6 },
  { sku: "14408", sale_price: 52 },
  { sku: "14686", sale_price: 20.4 },
  { sku: "14758", sale_price: 59.05 },
  { sku: "14759", sale_price: 62.55 },
  { sku: "14760", sale_price: 58.55 },
  { sku: "14761", sale_price: 53.05 },
  { sku: "14762", sale_price: 54.55 },
  { sku: "14763", sale_price: 63.85 },
  { sku: "14764", sale_price: 66.4 },
  { sku: "20109", sale_price: 12.7 },
  { sku: "20110", sale_price: 12.7 },
  { sku: "20111", sale_price: 16.5 },
  { sku: "20112", sale_price: 16.5 },
  { sku: "20230", sale_price: 40 },
  { sku: "20231", sale_price: 40 },
  { sku: "20232", sale_price: 38.7 },
  { sku: "20233", sale_price: 50.8 },
  { sku: "20198", sale_price: 15 },
  { sku: "20199", sale_price: 25.45 },
  { sku: "20200", sale_price: 58.4 },
  { sku: "20208", sale_price: 7.5 },
  { sku: "20209", sale_price: 7.5 },
  { sku: "20210", sale_price: 7.5 },
  { sku: "20211", sale_price: 7.5 },
  { sku: "20212", sale_price: 7.5 },
  { sku: "20213", sale_price: 7.5 },
  { sku: "14057", sale_price: 23.55 },
  { sku: "20649", sale_price: 39.99 },
  { sku: "20646", sale_price: 35.9 },
  { sku: "20647", sale_price: 35.9 },
  { sku: "20648", sale_price: 35.9 },
  { sku: "20650", sale_price: 25.45 },
  { sku: "20651", sale_price: 25.45 },
  { sku: "20652", sale_price: 28 },
  { sku: "20656", sale_price: 31.8 },
  { sku: "20657", sale_price: 31.8 },
  { sku: "20658", sale_price: 31.8 },
  { sku: "20659", sale_price: 31.8 },
  { sku: "20660", sale_price: 31.8 },
  { sku: "20661", sale_price: 37.8 },
  { sku: "20662", sale_price: 37.8 },
  { sku: "20663", sale_price: 35.8 },
  { sku: "20672", sale_price: 31.8 },
  { sku: "20673", sale_price: 31.8 },
  { sku: "20674", sale_price: 31.8 },
  { sku: "20675", sale_price: 31.8 },
  { sku: "20676", sale_price: 31.8 },
  { sku: "20677", sale_price: 37.8 },
  { sku: "20678", sale_price: 37.8 },
  { sku: "20679", sale_price: 35.8 },
  { sku: "20720", sale_price: 11.9 },
  { sku: "20721", sale_price: 10.8 },
  { sku: "20722", sale_price: 15.8 },
  { sku: "20723", sale_price: 12.7 },
  { sku: "20724", sale_price: 11 },
  { sku: "20214", sale_price: 12.7 },
  { sku: "20767", sale_price: 39.1 },
  { sku: "20759", sale_price: 11.1 },
  { sku: "20761", sale_price: 11.9 },
  { sku: "20766", sale_price: 20.4 },
  { sku: "20762", sale_price: 13.2 },
  { sku: "20764", sale_price: 15.8 },
  { sku: "20765", sale_price: 15.9 },
  { sku: "20760", sale_price: 11.1 },
  { sku: "20763", sale_price: 13.4 },
  { sku: "20841", sale_price: 52.55 },
  { sku: "20838", sale_price: 49 },
  { sku: "20839", sale_price: 49 },
  { sku: "20840", sale_price: 49 },
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
